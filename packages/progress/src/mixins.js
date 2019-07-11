import { baseMixins } from '../../util'

export default {
    mixins: [baseMixins],
    props: {
        trackWidth: {
            type: Number,
            default: 1
        },

        trackColor: {
            type: [String, Array],
            default: ''
        },
        lineColor: {
            type: [String, Array],
            default: ''
        },
        value: {
            default: 0,
            validator(val) {
                return typeof val === 'number' && val >= 0 && val <= 100;
            }
        }
    },
    methods: {
        handleClick($evt) {
            this.$emit('click', $evt);
        }
    }
}
