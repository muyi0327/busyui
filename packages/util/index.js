import * as MColor from './src/color.js';
import * as MString from './src/string';
import * as MNumber from './src/number';
import * as MRegexp from './src/reg';

setTimeout(() => {
    var dpr = window.devicePixelRatio;
    document.documentElement.dataset && (document.documentElement.dataset.dpr = dpr);
}, 0);

export {
    MColor,
    MString,
    MNumber,
    MRegexp
}
