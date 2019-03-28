<template>
    <w-popup v-model="currentShow" position="bottom">
        <div class="wui-picker picker-wrapper">
            <div class="picker-body" :class="{'dragging':dragging}" :style="{ height: contentHeight + 'px' }">
                <div class="picker-item" :key="'picker-'+$i" v-for="(option,$i) in resolvedOptions[0].options">
                    {{option.name}}
                </div>
            </div>
            <div class=" picker-selector-hightlight "></div>
        </div>
        <div v-if="showConfirmButton" :class=" 'picker-buttons-' + buttonsPosition ">
            <w-button type="default" size="large" :sharp="true" @click="currentShow=false">{{cancelButtonText}}</w-button>
            <w-button type="primary" size="large" :sharp="true" @click="confirmSelectValue">{{confirmButtonText}}</w-button>
        </div>
    </w-popup>
</template>
<script>
    /**
     * wui-picker
     * @desc 弹出层
     * @module Picker
     * @see {@link ../example/all/picker.html 实例}
     * @param {Boolean} show - 显示模态背景
     * @param {Array} options - 下拉列表的数据源
     * @param {Number} visibleCount=3 - 展示数
     * @param {Boolean} showCancelButton - 展示取消按钮
     * @param {Boolean} showConfirmButton - 展示确认按钮
     * @param {String} cancelButtonText='取消' - 取消按钮的显示 
     * @param {String} confirmButtonText='确认' - 确认按钮的显示,默认 确认
     * @param {String} buttonsPosition＝'button' - 按钮组的位置[button,top];现在暂不支持top
     * @param {Function} select - 选择回调,回调参数(下标,值,对象(原始))
     * @param {Function} hide
     *
     * @example
     *      <w-picker v-model="pickValue" :show="popupVisible" @select="onItemSelect" :options="items" @hide="popupVisible= arguments[0]"></w-picker>
     *      <w-picker v-model="pickValue2" :show="popupVisible2" @select="onItemSelect2" :options="items2" @hide="popupVisible2= arguments[0]"></w-picker>
     *      <w-picker :show="popupVisible3" @select="onItemSelect3" :options="items3" @hide="popupVisible3= arguments[0]"></w-picker>
     *      <w-picker :show="popupVisible4" @select="onItemSelect4" :options="items4" :visibleCount="5" @hide="popupVisible4= arguments[0]"></w-picker>
     */

    import popup from '../../popup/src/popup.vue';

    var OPTION_HEIGHT = 33;
    export default {
        name: 'w-picker',
        components: {
            'w-popup': popup
        },
        props: {
            show: Boolean,
            value: {},
            options: Array,
            visibleCount: {
                type: Number,
                default: 3
            },
            showCancelButton: {
                type: Boolean,
                default: false
            },
            showConfirmButton: {
                type: Boolean,
                default: true
            },
            cancelButtonText: {
                type: String,
                default: "取消"
            },
            confirmButtonText: {
                type: String,
                default: "确认"
            },
            buttonsPosition: {
                type: String,
                default: 'bottom'
            }
        },
        mounted() {
            var picker = this.$el.firstChild.querySelector('.picker-body')
            this.resolveOptions();
            this.initDragRanges();
            this.initDrag(picker);
            this.initSelect();
        },
        data() {
            return {
                dragObj: {
                    startTime: '',
                    startX: 0,
                    startY: 0,
                    startTranslateY: 0
                },
                dragRanges: [0, 0],
                dragging: false,
                currentValue: this.value,
                currentShow: this.show,
                selectedValue: '',
                resolvedOptions: [{}]
            }
        },

        methods: {
            resolveOptions() {
                var options = this.options || [];
                var resolvedOptions = [];
                var self = this;
                //将option转换为name:value键值对
                options.forEach(function (option) {
                    var optionKvps = option.options || [];
                    var value = optionKvps[0];
                    var valueType = typeof value;
                    var resolvedOption = {
                        options: []
                    };

                    if (valueType !== "object") {
                        //非对象类型的数组
                        optionKvps.forEach(function (val) {
                            var kvpObject = self.constructOptions(val, val);
                            kvpObject._orignal = val;
                            resolvedOption.options.push(kvpObject);
                        })
                    } else {
                        //对象类型数组
                        var valueKey = option.valueKey || "value";
                        var textKey = option.textKey || "name";
                        optionKvps.forEach(function (valObject) {
                            var kvpObject = self.constructOptions(valObject[textKey], valObject[
                                valueKey]);
                            kvpObject._orignal = valObject;
                            resolvedOption.options.push(kvpObject);
                        })
                    }
                    resolvedOptions.push(resolvedOption);
                });
                this.resolvedOptions = resolvedOptions;
            },
            constructOptions(name, value) {
                return {
                    name: name,
                    value: value
                };
            },
            getValueByIndex(optionIndex, index) {
                var option = this.resolvedOptions[optionIndex];
                return option.options[index].value;
            },
            getSelectedOption(optionIndex, val) {
                var option = this.resolvedOptions[optionIndex].options;
                var curSelected = {};
                option.forEach(function (optionItem) {
                    if (optionItem.value == val) {
                        curSelected = optionItem;
                    }
                });
                return curSelected._orignal;
            },
            //初始化上下滚动界限
            initDragRanges() {
                var options = this.resolvedOptions[0].options || [];
                var totalCount = options.length;
                //向上最多滚动= -(总个数- (显示个数/2)向上取整)*高度
                this.dragRanges[0] = -OPTION_HEIGHT * (totalCount - Math.ceil(this.visibleCount / 2));
                //向下最多滚动距离= (显示个数/2)向下取整*高度;
                this.dragRanges[1] = OPTION_HEIGHT * Math.floor(this.visibleCount / 2)
            },
            //初始化
            initDrag(picker) {
                var self = this;
                var drag = this.dragObj;
                var thisMovingY, lastMovedY;
                //拖拽开始
                picker.addEventListener("touchstart", function ($event) {
                    self.dragging = true;
                    $event.preventDefault();
                    var touch = $event.changedTouches[0] || $event.touches[0];
                    drag.startTime = new Date();
                    drag.startX = touch.pageX;
                    drag.startY = touch.pageY;
                    drag.startTranslateY = self.getElementTranslateInfo(picker).y;
                });

                //拖拽过程中
                picker.addEventListener("touchmove", function ($event) {
                    var touch = $event.changedTouches[0] || $event.touches[0];
                    drag.curX = touch.pageX;
                    drag.curY = touch.pageY;
                    //拖拽的总移动距离
                    var deltaY = Math.floor(drag.curY - drag.startY);
                    //拖拽的最终translateY
                    var translateY = drag.startTranslateY + deltaY;
                    self.setElementTranslateInfo(picker, null, translateY);
                    //本次移动了距离
                    thisMovingY = translateY - lastMovedY || translateY;
                    //上一次的位置
                    lastMovedY = translateY;

                });

                picker.addEventListener("touchend", function ($event) {
                    self.dragging = false;
                    //处理惯性滑动
                    //本次滑动总耗时
                    var duration = new Date() - drag.startTime;
                    //快速滑动最后距离,放大比率
                    var inertialMoveY, inertialMoveRadio = 7;
                    //松开手指后的Y位置
                    var thisMoveLastY = self.getElementTranslateInfo(picker).y;
                    if (duration < 300) {
                        //从滑动结束的位置开始做惯性滑动,惯性距离= <300ms的滑动的滑动距离*7;
                        inertialMoveY = thisMoveLastY + thisMovingY * inertialMoveRadio;
                    }
                    self.$nextTick(function () {
                        var avaliableY = inertialMoveY || thisMoveLastY;
                        //保证滑动到刚好的位置
                        var finalY = Math.round(avaliableY / 33) * 33;
                        //保证不超过上下界限
                        finalY = Math.max(Math.min(finalY, self.dragRanges[1]), self.dragRanges[0]);
                        self.setElementTranslateInfo(picker, null, finalY);
                        //通过translate 来提取当前选中的值
                        self.selectedValue = self.getValueByTranslate(finalY);
                    });
                })
            },
            initSelect() {

            },
            getValueByTranslate(translate) {
                translate = Math.round(translate / OPTION_HEIGHT) * OPTION_HEIGHT;
                var index = -(translate - Math.floor(this.visibleCount / 2) * OPTION_HEIGHT) / OPTION_HEIGHT;
                var val = this.getValueByIndex(0, index);
                return val;
            },
            getTranslateByValue(value) {
                var offset = Math.floor(this.visibleCount / 2);
                return (0 - offset) * -OPTION_HEIGHT;
            },
            //获取Translate
            getElementTranslateInfo(element) {
                var result = {
                    x: 0,
                    y: 0
                };
                if (element === null || element.style === null) return result;
                var transform = element.style["transform"];
                var matches = /translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g.exec(
                    transform);
                if (matches) {
                    result.x = +matches[1];
                    result.y = +matches[3];
                }
                return result;
            },
            //设置Translate
            setElementTranslateInfo(element, x, y) {
                if (element === null || element === undefined || element.style === null) return;
                //超过一个单位就卡主
                if ((y >= (this.dragRanges[1] + OPTION_HEIGHT)) || (y <= (this.dragRanges[0] - OPTION_HEIGHT))) {
                    return;
                }
                if (!element.style["transform"] && x === 0 && y === 0) return;

                var lastTranslate = this.getElementTranslateInfo(element);
                if (x === null) {
                    x = lastTranslate.x;
                }
                if (y === null) {
                    y = lastTranslate.y;
                }
                var lastX = x ? (x + 'px') : '0px';
                var lastY = y ? (y + 'px') : '0px';
                this.clearElementTranslateInfo(element);

                element.style["transform"] += ' translate(' + lastX + ',' + lastY + ') translateZ(0px)';

            },
            //清除Translate
            clearElementTranslateInfo(element) {
                if (element === null || element.style === null) return;
                var transformValue = element.style["transform"];
                if (transformValue) {
                    transformValue = transformValue.replace(
                        /translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g, '');
                    element.style["transform"] = transformValue;
                }
            },
            confirmSelectValue() {
                var optionIndex = 0;
                var selected = this.getSelectedOption(optionIndex, this.selectedValue);
                this.$emit("select", optionIndex, this.selectedValue, selected);
                this.$emit("input", this.selectedValue);
                this.currentShow = false;
            }
        },
        watch: {
            show(val) {
                this.currentShow = val;
            },
            currentShow(val) {
                if (val == false)
                    this.$emit("hide", false);
            },
            value(val) {
                this.currentValue = val;
            },
            currentValue(val) {
                this.$emit("input", val);
            }
        },
        computed: {
            contentHeight() {
                return OPTION_HEIGHT * this.visibleCount;
            }
        }
    };
