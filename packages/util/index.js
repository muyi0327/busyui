import * as BColor from './src/color.js';
import * as BString from './src/string';
import * as BNumber from './src/number';


setTimeout(() => {
    var dpr = window.devicePixelRatio;
    document.documentElement.dataset && (document.documentElement.dataset.dpr = dpr);
}, 0);

export {
    BColor,
    BString,
    BNumber
}
