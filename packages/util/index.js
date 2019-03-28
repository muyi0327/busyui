import * as WColor from './src/color.js';
import * as WString from './src/string';
import * as WNumber from './src/number';
import './src/polyfill.js';


setTimeout(() => {
    var dpr = window.devicePixelRatio;
    document.documentElement.dataset && (document.documentElement.dataset.dpr = dpr);
}, 0);

export {
    WColor,
    WString,
    WNumber
}