</script>
<style lang="scss">
    .picker-wrapper {
      border: 1px solid #d3d3d3;
      position: relative;
      overflow: hidden;
      user-select: none;
    }

    .picker-selector-hightlight {
      height: 33px;
      box-sizing: border-box;
      position: absolute;
      width: 100%;
      left: 0;
      top: 50%;
      margin-top: -16.5px;
      z-index: 1;
    }

    .picker-selector-hightlight:before {
      left: 0;
      top: 0;
      bottom: auto;
      right: auto;
      content: "";
      position: absolute;
      height: 1px;
      width: 100%;
      background-color: #eaeaea;
      display: block;
      z-index: 15;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }

    .picker-selector-hightlight:after {
      left: 0;
      bottom: 0;
      top: auto;
      right: auto;
      content: "";
      position: absolute;
      height: 1px;
      width: 100%;
      background-color: #eaeaea;
      display: block;
      z-index: 15;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }

    .picker-body {
      display: block;
      height: 99px;
      text-align: center;
      transform: translate(0px, 33px) translateZ(0px);
      transition-duration: 0.3s;
      transition-timing-function: ease-out;
      user-select: none;
      position: relative;
      z-index: 2;
    }

    .picker-body.dragging {
      transition-duration: 0s;
    }

    .picker-item {
      box-sizing: border-box;
      height: 33px;
      line-height: 33px;
      padding-left: 10px;
      padding-right: 10px;
      position: relative;
      left: 0px;
      top: 0px;
      text-align: center;
    }

    .picker-buttons-bottom {
      display: flex;
    }
</style>
