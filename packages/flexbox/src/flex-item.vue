
<template>
    <div class="bee-flex__item" :style="styles" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'bee-flexitem',
        props: {
            basis: [String, Number],
            shrink: [String, Number],
            grow: [String, Number],
            flex: [String, Number],
            alginSelf: String,
            order: Number
        },
        computed: {
            styles() {
                return {

                    flex: this.flex,
                    order: this.order,
                    alginSelf: this.alginSelf
                }
            }
        },
        methods: {
            handleClick(e) {
                this.$emit('click', e)
            }
        }
    }
</script>
