

<template>
    <ul :class="[`${prefixCls}-picker__wheel`,classess]" :style="styles" @touchstart="_start" @touchmove.passive="_move" @touchend="_end" @touchcancel="_end" @transitionend="_transitionEnd">
        <li :class="`${prefixCls}-picker__item`" v-for="(item,$i) in items" :key="$i"><span>{{item.label || item}}</span></li>
    </ul>
</template>

<script>
    import { initName, baseMixins } from '../../util'
    export default {
        name: initName('picker-wheel'),
        mixins: [baseMixins],
        props: {
            items: Array,
            value: '',
            index: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                startY: 0,
                startTime: 0,
                top: 0,
                itemHeight: 40,
                curIndex: 0,
                transition: false,
                allHeight: 0,
                startPoint: 0,
                currentValue: this.value
            }
        },
        computed: {
            styles() {
                return {
                    marginTop: `${this.itemHeight * 2}px`,
                    transform: `translate3d(0, ${this.top}px, 0)`
                }
            },
            classess() {
                return {
                    [`${this.prefixCls}-picker__transition`]: this.transition
                }
            }
        },
        watch: {
            curIndex(val) {
                this.currentValue = this.items[val]
            },
            value(val) {
                this.currentValue = val
            },
            currentValue(val) {
                this.$emit('change', val)
            }
        },
        methods: {
            enforceLimit(t) {
                if (t > 0) {
                    t = 0

                } else if (Math.abs(t) > this.allHeight) {
                    t = this.allHeight * -1

                }
                console.log(t)
                return t
            },
            transitionTo(i) {
                this.transition = true
                this.top = this.enforceLimit(i * this.itemHeight)
            },
            _transitionEnd(e) {
                this.transition = false
                this.curIndex = Math.abs(this.top / this.itemHeight)
            },
            isOutLimit(t) {
                let b = t > 0 || Math.abs(t) > this.allHeight
                return b
            },
            _start(e) {
                var pageX = e.touches[0].pageX,
                    pageY = e.touches[0].pageY
                this.transition = false
                this.startY = pageY
                this.startTime = e.timeStamp || Date.now()
                this.startPoint = pageY
                this.top = new WebKitCSSMatrix(this.$el.style.transform).m42
                this.startTop = this.top
                this.allHeight = this.$el.scrollHeight - this.$el.clientHeight + this.itemHeight * 2
            },
            _move(e) {
                let PY = e.touches[0].pageY
                let distance = PY - this.startY
                let top = this.startTop + distance, durantion

                this.direction = distance < 0 ? 'up' : 'down'

                if (top > 0 || Math.abs(top) > this.allHeight) {
                    distance = distance / 2
                }

                this.top = this.startTop + distance

                this.status = 'moving'
                var endTime = e.timeStamp || Date.now()
                durantion = endTime - this.startTime
                if (durantion > 100) {
                    this.speed = (PY - this.startPoint) * 1000 / durantion
                    this.startTime = endTime
                    this.startPoint = PY
                }
            },
            _end(e) {
                this.status = 'end'
                let top = this.top,
                    endTime = e.timeStamp || Date.now()

                this.$nextTick(() => {
                    let top = this.top
                    top += this.speed * 0.2
                    this.transition = true
                    this.top = this.enforceLimit(Math.round(top / this.itemHeight) * this.itemHeight)
                })
            }
        }
    }
</script>

