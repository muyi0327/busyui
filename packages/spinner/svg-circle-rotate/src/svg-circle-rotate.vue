<style lang="scss">
    .bee-svg-circle {
        width: 50px;
        height: 50px;
        position: relative;
        margin: 0 auto;
    }

    .bee-svg-circle-circular {
        -webkit-animation: spinner-rotate 2s linear infinite;
        animation: spinner-rotate 2s linear infinite;
        height: 100%;
        -webkit-transform-origin: center center;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .bee-svg-circle-path {
        stroke-dasharray: 5, 200;
        stroke-dashoffset: 0;
        -webkit-animation: spinner-rotate-dash 1.5s ease-in-out infinite;
        animation: spinner-rotate-dash 1.5s ease-in-out infinite;
        stroke-linecap: round;
    }

    @-webkit-keyframes spinner-rotate {
        to {
            -webkit-transform: rotate(1turn);
            transform: rotate(1turn);
        }
    }

    @keyframes spinner-rotate {
        to {
            -webkit-transform: rotate(1turn);
            transform: rotate(1turn);
        }
    }

    @-webkit-keyframes spinner-rotate-dash {
        0% {
            stroke-dasharray: 5, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35;
        }
        to {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124;
        }
    }

    @keyframes spinner-rotate-dash {
        0% {
            stroke-dasharray: 5, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35;
        }
        to {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124;
        }
    }
</style>
<template>
    <div class="bee-svg-circle">
        <svg class="bee-svg-circle-circular" :viewBox="viewbox">
            <circle class="bee-svg-circle-path" :cx="this.size*0.5" :cy="this.size*0.5" :r="radius" fill="none" :stroke="color" :stroke-width="strokeWidth" stroke-miterlimit="10">
            </circle>
        </svg>
    </div>
</template>

<script>
    export default {
        name: 'bee-svg-circle-rotate',
        props: {
            size: {
                type: Number,
                default: 30
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            strokeWidth: {
                type: Number,
                default: 5
            }
        },
        computed: {
            radius() {
                return this.size * 0.5 - this.strokeWidth;
            },
            viewbox() {
                return '0 0 ' + this.size + ' ' + this.size;
            },
            styles() {
                return {
                    width: this.size + 'px',
                    height: this.size + ''
                }
            }
        }
    }
</script>
