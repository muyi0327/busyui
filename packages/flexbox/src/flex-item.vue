
<template>
    <div class="wui-flex-item">
        <slot></slot>
    </div>
</template>


<script>
    export default {
        name: 'w-flex-item',
        props: {
            height: {
                type: [String, Number],
                default: 'auto'
            },
            width: {
                type: [String, Number],
                default: 'auto'
            }
        },
        computed:{
            styles(){
                return {}
            }
        }
    }
</script>
