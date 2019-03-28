<template>
  <transition :name="currentTransition">
    <div v-show="currentValue" class="wui-popup" :class="[position ? 'wui-popup-' + position : '']">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
    /**
     * wui-popup
     * @desc 弹出层 <a href="../example/all/popup.html"></a>
     * @module Popup
     * @see {@link ../example/all/popup.html 实例}
     * @param {bool} modal=true - 显示模态背景
     * @param {bool} closeOnClickModal - 点击模态背景时是否关闭popup
     * @param {string} popupTransition - 效果,目前只有popup-slide,为默认
     * @param {string} position - popup位置,目前只有bottom
     *
     * @example
     *  <w-popup v-model="popupShow" position="bottom"></w-popup>
     *  <w-popup v-model="popup2Show" position="bottom" :modal="false"></w-popup>
     *  <w-popup v-model="popup3Show" :closeOnClickModal="false"></w-popup>
     */
    import Popup from '../popup.mixin';

    export default {
        name: 'w-popup',

        mixins: [Popup],

        props: {
            modal: {
                default: true
            },

            modalFade: {
                default: false
            },

            lockScroll: {
                default: false
            },

            closeOnClickModal: {
                default: true
            },

            popupTransition: {
                type: String,
                default: 'popup-slide'
            },

            position: {
                type: String,
                default: 'bottom'
            }
        },

        data() {
            return {
                currentValue: false,
                currentTransition: this.popupTransition
            };
        },

        watch: {
            currentValue(val) {
                this.$emit('input', val);
            },

            value(val) {
                this.currentValue = val;
            }
        },

        beforeMount() {
            if (this.popupTransition !== 'popup-fade') {
                this.currentTransition = `popup-slide-${ this.position }`;
            }
        },

        mounted() {
            if (this.value) {
                this.rendered = true;
                this.currentValue = true;
                this.open();
            }
        }
    };
</script>


<style lang="scss">
    .wui-popup {
        backface-visibility: hidden;
        background: #fff;
        left: 50%;
        margin: 0px;
        padding: 0px;
        position: fixed;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        transition: .2s ease-out;
        width: 100%;
        &:before {
            left: 0;
            top: 0;
            bottom: auto;
            right: auto;
            content: '';
            position: absolute;
            height: 1px;
            width: 100%;
            background-color: #eaeaea;
            display: block;
            z-index: 15;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
        }
    }
    
    .wui-popup-bottom {
        top: auto;
        right: auto;
        bottom: 0;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
    }
    
    .popup-slide-top-enter,
    .popup-slide-top-leave-active {
        transform: translate3d(-50%, -100%, 0);
    }
    
    .popup-slide-right-enter,
    .popup-slide-right-leave-active {
        transform: translate3d(100%, -50%, 0);
    }
    
    .popup-slide-bottom-enter,
    .popup-slide-bottom-leave-active {
        transform: translate3d(-50%, 100%, 0);
    }
    
    .popup-slide-left-enter,
    .popup-slide-left-leave-active {
        transform: translate3d(-100%, -50%, 0);
    }
    
    .popup-fade-enter,
    .popup-fade-leave-active {
        opacity: 0;
    }
    
    .v-modal-enter {
        animation: v-modal-in .2s ease;
    }
    
    .v-modal-leave {
        animation: v-modal-out .2s ease forwards;
    }
    
    @keyframes v-modal-in {
        0% {
            opacity: 0;
        }
        100% {}
    }
    
    @keyframes v-modal-out {
        0% {}
        100% {
            opacity: 0;
        }
    }
    
    .v-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        background: #000;
        padding: 0;
        margin: 0;
    }
</style>
