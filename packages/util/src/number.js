import * as REG from './reg.js'

export function limit(n, min, max) {
    return Math.min(max, Math.max(min, n));
}

export function format(n, b, s, rv) {
    if (!n) {
        return '';
    }
    n = String(n).replace(new RegExp('\\' + s, 'g'), '');

    if (rv) {
        n = n.split('').reverse().join('')
    }

    n = n.match(new RegExp('([A-Za-z0-9]{1,' + b + '})+?', 'g')).join(s);

    if (rv) {
        n = n.split('').reverse().join('');
    }

    return n;
}

export function formatBlocks(n, blocks, dms) {
    n = String(n).replace(new RegExp('\\' + dms, 'g'), '');
    var r = n,
        rst = '';
    blocks.forEach((k, i) => {
        var w = r.substr(0, k);
        r = r.substring(k);
        rst += i > 0 && w ? dms + w : w;
    });

    return rst;
}

/**
 * @desc 千分位格式化
 * @param {Number} n 
 */
export function enFormatNumberic(n) {
    if (!n) {
        return '';
    }

    return String(n).trim().replace(/[^-\d.]/g, '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
}

/**
 * @desc 千分位化
 * @param {String} n 
 */
export function deFormatNumberic(n) {
    if (!n) {
        return '';
    }
    return String(n).trim().replace(/,/g, '')
}

export function enFormatBankCard(n) {
    n = String(n).replace(/\D/g, '');
    return format(n, 4, ' ');
}

export function deFormatBankCard(n) {
    return n.replace(/\s/g, '').replace(/\D/g, '');
}

export function getDPRUnit(n) {
    n = String(n).trim()
    n = n.split(/\s/)
    let dpr = window.devicePixelRatio;
    let reg = /^(\d+)([a-z]+)$/
    n = n.map(item => {
        let regMatch = String(item).match(reg)

        if (regMatch) {
            return `${Number(dpr) * regMatch[1]}${regMatch[2]}`
        } else if (REG.pureNumber.test(item)) {
            return `${Number(dpr) * item}px`
        }

        return item
    })

    return n.join(' ');
}

/**
 * @desc 计算单位
 * @param {*} u - 传入单位
 */
export function cmpUnit(u) {
    if (!u && u !== '0' && u !== '0') return u;
    u = String(u).split(/\s+/)
    u = u.map(item => REG.pureNumber.test(String(item)) ? item + 'px' : item)
    return u.join(' ')
}

/**
 * 
 * @param {*} u 
 */
export function splitUnit(u) {
    let arr = REG.cssUnit.exec(String(u))
    return arr ? arr.slice(1, 3) : arr
}

/**
 * @desc 验证可用css单位
 * @param {*} u 
 */
export function validateUnit(u) {
    u = String(u)
    return REG.cssUnit.test(u) || /^auto|inherit$/.test(u)
}


export function gid(tail) {
    return Math.floor(Math.random() * 100000).toString(36) + Date.now().toString(36).substr(0, 5)
}
