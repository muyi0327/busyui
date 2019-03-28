<style lang="scss">
    @import '../../../../src/style/variable.scss';
    @-webkit-keyframes ball-scale-multiple {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
        }
        5% {
            opacity: 1;
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes ball-scale-multiple {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
            opacity: 0;
        }
        5% {
            opacity: 1;
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 0;
        }
    }
    
    .wui-ball-scale-multiple {
        position: relative;
        display: inline-block;
    }
    
    .wui-ball-scale-multiple>div:nth-child(2) {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
    }
    
    .wui-ball-scale-multiple>div:nth-child(3) {
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
    }
    
    .wui-ball-scale-multiple>div {
        background-color: $color-blue;
        border-radius: 100%;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;
        left: 0px;
        top: 0px;
        opacity: 0;
        margin: 0;
        height:100%;
        width: 100%;
        -webkit-animation: ball-scale-multiple 1s 0s linear infinite;
        animation: ball-scale-multiple 1s 0s linear infinite;
    }
</style>

<template>
    <div v-if="visiable" class="wui-ball-scale-multiple" :style="{width: this.width + 'px', height: this.height + 'px'}">
        <div :style="stylesObj"></div>
        <div :style="stylesObj"></div>
        <div :style="stylesObj"></div>
    </div>
</template>

<script>
    export default {
        name: 'w-ball-scale-multiple',
        props: {
            color: {
                type: String,
                default: ''
            },
            width: {
                type: Number,
                default: 24
            },
            height: {
                type: Number,
                default: 24
            }
        },
        data() {
            return {
                visiable: true
            }
        },
        computed: {
            stylesObj: function () {
                return this.color ? {
                    'background-color': this.color,
                } : null;
            }
        },
        methods: {
            show() {
                this.visiable = true;
                this.$emit('show');
                return this;
            },
            hide() {
                this.visiable = false;
                this.$emit('hide');
                return this;
            }
        },
        mounted() {
            this.$parent && this.$parent.$on('visiable-change', function (vis) {
                this[vis ? 'show' : 'hide']();
            }.bind(this));
        }
    }
</script>
