export function hexToRgb(hex) {
    if (/^#[a-f\d]{3}$/.test(hex)) {
        hex = hex.split('').map(function (k) {
            if (k == '#') {
                return k
            }
            return k + '' + k;
        }).join('');
    }
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}