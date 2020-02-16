

<template>
    <div :class="[`${prefixCls}-picker__wheel`]">
        <ul ref='wheel' :class="`${prefixCls}-picker__wheel-list`">
            <li :class="`${prefixCls}-picker__item`" :style="setItemStyle(item.index)" v-for="(item,$i) in currentDatas" :key="$i">
                <p>{{item.val.label || item.val}}</p>
            </li>
        </ul>

    </div>
</template>

<script>
    import { initName, baseMixins } from '../../util'
    export default {
        name: initName('picker-wheel'),
        mixins: [baseMixins],
        props: {
            datas: Array,
            type: {
                type: String,
                default: 'line'
            },
            index: {
                type: Number,
                default: 0
            },
            value: [String, Number, Array]
        },
        data() {
            return {
                currentValue: this.value,
                startY: 0, // 开始位置
                endY: 0, // 结束位置
                startTime: 0, // 开始时间
                endTime: 0, // 结束时间
                transformY: 0,
                spin: { start: -9, end: 9, branch: 9 },
                itemHeight: 40,
                itemDeg: 20,
                transitionTime: 500
            }
        },
        watch: {
            value(val, old) {
                this.currentValue = val
            },
            currentValue(val, old) {
                this.$emit('input', val)
            },
            datas(val) {
                this.goIndex(0)
            }
        },
        computed: {
            currentDatas() {
                let rst = [], spin = this.spin
                for (let i = spin.start; i <= spin.end; i++) {
                    rst.push({
                        val: this.getVal(i),
                        index: i
                    })
                }
                return rst
            }
        },
        methods: {
            getVal(index) {
                let len = this.datas.length
                index = index % len
                return this.datas[index >= 0 ? index : (index + len)]
            },
            getPickerVal(d) {
                let index = Math.round(-1 * d / this.itemHeight)
                let val = this.getVal(index)
                if (Array.isArray(this.currentValue)) {
                    this.$set(this.currentValue, this.index, val)
                } else {
                    this.currentValue = val
                }
            },
            setItemStyle(i) {
                return {
                    visibility: this.type === 'line' && i < 0 || i > this.datas.length - 1 ? 'hidden' : '',
                    transform: `rotate3d(1, 0, 0, ${-i * 20 % 360}deg) translate3d(0px, 0px, 100px)`
                }
            },
            init(type) {
                let index, distance
                this.$nextTick(() => {
                    if (!type) {
                        this.startY = 0
                        this.endY = 0
                        this.startTime = 0
                        this.endTime = 0

                        let val = Array.isArray(this.currentValue) ? this.currentValue[this.index] : this.currentValue

                        this.goValue(val)
                    }
                })
            },

            goValue(val) {
                //let val = Array.isArray(this.currentValue) ? this.currentValue[this.index] : this.currentValue
                let index = this.datas.indexOf(val), distance = 0
                this.goIndex(index)
            },

            goIndex(index) {
                let distance
                if (index === -1) {
                    console.warn('当前初始值不存在，请检查datas范围')
                    this.setTransform()
                    this.getPickerVal(0)
                } else {
                    distance = index * this.itemHeight
                    /* 因为往上滑动所以是负 */
                    this.transitionTo(-distance, 'end', 1000)
                    this.setTransform(-distance)
                }
            },
            transitionTo(distance, type, time) {
                const singleHeight = this.itemHeight
                const deg = this.itemDeg
                const singleDeg = deg / singleHeight
                // 总的变化幅度
                let updateDistance = Number(this.transformY) + distance

                let updateDeg, spinAim, margin, endMove, endDeg
                if (type === 'end' && this.type === 'line') {
                    /*这里只在释放的时候判断 实现缓动效果*/
                    /* 根据滚轮类型 line or cycle 判断 updateDistance */
                    if (updateDistance > 0) {
                        updateDistance = 0
                    }

                    if (updateDistance < -(this.datas.length - 1) * singleHeight) {
                        updateDistance = -(this.datas.length - 1) * singleHeight
                    }
                }
                //todo 这里考虑后续设置能最大缓动的值 目前暂时不考虑

                updateDeg = -updateDistance * singleDeg
                spinAim = Math.round(updateDeg / 20)
                margin = Math.round(updateDistance / singleHeight) * singleHeight // 如果不这么写 会导致没有滚动效果
                /* 计算touchEnd移动的整数距离 */
                endMove = margin
                endDeg = Math.round(updateDeg / deg) * deg

                if (type === 'end') {
                    this.setTransform(endMove)
                    this.setWheelDeg(endDeg, type, time)
                    /* 设置$emit 延迟 */
                    setTimeout(() => this.getPickerVal(endMove), this.transitionTime)
                } else {
                    this.setTransform(updateDistance)
                    this.setWheelDeg(updateDeg)
                }
                this.updateSpin(spinAim)
            },
            /* 更新spin */
            updateSpin(spinAim) {
                this.spin.start = this.spin.branch * -1 + spinAim
                this.spin.end = this.spin.start + this.spin.branch * 2
            },
            setTransform(ty = 0) {
                //this.transformY = ty
                this.$refs.wheel.setAttribute('scroll', ty)
            },
            setWheelDeg(updateDeg, type, time) {
                time = time || this.transitionTime
                if (type === 'end') {
                    this.$refs.wheel.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
                    this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
                } else {
                    this.$refs.wheel.style.webkitTransition = ''
                    this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
                }
            },
            _start(e) {
                let pointer = e.changedTouches[0]
                this.startY = pointer.pageY
                this.startTime = Date.now()
                this.transformY = this.$refs.wheel.getAttribute('scroll')
                e.preventDefault()
            },
            _move(e) {
                let pointer = e.changedTouches[0]
                this.endY = pointer.pageY
                this.endTime = Date.now()
                let distance = this.endY - this.startY

                this.transitionTo(distance)
                e.preventDefault()

            },
            _end(e) {
                let pointer = e.changedTouches[0]
                this.endY = pointer.pageY
                this.endTime = Date.now()

                // 手指滑动总的距离
                let distance = this.endY - this.startY
                // 手指滑动总的时间
                let time = this.endTime - this.startTime
                // 平均速度
                let v = distance / time
                // 加速度
                let a = 1.8

                /* 设置css */
                if (time <= 300) {
                    distance = v * a * time
                    time = this.transitionTime + time * a
                    this.transitionTo(distance, 'end', time)
                } else {
                    this.transitionTo(distance, 'end')
                }
            }
        },
        mounted() {
            /* 事件绑定 */
            this.$el.addEventListener('touchstart', this._start)
            this.$el.addEventListener('touchmove', this._move)
            this.$el.addEventListener('touchend', this._end)
            this.init()
        },
        beforeDestroy() {
            this.$el.removeEventListener('touchstart', this._start)
            this.$el.removeEventListener('touchmove', this._move)
            this.$el.removeEventListener('touchend', this._end)
        }
    }
</script>

