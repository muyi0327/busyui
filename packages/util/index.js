import * as BColor from './src/color.js';
import * as BString from './src/string';
import * as BNumber from './src/number';
import * as BRegexp from './src/reg';
import { prefix, prefixCls } from '../../src/config'
import * as Mixins from './src/mixins'

setTimeout(() => {
    var dpr = window.devicePixelRatio;
    document.documentElement.dataset && (document.documentElement.dataset.dpr = dpr);
}, 0);

const initName = (name) => `${prefix}-${name}`
let baseMixins = Mixins.base({
    prefix,
    prefixCls
})

export {
    BColor,
    BString,
    BNumber,
    BRegexp,
    initName,
    baseMixins
}
