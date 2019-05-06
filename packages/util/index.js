import * as BColor from './src/color.js';
import * as BString from './src/string';
import * as BNumber from './src/number';
import * as BRegexp from './src/reg';

setTimeout(() => {
    var dpr = window.devicePixelRatio;
    document.documentElement.dataset && (document.documentElement.dataset.dpr = dpr);
}, 0);

export {
    BColor,
    BString,
    BNumber,
    BRegexp
}
