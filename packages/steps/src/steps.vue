<style lang="scss">
    @import "../../../src/style/variable";

    .#{$prefixCls}-steps {
        position: relative;
        margin: 0 auto;
        background: #fff;
        height: 72px;
        box-sizing: border-box;
        padding-top: 10px;

        &__box {
            display: flex;
            width: 100%;
            position: absolute;
            z-index: 1;
        }

        &__item {
            justify-content: center;
            align-items: center;
            flex: 1;
            display: flex;
            flex-direction: column;
            color: #a3acb3;
        }

        &__icon {
            width: 30px;
            height: 30px;
            display: flex;
            border-radius: 50%;
            text-align: center;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            background: #f7f7f7;
            color: #c0c0c0;
        }

        &__label {
            line-height: 32px;
            font-size: 14px;
            color: #999;
        }

        &.is-current {
            &__icon {
                background-color: #00bfe0;
                color: #fff;
                border: 0;
                line-height: 30px;
            }

            &__label {
                color: #00bfe0;
            }
        }

        &.is-disable {
            opacity: 0.5;
        }

        &__line-box {
            position: absolute;
            top: 25px;
            height: 2px;
            font-size: 0;
            line-height: 0;
            width: 100%;
        }

        &__line {
            border-bottom: 2px solid #d9d9d9;
            position: absolute;
            &.is-current {
                border-color: #00bfe0;
            }

            &.is-disable {
                opacity: 0.5;
            }
        }
    }
</style>

<template>
    <div :class="`${prefixCls}-steps`" :style="{width: width + 'px'}">
        <div :class="`${prefixCls}-steps__box`">
            <div v-for="(step,$i) in steps" :key="`step_${$i}`" :class="[`${prefixCls}-steps__item`,{'is-current': step.current, 'is-disable': step.disable}]">
                <span :class="`${prefixCls}-steps__icon`">
                    <Icon :width="16" :height="16" :color="step.current ? '#fff' : '#c0c0c0'" :name="step.iconName" />
                </span>
                <span :class="`${prefixCls}-steps__label`">{{step.text}}</span>
            </div>
        </div>

        <div :class="`${prefixCls}-steps__line-box`">
            <span v-for="$i in steps.length" :key="`step_line_${$i}`" :class="[`${prefixCls}-steps__line`,{'is-current': steps[$i].current, 'is-disable': steps[$i].disable}]" :style="lineStyle($i)"></span>
        </div>

    </div>
</template>


<script>
    import Icon from '../../icon'
    import { initName, baseMixins } from '../../util'
    export default {
        name: initName('steps'),
        mixins: [baseMixins],
        props: {
            steps: Array,
            width: Number
        },
        components: {
            Icon
        },

        methods: {
            lineStyle($i) {
                var w = this.width / this.steps.length;
                return {
                    width: w - 20 + 'px',
                    left: w * ($i - 1 + 0.5) + 10 + 'px'
                }
            }
        }
    }
</script>
