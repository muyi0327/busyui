'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));

var pureNumber = /^\d+$/; // 纯数字

var cssUnit = /^(\d+)(px|pt|vw|vh|vm|rem|em|%)?/;

function limit(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
function format(n, b, s, rv) {
  if (!n) {
    return '';
  }

  n = String(n).replace(new RegExp('\\' + s, 'g'), '');

  if (rv) {
    n = n.split('').reverse().join('');
  }

  n = n.match(new RegExp('([A-Za-z0-9]{1,' + b + '})+?', 'g')).join(s);

  if (rv) {
    n = n.split('').reverse().join('');
  }

  return n;
}
function formatBlocks(n, blocks, dms) {
  n = String(n).replace(new RegExp('\\' + dms, 'g'), '');
  var r = n,
      rst = '';
  blocks.forEach(function (k, i) {
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

function enFormatNumberic(n) {
  if (!n) {
    return '';
  }

  n = String(n).replace(/[^-\d.]/g, '');
  var i = n.indexOf('.'),
      t = '';

  if (i >= 0) {
    t = n.slice(i);
    n = n.slice(0, i);
  }

  return format(n, 3, ',', true) + (i >= 0 ? t.slice(0, 3) : '');
}
/**
 * @desc 千分位化
 * @param {String} n 
 */

function deFormatNumberic(n) {
  if (!n) {
    return '';
  }

  n = String(n);
  var i = n.indexOf('.'),
      t = '';

  if (i >= 0) {
    t = n.slice(i);
    n = n.slice(0, i);
  }

  return String(n).replace(/,/g, '') + (i >= 0 ? t.slice(0, 3) : '');
}
function enFormatBankCard(n) {
  n = String(n).replace(/\D/g, '');
  return format(n, 4, ' ');
}
function deFormatBankCard(n) {
  return n.replace(/\s/g, '').replace(/\D/g, '');
}
function getDPRUnit(n) {
  var dpr = window.devicePixelRatio;
  var regMatch = String(n).match(/^(\d+)([a-z]+)$/);

  if (regMatch) {
    n = "".concat(Number(dpr) * regMatch[1]).concat(regMatch[2]);
  } else if (/^\d+$/.test(n)) {
    n = "".concat(Number(dpr) * n, "px");
  }

  return n;
}
/**
 * @desc 计算单位
 * @param {*} u - 传入单位
 */

function cmpUnit(u) {
  return pureNumber.test(String(u)) ? u + 'px' : u;
}
/**
 * @desc 验证可用css单位
 * @param {*} u 
 */

function validateUnit(u) {
  u = String(u);
  return cssUnit.test(u) || /^auto|inherit$/.test(u);
}

/**
 * 1像素边框
 * @module Border1px
 * @see {@link ../example/all/border1px.html 实例}
 * @desc 1像素边框样式
 * @param {String} side = '', 设置哪个边框, t=上,b=下,r=右,l=左, lr=左右,tb=上下,no-r=无右,no-l=无左,no-t=无上,no-b=无下
 * 
 * @example
 * 
 *  <div class="wui-border-1px">四边框</div>
 *
 *  <div class="wui-border-1px wui-border-t">上边框</div>
 *
 *  <div class="wui-border-1px wui-border-b">下边框</div>
 *
 *  <div class="wui-border-1px wui-border-tb">上下边框</div>
 *
 *  <div class="wui-border-1px wui-border-l">左边框</div>
 *
 *  <div class="wui-border-1px wui-border-r">右边框</div>
 *
 *  <div class="wui-border-1px wui-border-lr">左右边框</div>
 *
 * <div class="wui-border-1px wui-border-no-r">无右边框</div>
 *
 * <div class="wui-border-1px wui-border-no-l">无左边框</div>
 *
 * <div class="wui-border-1px wui-border-no-t">无上边框</div>
 *
 * <div class="wui-border-1px wui-border-no-b">无下边框</div>
 *
 * // 取值1~10px
 * <div class="wui-border-1px wui-border-radius-4px">圆角</div>
 *
 * // 百分比圆角
 * <div class="wui-border-1px" style="border-radius: 50%;">圆角</div>
 * 
 */

var Border = {
  prepare: function prepare() {
    var dpr = window.devicePixelRatio;
    var styleTag = document.getElementById('wui-border-1px-style-sheet');
    var sheet = styleTag ? styleTag.sheet || styleTag.styleSheet : null;
    this.sheet = sheet;
    this.dpr = dpr;
    if (sheet) return;
    var style = document.createElement("style");
    style.id = 'wui-border-1px-style-sheet';
    style.type = 'text/css';
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    sheet = style.sheet;
    this.sheet = sheet;

    if (sheet.insertRule) {
      sheet.insertRule('.wui-border-1px::after{ ' + 'width: ' + Number(dpr) * 100 + '%;' + 'height:' + Number(dpr) * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');' + '}', 0);
    } else if (sheet.addRule) {
      sheet.addRule('.wui-border-1px::after', 'width: ' + Number(dpr) * 100 + '%;' + 'height:' + Number(dpr) * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');');
    }
  },
  addStyleRule: function addStyleRule(name, content) {
    var sheet = this.sheet; // diss insert repeat. is need?

    if (this.hasRule(name)) return;

    if (sheet.insertRule) {
      sheet.insertRule(".".concat(name, "::after { ").concat(content, " }"), 0);
    } else if (sheet.addRule) {
      sheet.addRule(".".concat(name, "::after"), content);
    }
  },
  hasRule: function hasRule(name) {
    var rules = this.sheet.cssRules || this.sheet.rules;
    return [].slice.call(rules).some(function (rule) {
      return rule.selectorText === ".".concat(name, "::after");
    });
  },
  install: function install(vue) {
    var _this = this;

    this.prepare();
    vue.directive('wui-border-1px', {
      bind: function bind(el, binding) {
        var datas = binding.value;
        var radius = datas.radius,
            side = datas.side,
            color = datas.color;
        var classes = ["wui-border-1px"];

        if (side) {
          classes.push("wui-border-1px-".concat(side));
        }

        if (radius) {
          var name = "wui-border-1px-r-".concat(String(radius).replace('%', 'percent'));
          classes.push(name);

          _this.addStyleRule(name, "\n                        border-radius:".concat(getDPRUnit(radius), ";\n                    "));
        }

        if (color) {
          var _name = "wui-border-1px-c-".concat(color.replace('#', ''));

          classes.push(_name);

          _this.addStyleRule(_name, "border-color:".concat(color));
        }

        classes.forEach(function (c) {
          return el.classList.add(c);
        });
      }
    });
  }
};

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

((function (window) {
  var svgSprite = '<svg>' + '' + '<symbol id="icon-close" viewBox="0 0 1024 1024">' + '' + '<path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-roundcheckfill" viewBox="0 0 1024 1024">' + '' + '<path d="M512 65.984C266.08 65.984 65.984 266.08 65.984 512c0 245.952 200.064 446.016 446.016 446.016 245.952 0 446.016-200.064 446.016-446.016C958.016 266.08 757.952 65.984 512 65.984zM727.232 438.432l-256.224 259.008c-0.064 0.064-0.192 0.096-0.256 0.192-0.096 0.064-0.096 0.192-0.192 0.256-2.048 1.984-4.576 3.2-6.944 4.544-1.184 0.672-2.144 1.696-3.392 2.176-3.84 1.536-7.904 2.336-11.968 2.336-4.096 0-8.224-0.8-12.096-2.4-1.28-0.544-2.304-1.632-3.52-2.304-2.368-1.344-4.832-2.528-6.88-4.544-0.064-0.064-0.096-0.192-0.16-0.256-0.064-0.096-0.192-0.096-0.256-0.192l-126.016-129.504c-12.32-12.672-12.032-32.928 0.64-45.248 12.672-12.288 32.896-12.064 45.248 0.64l103.264 106.112 233.28-235.84c12.416-12.576 32.704-12.704 45.248-0.256C739.52 405.6 739.648 425.856 727.232 438.432z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-roundcheck" viewBox="0 0 1024 1024">' + '' + '<path d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448S759.04 960 512 960zM512 128.288C300.416 128.288 128.288 300.416 128.288 512c0 211.552 172.128 383.712 383.712 383.712 211.552 0 383.712-172.16 383.712-383.712C895.712 300.416 723.552 128.288 512 128.288z"  ></path>' + '' + '<path d="M726.976 393.184c-12.544-12.448-32.832-12.32-45.248 0.256l-233.28 235.84-103.264-106.112c-12.352-12.704-32.608-12.928-45.248-0.64-12.672 12.32-12.96 32.608-0.64 45.248l126.016 129.504c0.064 0.096 0.192 0.096 0.256 0.192 0.064 0.064 0.096 0.192 0.16 0.256 2.016 1.984 4.512 3.2 6.88 4.544 1.248 0.672 2.24 1.792 3.52 2.304 3.872 1.6 8 2.4 12.096 2.4 4.064 0 8.128-0.8 11.968-2.336 1.248-0.512 2.208-1.536 3.392-2.176 2.4-1.344 4.896-2.528 6.944-4.544 0.064-0.064 0.096-0.192 0.192-0.256 0.064-0.096 0.16-0.128 0.256-0.192l256.224-259.008C739.648 425.856 739.52 405.6 726.976 393.184z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-roundclosefill" viewBox="0 0 1024 1024">' + '' + '<path d="M512 64C264.992 64 64 264.96 64 512s200.96 448 448 448c247.008 0 448-200.96 448-448S759.04 64 512 64zM694.752 649.984c12.48 12.544 12.448 32.768-0.064 45.248-6.24 6.208-14.4 9.344-22.592 9.344-8.224 0-16.416-3.136-22.656-9.408l-137.6-138.016-138.048 136.576c-6.24 6.144-14.368 9.248-22.496 9.248-8.256 0-16.48-3.168-22.752-9.504-12.416-12.576-12.32-32.8 0.256-45.248l137.888-136.384-137.376-137.824c-12.48-12.512-12.448-32.768 0.064-45.248 12.512-12.512 32.736-12.448 45.248 0.064l137.568 137.984 138.048-136.576c12.544-12.448 32.832-12.32 45.248 0.256 12.448 12.576 12.32 32.832-0.256 45.248l-137.888 136.384L694.752 649.984z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-roundclose" viewBox="0 0 1024 1024">' + '' + '<path d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448S759.04 960 512 960zM512 128.288C300.416 128.288 128.288 300.416 128.288 512c0 211.552 172.128 383.712 383.712 383.712 211.552 0 383.712-172.16 383.712-383.712C895.712 300.416 723.552 128.288 512 128.288z"  ></path>' + '' + '<path d="M557.056 513.376l138.368-136.864c12.576-12.416 12.672-32.672 0.256-45.248-12.416-12.576-32.704-12.672-45.248-0.256l-138.56 137.024-136.448-136.864c-12.512-12.512-32.736-12.576-45.248-0.064-12.512 12.48-12.544 32.736-0.064 45.248l136.256 136.672-137.376 135.904c-12.576 12.448-12.672 32.672-0.256 45.248 6.272 6.336 14.496 9.504 22.752 9.504 8.128 0 16.256-3.104 22.496-9.248l137.568-136.064 138.688 139.136c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.056 513.376z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-warnfill" viewBox="0 0 1024 1024">' + '' + '<path d="M942.656 769.376 602.112 159.584c-22.144-39.712-55.104-62.496-90.304-62.496-35.232 0-68.16 22.784-90.368 62.528L81.312 769.344c-22.016 39.456-24.256 79.456-6.112 110.4C93.344 910.624 129.664 928 174.88 928l674.24 0c45.184 0 81.536-17.376 99.648-48.256C966.944 848.8 964.672 808.832 942.656 769.376zM480 320c0-17.664 14.336-32 32-32s32 14.336 32 32l0 288c0 17.696-14.336 32-32 32s-32-14.304-32-32L480 320zM512 832.128c-26.528 0-48-21.504-48-48s21.472-48 48-48 48 21.504 48 48S538.528 832.128 512 832.128z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-warn" viewBox="0 0 1024 1024">' + '' + '<path d="M849.12 928.704 174.88 928.704c-45.216 0-81.536-17.728-99.68-48.64-18.144-30.912-15.936-71.296 6.08-110.752L421.472 159.648c22.144-39.744 55.072-62.528 90.304-62.528s68.128 22.752 90.336 62.464l340.544 609.792c22.016 39.456 24.288 79.808 6.112 110.72C930.656 911.008 894.304 928.704 849.12 928.704zM511.808 161.12c-11.2 0-24.032 11.104-34.432 29.696L137.184 800.544c-10.656 19.136-13.152 36.32-6.784 47.168 6.368 10.816 22.592 17.024 44.48 17.024l674.24 0c21.92 0 38.112-6.176 44.48-17.024 6.336-10.816 3.872-28-6.816-47.136L546.24 190.816C535.872 172.224 522.976 161.12 511.808 161.12z"  ></path>' + '' + '<path d="M512 640c-17.664 0-32-14.304-32-32l0-288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 288C544 625.696 529.664 640 512 640z"  ></path>' + '' + '<path d="M512 752.128m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-back" viewBox="0 0 1024 1024">' + '' + '<path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-right" viewBox="0 0 1024 1024">' + '' + '<path d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84-315.712 304.288c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344C757.76 538.88 759.2 535.392 761.056 532.128z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-questionfill" viewBox="0 0 1024 1024">' + '' + '<path d="M512 64C264.96 64 64 264.96 64 512s200.96 448 448 448 448-200.96 448-448S759.04 64 512 64zM512 832.352c-26.496 0-48-21.504-48-48s21.504-48 48-48 48 21.504 48 48S538.496 832.352 512 832.352zM600.576 505.184C572.736 532.992 544 561.728 544 587.552l0 54.112c0 17.664-14.336 32-32 32s-32-14.336-32-32l0-54.112c0-52.352 40-92.352 75.328-127.648C581.216 434.016 608 407.264 608 385.92c0-53.344-43.072-96.736-96-96.736-53.824 0-96 41.536-96 94.56 0 17.664-14.336 32-32 32s-32-14.336-32-32c0-87.424 71.776-158.56 160-158.56s160 72.096 160 160.736C672 433.792 635.68 470.08 600.576 505.184z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-question" viewBox="0 0 1024 1024">' + '' + '<path d="M512 784.352m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"  ></path>' + '' + '<path d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448S759.04 960 512 960zM512 128.288C300.416 128.288 128.288 300.416 128.288 512c0 211.552 172.128 383.712 383.712 383.712 211.552 0 383.712-172.16 383.712-383.712C895.712 300.416 723.552 128.288 512 128.288z"  ></path>' + '' + '<path d="M512 673.696c-17.664 0-32-14.336-32-32l0-54.112c0-52.352 40-92.352 75.328-127.648C581.216 434.016 608 407.264 608 385.92c0-53.344-43.072-96.736-96-96.736-53.824 0-96 41.536-96 94.56 0 17.664-14.336 32-32 32s-32-14.336-32-32c0-87.424 71.776-158.56 160-158.56s160 72.096 160 160.736c0 47.904-36.32 84.192-71.424 119.296C572.736 532.992 544 561.728 544 587.552l0 54.112C544 659.328 529.664 673.696 512 673.696z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-infofill" viewBox="0 0 1024 1024">' + '' + '<path d="M512 65.984C266.048 65.984 65.984 266.048 65.984 512S266.048 958.016 512 958.016 958.016 757.952 958.016 512 757.952 65.984 512 65.984zM544 736c0 17.696-14.304 32-32 32s-32-14.304-32-32l0-288c0-17.696 14.304-32 32-32s32 14.304 32 32L544 736zM512 352c-26.496 0-48-21.536-48-48C464 277.472 485.504 256 512 256s48 21.472 48 48C560 330.464 538.496 352 512 352z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-info" viewBox="0 0 1024 1024">' + '' + '<path d="M512 958.016C266.08 958.016 65.984 757.952 65.984 512 65.984 266.08 266.08 65.984 512 65.984c245.952 0 446.016 200.064 446.016 446.016C958.016 757.952 757.952 958.016 512 958.016zM512 129.984C301.344 129.984 129.984 301.344 129.984 512c0 210.624 171.36 382.016 382.016 382.016 210.624 0 382.016-171.36 382.016-382.016C894.016 301.344 722.624 129.984 512 129.984z"  ></path>' + '' + '<path d="M512 304m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"  ></path>' + '' + '<path d="M512 768c-17.664 0-32-14.304-32-32l0-288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 288C544 753.696 529.664 768 512 768z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-refresharrow" viewBox="0 0 1024 1024">' + '' + '<path d="M822.624 521.376c-12.512-12.512-32.736-12.512-45.248 0L544 754.752 544 192c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 562.752-233.376-233.376c-12.512-12.512-32.736-12.512-45.248 0s-12.512 32.736 0 45.248l288 287.968c2.944 2.976 6.496 5.312 10.432 6.944C503.68 863.168 507.84 864 512 864s8.32-0.832 12.224-2.464c3.936-1.632 7.456-3.968 10.432-6.944l288-287.968C835.136 554.112 835.136 533.888 822.624 521.376z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-add" viewBox="0 0 1024 1024">' + '' + '<path d="M863.328 482.56l-317.344-1.12L545.984 162.816c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 318.4L159.616 480.064c-0.032 0-0.064 0-0.096 0-17.632 0-31.936 14.24-32 31.904C127.424 529.632 141.728 544 159.392 544.064l322.592 1.152 0 319.168c0 17.696 14.336 32 32 32s32-14.304 32-32l0-318.944 317.088 1.12c0.064 0 0.096 0 0.128 0 17.632 0 31.936-14.24 32-31.904C895.264 496.992 880.96 482.624 863.328 482.56z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-move" viewBox="0 0 1024 1024">' + '' + '<path d="M863.744 544 163.424 544c-17.664 0-32-14.336-32-32s14.336-32 32-32l700.32 0c17.696 0 32 14.336 32 32S881.44 544 863.744 544z"  ></path>' + '' + '</symbol>' + '' + '<symbol id="icon-arrow" viewBox="0 0 1024 1024">' + '' + '<path d="M768.128942 540.373804l-471.882513 471.34871a40.195422 40.195422 0 1 1-57.117001-56.583197L683.254146 512.61601 239.129428 68.491291A40.195422 40.195422 0 1 1 296.246429 11.908094l500.174112 500.707916z"  ></path>' + '' + '</symbol>' + '' + '</svg>';
  /**
   * document ready
   */

  var ready = function ready(fn) {
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", function __dom__ready() {
        document.removeEventListener("DOMContentLoaded", __dom__ready, false);
        fn();
      }, false);
    }
  };
  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */


  var before = function before(el, target) {
    target.parentNode.insertBefore(el, target);
  };
  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */


  var prepend = function prepend(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild);
    } else {
      target.appendChild(el);
    }
  };

  function appendSvg() {
    var div, svg;
    div = document.createElement('div');
    div.innerHTML = svgSprite;
    svg = div.getElementsByTagName('svg')[0];

    if (svg) {
      svg.setAttribute('aria-hidden', 'true');
      svg.style.position = 'absolute';
      svg.style.width = 0;
      svg.style.height = 0;
      svg.style.overflow = 'hidden';
      prepend(svg, document.body);
    }
  }

  if (!window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true;
    ready(appendSvg);
  }

  return {
    svgSprite: svgSprite
  };
})(window));

//
/**
 * cui-icon
 * @module Icon
 * @see {@link ../example/all/icons.html 实例}
 * @desc icon图标组件
 * @param {String} type - icon名称
 * @param {Number} width=18 - 组件宽度
 * @param {Number} height=18 - 组件高度
 * @param {String} fill='#fff' - 组件颜色,css color
 * 
 * @example
 *  <c-icon type="guanbi" fill="#8a8a8a"></c-icon>
 * 
 */

var script = {
  name: 'c-icon',
  props: {
    type: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 18
    },
    height: {
      type: Number,
      default: 18
    },
    fill: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        fill: this.fill
      };
    },
    itype: function itype() {
      return '#icon-' + this.type;
    }
  },
  methods: {
    handleClick: function handleClick($evt) {
      this.$emit('click', $evt);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("svg", {
    staticClass: "cui-icon",
    style: _vm.styles,
    on: {
      click: _vm.handleClick
    }
  }, [_c("use", {
    attrs: {
      "xlink:href": _vm.itype
    }
  })]);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var Icon = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

Icon.install = function (vue) {
  vue.component(Icon.name, Icon);
};

var script$1 = {
  props: {
    type: {
      type: String,
      default: ''
    },
    delay: {
      type: Number,
      default: 2000
    },
    iconHeight: {
      type: Number,
      default: 28
    },
    iconWidth: {
      type: Number,
      default: 28
    },
    color: {
      type: String,
      default: '#fff'
    },
    content: {
      type: [String, Number, Array],
      default: ''
    },
    pos: {
      type: String,
      default: 'top'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isRemove: {
      type: Boolean,
      default: false
    },
    autoHide: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      visiable: this.isShow,
      timmer: null
    };
  },
  components: {
    'w-icon': Icon
  },
  computed: {
    posClass: function posClass() {
      return ["pos-".concat(this.pos)];
    },
    contentString: function contentString() {
      var content = this.content,
          t = _typeof(content);

      if (t == 'number') {
        return String(content);
      } else if (Array.isArray(content)) {
        return content.join();
      } else if (t !== 'string') {
        return content.toString ? content.toString() : String(content);
      }

      return content;
    }
  },
  methods: {
    show: function show() {
      this.visiable = true;
      this.$emit('show');
    },
    hide: function hide() {
      this.visiable = false;
      this.$emit('hide');
    },
    _leave: function _leave() {
      // 动画结束，清除元素
      if (this.isRemove) {
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }

      this.$emit('after-leave', this);
    }
  },
  watch: {
    isShow: function isShow(val) {
      this.visiable = val;
    },
    visiable: function visiable(val) {
      if (!val) {
        clearTimeout(this.timmer);
        this.timmer = null;
      } else if (this.autoHide) {
        !this.timmer && (this.timmer = setTimeout(this.hide, this.delay));
      }

      this.$emit('visiable-change', val);
    }
  },
  mounted: function mounted() {
    if (this.autoHide) {
      this.timmer = setTimeout(this.hide, this.delay);
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("transition", {
    attrs: {
      name: "fade-top"
    },
    on: {
      "after-leave": _vm._leave
    }
  }, [_c("article", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visiable,
      expression: "visiable"
    }],
    staticClass: "wui-toast",
    class: _vm.posClass
  }, [_c("div", {
    staticClass: "wui-toast-wrap"
  }, [_vm.type ? _c("p", {
    staticClass: "icon-wrap"
  }, [_c("w-icon", {
    attrs: {
      type: _vm.type,
      width: _vm.iconWidth,
      height: _vm.iconHeight,
      fill: _vm.color
    }
  })], 1) : _vm._e(), _vm._v(" "), _c("p", {
    staticClass: "wui-toast-text"
  }, [_vm._t("default", [_vm._v("\n                    " + _vm._s(_vm.contentString) + "\n                ")])], 2)])])]);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

var Toast = normalizeComponent_1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, undefined, undefined);

if (typeof Object.assign != 'function') {
  Object.assign = function (target, varArgs) {

    if (target == null) {
      // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) {
        // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }

    return to;
  };
}

var ToastClass = Vue.extend(Toast),
    instance,
    vm;
/**
 * Toast component
 * @module Toast
 * @see {@link ../example/all/toast.html 实例}
 * @desc Toast组件 <w-toast></w-toast>
 * @param {Object} opts - 选项 可选{content:'显示内容', pos: '显示位置', delay: '显示多长时间隐藏', type: 'icon类型'}
 * @param {String} content - 显示内容
 * @param {String} pos='middle' - 显示位置,可以是 'top', 'middle', 'bottom'
 * @param {Number} delay=2000 - 显示时间，单位毫秒
 * @param {String} type - icon类型
 * @param {Boolean} isShow=false - 是否显示
 * @param {Boolean} isRemove=false - 是否隐藏移除dom
 * @param {Boolean} autoHide=true - 是否自动隐藏
 * @param {Number} iconHeight=28 - 设置图标的高度
 * @param {Number} iconWidth=28 - 设置图标的宽度
 * @param {Number} color=#fff - 设置图标的颜色
 * @param {Function} hide - 隐藏
 * @param {Function} show - 显示
 * @param {Event} hide - 隐藏时触发
 * @param {Event} show - 显示时触发
 * @param {Event} visiable-change - 显示,隐藏都会触发
 * @param {Event} after-leave - 隐藏动画结束时触发
 * 
 * @example
 *  // use it in module tools
 *   import Toast from 'wui/packages/toast';
 *   1, Toast.show('内容')
 *   2, Toast.show('内容', 5000)
 *   3, Toast.show('内容', 'top', 5000)
 *   4, Toast.show({content:'内容', pos: 'top', delay: 5000})
 * 
 *   // use it in html
 *   <script src="wui.min.js"><\/script>
 *   <link href="wui.min.css" rel="stylesheet" />
 * 
 *   1, Wui.Toast.show('内容')
 *   2, Wui.Toast.show('内容', 5000)
 *   3, Wui.Toast.show('内容', 'top', 5000)
 *   4, Wui.Toast.show({content:'内容', pos: 'top', delay: 5000})
 * 
 * 
 */

var Toast$1 = Object.assign(Toast, {
  install: function install(vue) {
    vue.component('w-toast', Toast);
  },

  /**
   * @method show
   * @param {Object} opts - 配置项, <a href="#module_Toast">参见</a>
   * @static
   * @returns ToastClass实例
   * 
   * @example
   * Wui.Toast.show({content:'内容', pos: 'top', delay: 5000})
   * 
   */
  show: function show(opts) {
    opts = opts || {};
    var content,
        type,
        delay,
        pos,
        complete,
        len = arguments.length; // case toast('content info')

    if (typeof opts == 'string' || typeof opts == 'number' || Array.isArray(opts)) {
      content = opts;
    } // case toast('content info','position info')


    if (typeof arguments[1] == 'string') {
      pos = arguments[1];
    } // case toast('content info','delay time')


    if (typeof arguments[1] == 'number') {
      delay = arguments[1];
    } //  case toast('content info', 'position info', 'delay time')


    if (typeof arguments[2] == 'number') {
      delay = arguments[2];
    } //  case toast('content info', 'position info', 'type info')


    if (typeof arguments[2] == 'string') {
      type = arguments[2];
    } //  case toast('content info', 'position info', 'delay time', 'type info')


    if (typeof arguments[3] == 'string') {
      type = arguments[3];
    }

    if (typeof arguments[len - 1] == 'function') {
      complete = arguments[len - 1];
    }

    if (instance) {
      this.hide();
    }

    instance = new ToastClass({
      el: document.createElement('div'),
      propsData: Object.assign({}, {
        type: type,
        content: content,
        pos: pos,
        delay: delay,
        isRemove: true,
        autoHide: true
      }, opts)
    });
    Vue.nextTick(function () {
      vm = instance.$mount();
      document.body.appendChild(vm.$el);

      if (complete) {
        instance.$on('hide', complete);
      }

      instance.show();
    });
    return instance;
  },
  hide: function hide() {
    instance && instance.hide();
    instance.$off('hide');
    instance = null;
    vm = null;
  }
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * line-spin-fade
 * @desc 菊花动画组件
 * @param {String} color 组件颜色, 可取值 css color [hex, rgb, rgba] 默认#ffffff
 * @param {Number} width 组件宽度, 默认 40 <px>
 * @param {Number} height 组件高度 默认 40 <px>
 * 
 * @example
 *      <line-spin-fade :color="#ff0000" :width="20" :height="20"></line-spin-fade>
 **/
var script$2 = {
  name: 'w-line-spin-fade',
  props: {
    color: {
      type: String,
      default: '#ffffff'
    },
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    }
  },
  data: function data() {
    return {
      visiable: true
    };
  },
  computed: {
    /**
     * 计算每根item的位置
     * @api private
     */
    positions: function positions() {
      var _this = this;

      return '#,#,#,#,#,#,#,#,#,#,#,#'.split(',').map(function (v, k) {
        var rotate = k * 30;
        return {
          rotate: 'rotate(' + rotate + 'deg)',
          x: _this.width * 5 / 10 + _this.width * 300 * (Math.sin(rotate / 180 * Math.PI).toFixed(2) * 100) / 100000 + 'px',
          y: _this.height * 5 / 10 + _this.height * 300 * (Math.cos(rotate / 180 * Math.PI).toFixed(2) * 100) / 100000 + 'px'
        };
      });
    },

    /**
     * 计算每根item的宽高
     * @api private
     */
    itemSize: function itemSize() {
      return {
        width: this.width * 3 / 9 + 'px',
        height: Math.ceil(this.width / 14) + 'px'
      };
    }
  },
  methods: {
    /**
     * 显示组件
     */
    show: function show() {
      this.visiable = true;
      this.$emit('show');
      return this;
    },

    /**
     *  隐藏组件
     */
    hide: function hide() {
      this.visiable = false;
      this.$emit('hide');
      return this;
    }
  },
  mounted: function mounted() {
    this.$parent && this.$parent.$on('visiable-change', function (vis) {
      this[vis ? 'show' : 'hide']();
    }.bind(this));
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.visiable ? _c("div", {
    staticClass: "wui-line-spin-fade-loader",
    style: {
      width: _vm.width + "px",
      height: _vm.height + "px"
    }
  }, _vm._l(_vm.positions, function (ps, $i) {
    return _c("div", {
      key: "lsf-" + $i,
      style: [_vm.color ? {
        backgroundColor: _vm.color
      } : {}, {
        height: _vm.itemSize.height,
        width: _vm.itemSize.width,
        webkitTransform: ps.rotate,
        top: ps.x,
        left: ps.y
      }]
    });
  }), 0) : _vm._e();
};

var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

var LineSpinFade = normalizeComponent_1({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, undefined, undefined);

LineSpinFade.install = function (vue) {
  return vue.component('w-line-spin-fade', LineSpinFade);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$3 = {
  name: 'w-ball-scale-multiple',
  props: {
    color: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    }
  },
  data: function data() {
    return {
      visiable: true
    };
  },
  computed: {
    stylesObj: function stylesObj() {
      return this.color ? {
        'background-color': this.color
      } : null;
    }
  },
  methods: {
    show: function show() {
      this.visiable = true;
      this.$emit('show');
      return this;
    },
    hide: function hide() {
      this.visiable = false;
      this.$emit('hide');
      return this;
    }
  },
  mounted: function mounted() {
    this.$parent && this.$parent.$on('visiable-change', function (vis) {
      this[vis ? 'show' : 'hide']();
    }.bind(this));
  }
};

/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.visiable ? _c("div", {
    staticClass: "wui-ball-scale-multiple",
    style: {
      width: this.width + "px",
      height: this.height + "px"
    }
  }, [_c("div", {
    style: _vm.stylesObj
  }), _vm._v(" "), _c("div", {
    style: _vm.stylesObj
  }), _vm._v(" "), _c("div", {
    style: _vm.stylesObj
  })]) : _vm._e();
};

var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = undefined;
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

var BallScaleMultiple = normalizeComponent_1({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, undefined, undefined);

BallScaleMultiple.install = function (vue) {
  return vue.component('w-ball-scale-multiple', BallScaleMultiple);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$4 = {
  name: 'w-ball-clip-rotate-pulse',
  props: {
    color: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 30
    },
    height: {
      type: Number,
      default: 16
    }
  },
  data: function data() {
    return {
      visiable: true
    };
  },
  computed: {
    bigStyles: function bigStyles() {
      var s = {
        width: this.width + 'px',
        height: this.width + 'px'
      };

      if (this.color) {
        s.borderColor = this.color + ' transparent ' + this.color + ' transparent';
      }

      return s;
    },
    smallStyles: function smallStyles() {
      var s = {
        width: Math.floor(this.width / 2) + 'px',
        height: Math.floor(this.width / 2) + 'px'
      };

      if (this.color) {
        s['background-color'] = this.color;
      }

      return s;
    }
  },
  methods: {
    show: function show() {
      this.visiable = true;
      this.$emit('show');
      return this;
    },
    hide: function hide() {
      this.visiable = false;
      this.$emit('hide');
      return this;
    }
  },
  mounted: function mounted() {
    this.$parent && this.$parent.$on('visiable-change', function (vis) {
      this[vis ? 'show' : 'hide']();
    }.bind(this));
  }
};

/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.visiable ? _c("div", {
    staticClass: "wui-ball-clip-rotate-pulse",
    style: {
      width: _vm.width + "px",
      height: _vm.width + "px"
    }
  }, [_c("div", {
    style: _vm.smallStyles
  }), _vm._v(" "), _c("div", {
    style: _vm.bigStyles
  })]) : _vm._e();
};

var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

var BallClipRotatePulse = normalizeComponent_1({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, undefined, undefined);

BallClipRotatePulse.install = function (vue) {
  return vue.component('w-ball-clip-rotate-pulse', BallClipRotatePulse);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * w-line-scale-pulse-out
 * @desc 跳动线条动画组件
 * @param {String} color - 组件颜色, css color [hex, rgb, rgba], 默认 #ffffff
 * @param {Number} width - 组件宽度, 默认 30 <px>
 * @param {Number} height - 组件高度, 默认 10 <px>
 * @param {Boolean} visiable - 是否可见, 默认 true
 * @example
 *      <w-line-scale-pulse-out></w-line-scale-pulse-out>
 **/
var script$5 = {
  name: 'w-line-scale-pulse-out',
  props: {
    color: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 30
    },
    height: {
      type: Number,
      default: 10
    }
  },
  data: function data() {
    return {
      visiable: true
    };
  },
  computed: {
    itemStyles: function itemStyles() {
      var w = Math.ceil(this.width / 5);
      var s = {
        marginRight: Math.floor(w * 0.6) + 'px',
        width: Math.ceil(w * 0.4) + 'px',
        height: this.height + 'px'
      };

      if (this.color) {
        s['background-color'] = this.color;
      }

      return s;
    }
  },
  methods: {
    show: function show() {
      this.visiable = true;
      this.$emit('show');
      return this;
    },
    hide: function hide() {
      this.visiable = false;
      this.$emit('hide');
      return this;
    }
  },
  mounted: function mounted() {
    this.$parent && this.$parent.$on('visiable-change', function (vis) {
      this[vis ? 'show' : 'hide']();
    }.bind(this));
  }
};

/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.visiable ? _c("div", {
    staticClass: "wui-line-scale-pulse-out"
  }, [_c("div", {
    style: _vm.itemStyles
  }), _vm._v(" "), _c("div", {
    style: _vm.itemStyles
  }), _vm._v(" "), _c("div", {
    style: _vm.itemStyles
  }), _vm._v(" "), _c("div", {
    style: _vm.itemStyles
  }), _vm._v(" "), _c("div", {
    style: _vm.itemStyles
  })]) : _vm._e();
};

var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

var LineScalePulseOut = normalizeComponent_1({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, undefined, undefined);

LineScalePulseOut.install = function (vue) {
  return vue.component('w-line-scale-pulse-out', LineScalePulseOut);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * wui-ball-spin-fade
 * @desc ball 动画
 * @param {Number} width - 组件宽度和高度
 * @param {String} color - 组件颜色, css color
 * @example
 *      <w-ball-spin-fade></w-ball-spin-fade>
 **/
var script$6 = {
  name: 'w-ball-spin-fade',
  props: {
    width: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      visiable: true
    };
  },
  computed: {
    styles: function styles() {
      return {
        width: this.width + 'px',
        height: this.width + 'px'
      };
    },
    items: function items() {
      var _this = this;

      return '#,#,#,#,#,#,#,#'.split(',').map(function (v, i) {
        var rotate = 45 * i;
        return {
          rotate: rotate,
          x: _this.width * (0.5 - 0.125 + 3 / 8 * Math.cos(rotate / 180 * Math.PI)) + 'px',
          y: _this.width * (0.5 - 0.125 + 3 / 8 * Math.sin(rotate / 180 * Math.PI)) + 'px',
          w: _this.width * 0.25 + 'px'
        };
      });
    }
  },
  methods: {
    show: function show() {
      this.visiable = true;
      this.$emit('show');
      return this;
    },
    hide: function hide() {
      this.visiable = false;
      this.$emit('hide');
      return this;
    }
  },
  mounted: function mounted() {
    this.$parent && this.$parent.$on('visiable-change', function (vis) {
      this[vis ? 'show' : 'hide']();
    }.bind(this));
  }
};

/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.visiable ? _c("div", {
    staticClass: "wui-ball-spin-fade-loader",
    style: _vm.styles
  }, _vm._l(_vm.items, function (item, $i) {
    return _c("div", {
      key: $i,
      style: [_vm.color ? {
        backgroundColor: _vm.color
      } : {}, {
        width: item.w,
        height: item.w,
        left: item.x,
        top: item.y
      }]
    });
  }), 0) : _vm._e();
};

var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = undefined;
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

var BallSpinFade = normalizeComponent_1({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, undefined, undefined);

BallSpinFade.install = function (vue) {
  return vue.component('w-ball-spin-fade', BallSpinFade);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * wui-ball-beat
 * @desc 圆形跳动动画
 * @param {Number} width=24 - 组件宽度
 * @param {String} color=#ffffff - 组件颜色, css color
 * @example
 *      <w-ball-beat></w-ball-beat>
 **/
var script$7 = {
  name: 'w-ball-beat',
  props: {
    width: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      visiable: true
    };
  },
  computed: {
    styles: function styles() {
      var w = this.width * 0.3334 * 0.8;
      var s = {
        width: w + 'px',
        height: w + 'px'
      };

      if (this.color) {
        s.backgroundColor = this.color;
      }

      return s;
    }
  },
  methods: {
    show: function show() {
      this.visiable = true;
      this.$emit('show');
    },
    hide: function hide() {
      this.visiable = false;
      this.$emit('hide');
    }
  },
  mounted: function mounted() {
    this.$parent && this.$parent.$on('visiable-change', function (vis) {
      this[vis ? 'show' : 'hide']();
    }.bind(this));
  }
};

/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.visiable ? _c("div", {
    staticClass: "wui-ball-beat",
    style: {
      width: _vm.width + "px"
    }
  }, [_c("div", {
    style: _vm.styles
  }), _vm._v(" "), _c("div", {
    style: _vm.styles
  }), _vm._v(" "), _c("div", {
    style: _vm.styles
  })]) : _vm._e();
};

var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

var BallBeat = normalizeComponent_1({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, undefined, undefined);

BallBeat.install = function (vue) {
  return vue.component('w-ball-beat', BallBeat);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * wui-circle-rotate
 * @desc 旋转圆环动画
 * @param {Number} width=24 - 组件宽度
 * @param {Number} height=24 - 组件高度
 * @param {String} color="#ffffff" - 组件颜色
 * @param {Number} strokeWidth=3 - 描边宽度
 * @example
 *      <w-circle-rotate color="red"></w-circle-rotate>
 **/
var script$8 = {
  name: 'w-circle-rotate',
  props: {
    height: {
      type: Number,
      default: 24
    },
    width: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: ''
    },
    strokeWidth: {
      type: Number,
      default: 3
    }
  },
  data: function data() {
    return {
      visiable: true
    };
  },
  computed: {
    styles: function styles() {
      var s = {
        width: this.width + 'px',
        height: this.height + 'px'
      };

      if (this.color) {
        s.borderColor = this.color;
      }

      if (this.strokeWidth) {
        s.borderWidth = this.strokeWidth + 'px';
        s.borderLeft = 'solid ' + this.strokeWidth + 'px rgba(0, 0, 0, 0)';
      }

      return s;
    }
  },
  methods: {
    show: function show() {
      this.visiable = true;
      this.$emit('show');
      return this;
    },
    hide: function hide() {
      this.visiable = false;
      this.$emit('hide');
      return this;
    }
  },
  mounted: function mounted() {
    this.$parent && this.$parent.$on('visiable-change', function (vis) {
      this[vis ? 'show' : 'hide']();
    }.bind(this));
  }
};

/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.visiable ? _c("div", {
    staticClass: "wui-circle-rotate"
  }, [_c("div", {
    staticClass: "wui-circle-circle",
    style: _vm.styles
  })]) : _vm._e();
};

var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = undefined;
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

var CircleRotate = normalizeComponent_1({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, undefined, undefined);

CircleRotate.install = function (vue) {
  return vue.component('w-circle-rotate', CircleRotate);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * w-spinner
 * @module Spinner
 * @see {@link ../example/all/spinner.html 实例}
 * @desc spinner组件
 * @param {Number} type=0 - spinner动画类型,取值 0-6
 * @param {Number} width=32 - spinner宽度
 * @param {Number} height=32 - spinner高度
 * @param {String} color="#ffffff" - spinner颜色, css color
 * @param {Number} size=50 - circle rotae直径
 * @param {Number} strokeWidth=5 - circle rotate 描边宽度
 * 
 * @example
 *
 *  <w-spinner :type="3" color="#666" :width="12"></w-spinner>
 *
 */
var script$9 = {
  name: 'w-spinner',
  props: {
    type: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 24
    },
    width: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: ''
    },
    strokeWidth: {
      type: Number,
      default: 3
    },
    size: {
      type: Number,
      default: 50
    }
  },
  data: function data() {
    return {
      visiable: true
    };
  },
  watch: {
    visiable: function visiable(val, old) {
      this.$emit('visiable-change', val);
    }
  }
};

/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-spinner"
  }, [_vm.type === 0 ? _c("w-line-spin-fade", {
    attrs: {
      color: _vm.color,
      width: _vm.width,
      height: _vm.height
    }
  }) : _vm._e(), _vm._v(" "), _vm.type === 1 ? _c("w-line-scale-pulse-out", {
    attrs: {
      color: _vm.color,
      width: _vm.width,
      height: _vm.height
    }
  }) : _vm._e(), _vm._v(" "), _vm.type === 2 ? _c("w-ball-spin-fade", {
    attrs: {
      color: _vm.color,
      width: _vm.width,
      height: _vm.height
    }
  }) : _vm._e(), _vm._v(" "), _vm.type === 3 ? _c("w-ball-scale-multiple", {
    attrs: {
      color: _vm.color,
      width: _vm.width,
      height: _vm.height
    }
  }) : _vm._e(), _vm._v(" "), _vm.type === 4 ? _c("w-ball-beat", {
    attrs: {
      color: _vm.color,
      width: _vm.width,
      height: _vm.height
    }
  }) : _vm._e(), _vm._v(" "), _vm.type === 5 ? _c("w-ball-clip-rotate-pulse", {
    attrs: {
      color: _vm.color,
      width: _vm.width,
      height: _vm.width
    }
  }) : _vm._e(), _vm._v(" "), _vm.type === 6 ? _c("w-circle-rotate", {
    attrs: {
      color: _vm.color,
      height: _vm.height,
      width: _vm.width,
      "stroke-width": _vm.strokeWidth
    }
  }) : _vm._e()], 1);
};

var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = undefined;
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

var Spinner = normalizeComponent_1({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, undefined, undefined);

Spinner.install = function (vue) {
  vue.use(LineSpinFade);
  vue.use(BallScaleMultiple);
  vue.use(BallClipRotatePulse);
  vue.use(LineScalePulseOut);
  vue.use(BallSpinFade);
  vue.use(BallBeat);
  vue.use(CircleRotate); //vue.use(svgCircleRotate);

  vue.component('w-spinner', Spinner);
};

//
var script$a = {
  name: 'w-toast-loading',
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#ffffff'
    },
    bgColor: {
      type: String,
      default: 'rgba(0,0,0, .6)'
    },
    gColor: {
      type: String,
      default: 'rgba(0,0,0, .6)'
    },
    direction: {
      type: String,
      default: 'column'
    },
    spinner: {
      type: Object,
      default: function _default() {
        return {
          width: 24,
          height: 24,
          color: '#fff',
          type: 0
        };
      }
    },
    text: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 12
    }
  },
  components: {
    'w-spinner': Spinner
  },
  data: function data() {
    return {
      visiable: false
    };
  },
  methods: {
    show: function show() {
      this.visiable = true;
      this.$emit('show');
    },
    hide: function hide() {
      this.visiable = true;
      this.$emit('hide');
    }
  },
  computed: {
    styles: function styles() {
      var s = {
        backgroundColor: this.bgColor
      };

      if (this.width) {
        s.width = this.width + 'px';
      }

      if (this.height) {
        s.height = this.height + 'px';
      }

      return s;
    },
    classes: function classes() {
      return [this.direction == 'row' ? 'dir-row' : 'dir-column'];
    }
  },
  watch: {
    visiable: function visiable(val, old) {
      this.$emit('visiable-change', val);
    }
  }
};

/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("w-mask", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visiable,
      expression: "visiable"
    }]
  }, [_c("transition", {
    attrs: {
      name: "loading-opacity-fade"
    }
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visiable,
      expression: "visiable"
    }],
    staticClass: "wui-toast-loading",
    class: _vm.classes,
    style: _vm.styles
  }, [_c("div", {
    staticClass: "icon-wrap"
  }, [_c("w-spinner", {
    attrs: {
      type: _vm.spinner.type,
      height: _vm.spinner.height,
      width: _vm.spinner.width,
      color: _vm.spinner.color
    }
  })], 1), _vm._v(" "), _vm.text ? _c("div", {
    staticClass: "text-wrap",
    style: {
      color: _vm.color,
      fontSize: _vm.fontSize + "px"
    }
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2) : _vm._e()])])], 1);
};

var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;
/* style */

var __vue_inject_styles__$a = undefined;
/* scoped */

var __vue_scope_id__$a = undefined;
/* module identifier */

var __vue_module_identifier__$a = undefined;
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

var ToastLoading = normalizeComponent_1({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, undefined, undefined);

var ToastLoadingClass = Vue.extend(ToastLoading);
var tlInstance, tlVm;
/**
 * wui-toast-loading
 * @module ToastLoading
 * @see {@link ../example/all/toast-loading.html 实例}
 * @desc 页面toastloading组件 <w-toast-loading />
 * @param {Number} height=100 - 高度(px)
 * @param {Number} width=100 - 宽度(px)
 * @param {String} color='#fff' - spinner和文字颜色, css color
 * @param {String} bgColor='rgba(0,0,0,0.6)' - 背景色, css color
 * @param {String} direction='column' - spinner和文字排列方向, column 垂直方向, row 水平方向
 * @param {Object} spinner - 设置spinner格式
 * @param {String} text - loading文字
 * 
 * @example
 *  //  use it in html
 *  <script src="wui.min.js"><\/script>
 *  <link rel="stylesheet" href="wui.min.css">
 *
 *  Wui.ToastLoading.show();
 *  http.get('url').then(()=>{
 *    Wui.ToastLoading.hide();
 *  });
 *
 *  // use it in module tools
 *  import ToastLoading from 'wui/packages/toast-loading';
 *  ToastLoading.show({spinner:{type:2}, direction="row"});
 *  http.get('url').then(()=>{
 *    ToastLoading.hide();
 *  });
 **/

var ToastLoading$1 = Object.assign(ToastLoading, {
  install: function install(vue) {
    vue.component('w-toast-loading', ToastLoading);
  },

  /**
   * 隐藏loading
   * @method hide
   * @static
   * 
   */
  hide: function hide() {
    tlInstance && tlInstance.$destroy();
    tlVm && document.body.removeChild(tlVm.$el);
    tlVm = null;
    tlInstance = null;
  },

  /**
   * 显示loading
   * @method show
   * @param {Object} opts - 配置信息, <a href="#module_Loading">参考</a>
   * @static
   * @returns LoadingClass实例
   * 
   * @example
   * Wui.ToastLoading.show();
   * 
   */
  show: function show(opts) {
    opts = opts || {};

    if (tlInstance) {
      this.hide();
    }

    tlInstance = new ToastLoadingClass({
      el: document.createElement('div'),
      propsData: opts
    });
    Vue.nextTick(function () {
      tlVm = tlInstance.$mount();
      document.body.appendChild(tlVm.$el);
      tlInstance.show();
    });
  }
});

//
/**
 * loading component
 * @module Loading
 * @desc loading component with mask
 * @see {@link ../example/all/loading.html 实例}
 * @param {Number} spinnerSize=30 - spinner直径
 * @param {Number} spinnerStroke=3 - spinner描边宽度
 * @param {Number} spinnerType=6 - spinner类型 0-6
 * @param {Number} spinnerWidth - spinner宽度
 * @param {Number} spinnerHeight - spinner高度
 * @param {String} color=#478f05 - spinner以及text颜色
 * @param {String} bgColor=rgba(255, 255, 255, 0.9) - spinner以及text颜色
 * @param {String} text - 加载文字提示
 * @param {Boolean} fullPage=false - 是否全屏显示
 * @param {Boolean} isShow=false - 显示隐藏
 * @param {Boolean} isRemove=false - 隐藏后是否清除
 * 
 * @example
 *  <w-loading>正在加载...</w-loading>
 */

var script$b = {
  name: 'w-loading',
  props: {
    spinnerSize: {
      type: Number,
      default: 30
    },
    spinnerStroke: {
      type: Number,
      default: 3
    },
    spinnerType: {
      type: Number,
      default: 6
    },
    spinnerWidth: {
      type: [String, Number]
    },
    spinnerHeight: {
      type: [String, Number]
    },
    color: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 12
    },
    bgColor: {
      type: String,
      default: 'rgba(255, 255, 255, .8)'
    },
    fullPage: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isRemove: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      visiable: this.isShow
    };
  },
  components: {
    'w-spinner': Spinner
  },
  methods: {
    show: function show() {
      this.visiable = true;
      this.$emit('show');
    },
    hide: function hide() {
      this.visiable = false;
      this.$emit('hide');
    },
    _leave: function _leave() {
      // 动画结束，清除元素
      if (this.isRemove) {
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  },
  computed: {
    styles: function styles() {
      var s = {
        backgroundColor: this.bgColor
      };

      if (this.fullPage) {
        s.position = 'fixed';
      }

      return s;
    }
  },
  watch: {
    isShow: function isShow(val) {
      this.visiable = val;
      this.$emit('visiable-change', val);
    }
  },
  mounted: function mounted() {}
};

/* script */
var __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("transition", {
    attrs: {
      name: "loading-fade"
    },
    on: {
      "after-leave": _vm._leave
    }
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visiable,
      expression: "visiable"
    }],
    staticClass: "wui-loading",
    style: _vm.styles
  }, [_c("div", {
    staticClass: "wui-loading-spinner"
  }, [_c("w-spinner", {
    attrs: {
      type: _vm.spinnerType,
      color: _vm.color,
      width: _vm.spinnerWidth,
      height: _vm.spinnerHeight,
      size: _vm.spinnerSize,
      "stroke-width": _vm.spinnerStroke
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "wui-loading-text",
    style: {
      color: _vm.color,
      fontSize: _vm.fontSize + "px"
    }
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2)])]);
};

var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;
/* style */

var __vue_inject_styles__$b = undefined;
/* scoped */

var __vue_scope_id__$b = undefined;
/* module identifier */

var __vue_module_identifier__$b = undefined;
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

var Loading = normalizeComponent_1({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, undefined, undefined);

var LoadingClass = Vue.extend(Loading);
var instance$1, vm$1;

Loading.install = function (vue) {
  vue.component(Loading.name, Loading);
};

Loading.show = function (opts) {
  opts = opts || {};

  if (instance$1) {
    return instance$1;
  }

  instance$1 = new LoadingClass({
    el: document.createElement('div'),
    propsData: Object.assign({}, {
      fullPage: true,
      isRemove: true
    }, opts)
  });
  Vue.nextTick(function () {
    vm$1 = instance$1.$mount();
    document.body.appendChild(vm$1.$el);
    instance$1.show();
  });
};

Loading.hide = function () {
  instance$1 && instance$1.$destroy();
  vm$1 && document.body.removeChild(vm$1.$el);
  vm$1 = null;
  instance$1 = null;
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * wui-row
 * @module Row
 * @see {@link ../example/all/flex.html 实例}
 * @desc 行组件 <w-row></w-row>, w-row里面只能放w-cell
 * @param height='auto' - 列高, 数字, 百分比, auto
 * @param isItems=false - 是否flex-item
 * @param direction='row' - 方向, 'row' -> flex-direction: row, 'reverse' -> flex-direction: row-reverse;
 *
 * @example
 * 
 * <w-row>
 *      <w-cell :width="90">手机号</w-cell>
 *      <w-cell>
 *          <w-col>
 *              <w-cell><input type="number" name="phone" placehoder="请填写手机号码"></w-cell>
 *              <w-cell>请填写正确手机号码，确保能收到验证短信</w-cell>
 *          </w-col>
 *      </w-cell>
 *      <w-cell :width="40"><w-icon type＝"fankui"></w-icon></w-cell>
 * </w-row>
 */
var script$c = {
  name: 'w-row',
  props: {
    height: {
      type: [Number, String],
      default: 'auto',
      validator: function validator(val) {
        var t = _typeof(val);

        return t === 'number' || t === 'string' && (/^\d+/.test(val) || val === 'auto');
      }
    },
    align: {
      type: String,
      default: 'left'
    },
    direction: {
      type: String,
      default: 'row'
    },
    isItems: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styles: function styles() {
      var o = {},
          h;

      if (this.height !== 'auto') {
        h = /^\d+$/.test(this.height) ? this.height + 'px' : this.height;

        if (this.isItems) {
          o.flex = '0 0 ' + h;
          o['-webkit-flex'] = '0 0 ' + h;
          o['-webkit-box-flex'] = 0;
        } else {
          o.height = h;
        }
      }

      return o;
    },
    classes: function classes() {
      var c = {};

      if (this.direction == 'reverse') {
        c['wui-flex-dir-row-re'] = true;
      } else if (this.direction == 'row') {
        c['wui-flex-dir-row'] = true;
      }

      return c;
    }
  },
  methods: {
    handleClick: function handleClick($evt) {
      this.$emit('click', $evt);
    }
  }
};

/* script */
var __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-flex-row",
    class: _vm.classes,
    style: _vm.styles,
    on: {
      click: _vm.handleClick
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;
/* style */

var __vue_inject_styles__$c = undefined;
/* scoped */

var __vue_scope_id__$c = undefined;
/* module identifier */

var __vue_module_identifier__$c = undefined;
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

var Row = normalizeComponent_1({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * wui-col
 * @module Col
 * @see {@link ../example/all/flex.html 实例}
 * @desc 列组件 <w-col></w-col> w-col里面只能放w-cell
 * @param width='auto' - 列宽, 数字, 百分比, auto
 * @param direction='column' - 方向, 'normal' flex-direction: column, 'reverse' flex-direction: column-reverse;
 *
 * @example
 * 
 * <w-row>
 *      <w-cell :width="90">手机号</w-cell>
 *      <w-cell>
 *          <w-col>
 *              <w-cell><input type="number" name="phone" placehoder="请填写手机号码"></w-cell>
 *              <w-cell>请填写正确手机号码，确保能收到验证短信</w-cell>
 *          </w-col>
 *      </w-cell>
 *      <w-cell :width="40"><w-icon type＝"fankui"></w-icon></w-cell>
 * </w-row>
 */
var script$d = {
  name: 'w-col',
  props: {
    width: {
      type: [Number, String],
      default: 'inherit',
      validator: function validator(val) {
        var t = _typeof(val);

        return t === 'number' || t === 'string' && (/^\d+/.test(val) || val === 'inherit');
      }
    },
    direction: {
      type: String,
      default: 'column'
    }
  },
  computed: {
    styles: function styles() {
      var o = {};

      if (this.width !== 'inherit') {
        o.flexGrow = 0;
        o.width = /^\d+$/.test(this.width) ? this.width + 'px' : this.width;
        o.height = '100%';
      }

      return o;
    },
    classes: function classes() {
      var c = {};

      if (this.direction === 'reverse') {
        c['wui-flex-dir-column-re'] = true;
      }

      if (this.direction === 'column') {
        c['wui-flex-dir-column'] = true;
      }

      return c;
    }
  },
  methods: {
    handleClick: function handleClick($evt) {
      this.$emit('click', $evt);
    }
  }
};

/* script */
var __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-flex-col",
    class: _vm.classes,
    style: _vm.styles,
    on: {
      click: _vm.handleClick
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;
/* style */

var __vue_inject_styles__$d = undefined;
/* scoped */

var __vue_scope_id__$d = undefined;
/* module identifier */

var __vue_module_identifier__$d = undefined;
/* functional template */

var __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

var Col = normalizeComponent_1({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _aligns = {
  left: 'l',
  right: 'r',
  center: 'c',
  between: 'sb',
  around: 'sa'
};
var _varticals = {
  top: 't',
  bottom: 'b',
  middle: 'm',
  between: 'sb',
  around: 'sa',
  stretch: 'st'
};
var reg = /^\d+(px|rem|em|%)?/;
/**
 * wui-cell
 * @module Cell
 * @see {@link ../example/all/flex.html 实例}
 * @desc 单元组件 <w-cell></w-cell>, w-cell只能放在w-row或者w-row内
 * @param width='auto' - 列宽, 数字, 百分比, auto
 * @param height='auto' - 列高, 数字, 百分比, auto
 * @param align='left' - 水平对齐, left 居左, right 居右, center 居中, between 等间距, around 
 * @param vertical='middle' - 垂直对齐, top 居顶, bottom 居底, middle 居中, between 等间距, around, stretch
 *
 * @example
 * 
 * <w-row>
 *      <w-cell :width="90">手机号</w-cell>
 *      <w-cell><input type="number" name="phone" placehoder="请填写手机号码"></w-cell>
 *      <w-cell :width="40"><w-icon type＝"fankui"></w-icon></w-cell>
 * </w-row>
 */

var script$e = {
  name: 'w-cell',
  props: {
    width: {
      type: [Number, String],
      default: 'auto',
      validator: function validator(val) {
        var t = _typeof(val);

        return t === 'number' || t === 'string' && (reg.test(val) || val === 'auto');
      }
    },
    height: {
      type: [Number, String],
      default: 'auto',
      validator: function validator(val) {
        var t = _typeof(val);

        return t === 'number' || t === 'string' && (reg.test(val) || val === 'auto');
      }
    },
    align: {
      type: String,
      default: 'left'
    },
    vertical: {
      type: String,
      default: 'middle'
    },
    direction: String
  },
  data: function data() {
    return {
      cellStyles: {}
    };
  },

  /**
   * TODO 视情况处理flexGrow
   */
  computed: {
    styles: function styles() {
      var _styles = {};
      this.$nextTick(function () {
        var $el = this.$parent.$el;
        var isRow = $el.classList.contains('wui-flex-row');
        var isCol = $el.classList.contains('wui-flex-col');

        if (this.width !== 'auto') {
          var w = /^\d+$/.test(this.width) ? this.width + 'px' : this.width;

          if (isRow) {
            _styles['flex'] = '0 0 ' + w;
            _styles['-webkit-flex'] = '0 0 ' + w;
            _styles['-webkit-box-flex'] = 0;
          } else {
            _styles.width = w;
          }
        }

        if (this.height !== 'auto') {
          var h = /^\d+$/.test(this.height) ? this.height + 'px' : this.height;

          if (isCol) {
            _styles['flex'] = '0 0 ' + h;
            _styles['-webkit-flex'] = '0 0 ' + h;
            _styles['-webkit-box-flex'] = 0;
          } else {
            _styles.height = h;
          }
        }

        if (this.direction) {
          _styles.flexDirection = this.direction;
        }

        this.cellStyles = _styles;
      });
      return null;
    },
    classes: function classes() {
      var c = {};
      var ah = '',
          av = '';
      ah = _aligns[this.align];
      av = _varticals[this.vertical];
      c['wui-al-' + ah + av] = true;
      return c;
    }
  },
  methods: {
    handleClick: function handleClick($evt) {
      this.$emit('click', $evt);
    }
  },
  mounted: function mounted() {}
};

/* script */
var __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-flex-cell",
    class: _vm.classes,
    style: [_vm.styles, _vm.cellStyles],
    on: {
      click: _vm.handleClick
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;
/* style */

var __vue_inject_styles__$e = undefined;
/* scoped */

var __vue_scope_id__$e = undefined;
/* module identifier */

var __vue_module_identifier__$e = undefined;
/* functional template */

var __vue_is_functional_template__$e = false;
/* style inject */

/* style inject SSR */

var Cell = normalizeComponent_1({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, undefined, undefined);

var Flex = {
  install: function install(vue) {
    vue.component('w-row', Row);
    vue.component('w-col', Col);
    vue.component('w-cell', Cell);
  }
};

//
//
//
//
//
//
//
//
var script$f = {
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
  computed: {
    styles: function styles() {
      return {};
    }
  }
};

/* script */
var __vue_script__$f = script$f;
/* template */

var __vue_render__$f = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-flex-item"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$f = [];
__vue_render__$f._withStripped = true;
/* style */

var __vue_inject_styles__$f = undefined;
/* scoped */

var __vue_scope_id__$f = undefined;
/* module identifier */

var __vue_module_identifier__$f = undefined;
/* functional template */

var __vue_is_functional_template__$f = false;
/* style inject */

/* style inject SSR */

var FlexItem = normalizeComponent_1({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, undefined, undefined);

var script$g = {
  name: 'w-flexbox',
  props: {
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    direction: {
      type: String,
      default: 'row'
    },
    alignH: {
      type: String,
      default: 'start'
    },
    alignV: {
      type: String,
      default: 'start'
    }
  },
  components: _defineProperty({}, FlexItem.name, FlexItem),
  data: function data() {
    return {};
  },
  computed: {
    classes: function classes() {
      return ["wui-flex-align-".concat(this.alignH, "-").concat(this.alignV), this.direction == 'column' ? "wui-".concat(this.direction, "-flexbox") : 'wui-flexbox'];
    },
    styles: function styles() {
      var o = {},
          h = this.height,
          w = this.width;

      if (h || h === 0) {
        o.height = /^\d+$/.test(h) ? h + 'px' : h;
      }

      if (w || w === 0) {
        o.width = /^\d+$/.test(w) ? w + 'px' : w;
      }

      return o;
    }
  }
};

/* script */
var __vue_script__$g = script$g;
/* template */

var __vue_render__$g = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    class: _vm.classes,
    style: _vm.styles
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$g = [];
__vue_render__$g._withStripped = true;
/* style */

var __vue_inject_styles__$g = undefined;
/* scoped */

var __vue_scope_id__$g = undefined;
/* module identifier */

var __vue_module_identifier__$g = undefined;
/* functional template */

var __vue_is_functional_template__$g = false;
/* style inject */

/* style inject SSR */

var FlexBox = normalizeComponent_1({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, undefined, undefined);

FlexBox.install = function (vue) {
  vue.component(FlexItem.name, FlexItem);
  vue.component(FlexBox.name, FlexBox);
};

setTimeout(function () {
  var dpr = window.devicePixelRatio;
  document.documentElement.dataset && (document.documentElement.dataset.dpr = dpr);
}, 0);

//
setTimeout(function () {
  var dpr = window.devicePixelRatio; //if (this.borderColor) {

  var styleTag = document.getElementById('cui-button-border-1px');
  var sheet = styleTag ? styleTag.sheet || styleTag.styleSheet : null;

  if (!sheet) {
    var style = document.createElement("style");
    style.id = 'cui-button-border-1px';
    style.type = 'text/css';
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    sheet = style.sheet;
  }

  if (sheet.addRule) {
    sheet.addRule('button > .cui-button-border', 'width: ' + dpr * 100 + '%;' + 'height: ' + dpr * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');');
  } else if (sheet.insertRule) {
    sheet.insertRule('button > .cui-button-border' + 'width: ' + dpr * 100 + '%;' + 'height: ' + dpr * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');', 0);
  } //}

}, 0);
/**
 * cui-button
 * @module Button
 * @see {@link ../example/all/button.html 实例}
 * @desc 按钮组件 <w-button />
 * @param {string} type=default - 显示类型，接受 default, primary, warning
 * @param {string} nativeType=button - 按钮类型， button, reset, submit
 * @param {boolean} disabled=false - 禁用
 * @param {boolean} plain=false - 镂空按钮
 * @param {ghost} ghost=false - 幽灵按钮
 * @param {boolean} block=false - 是否100%宽
 * @param {string} size=normal - 尺寸，接受 normal, small, large
 * @param {Boolean} sharp=false - 是否尖角
 * @param {Number} height - 高度
 * @param {Number} width - 宽度
 * @param {String} slot - 显示文本
 * @param {String} bgColor - 按钮背景色
 * @param {String} fontColor - 字体颜色
 *
 * @example
 *  <w-button size="large" type="primary">按钮</w-button>
 *
 *  <w-button size="small" type="warning">删除</w-button>
 *
 */

var script$h = {
  name: 'w-button',
  props: {
    disabled: Boolean,
    nativeType: {
      type: String,
      default: 'button'
    },
    content: {
      type: String
    },
    plain: Boolean,
    sharp: Boolean,
    block: Boolean,
    fontSize: {
      type: [Number, String],
      default: 14,
      validator: validateUnit
    },
    bgColor: String,
    borderColor: String,
    borderStyle: {
      type: String
    },
    borderWidth: {
      type: [Number, String],
      default: function _default() {
        return this.plain ? 1 : 0;
      },
      validator: validateUnit
    },
    fontColor: String,
    borderRadius: {
      type: [Number, String],
      default: 4,
      validator: validateUnit
    },
    type: {
      type: String,
      default: 'default',
      validator: function validator(value) {
        return ['default', 'primary', 'warning'].indexOf(value) > -1;
      }
    },
    ghost: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      validator: validateUnit
    },
    width: {
      type: [String, Number],
      validator: validateUnit
    },
    size: {
      type: String,
      default: 'normal',
      validator: function validator(value) {
        return ['small', 'normal', 'large'].indexOf(value) > -1;
      }
    }
  },
  data: function data() {
    return {
      isThin: this.borderWidth === 1 || this.borderWidth === '1px'
    };
  },
  methods: {
    handleClick: function handleClick(evt) {
      this.$emit('click', evt);
    }
  },
  computed: {
    borderStyles: function borderStyles() {
      if (!(this.borderWidth === 1 || this.borderWidth === '1px')) return null;
      var br = this.sharp ? 0 : this.borderRadius,
          regBr;
      var dpr = window.devicePixelRatio;

      if (/^\d+$/.test(br)) {
        br = br * dpr + 'px';
      } else if (!/%$/.test(br)) {
        regBr = String(br).match(/(\d+)([a-zA-Z]+)/);
        br = regBr[1] * dpr + regBr[2];
      }

      return {
        borderRadius: br,
        borderColor: this.borderColor
      };
    },
    styles: function styles() {
      var h = cmpUnit(this.height),
          w = cmpUnit(this.width),
          br = this.sharp ? 0 : this.borderRadius,
          fs = this.fontSize,
          size = this.size;
      var o = {
        height: h,
        borderWidth: !this.isThin ? this.borderWidth || null : null,
        borderColor: !this.isThin ? this.borderColor : null,
        width: w,
        fontSize: /^\d+$/.test(fs) ? fs + 'px' : fs || null,
        backgroundColor: this.bgColor,
        color: this.fontColor,
        borderRadius: /^\d+$/.test(br) ? br + 'px' : br
      };
      return o;
    }
  },
  mounted: function mounted() {}
};

/* script */
var __vue_script__$h = script$h;
/* template */

var __vue_render__$h = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("button", {
    staticClass: "cui-button",
    class: ["cui-button__type_" + _vm.type, _vm.size ? "cui-button__size_" + _vm.size : "", {
      "is-disabled": _vm.disabled,
      "is-block": _vm.block
    }],
    style: _vm.styles,
    attrs: {
      "data-key": "cui-button-" + _vm._uid,
      type: _vm.nativeType,
      disabled: _vm.disabled
    },
    on: {
      click: _vm.handleClick
    }
  }, [_c("label", {
    staticClass: "cui-button__text"
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.content))])], 2), _vm._v(" "), _c("span", {
    staticClass: "cui-button__border",
    style: _vm.borderStyles
  })]);
};

var __vue_staticRenderFns__$h = [];
__vue_render__$h._withStripped = true;
/* style */

var __vue_inject_styles__$h = undefined;
/* scoped */

var __vue_scope_id__$h = undefined;
/* module identifier */

var __vue_module_identifier__$h = undefined;
/* functional template */

var __vue_is_functional_template__$h = false;
/* style inject */

/* style inject SSR */

var Button = normalizeComponent_1({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, undefined, undefined);

Button.install = function (vue) {
  vue.component('w-button', Button);
};

var clickoutsideContext = '@@clickoutsideContext';
var Clickoutside = {
  bind: function bind(el, binding, vnode) {
    var documentHandler = function documentHandler(e) {
      if (vnode.context && !el.contains(e.target)) {
        vnode.context[el[clickoutsideContext].methodName]();
      }
    };

    el[clickoutsideContext] = {
      documentHandler: documentHandler,
      methodName: binding.expression,
      arg: binding.arg || 'click'
    };
    document.addEventListener(el[clickoutsideContext].arg, documentHandler);
  },
  update: function update(el, binding) {
    el[clickoutsideContext].methodName = binding.expression;
  },
  unbind: function unbind(el) {
    document.removeEventListener(el[clickoutsideContext].arg, el[clickoutsideContext].documentHandler);
  },
  install: function install(Vue) {
    Vue.directive('clickoutside', {
      bind: this.bind,
      unbind: this.unbind
    });
  }
};

//
var script$i = {
  name: 'w-field',
  directives: {
    Clickoutside: Clickoutside
  },
  data: function data() {
    return {
      active: false,
      dms: ' ',
      blocks: [],
      howDms: 0,
      selectionStart: 0,
      currentValue: this.value,
      deFormatFunction: this.deFormat,
      enFormatFunction: this.enFormat
    };
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    rows: String,
    label: String,
    showLabel: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: [Number, String],
      default: 80
    },
    labelAlign: {
      type: String,
      default: 'left'
    },
    labelVertical: {
      type: String,
      default: 'middle'
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    iconWidth: {
      type: [Number, String],
      default: 28
    },
    iconAlign: {
      type: String,
      default: 'center'
    },
    iconVertical: String,
    iconStyle: Object,
    icon: {
      type: Object,
      default: function _default() {
        return {
          fill: '#c0c0c0',
          width: 18,
          height: 18,
          type: 'right'
        };
      }
    },
    placeholder: String,
    readonly: Boolean,
    pattern: String,
    disabled: Boolean,
    disableClear: Boolean,
    state: {
      type: String,
      default: 'default'
    },
    value: {},
    attr: Object,
    error: String,
    height: [Number, String],
    format: {
      type: [String, Array],
      default: ''
    },
    deFormat: Function,
    enFormat: Function,
    maxlength: [Number, String]
  },
  components: {
    'w-cell': Cell,
    'w-col': Col,
    'w-row': Row,
    'w-icon': Icon
  },
  computed: {
    styles: function styles() {
      var s = {};

      if (this.height) {
        s.height = this.height + 'px';
      }

      return s;
    },
    errorStyle: function errorStyle() {
      var s = {};
      var h = parseInt(this.height || 50);

      if (this.type !== 'textarea' && h > 40) {
        s.marginTop = ((h - 14) * 0.5 - 8) * -1 + 'px';
      }

      return s;
    },
    rootStyles: function rootStyles() {
      var s = {};

      if (this.height) {
        s.minHeight = this.height + 'px';
      }

      return s;
    }
  },
  methods: {
    unActive: function unActive() {
      this.active = false;
    },
    handleBlur: function handleBlur($evtnt) {
      this.$emit('blur', this.currentValue);
    },
    handleFocus: function handleFocus($event) {
      if (this.disabled || this.readonly) return;
      this.active = true;
      this.$emit('focus', this.currentValue);
    },
    handleEnter: function handleEnter($event) {
      this.$emit('enter', this.currentValue);
    },
    handleIconClick: function handleIconClick() {
      this.$emit('icon-click');
    },
    handleInput: function handleInput($event) {
      if (this.enFormatFunction) {
        var ary = String(this.currentValue).match(new RegExp('\\' + this.dms, 'g'));
        this.howDms = ary ? ary.length : 0;
      }

      this.currentValue = this.hanleFormat($event.target.value); // 记录光标位置

      if (this.enFormatFunction) {
        try {
          this.selectionStart = this.$el.querySelector('.wui-field-input').selectionStart;
        } catch (e) {
          this.selectionStart = 0;
        }
      }
    },
    handleClear: function handleClear() {
      if (this.disabled || this.readonly) return;
      this.currentValue = '';
    },
    handleChange: function handleChange() {
      this.$emit('change', this.currentValue);
    },
    handleLabelClick: function handleLabelClick() {
      this.$emit('label-click', this.currentValue);
    },
    hanleFormat: function hanleFormat(val) {
      var rst = '';

      if (typeof this.enFormatFunction === 'function') {
        rst = this.enFormatFunction(val);
      } else {
        rst = val;
      }

      return rst;
    }
  },
  watch: {
    value: function value(val) {
      var _this = this;

      this.currentValue = this.hanleFormat(val); // 格式化后需要处理光标位置

      if (this.enFormatFunction) {
        this.$nextTick(function () {
          if (_this.selectionStart) {
            var ary = String(_this.currentValue).match(new RegExp('\\' + _this.dms, 'g'));

            if (ary) {
              var howDms = ary.length;
            }

            var pos = _this.selectionStart;

            if (_this.howDms < howDms) {
              pos += 1;
            } else if (_this.howDms > howDms) {
              pos -= 1;
            }

            _this.$el.querySelector('.wui-field-input').setSelectionRange(pos, pos);

            _this.selectionStart = 0;
          }
        });
      }
    },
    currentValue: function currentValue(val) {
      if (this.deFormatFunction) {
        val = this.deFormatFunction(val);
      }

      this.$emit('input', val);
    },
    //原生控件的一些属性
    attr: {
      immediate: true,
      handler: function handler(attrs) {
        var _this2 = this;

        this.$nextTick(function () {
          var target = [_this2.$refs.input, _this2.$refs.textarea];
          target.forEach(function (el) {
            if (!el || !attrs) return;
            Object.keys(attrs).map(function (name) {
              return el.setAttribute(name, attrs[name]);
            });
          });
        });
      }
    }
  },
  created: function created() {
    if (this.format) {
      if (Array.isArray(this.format)) {
        this.dms = this.format[1] || ' ';
        this.blocks = this.format[0];
      }

      switch (this.format) {
        case 'numberic':
          this.deFormatFunction = deFormatNumberic;
          this.enFormatFunction = enFormatNumberic;
          this.dms = ',';
          break;

        case 'bankcard':
          this.deFormatFunction = deFormatBankCard;
          this.enFormatFunction = enFormatBankCard;
          this.dms = ' ';
          break;

        default:
          this.enFormatFunction = function (n) {
            return formatBlocks(n, this.blocks, this.dms);
          }.bind(this);

          this.deFormatFunction = function (n) {
            return String(n).replace(new RegExp('\\' + this.dms, 'g'), '');
          }.bind(this);

          break;
      }
    }

    this.currentValue = this.hanleFormat(this.value);
  }
};

/* script */
var __vue_script__$i = script$i;
/* template */

var __vue_render__$i = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    directives: [{
      name: "clickoutside",
      rawName: "v-clickoutside",
      value: _vm.unActive,
      expression: "unActive"
    }],
    staticClass: "wui-field wui-border-1px wui-border-b",
    class: {
      "type-is-input": _vm.type !== "textarea",
      "type-is-textarea": _vm.type == "textarea",
      "is-has-error": !!_vm.error
    },
    style: _vm.rootStyles
  }, [_c("w-row", {
    staticClass: "wui-field-wrap",
    style: _vm.styles
  }, [_vm.showLabel ? _c("w-cell", {
    staticClass: "wui-field-label-wrap",
    attrs: {
      width: _vm.labelWidth,
      align: _vm.labelAlign,
      vertical: _vm.labelVertical
    },
    on: {
      click: _vm.handleLabelClick
    }
  }, [_vm._t("label", [_c("label", {
    staticClass: "wui-field-label",
    attrs: {
      for: _vm.name
    }
  }, [_vm._v(_vm._s(_vm.label))])])], 2) : _vm._e(), _vm._v(" "), _c("w-cell", {
    staticClass: "wui-field-content",
    attrs: {
      vertical: "middle"
    }
  }, [_vm._t("content", [_c("w-row", {
    staticClass: "wui-field-box"
  }, [_c("w-cell", {
    staticClass: "wui-filed-value"
  }, [_vm.type === "textarea" ? _c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentValue,
      expression: "currentValue"
    }],
    staticClass: "wui-field-textarea",
    attrs: {
      placeholder: _vm.placeholder,
      disabled: _vm.disabled,
      readonly: _vm.readonly,
      rows: _vm.rows,
      name: _vm.name,
      maxlength: _vm.maxlength
    },
    domProps: {
      value: _vm.currentValue
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.handleEnter($event);
      },
      focus: _vm.handleFocus,
      blur: _vm.handleBlur,
      input: [function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.currentValue = $event.target.value;
      }, _vm.handleInput],
      change: _vm.handleChange
    }
  }) : _vm.type === "checkbox" ? _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentValue,
      expression: "currentValue"
    }],
    staticClass: "wui-field-input",
    attrs: {
      placeholder: _vm.placeholder,
      disabled: _vm.disabled,
      readonly: _vm.readonly,
      name: _vm.name,
      maxlength: _vm.maxlength,
      pattern: _vm.pattern,
      type: "checkbox"
    },
    domProps: {
      checked: Array.isArray(_vm.currentValue) ? _vm._i(_vm.currentValue, null) > -1 : _vm.currentValue
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.handleEnter($event);
      },
      focus: _vm.handleFocus,
      blur: _vm.handleBlur,
      input: _vm.handleInput,
      change: [function ($event) {
        var $$a = _vm.currentValue,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.currentValue = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.currentValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.currentValue = $$c;
        }
      }, _vm.handleChange]
    }
  }) : _vm.type === "radio" ? _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentValue,
      expression: "currentValue"
    }],
    staticClass: "wui-field-input",
    attrs: {
      placeholder: _vm.placeholder,
      disabled: _vm.disabled,
      readonly: _vm.readonly,
      name: _vm.name,
      maxlength: _vm.maxlength,
      pattern: _vm.pattern,
      type: "radio"
    },
    domProps: {
      checked: _vm._q(_vm.currentValue, null)
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.handleEnter($event);
      },
      focus: _vm.handleFocus,
      blur: _vm.handleBlur,
      input: _vm.handleInput,
      change: [function ($event) {
        _vm.currentValue = null;
      }, _vm.handleChange]
    }
  }) : _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentValue,
      expression: "currentValue"
    }],
    staticClass: "wui-field-input",
    attrs: {
      placeholder: _vm.placeholder,
      disabled: _vm.disabled,
      readonly: _vm.readonly,
      name: _vm.name,
      maxlength: _vm.maxlength,
      pattern: _vm.pattern,
      type: _vm.type
    },
    domProps: {
      value: _vm.currentValue
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.handleEnter($event);
      },
      focus: _vm.handleFocus,
      blur: _vm.handleBlur,
      input: [function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.currentValue = $event.target.value;
      }, _vm.handleInput],
      change: _vm.handleChange
    }
  })]), _vm._v(" "), _c("w-cell", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.active && _vm.currentValue,
      expression: "active && currentValue"
    }],
    staticClass: "wui-field-clear",
    attrs: {
      align: "center",
      width: 28
    },
    on: {
      click: _vm.handleClear
    }
  }, [_c("w-icon", {
    attrs: {
      type: "roundclosefill",
      fill: "#d8d8d8",
      width: 16,
      height: 16
    }
  })], 1)], 1)])], 2), _vm._v(" "), _vm.showIcon ? _c("w-cell", {
    attrs: {
      width: _vm.iconWidth,
      vertical: _vm.iconVertical,
      align: _vm.iconAlign
    },
    on: {
      click: _vm.handleIconClick
    }
  }, [_vm._t("icon", [_c("w-icon", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.icon.type,
      expression: "icon.type"
    }],
    style: _vm.iconStyle,
    attrs: {
      type: _vm.icon.type,
      fill: _vm.icon.fill,
      width: _vm.icon.width,
      height: _vm.icon.height
    }
  })])], 2) : _vm._e()], 1), _vm._v(" "), _vm.error ? _c("w-row", {
    style: _vm.errorStyle,
    attrs: {
      height: 22
    }
  }, [_c("w-cell", {
    attrs: {
      width: _vm.labelWidth
    }
  }), _vm._v(" "), _c("w-cell", {
    staticClass: "wui-field-error",
    attrs: {
      align: "left",
      vertical: "top"
    }
  }, [_vm._v(_vm._s(_vm.error))])], 1) : _vm._e()], 1);
};

var __vue_staticRenderFns__$i = [];
__vue_render__$i._withStripped = true;
/* style */

var __vue_inject_styles__$i = undefined;
/* scoped */

var __vue_scope_id__$i = undefined;
/* module identifier */

var __vue_module_identifier__$i = undefined;
/* functional template */

var __vue_is_functional_template__$i = false;
/* style inject */

/* style inject SSR */

var Field = normalizeComponent_1({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, undefined, undefined);

Field.install = function (vue) {
  vue.component('w-field', Field);
};

//
//
//
//
//
//
//
//
//
//
//

/**
 * wui-checkbox
 * @desc 勾选框  <w-checkbox />
 * @module Checkbox
 * @see {@link ../example/all/checkbox.html 实例}
 * @param {string} label 显示在右侧的内容
 * @param {boolean} disabled 是否禁用
 *
 * @example
 * <w-checkbox v-model="checked" label="这个位置是标签1"></w-checkbox>
 * <w-checkbox v-model="disable" label="是否禁用下面的按钮"></w-checkbox>
 */
var script$j = {
  name: 'w-checkbox',
  props: {
    label: String,
    value: Boolean,
    disabled: Boolean,
    size: [Number, String],
    color: String
  },
  data: function data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value: function value(val) {
      this.currentValue = val;
    },
    currentValue: function currentValue(val) {
      this.$emit('input', val);
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.size ? this.size + 'px' : '',
        height: this.size ? this.size + 'px' : '',
        borderColor: this.color || '',
        backgroundColor: this.currentValue && this.color || ''
      };
    }
  }
};

/* script */
var __vue_script__$j = script$j;
/* template */

var __vue_render__$j = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-checkbox"
  }, [_c("label", {
    staticClass: "wui-checkbox-label"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentValue,
      expression: "currentValue"
    }],
    staticClass: "wui-checkbox-input",
    attrs: {
      type: "checkbox",
      disabled: _vm.disabled
    },
    domProps: {
      checked: Array.isArray(_vm.currentValue) ? _vm._i(_vm.currentValue, null) > -1 : _vm.currentValue
    },
    on: {
      change: function change($event) {
        var $$a = _vm.currentValue,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.currentValue = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.currentValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.currentValue = $$c;
        }
      }
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "wui-checkbox-core",
    style: _vm.styles
  }), _vm._v(" "), _vm.label || _vm.$slots.default ? _c("span", {
    staticClass: "wui-checkbox-content"
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2) : _vm._e()])]);
};

var __vue_staticRenderFns__$j = [];
__vue_render__$j._withStripped = true;
/* style */

var __vue_inject_styles__$j = undefined;
/* scoped */

var __vue_scope_id__$j = undefined;
/* module identifier */

var __vue_module_identifier__$j = undefined;
/* functional template */

var __vue_is_functional_template__$j = false;
/* style inject */

/* style inject SSR */

var Checkbox = normalizeComponent_1({
  render: __vue_render__$j,
  staticRenderFns: __vue_staticRenderFns__$j
}, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, undefined, undefined);

Checkbox.install = function (vue) {
  vue.component('w-checkbox', Checkbox);
};

var trim = function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}; //是否有样式类


var hasClass = function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') != -1) throw new Error('className should not contain space.');

  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}; //添加样式类


var addClass = function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }

  if (!el.classList) {
    el.className = curClass;
  }
}; //移除样式类


var removeClass = function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }

  if (!el.classList) {
    el.className = trim(curClass);
  }
};

var hasModal = false; //初始化模态背景.

var getModal = function getModal() {
  var modalDom = PopupManager.modalDom;

  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    modalDom = document.createElement('div');
    PopupManager.modalDom = modalDom; //遮罩屏蔽滚动

    modalDom.addEventListener('touchmove', function (event) {
      event.preventDefault();
      event.stopPropagation();
    }); //模态点击事件

    modalDom.addEventListener('click', function () {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }

  return modalDom;
};

var instances = {};
var PopupManager = {
  zIndex: 2000,
  modalFade: true,
  getInstance: function getInstance(id) {
    return instances[id];
  },
  register: function register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  deregister: function deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  nextZIndex: function nextZIndex() {
    return PopupManager.zIndex++;
  },
  modalStack: [],
  doOnModalClick: function doOnModalClick() {
    var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) return;
    var instance = PopupManager.getInstance(topItem.id);

    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },
  openModal: function openModal(id, zIndex, dom, modalClass, modalFade) {
    if (Vue.prototype.$isServer) return;
    if (!id || zIndex === undefined) return;
    this.modalFade = modalFade;
    var modalStack = this.modalStack;

    for (var i = 0, j = modalStack.length; i < j; i++) {
      var item = modalStack[i];

      if (item.id === id) {
        return;
      }
    }

    var modalDom = getModal();
    addClass(modalDom, 'v-modal');

    if (this.modalFade && !hasModal) {
      addClass(modalDom, 'v-modal-enter');
    }

    if (modalClass) {
      var classArr = modalClass.trim().split(/\s+/);
      classArr.forEach(function (item) {
        return addClass(modalDom, item);
      });
    }

    setTimeout(function () {
      removeClass(modalDom, 'v-modal-enter');
    }, 200);

    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }

    modalDom.style.display = '';
    this.modalStack.push({
      id: id,
      zIndex: zIndex,
      modalClass: modalClass
    });
  },
  closeModal: function closeModal(id) {
    var modalStack = this.modalStack;
    var modalDom = getModal();

    if (modalStack.length > 0) {
      var topItem = modalStack[modalStack.length - 1];

      if (topItem.id === id) {
        if (topItem.modalClass) {
          var classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach(function (item) {
            return removeClass(modalDom, item);
          });
        }

        modalStack.pop();

        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (var i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (this.modalFade) {
        addClass(modalDom, 'v-modal-leave');
      }

      setTimeout(function () {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = 'none';
          PopupManager.modalDom = undefined;
        }

        removeClass(modalDom, 'v-modal-leave');
      }, 200);
    }
  }
};

var idSeed = 1;
var transitions = [];

var hookTransition = function hookTransition(transition) {
  if (transitions.indexOf(transition) !== -1) return;

  var getVueInstance = function getVueInstance(element) {
    var instance = element.__vue__;

    if (!instance) {
      var textNode = element.previousSibling;

      if (textNode.__vue__) {
        instance = textNode.__vue__;
      }
    }

    return instance;
  };

  Vue.transition(transition, {
    afterEnter: function afterEnter(el) {
      var instance = getVueInstance(el);

      if (instance) {
        instance.doAfterOpen && instance.doAfterOpen();
      }
    },
    afterLeave: function afterLeave(el) {
      var instance = getVueInstance(el);

      if (instance) {
        instance.doAfterClose && instance.doAfterClose();
      }
    }
  });
};

var scrollBarWidth;

var getScrollBarWidth = function getScrollBarWidth() {
  if (Vue.prototype.$isServer) return;
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  var outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);
  var widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';
  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);
  var widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return widthNoScroll - widthWithScroll;
};

var getDOM = function getDOM(dom) {
  if (dom.nodeType === 3) {
    dom = dom.nextElementSibling || dom.nextSibling;
    getDOM(dom);
  }

  return dom;
};

var Popup = {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: ''
    },
    openDelay: {},
    closeDelay: {},
    zIndex: {},
    modal: {
      type: Boolean,
      default: false
    },
    modalFade: {
      type: Boolean,
      default: true
    },
    modalClass: {},
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  created: function created() {
    if (this.transition) {
      hookTransition(this.transition);
    }

    console.log("mixin:" + this.closeOnClickModal);
  },
  beforeMount: function beforeMount() {
    this._popupId = 'popup-' + idSeed++;
    PopupManager.register(this._popupId, this);
  },
  beforeDestroy: function beforeDestroy() {
    PopupManager.deregister(this._popupId);
    PopupManager.closeModal(this._popupId);

    if (this.modal && this.bodyOverflow !== null && this.bodyOverflow !== 'hidden') {
      document.body.style.overflow = this.bodyOverflow;
      document.body.style.paddingRight = this.bodyPaddingRight;
    }

    this.bodyOverflow = null;
    this.bodyPaddingRight = null;
  },
  data: function data() {
    return {
      opened: false,
      bodyOverflow: null,
      bodyPaddingRight: null,
      rendered: false
    };
  },
  watch: {
    value: function value(val) {
      var _this = this;

      if (val) {
        if (this._opening) return;

        if (!this.rendered) {
          this.rendered = true;
          Vue.nextTick(function () {
            _this.open();
          });
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    }
  },
  methods: {
    open: function open(options) {
      var _this2 = this;

      if (!this.rendered) {
        this.rendered = true;
        this.$emit('input', true);
      }

      var props = Object.assign({}, this, this.$props, options);

      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }

      clearTimeout(this._openTimer);
      var openDelay = Number(props.openDelay);

      if (openDelay > 0) {
        this._openTimer = setTimeout(function () {
          _this2._openTimer = null;

          _this2.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },
    doOpen: function doOpen(props) {
      if (this.$isServer) return;
      if (this.willOpen && !this.willOpen()) return;
      if (this.opened) return;
      this._opening = true; // 使用 vue-popup 的组件，如果需要和父组件通信显示的状态，应该使用 value，它是一个 prop，
      // 这样在父组件中用 v-model 即可；否则可以使用 visible，它是一个 data

      this.visible = true;
      this.$emit('input', true);
      var dom = getDOM(this.$el);
      var modal = props.modal;
      var zIndex = props.zIndex;

      if (zIndex) {
        PopupManager.zIndex = zIndex;
      }

      if (modal) {
        if (this._closing) {
          PopupManager.closeModal(this._popupId);
          this._closing = false;
        }

        PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), dom, props.modalClass, props.modalFade);

        if (props.lockScroll) {
          if (!this.bodyOverflow) {
            this.bodyPaddingRight = document.body.style.paddingRight;
            this.bodyOverflow = document.body.style.overflow;
          }

          scrollBarWidth = getScrollBarWidth();
          var bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;

          if (scrollBarWidth > 0 && bodyHasOverflow) {
            document.body.style.paddingRight = scrollBarWidth + 'px';
          }

          document.body.style.overflow = 'hidden';
        }
      }

      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute';
      }

      dom.style.zIndex = PopupManager.nextZIndex();
      this.opened = true;
      this.onOpen && this.onOpen();

      if (!this.transition) {
        this.doAfterOpen();
      }
    },
    doAfterOpen: function doAfterOpen() {
      this._opening = false;
    },
    close: function close() {
      var _this3 = this;

      if (this.willClose && !this.willClose()) return;

      if (this._openTimer !== null) {
        clearTimeout(this._openTimer);
        this._openTimer = null;
      }

      clearTimeout(this._closeTimer);
      var closeDelay = Number(this.closeDelay);

      if (closeDelay > 0) {
        this._closeTimer = setTimeout(function () {
          _this3._closeTimer = null;

          _this3.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },
    doClose: function doClose() {
      var _this4 = this;

      this.visible = false;
      this.$emit('input', false);
      this._closing = true;
      this.onClose && this.onClose();

      if (this.lockScroll) {
        setTimeout(function () {
          if (_this4.modal && _this4.bodyOverflow !== 'hidden') {
            document.body.style.overflow = _this4.bodyOverflow;
            document.body.style.paddingRight = _this4.bodyPaddingRight;
          }

          _this4.bodyOverflow = null;
          _this4.bodyPaddingRight = null;
        }, 200);
      }

      this.opened = false;

      if (!this.transition) {
        this.doAfterClose();
      }
    },
    doAfterClose: function doAfterClose() {
      PopupManager.closeModal(this._popupId);
      this._closing = false;
    }
  }
};

//
var script$k = {
  name: 'w-popup',
  mixins: [Popup],
  props: {
    modal: {
      default: true
    },
    modalFade: {
      default: false
    },
    lockScroll: {
      default: false
    },
    closeOnClickModal: {
      default: true
    },
    popupTransition: {
      type: String,
      default: 'popup-slide'
    },
    position: {
      type: String,
      default: 'bottom'
    }
  },
  data: function data() {
    return {
      currentValue: false,
      currentTransition: this.popupTransition
    };
  },
  watch: {
    currentValue: function currentValue(val) {
      this.$emit('input', val);
    },
    value: function value(val) {
      this.currentValue = val;
    }
  },
  beforeMount: function beforeMount() {
    if (this.popupTransition !== 'popup-fade') {
      this.currentTransition = "popup-slide-".concat(this.position);
    }
  },
  mounted: function mounted() {
    if (this.value) {
      this.rendered = true;
      this.currentValue = true;
      this.open();
    }
  }
};

/* script */
var __vue_script__$k = script$k;
/* template */

var __vue_render__$k = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("transition", {
    attrs: {
      name: _vm.currentTransition
    }
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.currentValue,
      expression: "currentValue"
    }],
    staticClass: "wui-popup",
    class: [_vm.position ? "wui-popup-" + _vm.position : ""]
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$k = [];
__vue_render__$k._withStripped = true;
/* style */

var __vue_inject_styles__$k = undefined;
/* scoped */

var __vue_scope_id__$k = undefined;
/* module identifier */

var __vue_module_identifier__$k = undefined;
/* functional template */

var __vue_is_functional_template__$k = false;
/* style inject */

/* style inject SSR */

var popup = normalizeComponent_1({
  render: __vue_render__$k,
  staticRenderFns: __vue_staticRenderFns__$k
}, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, undefined, undefined);

popup.install = function (vue) {
  vue.component('w-popup', popup);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * cui-mask
 * @module Mask
 * @desc 半透明遮罩层 <c-mask></c-mask>
 * @param {String} color=rgba(0,0,0, 0.6) - 遮罩颜色, css color
 * @param {Boolean} isRemove=false - 是否隐藏动画完成从dom中清除
 * @param {Boolean} isShow=false - 显示隐藏
 * @example 
 *      <c-mask color="yellow"></c-mask>
 **/
var script$l = {
  name: 'c-mask',
  props: {
    color: {
      type: String,
      default: 'rgba(0,0,0, 0.6)'
    },
    isRemove: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 1000
    }
  },
  data: function data() {
    return {
      visiable: this.isShow
    };
  },
  computed: {
    styles: function styles() {
      return {
        backgroundColor: this.color,
        zIndex: this.zIndex
      };
    }
  },
  watch: {
    isShow: function isShow(val) {
      this.visiable = val;
      this.$emit(val ? 'show' : 'hide');
    }
  },
  methods: {
    show: function show() {
      this.visiable = true;
    },
    hide: function hide() {
      this.visiable = false;
    },
    _leave: function _leave() {
      // 动画结束，清除元素
      if (this.isRemove) {
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    handleClick: function handleClick($evt) {
      this.$emit('click', $evt);
    },
    handleTouchmove: function handleTouchmove($evt) {
      $evt && $evt.preventDefault && $evt.preventDefault();
      this.$emit('touchmove', $evt);
    }
  }
};

/* script */
var __vue_script__$l = script$l;
/* template */

var __vue_render__$l = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("transition", {
    attrs: {
      name: "cui-animate_fade"
    },
    on: {
      "after-leave": _vm._leave
    }
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visiable,
      expression: "visiable"
    }],
    staticClass: "cui-mask",
    style: _vm.styles,
    on: {
      touchmove: _vm.handleTouchmove,
      click: _vm.handleClick
    }
  }, [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$l = [];
__vue_render__$l._withStripped = true;
/* style */

var __vue_inject_styles__$l = undefined;
/* scoped */

var __vue_scope_id__$l = undefined;
/* module identifier */

var __vue_module_identifier__$l = undefined;
/* functional template */

var __vue_is_functional_template__$l = false;
/* style inject */

/* style inject SSR */

var Mask = normalizeComponent_1({
  render: __vue_render__$l,
  staticRenderFns: __vue_staticRenderFns__$l
}, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, undefined, undefined);

Mask.install = function (vue) {
  vue.component('w-mask', Mask);
};

//
var script$m = {
  name: 'c-dialog',
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: '80%'
    },
    content: {
      type: [String, Number],
      default: ''
    },
    contentStyle: {
      type: Object
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      default: 0
    },
    showClose: {
      type: Boolean,
      default: false
    },
    buttons: {
      type: Array,
      default: function _default() {
        return [{
          text: '取消'
        }, {
          text: '确定'
        }];
      }
    },
    buttonDirection: {
      type: String,
      default: 'row'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isRemove: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      visiable: this.isShow
    };
  },
  components: {
    'c-icon': Icon,
    'c-mask': Mask
  },
  computed: {
    styles: function styles() {
      var s = {},
          w = this.width,
          h = this.height;

      if (this.width) {
        s.width = /^\d+$/.test(w) ? w + 'px' : w; //s.marginLeft = -1 * this.width * 0.5 + 'px';
      }

      if (this.height) {
        s.height = /^\d+$/.test(h) ? h + 'px' : h; //s.marginTop = -1 * this.height * 0.5 + 'px';
      }

      return s;
    },
    footerStyles: function footerStyles() {
      return {
        height: (this.buttonDirection == 'row' ? 1 : this.buttons.length) * 44 + 'px'
      };
    },

    /**
     * 格式化button的回调
     **/
    bindButtons: function bindButtons() {
      var _this = this,
          _arguments = arguments;

      return this.buttons.map(function (button) {
        var action = button.action;

        button.action = function () {
          _this.hide();

          return action && typeof action == 'function' && action.apply(_this, [].slice.call(_arguments));
        };

        return button;
      });
    }
  },
  watch: {
    isShow: function isShow(val) {
      this.visiable = val;
    },
    visiable: function visiable(val) {
      this.$emit('visiable-change', val);
    }
  },
  methods: {
    hide: function hide() {
      this.visiable = false;
      this.$emit('close');
      return this;
    },
    show: function show() {
      this.visiable = true;
      this.$emit('show');
      return this;
    }
  }
};

/* script */
var __vue_script__$m = script$m;
/* template */

var __vue_render__$m = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("w-mask", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visiable,
      expression: "visiable"
    }],
    attrs: {
      "is-remove": _vm.isRemove,
      color: "rgba(0,0,0,.5)"
    }
  }, [_c("transition", {
    attrs: {
      name: "fade-scale"
    }
  }, [_vm.visiable ? _c("div", {
    staticClass: "cui-dialog",
    style: _vm.styles
  }, [_vm.showClose ? _c("p", {
    staticClass: "cui-dialog__close",
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.hide($event);
      }
    }
  }, [_c("w-icon", {
    attrs: {
      type: "close",
      width: 20,
      height: 20,
      fill: "#8a8a8a"
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.title ? _c("header", {
    staticClass: "cui-dialog__header"
  }, [_vm._t("header", [_c("div", {
    staticClass: "cui-dialog__title"
  }, [_vm._v(_vm._s(_vm.title))])])], 2) : _vm._e(), _vm._v(" "), _vm.content || _vm.$slots["body"] ? _c("div", {
    staticClass: "cui-dialog__body"
  }, [_vm._t("body", [_c("div", {
    style: _vm.contentStyle,
    domProps: {
      innerHTML: _vm._s(_vm.content)
    }
  })])], 2) : _vm._e(), _vm._v(" "), _c("footer", {
    staticClass: "cui-dialog__footer",
    class: {
      "cui-dialog__footer_row": _vm.buttonDirection == "row",
      "cui-dialog__footer_col": _vm.buttonDirection == "col"
    },
    style: _vm.footerStyles
  }, [_vm._t("footer", [_vm._l(_vm.bindButtons, function (btn, $i) {
    return [_c("p", {
      key: "btn-" + $i,
      staticClass: "cui-dialog__button",
      class: btn.class,
      style: btn.style,
      on: {
        click: function click($event) {
          $event.stopPropagation();
          return btn.action($event);
        }
      }
    }, [_vm._v(_vm._s(btn.text))])];
  })])], 2)]) : _vm._e()])], 1);
};

var __vue_staticRenderFns__$m = [];
__vue_render__$m._withStripped = true;
/* style */

var __vue_inject_styles__$m = undefined;
/* scoped */

var __vue_scope_id__$m = undefined;
/* module identifier */

var __vue_module_identifier__$m = undefined;
/* functional template */

var __vue_is_functional_template__$m = false;
/* style inject */

/* style inject SSR */

var Dialog = normalizeComponent_1({
  render: __vue_render__$m,
  staticRenderFns: __vue_staticRenderFns__$m
}, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, undefined, undefined);

var DialogClass = Vue.extend(Dialog);
/**
 * cui-dialog
 * @module Dialog
 * @see {@link ../example/all/dialog.html 实例}
 * @desc 对话框组件 <w-dialog />
 * @param {Number} width=240 - 对话框宽度
 * @param {Number} height=160 - 对话框高度
 * @param {String} content - 对话框内容, 必填
 * @param {String} title＝'' - 对话框标题
 * @param {Function} show - 对话框标题
 * @param {Function} hide - 对话框标题
 * @param {Array<Object>} buttons=[{text:'确定'},{text:'取消'}] - 对话框标题
 * @param {Object} contentStyle - 对话框内容样式
 * @param {Boolean} showClose=false - 是否显示关闭按钮
 * @example
 * import {Dialog} from 'cui/packages/dialog';
 * 
 * Dialog.show({
 *      title: '提交信息',
 *      content: '确定要提交吗？', 
 *      buttons:[{text:'确定', action:function(){
 *          // 确认提交
 *      }},{text:'取消', action: function(){
 *          // 不提交
 *      }}]
 * });
 *
 */

var Dialog$1 = Object.assign(Dialog, {
  install: function install(vue) {
    vue.component('c-dialog', Dialog);
  },

  /**
   * 显示对话框
   * @method show
   * @desc 显示对话框Dialog
   * @param {Object} opts - 配置项, <a href="#module_Dialog">参见</a>
   * @static
   * @returns DialogClass实例
   * 
   * @example
   * Wui.Dialog.show({content:'红包来了!',title:'发红包了'})
   * 
   */
  show: function show(opts) {
    opts = opts || {};
    var instance = new DialogClass({
      el: document.createElement('div'),
      propsData: Object.assign({}, opts, {
        isRemove: true
      })
    });
    Vue.nextTick(function () {
      var vm = instance.$mount();
      document.body.appendChild(vm.$el);
      instance.show();
    });
    return instance;
  }
});

//
var script$n = {
  name: 'c-alert',
  extends: Dialog,
  components: {
    'c-dialog': Dialog
  },
  props: {
    width: {
      type: [String, Number],
      default: '80%'
    },
    height: {
      type: [String, Number],
      default: 140
    }
  },
  methods: {
    handleVisiable: function handleVisiable(visiable) {
      this.visiable = visiable;
    }
  }
};

/* script */
var __vue_script__$n = script$n;
/* template */

var __vue_render__$n = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("c-dialog", {
    ref: "dialog",
    staticClass: "cui-alert",
    attrs: {
      "show-close": false,
      width: _vm.width,
      height: _vm.height,
      buttons: [{
        text: "确定"
      }],
      "is-show": _vm.visiable,
      "is-remove": _vm.isRemove,
      content: _vm.content
    },
    on: {
      "visiable-change": _vm.handleVisiable
    }
  });
};

var __vue_staticRenderFns__$n = [];
__vue_render__$n._withStripped = true;
/* style */

var __vue_inject_styles__$n = undefined;
/* scoped */

var __vue_scope_id__$n = undefined;
/* module identifier */

var __vue_module_identifier__$n = undefined;
/* functional template */

var __vue_is_functional_template__$n = false;
/* style inject */

/* style inject SSR */

var Alert = normalizeComponent_1({
  render: __vue_render__$n,
  staticRenderFns: __vue_staticRenderFns__$n
}, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, undefined, undefined);

var AlertClass = Vue.extend(Alert);
/**
 * wui-alert
 * @module Alert
 * @see {@link ../example/all/dialog.html 实例}
 * @desc alert对话框组件
 * @param {String} content - 显示信息
 * @param {Number} height=140 - 组件高度
 * @param {Number} width=240 - 组件高度
 * 
 * @example
 * // use it in html
 * <script src="wui.min.js"><\/script>
 * <link rel="stylesheet" href="wui.min.css" />
 * 
 * Wui.Alert.show('提交申请成功');
 *
 * // use it in webpack or browserify, rollup
 * import {Alert} from 'wui/packages/dialog';
 * // var Aler = require('wui/packages/dialog/alert.js');
 *
 * Alert.show('提交申请成功');
 *
 */

var Alert$1 = Object.assign(Alert, {
  $type: 'alert',
  install: function install(vue) {
    vue.component('w-alert', Alert);
  },

  /**
   * 显示Alert对话框
   * @method show
   * @desc 显示Alert对话框
   * @param {String} text - 内容信息
   * @param {Object} opts - 配置项, <a href="#module_Alert">参见</a>
   * @static
   * @returns AlertClass实例
   * 
   * @example
   * Wui.Alert.show('提交申请成功');
   */
  show: function show(text, opts) {
    if (_typeof(text) === 'object') {
      opts = text;
      text = opts.content;
    }

    opts = opts || {};
    var instance = new AlertClass({
      el: document.createElement('div'),
      propsData: Object.assign(opts, {
        content: text,
        isRemove: true
      })
    });
    Vue.nextTick(function () {
      var vm = instance.$mount();
      document.body.appendChild(vm.$el);
      instance.show();
    });
    return instance;
  }
});

//
var script$o = {
  name: 'w-confirm',
  extends: Dialog,
  components: {
    'w-dialog': Dialog
  },
  props: {
    height: {
      type: [String, Number],
      default: 140
    },
    width: {
      type: [String, Number],
      default: '80%'
    },
    callback: {
      type: Function
    }
  },
  computed: {
    _buttons: function _buttons() {
      return [{
        text: '取消',
        action: this._doCancel
      }, {
        text: '确定',
        action: this._doSure
      }];
    }
  },
  methods: {
    _doSure: function _doSure() {
      typeof this.callback == 'function' && this.callback(true);
      this.$emit('confirm');
    },
    _doCancel: function _doCancel() {
      typeof this.callback == 'function' && this.callback(false);
      this.$emit('cancel');
    },
    handleVisiable: function handleVisiable(visiable) {
      this.visiable = visiable;
    }
  }
};

/* script */
var __vue_script__$o = script$o;
/* template */

var __vue_render__$o = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("w-dialog", {
    ref: "dialog",
    attrs: {
      "show-close": false,
      width: _vm.width,
      height: _vm.height,
      buttons: _vm._buttons,
      "is-show": _vm.visiable,
      "is-remove": _vm.isRemove,
      content: _vm.content
    },
    on: {
      "visiable-change": _vm.handleVisiable
    }
  });
};

var __vue_staticRenderFns__$o = [];
__vue_render__$o._withStripped = true;
/* style */

var __vue_inject_styles__$o = undefined;
/* scoped */

var __vue_scope_id__$o = undefined;
/* module identifier */

var __vue_module_identifier__$o = undefined;
/* functional template */

var __vue_is_functional_template__$o = false;
/* style inject */

/* style inject SSR */

var Confirm = normalizeComponent_1({
  render: __vue_render__$o,
  staticRenderFns: __vue_staticRenderFns__$o
}, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, undefined, undefined);

var ConfirmClass = Vue.extend(Confirm);
/**
 * wui-confirm
 * @module Confirm
 * @see {@link ../example/all/dialog.html 实例}
 * @desc confirm对话框组件
 * @param {String} content - 显示信息
 * @param {Number} height=140 - 组件高度
 * @param {Number} width=260 - 组件高度
 * 
 * @example
 *
 * // use it in html
 * <script src="wui.min.js"><\/script>
 * <link rel="stylesheet" href="wui.min.css" />
 * 
 * Wui.Confirm.show('确定要提交吗？', (result)=>{if (result) {console.log('提交')}});
 * 
 * // use it in webpack or browserify, rollup
 * import {Confirm} from 'wui/packages/dialog';
 * // var Confirm = require('wui/packages/dialog/confirm.js');
 *
 * Confirm.show('确定要提交吗？', (result)=>{if (result) {console.log('提交')}});
 *
 */

var Confirm$1 = Object.assign(Confirm, {
  $type: 'confirm',
  install: function install(vue) {
    vue.component('w-confirm', Confirm);
  },

  /**
   * 显示Alert对话框
   * @method show
   * @desc 显示Confirm对话框
   * @param {String} text - 内容信息
   * @param {Object} opts - 配置项, <a href="#module_Confirm">参见</a>
   * @param {Function} callback - 回调函数, 用户选择结果将传参给第一个参数: true of false
   * @static
   * @returns ConfirmClass实例
   * 
   * @example
   * const confirm = Wui.Confirm.show('确认要提交吗？', (rst)=>{if (rs) console.log('确认提交')});
   * confirm.doClose();
   * 
   */
  show: function show(text, opts, callback) {
    if (_typeof(text) === 'object') {
      callback = opts;
      opts = text;
      text = opts.content;
    }

    if (typeof text === 'function') {
      opts = {};
      callback = text;
      text = '';
    }

    if (typeof text === 'string' && typeof opts === 'function') {
      callback = opts;
      opts = {};
    }

    callback = callback || function () {};

    var instance = new ConfirmClass({
      el: document.createElement('div'),
      propsData: Object.assign(opts, {
        content: text,
        callback: callback,
        isRemove: true
      })
    });
    Vue.nextTick(function () {
      var vm = instance.$mount();
      document.body.appendChild(vm.$el);
      instance.show();
    });
    return instance;
  }
});

//
var script$p = {
  name: 'w-prompt',
  extends: Dialog,
  components: {
    'w-dialog': Dialog
  },
  props: {
    placeholder: String,
    height: {
      type: [String, Number],
      default: 120
    },
    width: {
      type: [String, Number],
      default: '80%'
    },
    callback: {
      type: Function
    }
  },
  computed: {
    _buttons: function _buttons() {
      return [{
        text: '取消',
        action: this._doCancel
      }, {
        text: '确定',
        action: this._doSure
      }];
    }
  },
  methods: {
    _doSure: function _doSure() {
      typeof this.callback == 'function' && this.callback(this.content);
      this.$emit('confirm');
    },
    _doCancel: function _doCancel() {
      this.$emit('cancel');
    },
    handleVisiable: function handleVisiable(visiable) {
      this.visiable = visiable;
    }
  }
};

/* script */
var __vue_script__$p = script$p;
/* template */

var __vue_render__$p = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("w-dialog", {
    ref: "dialog",
    attrs: {
      "show-close": false,
      width: _vm.width,
      height: _vm.height,
      buttons: _vm._buttons,
      "is-show": _vm.visiable,
      "is-remove": _vm.isRemove
    },
    on: {
      "visiable-change": _vm.handleVisiable
    }
  }, [_c("div", {
    attrs: {
      slot: "body"
    },
    slot: "body"
  }, [_c("div", {
    staticClass: "wui-prompt-text"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.content,
      expression: "content"
    }],
    staticClass: "wui-prompt-text-input",
    attrs: {
      type: "text",
      placeholder: _vm.placeholder
    },
    domProps: {
      value: _vm.content
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.content = $event.target.value;
      }
    }
  })])])]);
};

var __vue_staticRenderFns__$p = [];
__vue_render__$p._withStripped = true;
/* style */

var __vue_inject_styles__$p = undefined;
/* scoped */

var __vue_scope_id__$p = undefined;
/* module identifier */

var __vue_module_identifier__$p = undefined;
/* functional template */

var __vue_is_functional_template__$p = false;
/* style inject */

/* style inject SSR */

var Prompt = normalizeComponent_1({
  render: __vue_render__$p,
  staticRenderFns: __vue_staticRenderFns__$p
}, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, undefined, undefined);

var PromptClass = Vue.extend(Prompt);
/**
 * wui-prompt
 * @module Prompt
 * @see {@link ../example/all/dialog.html 实例}
 * @desc prompt对话框组件
 * @param {String} placeholder - 提示信息
 * @param {Number} height=140 - 组件高度
 * @param {Number} width=260 - 组件高度
 * 
 * @example
 *
 * // use it in html
 * <script src="wui.min.js"><\/script>
 * <link rel="stylesheet" href="wui.min.css" />
 * 
 * Wui.Prompt.show('请填写信息？', (val)=>{console.log(val)});
 * 
 * // use it in webpack or browserify, rollup
 * import {Prompt} from 'wui/packages/dialog';
 * // var Prompt = require('wui/packages/dialog/prompt.js');
 *
 * Prompt.show('请填写信息？', (val)=>{console.log(val)});
 *
 */

var Prompt$1 = Object.assign(Prompt, {
  $type: 'prompt',
  install: function install(vue) {
    vue.component('w-prompt', Prompt);
  },

  /**
   * 显示Prompt对话框
   * @method show
   * @desc 显示Prompt对话框
   * @param {String} text - 内容信息
   * @param {Object} opts - 配置项, <a href="#module_Prompt">参见</a>
   * @param {Function} callback - 回调函数, 用户输入信息将传参给第一个参数
   * @static
   * @returns PromptClass实例
   * 
   * @example
   * const confirm = Wui.Prompt.show('请输入要跳转的网址', (url)=>{window.location = url});
   * prompt.doClose();
   * 
   */
  show: function show(text, opts, callback) {
    if (_typeof(text) === 'object') {
      callback = opts;
      opts = text;
      text = opts.placeholder;
    }

    if (typeof text === 'function') {
      opts = {};
      callback = text;
      text = '';
    }

    if (typeof text === 'string' && typeof opts === 'function') {
      callback = opts;
      opts = {};
    }

    callback = callback || function () {};

    var instance = new PromptClass({
      el: document.createElement('div'),
      propsData: Object.assign(opts, {
        placeholder: text,
        callback: callback,
        isRemove: true
      })
    });
    Vue.nextTick(function () {
      var vm = instance.$mount();
      document.body.appendChild(vm.$el);
      instance.show();
    });
    return instance;
  }
});

var OPTION_HEIGHT = 33;
var script$q = {
  name: 'w-picker',
  components: {
    'w-popup': popup
  },
  props: {
    show: Boolean,
    value: {},
    options: Array,
    visibleCount: {
      type: Number,
      default: 3
    },
    showCancelButton: {
      type: Boolean,
      default: false
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    cancelButtonText: {
      type: String,
      default: "取消"
    },
    confirmButtonText: {
      type: String,
      default: "确认"
    },
    buttonsPosition: {
      type: String,
      default: 'bottom'
    }
  },
  mounted: function mounted() {
    var picker = this.$el.firstChild.querySelector('.picker-body');
    this.resolveOptions();
    this.initDragRanges();
    this.initDrag(picker);
    this.initSelect();
  },
  data: function data() {
    return {
      dragObj: {
        startTime: '',
        startX: 0,
        startY: 0,
        startTranslateY: 0
      },
      dragRanges: [0, 0],
      dragging: false,
      currentValue: this.value,
      currentShow: this.show,
      selectedValue: '',
      resolvedOptions: [{}]
    };
  },
  methods: {
    resolveOptions: function resolveOptions() {
      var options = this.options || [];
      var resolvedOptions = [];
      var self = this; //将option转换为name:value键值对

      options.forEach(function (option) {
        var optionKvps = option.options || [];
        var value = optionKvps[0];

        var valueType = _typeof(value);

        var resolvedOption = {
          options: []
        };

        if (valueType !== "object") {
          //非对象类型的数组
          optionKvps.forEach(function (val) {
            var kvpObject = self.constructOptions(val, val);
            kvpObject._orignal = val;
            resolvedOption.options.push(kvpObject);
          });
        } else {
          //对象类型数组
          var valueKey = option.valueKey || "value";
          var textKey = option.textKey || "name";
          optionKvps.forEach(function (valObject) {
            var kvpObject = self.constructOptions(valObject[textKey], valObject[valueKey]);
            kvpObject._orignal = valObject;
            resolvedOption.options.push(kvpObject);
          });
        }

        resolvedOptions.push(resolvedOption);
      });
      this.resolvedOptions = resolvedOptions;
    },
    constructOptions: function constructOptions(name, value) {
      return {
        name: name,
        value: value
      };
    },
    getValueByIndex: function getValueByIndex(optionIndex, index) {
      var option = this.resolvedOptions[optionIndex];
      return option.options[index].value;
    },
    getSelectedOption: function getSelectedOption(optionIndex, val) {
      var option = this.resolvedOptions[optionIndex].options;
      var curSelected = {};
      option.forEach(function (optionItem) {
        if (optionItem.value == val) {
          curSelected = optionItem;
        }
      });
      return curSelected._orignal;
    },
    //初始化上下滚动界限
    initDragRanges: function initDragRanges() {
      var options = this.resolvedOptions[0].options || [];
      var totalCount = options.length; //向上最多滚动= -(总个数- (显示个数/2)向上取整)*高度

      this.dragRanges[0] = -OPTION_HEIGHT * (totalCount - Math.ceil(this.visibleCount / 2)); //向下最多滚动距离= (显示个数/2)向下取整*高度;

      this.dragRanges[1] = OPTION_HEIGHT * Math.floor(this.visibleCount / 2);
    },
    //初始化
    initDrag: function initDrag(picker) {
      var self = this;
      var drag = this.dragObj;
      var thisMovingY, lastMovedY; //拖拽开始

      picker.addEventListener("touchstart", function ($event) {
        self.dragging = true;
        $event.preventDefault();
        var touch = $event.changedTouches[0] || $event.touches[0];
        drag.startTime = new Date();
        drag.startX = touch.pageX;
        drag.startY = touch.pageY;
        drag.startTranslateY = self.getElementTranslateInfo(picker).y;
      }); //拖拽过程中

      picker.addEventListener("touchmove", function ($event) {
        var touch = $event.changedTouches[0] || $event.touches[0];
        drag.curX = touch.pageX;
        drag.curY = touch.pageY; //拖拽的总移动距离

        var deltaY = Math.floor(drag.curY - drag.startY); //拖拽的最终translateY

        var translateY = drag.startTranslateY + deltaY;
        self.setElementTranslateInfo(picker, null, translateY); //本次移动了距离

        thisMovingY = translateY - lastMovedY || translateY; //上一次的位置

        lastMovedY = translateY;
      });
      picker.addEventListener("touchend", function ($event) {
        self.dragging = false; //处理惯性滑动
        //本次滑动总耗时

        var duration = new Date() - drag.startTime; //快速滑动最后距离,放大比率

        var inertialMoveY,
            inertialMoveRadio = 7; //松开手指后的Y位置

        var thisMoveLastY = self.getElementTranslateInfo(picker).y;

        if (duration < 300) {
          //从滑动结束的位置开始做惯性滑动,惯性距离= <300ms的滑动的滑动距离*7;
          inertialMoveY = thisMoveLastY + thisMovingY * inertialMoveRadio;
        }

        self.$nextTick(function () {
          var avaliableY = inertialMoveY || thisMoveLastY; //保证滑动到刚好的位置

          var finalY = Math.round(avaliableY / 33) * 33; //保证不超过上下界限

          finalY = Math.max(Math.min(finalY, self.dragRanges[1]), self.dragRanges[0]);
          self.setElementTranslateInfo(picker, null, finalY); //通过translate 来提取当前选中的值

          self.selectedValue = self.getValueByTranslate(finalY);
        });
      });
    },
    initSelect: function initSelect() {},
    getValueByTranslate: function getValueByTranslate(translate) {
      translate = Math.round(translate / OPTION_HEIGHT) * OPTION_HEIGHT;
      var index = -(translate - Math.floor(this.visibleCount / 2) * OPTION_HEIGHT) / OPTION_HEIGHT;
      var val = this.getValueByIndex(0, index);
      return val;
    },
    getTranslateByValue: function getTranslateByValue(value) {
      var offset = Math.floor(this.visibleCount / 2);
      return (0 - offset) * -OPTION_HEIGHT;
    },
    //获取Translate
    getElementTranslateInfo: function getElementTranslateInfo(element) {
      var result = {
        x: 0,
        y: 0
      };
      if (element === null || element.style === null) return result;
      var transform = element.style["transform"];
      var matches = /translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g.exec(transform);

      if (matches) {
        result.x = +matches[1];
        result.y = +matches[3];
      }

      return result;
    },
    //设置Translate
    setElementTranslateInfo: function setElementTranslateInfo(element, x, y) {
      if (element === null || element === undefined || element.style === null) return; //超过一个单位就卡主

      if (y >= this.dragRanges[1] + OPTION_HEIGHT || y <= this.dragRanges[0] - OPTION_HEIGHT) {
        return;
      }

      if (!element.style["transform"] && x === 0 && y === 0) return;
      var lastTranslate = this.getElementTranslateInfo(element);

      if (x === null) {
        x = lastTranslate.x;
      }

      if (y === null) {
        y = lastTranslate.y;
      }

      var lastX = x ? x + 'px' : '0px';
      var lastY = y ? y + 'px' : '0px';
      this.clearElementTranslateInfo(element);
      element.style["transform"] += ' translate(' + lastX + ',' + lastY + ') translateZ(0px)';
    },
    //清除Translate
    clearElementTranslateInfo: function clearElementTranslateInfo(element) {
      if (element === null || element.style === null) return;
      var transformValue = element.style["transform"];

      if (transformValue) {
        transformValue = transformValue.replace(/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g, '');
        element.style["transform"] = transformValue;
      }
    },
    confirmSelectValue: function confirmSelectValue() {
      var optionIndex = 0;
      var selected = this.getSelectedOption(optionIndex, this.selectedValue);
      this.$emit("select", optionIndex, this.selectedValue, selected);
      this.$emit("input", this.selectedValue);
      this.currentShow = false;
    }
  },
  watch: {
    show: function show(val) {
      this.currentShow = val;
    },
    currentShow: function currentShow(val) {
      if (val == false) this.$emit("hide", false);
    },
    value: function value(val) {
      this.currentValue = val;
    },
    currentValue: function currentValue(val) {
      this.$emit("input", val);
    }
  },
  computed: {
    contentHeight: function contentHeight() {
      return OPTION_HEIGHT * this.visibleCount;
    }
  }
};

/* script */
var __vue_script__$q = script$q;
/* template */

var __vue_render__$q = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("w-popup", {
    attrs: {
      position: "bottom"
    },
    model: {
      value: _vm.currentShow,
      callback: function callback($$v) {
        _vm.currentShow = $$v;
      },
      expression: "currentShow"
    }
  }, [_c("div", {
    staticClass: "wui-picker picker-wrapper"
  }, [_c("div", {
    staticClass: "picker-body",
    class: {
      dragging: _vm.dragging
    },
    style: {
      height: _vm.contentHeight + "px"
    }
  }, _vm._l(_vm.resolvedOptions[0].options, function (option, $i) {
    return _c("div", {
      key: "picker-" + $i,
      staticClass: "picker-item"
    }, [_vm._v("\n                " + _vm._s(option.name) + "\n            ")]);
  }), 0), _vm._v(" "), _c("div", {
    staticClass: " picker-selector-hightlight "
  })]), _vm._v(" "), _vm.showConfirmButton ? _c("div", {
    class: "picker-buttons-" + _vm.buttonsPosition
  }, [_c("w-button", {
    attrs: {
      type: "default",
      size: "large",
      sharp: true
    },
    on: {
      click: function click($event) {
        _vm.currentShow = false;
      }
    }
  }, [_vm._v(_vm._s(_vm.cancelButtonText))]), _vm._v(" "), _c("w-button", {
    attrs: {
      type: "primary",
      size: "large",
      sharp: true
    },
    on: {
      click: _vm.confirmSelectValue
    }
  }, [_vm._v(_vm._s(_vm.confirmButtonText))])], 1) : _vm._e()]);
};

var __vue_staticRenderFns__$q = [];
__vue_render__$q._withStripped = true;
/* style */

var __vue_inject_styles__$q = undefined;
/* scoped */

var __vue_scope_id__$q = undefined;
/* module identifier */

var __vue_module_identifier__$q = undefined;
/* functional template */

var __vue_is_functional_template__$q = false;
/* style inject */

/* style inject SSR */

var Picker = normalizeComponent_1({
  render: __vue_render__$q,
  staticRenderFns: __vue_staticRenderFns__$q
}, __vue_inject_styles__$q, __vue_script__$q, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, undefined, undefined);

Picker.install = function (vue) {
  vue.component('w-picker', Picker);
};

//
var script$r = {
  name: 'w-message',
  props: {
    pos: {
      type: String,
      default: 'top'
    },
    type: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    delay: {
      type: Number,
      default: 3000
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isRemove: {
      type: Boolean,
      default: false
    },
    autoHide: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      visiable: this.isShow,
      timmer: null
    };
  },
  components: {
    'w-icon': Icon
  },
  watch: {
    isShow: function isShow(val) {
      this.visiable = val;
    },
    visiable: function visiable(val) {
      if (!val) {
        this.timmer && clearTimeout(this.timmer);
        this.timmer = null;
      }
    }
  },
  methods: {
    show: function show() {
      this.visiable = true;
      this.$emit('show');
    },
    hide: function hide() {
      this.visiable = false;
      this.$emit('hide');
    },
    _leave: function _leave() {
      // 动画结束，清除元素
      if (this.isRemove) {
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  },
  computed: {
    styles: function styles() {
      return {
        backgroundColor: this.bgColor
      };
    },
    _posClass: function _posClass() {
      return 'pos-' + this.pos;
    },
    _iconStyles: function _iconStyles() {
      var t = '',
          c = '';

      switch (this.type) {
        case 'info':
          t = 'infofill';
          c = '#0275d8';
          break;

        case 'success':
          t = 'roundcheckfill';
          c = '#5cb85c';
          break;

        case 'error':
          t = 'roundclosefill';
          c = '#d9534f';
          break;

        case 'warning':
          t = 'warnfill';
          c = '#f0ad4e';
          break;

        default:
          t = '';
          c = '';
      }

      return {
        t: t,
        c: c
      };
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.autoHide) {
      this.timmer = setTimeout(function () {
        return _this.hide();
      }, this.delay);
    }
  }
};

/* script */
var __vue_script__$r = script$r;
/* template */

var __vue_render__$r = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("transition", {
    attrs: {
      name: "msg-scale"
    },
    on: {
      "after-leave": _vm._leave
    }
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visiable,
      expression: "visiable"
    }],
    staticClass: "wui-msg-box",
    class: _vm._posClass,
    style: _vm.styles
  }, [_vm.type ? _c("div", {
    staticClass: "icon-wrap"
  }, [_c("w-icon", {
    attrs: {
      type: _vm._iconStyles.t,
      fill: _vm._iconStyles.c
    }
  })], 1) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "text-wrap"
  }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2)])]);
};

var __vue_staticRenderFns__$r = [];
__vue_render__$r._withStripped = true;
/* style */

var __vue_inject_styles__$r = undefined;
/* scoped */

var __vue_scope_id__$r = undefined;
/* module identifier */

var __vue_module_identifier__$r = undefined;
/* functional template */

var __vue_is_functional_template__$r = false;
/* style inject */

/* style inject SSR */

var Message = normalizeComponent_1({
  render: __vue_render__$r,
  staticRenderFns: __vue_staticRenderFns__$r
}, __vue_inject_styles__$r, __vue_script__$r, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, undefined, undefined);

var MessageClass = Vue.extend(Message);
/**
 * wui-message
 * @module Message
 * @see {@link ../example/all/message.html 实例}
 * @desc 浮层提示信息组件 <w-message></w-message>
 * @param {String} pos='top' - 显示位置,可取值 'top', 'middle', 'bottom'
 * @param {String} type='info' - 提示框类型, 可取值 'info', 'success', 'error', 'warning'
 * @param {String} text - 提示信息内容, 也可以slot方式传入
 * @param {Number} delay=3000 - 显示多长时间，单位 ms<毫秒>
 * @param {Boolean} isRemove=false - 是否隐藏后移除dom
 * @param {Boolean} autoHide=false - 是否自动隐藏
 * @example
 * 
 *  // use it in module tools
 *  import Message from 'wui/packages/message';
 *  Message.show('有新信息了');
 *  Message.info('有新信息了');
 *  Message.success('信息提交成功');
 *  Message.warning('内容包含非法词');
 * 
 *  // use it in html
 *  <script src="wui.min.js"><\/script>
 *  <link rel="stylesheet" href="wui.min.css">
 *  Wui.Message.show('有新信息了');
 *  Wui.Message.info('有新信息了');
 *  Wui.Message.success('信息提交成功');
 *  Wui.Message.warning('内容包含非法词');
 * 
 */

var Message$1 = Object.assign(Message, {
  install: function install(vue) {
    vue.component('w-message', Message);
  },

  /**
   * 显示提示信息
   * @method show
   * @static
   * @param {Object} opts - 配置项, <a href="#module_Message">参考</a>
   * @returns MessageClass实例
   * 
   * @example
   * Wui.Message.show('有新信息了');
   * 
   */
  show: function show(opts) {
    opts = opts || {};
    var msg = new MessageClass({
      el: document.createElement('div'),
      propsData: Object.assign({}, {
        isRemove: true
      }, opts)
    });
    Vue.nextTick(function () {
      var vm = msg.$mount();
      document.body.appendChild(vm.$el);
      msg.show();
    });
    return msg;
  },

  /**
   * 显示提示信息
   * @method info
   * @static
   * @param {String} text - 提示信息
   * @param {Object} opts - 配置项, <a href="#module_Message">参考</a>
   * @returns MessageClass实例
   * 
   * @example
   *  Wui.Message.info('收到一个优惠券');
   * 
   */
  info: function info(text, opts) {
    return this.show(Object.assign(opts || {}, {
      type: 'info',
      text: text
    }));
  },

  /**
   * 显示成功提示信息
   * @method success
   * @static
   * @param {String} text - 提示信息
   * @param {Object} opts - 配置项, <a href="#module_Message">参考</a>
   * @returns MessageClass实例
   * 
   * @example
   *  Wui.Message.success('提交成功');
   * 
   */
  success: function success(text, opts) {
    return this.show(Object.assign(opts || {}, {
      type: 'success',
      text: text
    }));
  },

  /**
   * 显示警告信息
   * @method warning
   * @static
   * @param {String} text - 提示信息
   * @param {Object} opts - 配置项, <a href="#module_Message">参考</a>
   * @returns MessageClass实例
   * 
   * @example
   *  Wui.Message.warning('内容包含非法词');
   * 
   */
  warning: function warning(text, opts) {
    return this.show(Object.assign(opts || {}, {
      type: 'warning',
      text: text
    }));
  },

  /**
   * 显示错误信息
   * @method error
   * @static
   * @param {String} text - 提示信息
   * @param {Object} opts - 配置项, <a href="#module_Message">参考</a>
   * @returns MessageClass实例
   * 
   * @example
   *  Wui.Message.error('内容包含非法词');
   * 
   */
  error: function error(text, opts) {
    return this.show(Object.assign(opts || {}, {
      type: 'error',
      text: text
    }));
  }
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * wui-progress-ring
 * @des 环形进度条组件
 * @param {Number} size - 组件直径大小,默认 100<px>
 * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
 * @param {Number | String} trackWidth - 进度槽的宽度, 默认值5<px>
 * @param {String} trackColor - 进度槽颜色, 取值范围 css color
 * @param {String} barColor - 进度条颜色, 取值范围 css color
 * @param {String} linecap=round - 进度条终结形半, 取值范围 butt, round, square
 * @param {String} direction = '1' - 顺时针还是逆时针, 取值范围 '1','-1'
 * @param {String} content - 显示内容，this.percent + '%'
 * @example
 *      <w-progress-ring :size="50" :track-width="10"></w-progress-ring>
 **/
var script$s = {
  name: 'w-progress-ring',
  props: {
    size: {
      type: Number,
      default: 100
    },
    duration: {
      type: Number,
      default: 500
    },
    trackWidth: {
      type: Number
    },
    trackColor: {
      type: String
    },
    barColor: {
      type: String
    },
    showText: {
      type: Boolean,
      default: false
    },
    direction: {
      type: [Number, String],
      default: 1
    },
    linecap: {
      type: String,
      default: 'round'
    },
    percent: {
      default: 0,
      validator: function validator(val) {
        return typeof val === 'number' && val >= 0 && val <= 100;
      }
    }
  },
  computed: {
    dasharray: function dasharray() {
      return (this.size - 2 * this.trackWidth) * Math.PI;
    },
    dashoffset: function dashoffset() {
      var d = Number(this.direction);
      var p = (100 + -1 * d * this.percent) / 100;
      return (this.size - 2 * this.trackWidth) * Math.PI * p;
    },
    radius: function radius() {
      return this.size * 0.5;
    },
    sRdius: function sRdius() {
      return this.size * 0.5 - this.trackWidth;
    },
    viewport: function viewport() {
      return '0 0 ' + this.size + ' ' + this.size;
    },
    trackStyles: function trackStyles() {
      var s = {};

      if (this.trackWidth) {
        s.strokeWidth = this.trackWidth + 'px';
      }

      if (this.trackColor) {
        s.stroke = this.trackColor;
      }

      return s;
    },
    barStyles: function barStyles() {
      var s = {};

      if (this.trackWidth) {
        s.strokeWidth = this.trackWidth + 'px';
      }

      if (this.barColor) {
        s.stroke = this.barColor;
      }

      return s;
    }
  },
  methods: {
    handleClick: function handleClick($evt) {
      this.$emit('click', $evt);
    }
  }
};

/* script */
var __vue_script__$s = script$s;
/* template */

var __vue_render__$s = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-progress-ring",
    on: {
      click: _vm.handleClick
    }
  }, [_c("svg", {
    attrs: {
      width: _vm.size,
      height: _vm.size,
      viewport: _vm.viewport,
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("circle", {
    staticClass: "wui-progress-track",
    style: _vm.trackStyles,
    attrs: {
      cx: _vm.radius,
      cy: _vm.radius,
      r: _vm.sRdius,
      fill: "transparent",
      "stroke-linecap": _vm.linecap,
      "stroke-dasharray": _vm.dasharray,
      "stroke-dashoffset": 0
    }
  }), _vm._v(" "), _c("circle", {
    staticClass: "wui-progress-bar",
    style: _vm.barStyles,
    attrs: {
      cx: _vm.radius,
      cy: _vm.radius,
      r: _vm.sRdius,
      fill: "transparent",
      "stroke-linecap": _vm.linecap,
      "stroke-dasharray": _vm.dasharray,
      "stroke-dashoffset": _vm.dashoffset
    }
  })])]);
};

var __vue_staticRenderFns__$s = [];
__vue_render__$s._withStripped = true;
/* style */

var __vue_inject_styles__$s = undefined;
/* scoped */

var __vue_scope_id__$s = undefined;
/* module identifier */

var __vue_module_identifier__$s = undefined;
/* functional template */

var __vue_is_functional_template__$s = false;
/* style inject */

/* style inject SSR */

var ProgressRing = normalizeComponent_1({
  render: __vue_render__$s,
  staticRenderFns: __vue_staticRenderFns__$s
}, __vue_inject_styles__$s, __vue_script__$s, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * wui-progress-line
 * @des 线形进度条组件
 * @param {Number} width - 组件长度,默认 100%
 * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
 * @param {Number | String} trackWidth - 进度槽的宽度, 默认值5<px>
 * @param {String} trackColor - 进度槽颜色, 取值范围 css color
 * @param {String} barColor - 进度条颜色, 取值范围 css color
 * @param {String} showText - 是否显示进度数值, 默认 false
 * @example
 *      <w-progress-line :percent="45" :width="150" :track-width="4"></w-progress-line>
 *      <w-progress-ring :percent="45" :width="150" :track-width="4"></w-progress-ring>
 **/
var script$t = {
  name: 'w-progress-line',
  props: {
    trackWidth: {
      type: Number,
      default: 0
    },
    width: {
      default: '100%',
      validator: function validator(val) {
        return /\d+%?$/.test(String(val));
      }
    },
    trackColor: {
      type: [String, Array],
      default: ''
    },
    barColor: {
      type: [String, Array],
      default: ''
    },
    duration: {
      type: Number,
      default: 500
    },
    showText: {
      type: Boolean,
      default: false
    },
    percent: {
      default: 0,
      validator: function validator(val) {
        return typeof val === 'number' && val >= 0 && val <= 100;
      }
    }
  },
  computed: {
    styles: function styles() {
      var s = {
        width: typeof this.width == 'number' ? this.width + 'px' : this.width
      };

      if (this.trackColor) {
        if (Array.isArray(this.trackColor)) {
          var linear = this.trackColor.join(',');
          s.backgroundImage = '-webkit-linear-gradient(' + linear + ')';
          s.backgroundImage = 'linear-gradient(' + linear + ')';
        } else {
          s.backgroundColor = this.trackColor;
        }
      }

      if (this.trackWidth) {
        s.height = this.trackWidth + 'px';
      }

      return s;
    },
    barStyles: function barStyles() {
      var s = {
        width: this.percent + '%',
        webkitTransitionDuration: this.duration + 'ms',
        transitionDuration: this.duration + 'ms'
      };

      if (this.barColor) {
        if (Array.isArray(this.barColor)) {
          var linear = this.barColor.join(',');
          s.backgroundImage = '-webkit-linear-gradient(' + linear + ')';
          s.backgroundImage = 'linear-gradient(' + linear + ')';
        } else {
          s.backgroundColor = this.barColor;
        }
      }

      return s;
    },
    textStyle: function textStyle() {
      return {
        left: this.percent + '%'
      };
    }
  },
  methods: {
    handleClick: function handleClick($evt) {
      this.$emit('click', $evt);
    }
  }
};

/* script */
var __vue_script__$t = script$t;
/* template */

var __vue_render__$t = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-progress-line",
    style: _vm.styles,
    on: {
      click: _vm.handleClick
    }
  }, [_c("div", {
    staticClass: "wui-progress-line-bar",
    style: _vm.barStyles
  }), _vm._v(" "), _vm.showText ? _c("div", {
    staticClass: "wui-progtress-line-text",
    style: _vm.textStyle
  }, [_vm._v(_vm._s(_vm.percent) + "%")]) : _vm._e()]);
};

var __vue_staticRenderFns__$t = [];
__vue_render__$t._withStripped = true;
/* style */

var __vue_inject_styles__$t = undefined;
/* scoped */

var __vue_scope_id__$t = undefined;
/* module identifier */

var __vue_module_identifier__$t = undefined;
/* functional template */

var __vue_is_functional_template__$t = false;
/* style inject */

/* style inject SSR */

var ProgressLine = normalizeComponent_1({
  render: __vue_render__$t,
  staticRenderFns: __vue_staticRenderFns__$t
}, __vue_inject_styles__$t, __vue_script__$t, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, undefined, undefined);

//
/**
 * wui-progress
 * @module Progress
 * @see {@link ../example/all/progress.html 实例}
 * @des 进度条组件
 * @param {Number} size - 环形组件直径大小,默认 100<px>
 * @param {Number | String} width - 线形组件长度,默认 100%
 * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
 * @param {Number} trackWidth - 进度槽的宽度, 默认值5<px>
 * @param {String} trackColor - 进度槽颜色, 取值范围 css color <hex, rgb, rgba>
 * @param {String} barColor - 进度条颜色, 取值范围 css color <hex, rgb, rgba>
 * @param {String} content - 显示内容, 默认''
 * @param {String} type - 进度条组件类型, 可取值 'line' [<w-progress-line />], 'ring' [<w-progress-ring />], 默认 'line'
 * @example
 *      <w-progress type="ring" :size="50" :track-width="5"></w-progress>
 **/

var script$u = {
  name: 'w-progress',
  props: {
    size: {
      type: Number,
      default: 80
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    trackColor: {
      type: [Array, String],
      default: ''
    },
    barColor: {
      type: [Array, String],
      default: ''
    },
    trackWidth: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 500
    },
    content: {
      type: String,
      default: ''
    },
    direction: String,
    percent: {
      default: 0,
      validator: function validator(val) {
        return typeof val === 'number' && val >= 0 && val <= 100;
      }
    },
    type: {
      type: String,
      default: 'line'
    },
    showText: {
      type: Boolean,
      default: false
    }
  },
  component: {
    'w-progress-line': ProgressLine,
    'w-progress-ring': ProgressRing
  },
  watch: {
    percent: function percent() {
      this.$emit('percent-change', this.percent);
    }
  },
  mounted: function mounted() {
    this.$emit('percent-change', this.percent);
  },
  methods: {
    handleClick: function handleClick($evt) {
      this.$emit('click', $evt);
    }
  }
};

/* script */
var __vue_script__$u = script$u;
/* template */

var __vue_render__$u = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-progress",
    on: {
      click: _vm.handleClick
    }
  }, [_vm.type === "line" ? _c("w-progress-line", {
    ref: "child-line",
    attrs: {
      width: _vm.width,
      "bar-color": _vm.barColor,
      "track-color": _vm.trackColor,
      "track-width": _vm.trackWidth,
      percent: _vm.percent,
      "show-text": _vm.showText,
      duration: _vm.duration
    }
  }) : _vm._e(), _vm._v(" "), _vm.type === "ring" ? _c("w-progress-ring", {
    ref: "child-ring",
    attrs: {
      size: _vm.size,
      "bar-color": _vm.barColor,
      "track-color": _vm.trackColor,
      "track-width": _vm.trackWidth,
      percent: _vm.percent,
      direction: _vm.direction,
      "show-text": _vm.showText,
      duration: _vm.duration
    }
  }, [_vm._v(_vm._s(_vm.mycontent))]) : _vm._e()], 1);
};

var __vue_staticRenderFns__$u = [];
__vue_render__$u._withStripped = true;
/* style */

var __vue_inject_styles__$u = undefined;
/* scoped */

var __vue_scope_id__$u = undefined;
/* module identifier */

var __vue_module_identifier__$u = undefined;
/* functional template */

var __vue_is_functional_template__$u = false;
/* style inject */

/* style inject SSR */

var Progress = normalizeComponent_1({
  render: __vue_render__$u,
  staticRenderFns: __vue_staticRenderFns__$u
}, __vue_inject_styles__$u, __vue_script__$u, __vue_scope_id__$u, __vue_is_functional_template__$u, __vue_module_identifier__$u, undefined, undefined);

Progress.install = function (vue) {
  vue.component('w-progress-ring', ProgressRing);
  vue.component('w-progress-line', ProgressLine);
  vue.component('w-progress', Progress);
};

//
var script$v = {
  props: {
    size: {
      type: Number,
      default: 20
    },
    pullText: {
      type: String,
      default: '刷新加载'
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    dropText: {
      type: String,
      default: '释放刷新'
    },
    pos: {
      type: String,
      default: ''
    },
    showStatus: {
      type: String,
      default: 'init'
    }
  },
  data: function data() {
    return {
      status: this.showStatus
    };
  },
  components: {
    'w-spinner': Spinner,
    'w-icon': Icon
  },
  computed: {
    loadText: function loadText() {
      return this.status !== 'init' ? this[this.status + 'Text'] : '';
    }
  },
  watch: {
    status: function status(val, old) {
      this.$emit('status-change', val);
    },
    showStatus: function showStatus(val, old) {
      this.status = val;
    }
  }
};

/* script */
var __vue_script__$v = script$v;
/* template */

var __vue_render__$v = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.pos == "top" || _vm.pos == "bottom" && _vm.status == "loading",
      expression: "pos=='top' || pos=='bottom' && status=='loading'"
    }],
    staticClass: "wui-loadmore-bar wui-al-cm"
  }, [_c("p", {
    staticClass: "wui-loadmore-spinner"
  }, [_c("w-spinner", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.status === "loading",
      expression: "status==='loading'"
    }],
    style: {
      verticalAlign: "middle"
    },
    attrs: {
      size: _vm.size,
      type: 6,
      color: "#aaa"
    }
  })], 1), _vm._v(" "), _c("p", {
    staticClass: "wui-loadmore-text",
    class: ["loadmore-" + _vm.status]
  }, [_vm.pos == "top" ? _c("span", {
    staticClass: "status-arrow"
  }, [_c("w-icon", {
    attrs: {
      height: 30,
      type: "refresharrow",
      fill: "#000"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.loadText))])])]);
};

var __vue_staticRenderFns__$v = [];
__vue_render__$v._withStripped = true;
/* style */

var __vue_inject_styles__$v = undefined;
/* scoped */

var __vue_scope_id__$v = undefined;
/* module identifier */

var __vue_module_identifier__$v = undefined;
/* functional template */

var __vue_is_functional_template__$v = false;
/* style inject */

/* style inject SSR */

var loadMoreBar = normalizeComponent_1({
  render: __vue_render__$v,
  staticRenderFns: __vue_staticRenderFns__$v
}, __vue_inject_styles__$v, __vue_script__$v, __vue_scope_id__$v, __vue_is_functional_template__$v, __vue_module_identifier__$v, undefined, undefined);

//
/**
 * wui-loadmore
 * @module Loadmore
 * @see {@link ../example/all/loadmore.html 实例}
 * @desc 加载更多组件
 * 
 * @param {String} topPullText - 内容上方loading拖动时显示文字
 * @param {String} topLoadingText - 内容上方loading拖动释放开始加载数据显示文字
 * @param {String} topDropText - 内容上方loading拖动超出指定距离，释放可加载时显示文字
 * @param {String} bottomPullText - 内容下方loading拖动时显示文字
 * @param {String} bottomLoadingText - 内容下方loading拖动释放开始加载数据显示文字
 * @param {String} bottomDropText - 内容下方loading拖动超出指定距离，释放可加载时显示文字
 * @param {Function} onRefresh - 内容上方loading加载数据方法
 * @param {Function} onInfinite - 内容下方loading加载数据方法
 * @param {Number} topLimit - 内容上方拖动距离可加载临界值
 * @param {Function} bottomLimit - 内容下方拖动距离可加载临界值
 * @param {String} topStatus - 内容上方组件状态
 * @param {String} bottomStatus - 内容下方组件状态
 * @param {Boolean} listenScroll - 是否监听scroll
 * 
 * @example
 *  <w-loadmore>content list</w-loadmore>
 */

var script$w = {
  name: 'w-loadmore',
  props: {
    topPullText: {
      type: String,
      default: '下拉刷新'
    },
    topLoadingText: {
      type: String,
      default: '正在加载新数据'
    },
    topDropText: {
      type: String,
      default: '释放加载'
    },
    bottomPullText: {
      type: String,
      default: '上拉刷新'
    },
    bottomLoadingText: {
      type: String,
      default: '加载中...'
    },
    bottomDropText: {
      type: String,
      default: '释放加载'
    },
    noMoreText: {
      type: String,
      default: '全部数据已加载'
    },
    onInfinite: {
      type: Function
    },
    onRefresh: {
      type: Function
    },
    topLimit: {
      type: Number,
      default: 60
    },
    bottomLimit: {
      type: Number,
      default: 120
    },
    topStatus: {
      type: String,
      default: 'init'
    },
    bottomStatus: {
      type: String,
      default: 'init'
    },
    noMoreData: {
      type: Boolean,
      default: false
    },
    listenScroll: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      translate: 0,
      direction: '',
      touchesY: 0,
      currentY: 0,
      tStatus: this.topStatus,
      bStatus: this.bottomStatus,
      draging: false,
      noMore: this.noMoreData,
      noData: false
    };
  },
  components: {
    'w-loadmore-bar': loadMoreBar
  },
  computed: {
    styles: function styles() {
      return {
        transform: 'translate3d(0,' + this.translate + 'px, 0)'
      };
    }
  },
  methods: {
    _handleTouchStart: function _handleTouchStart(e) {
      //document.body.addEventListener('scroll', this.stopScroll, false);
      if (this.tStatus === 'loading' || this.bStatus === 'loading') {
        return;
      }

      this.touchesY = e.touches[0].pageY;
      this.draging = true;
    },
    _handleTouchMove: function _handleTouchMove(e) {
      e.stopPropagation();

      if (this.tStatus === 'loading' || this.bStatus === 'loading' || !this.draging || this.$el.scrollTop > 0) {
        return;
      }

      this.currentY = e.touches[0].pageY;
      var distance = (this.currentY - this.touchesY) / 2; // 没有向下滑动

      if (distance <= 0) {
        return;
      }

      e.preventDefault();

      if (this.tStatus == 'init') {
        this.tStatus = 'pull';
      }

      this.translate = distance;

      if (distance > this.topLimit && this.tStatus == 'pull') {
        this.tStatus = 'drop';
      } else if (distance <= this.topLimit && this.tStatus == 'drop') {
        this.tStatus = 'pull';
      }
    },
    _handleTouchEnd: function _handleTouchEnd(e) {
      //document.body.removeEventListener('scroll', this.stopScroll, false);
      if (this.tStatus == 'loading' || this.bStatus == 'loading') {
        return;
      }

      this.draging = false; //e.preventDefault();
      //e.stopPropagation();

      if (this.tStatus === 'pull') {
        this.tStatus = 'init';
      } else if (this.tStatus === 'drop') {
        this.tStatus = 'loading';
      }
    },
    _getElementScrollTop: function _getElementScrollTop(elem) {
      if (elem === window) {
        return Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      }

      return elem.scrollTop;
    },
    _bindEvents: function _bindEvents() {
      this._doneScroll = this._scroll.bind(this);
      this.$el.addEventListener('touchstart', this._handleTouchStart.bind(this));
      this.$el.addEventListener('touchmove', this._handleTouchMove.bind(this));
      this.$el.addEventListener('touchend', this._handleTouchEnd.bind(this));
      this.$el.addEventListener('scroll', this._doneScroll, false);
    },
    _scroll: function _scroll() {
      if (this._checkReachBtm()) {
        this.bStatus = 'loading';
      }
    },
    _checkReachBtm: function _checkReachBtm() {
      if (!this.listenScroll && this.bStatus == 'loading') {
        return false;
      }

      var target = this.$el;

      var scrollTop = this._getElementScrollTop(target);

      var clientH = target.clientHeight;
      var scrollH = target.scrollHeight;
      return scrollH - clientH - scrollTop <= this.bottomLimit;
    },
    stopScroll: function stopScroll(e) {
      e.preventDefault();
    },
    doneRefresh: function doneRefresh() {
      this.tStatus = 'loading';
    },
    refreshDone: function refreshDone(status) {
      if (status === 'no-data') {
        !!this._doneScroll && this.$el.removeEventListener('scroll', this._doneScroll, false);
        this._doneScroll = null;
        this.noMore = false;
      } else if (status === 'no-more') {
        this._doneScroll && this.$el.removeEventListener('scroll', this._doneScroll, false);
        this._doneScroll = null;
        this.noMore = true;
      } else if (!this._doneScroll) {
        this._doneScroll = this._scroll.bind(this);
        this.$el.addEventListener('scroll', this._doneScroll, false);
        this.noMore = false;
      }

      this.tStatus = 'init';
    },
    infiniteDone: function infiniteDone(status) {
      if (status === 'no-more') {
        this._doneScroll && this.$el.removeEventListener('scroll', this._doneScroll, false);
        this._doneScroll = null;
        this.noMore = true;
      }

      this.bStatus = 'init';
    }
  },
  watch: {
    topStatus: function topStatus(val) {
      this.tStatus = val;
    },
    bottomStatus: function bottomStatus(val) {
      this.bStatus = val;
    },
    tStatus: function tStatus(val) {
      if (val == 'loading') {
        this.translate = 50;
        typeof this.onRefresh == 'function' && this.onRefresh(this.refreshDone);
      }

      if (val == 'init') {
        this.translate = 0;
      }

      this.$emit('top-status-change', val);
    },
    bStatus: function bStatus(val) {
      if (val == 'loading' && !this.noMore) {
        typeof this.onInfinite == 'function' && this.onInfinite(this.infiniteDone);
      }

      this.$emit('bottom-status-change', val);
    },
    listenScroll: function listenScroll(val) {
      if (val === false) {
        this.$el.removeEventListener('scroll', this._doneScroll, false);
        this._doneScroll = null;
      } else if (!this._doneScroll) {
        this._doneScroll = this._scroll.bind(this);
        this.$el.addEventListener('scroll', this._doneScroll, false);
      }
    },
    noMoreData: function noMoreData(val) {
      this.noMore = val;
    }
  },
  mounted: function mounted() {
    this._bindEvents();
  }
};

/* script */
var __vue_script__$w = script$w;
/* template */

var __vue_render__$w = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-loadmore"
  }, [_c("div", {
    staticClass: "wui-loadmore-content",
    style: _vm.styles
  }, [_vm._t("top", [_vm.onRefresh ? _c("w-loadmore-bar", {
    ref: "top",
    staticClass: "wui-loadmore-top",
    attrs: {
      "pull-text": _vm.topPullText,
      "loading-text": _vm.topLoadingText,
      "drop-text": _vm.topDropText,
      "show-status": _vm.tStatus,
      pos: "top"
    }
  }) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "wui-loadmore-content"
  }, [_vm._t("default")], 2), _vm._v(" "), _vm.onInfinite ? _vm._t("bottom", [_c("w-loadmore-bar", {
    ref: "bottom",
    staticClass: "wui-loadmore-bottom",
    attrs: {
      "pull-text": _vm.bottomPullText,
      "loading-text": _vm.bottomLoadingText,
      "drop-text": _vm.bottomDropText,
      "show-status": _vm.bStatus,
      pos: "bottom"
    }
  })]) : _vm._e(), _vm._v(" "), _vm.noMore ? _vm._t("no-more", [_c("div", {
    staticClass: "wui-loadmore-nomore"
  }, [_vm._v(_vm._s(_vm.noMoreText))])]) : _vm._e()], 2)]);
};

var __vue_staticRenderFns__$w = [];
__vue_render__$w._withStripped = true;
/* style */

var __vue_inject_styles__$w = undefined;
/* scoped */

var __vue_scope_id__$w = undefined;
/* module identifier */

var __vue_module_identifier__$w = undefined;
/* functional template */

var __vue_is_functional_template__$w = false;
/* style inject */

/* style inject SSR */

var LoadMore = normalizeComponent_1({
  render: __vue_render__$w,
  staticRenderFns: __vue_staticRenderFns__$w
}, __vue_inject_styles__$w, __vue_script__$w, __vue_scope_id__$w, __vue_is_functional_template__$w, __vue_module_identifier__$w, undefined, undefined);

LoadMore.install = function (vue) {
  vue.component('w-loadmore', LoadMore);
};

//
var VERTICAL = 'vertical';
var HORIZONTAL = 'horizontal';
/**
 * wui-swipe
 * @module Swipe
 * @see {@link ../example/all/swipe.html 实例}
 * @desc 切换组件
 * @param {Number} height=200 - 可视高度
 * @param {Number} width - 可视宽度
 * @param {Number} defaultIndex - 默认当前显示子项索引
 * @param {String} dotColor=#666 - 切换点颜色, css color
 * @param {String} curDotColor=#fff - 当前高亮切换点颜色, css color
 * @param {String} dirType=horizontal - 切换方向，水平或者垂直
 * @param {Boolean} showDotes=true - 是否显示切换点
 * @param {Boolean} autoPlay=false - 是否自动播放
 * @param {Number} interval=2000 - 自动播放间隔时间 毫秒
 * 
 * @example
 *  <w-swipe :interval="3000" :auto-play="true" :height="320">
 *      <w-swipte-item>内容</w-swipe-item>
 *      <w-swipte-item>内容</w-swipe-item>
 * </w-swipe>
 */

var script$x = {
  name: 'w-swipe',
  props: {
    height: {
      type: Number,
      default: 200
    },
    width: {
      type: Number
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    dotColor: {
      type: String
    },
    curDotColor: {
      type: String
    },
    dirType: {
      type: String,
      default: HORIZONTAL
    },
    showDotes: {
      type: Boolean,
      default: true
    },
    dotesPos: {
      type: String,
      default: 'bottom'
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 2000
    }
  },
  data: function data() {
    return {
      index: this.defaultIndex,
      direction: '',
      items: [],
      timmer: null,
      status: 'waiting',
      size: 0,
      itemWidth: this.dirType == HORIZONTAL ? this.width : this.height,
      distance: 0,
      originTouches: {}
    };
  },
  computed: {
    styles: function styles() {
      return {
        height: this.height + 'px',
        width: this.width + 'px'
      };
    },
    wrapStyles: function wrapStyles() {
      var distance = 0,
          transform = {};

      if (this.dirType == VERTICAL) {
        distance = -1 * this.index * this.height + this.distance;
        transform = 'translate3d(0,' + distance + 'px, 0)';
      } else if (this.dirType == HORIZONTAL) {
        distance = -1 * this.index * this.width + this.distance;
        transform = 'translate3d(' + distance + 'px, 0, 0)';
      }

      return {
        transform: transform
      };
    },
    dotStyles: function dotStyles() {
      return {
        backgroundColor: this.dotColor
      };
    },
    dotesClass: function dotesClass() {
      return ["pos-".concat(this.dotesPos)];
    },
    classes: function classes() {
      return [this.status == "transition" ? 'transition' : '', this.dirType == HORIZONTAL ? 'horizontal' : 'vertical'];
    }
  },
  watch: {
    index: function index(val, old) {
      this.$emit('index-change', val);
    },
    height: function height(val, old) {
      this._reset();
    },
    width: function width() {
      this._reset();
    },
    status: function status(val) {
      this.$emit('status-change', val);
    },
    autoPlay: function autoPlay(val) {
      if (val) {
        !this.timmer && this._autoPlay();
      } else {
        this._stopPlay();
      }
    }
  },
  methods: {
    _reset: function _reset() {
      this.distance = 0;
      this.status = 'waiting';
      this.index = this.defaultIndex;

      this._stopPlay();

      this.autoPlay && this._autoPlay();
    },
    _handleStart: function _handleStart(e) {
      if (this.status !== 'waiting') return;
      this.status = 'dragstart'; // e.preventDefault();
      // e.stopPropagation();

      if (this.timmer) {
        this._stopPlay();
      }

      this.originTouches = e.touches[0];
    },
    _handleMove: function _handleMove(e) {
      if (this.status !== 'dragstart' && this.status !== 'draging') return;
      this.status = 'draging';
      e.preventDefault();
      e.stopPropagation();
      var touches = e.touches[0];

      var m = this._computeMove(this.originTouches, touches); // 判断角度


      if (!m.swipeAble) {
        return;
      }
      this.distance = m.dis;
    },
    _handleEnd: function _handleEnd(e) {
      if (this.status == 'dragstart') return this.status = 'waiting';
      if (this.status !== 'draging') return;
      this.status = 'dragend';
      var touches = e.changedTouches[0];

      var m = this._computeMove(this.originTouches, touches);

      var index = this.index;

      if (!m.swipeAble) {
        return this.status = 'waiting';
      }

      if (m.swipeAble && Math.abs(m.dis) >= 20) {
        index += ['left', 'up'].indexOf(this.direction) >= 0 ? 1 : -1;
      }

      this.goIndex(index);
    },
    _transitionEnd: function _transitionEnd() {
      this.status = 'waiting'; // 保证不重复自动播放

      !this.timmer && this.autoPlay && this._autoPlay();
    },
    _transitionStart: function _transitionStart() {
      this.status = 'transition';
    },
    _computeMove: function _computeMove(ot, et) {
      var distance = this.dirType == HORIZONTAL ? et.pageX - ot.pageX : et.pageY - ot.pageY;

      if (this.dirType == HORIZONTAL) {
        this.direction = distance < 0 ? 'left' : 'right';
      } else {
        this.direction = distance < 0 ? 'up' : 'down';
      }

      return {
        dis: distance,
        // 判断角度
        swipeAble: this.dirType == HORIZONTAL && Math.abs(et.pageX - ot.pageX) >= Math.abs(et.pageY - ot.pageY) || this.dirType == VERTICAL && Math.abs(et.pageX - ot.pageX) < Math.abs(et.pageY - ot.pageY)
      };
    },
    goIndex: function goIndex(index) {
      // 保证不超出0~this.size-1
      index = limit(index, 0, this.size - 1); // 转页才有动画

      if (index !== this.index) {
        this.status = 'transition';
      } else {
        this.status = 'waiting';
      }

      this.distance = 0;
      this.index = index;

      if (!this.timmer && this.autoPlay) {
        // 保证不重复自动播放
        this._autoPlay();
      }
    },
    _autoPlay: function _autoPlay() {
      var _this = this;

      this.direction = this.dirType == HORIZONTAL ? 'left' : 'up';
      var i = 1;
      this.timmer = setInterval(function () {
        if (_this.index >= _this.size - 1) {
          i = -1;
        } else if (_this.index <= 0) {
          i = 1;
        }

        _this.goIndex(_this.index + i);
      }, this.interval);
    },
    _stopPlay: function _stopPlay() {
      clearInterval(this.timmer);
      this.timmer = null;
    },
    _bindTouch: function _bindTouch() {
      this.$el.addEventListener('touchstart', this._handleStart.bind(this), false);
      this.$el.addEventListener('touchmove', this._handleMove.bind(this), false);
      this.$el.addEventListener('touchend', this._handleEnd.bind(this), false);
      this.$el.addEventListener('transitionend', this._transitionEnd.bind(this), false);
      this.$el.addEventListener('webkitTransitionEnd', this._transitionEnd.bind(this), false);
      this.$el.addEventListener('transitionstart', this._transitionStart.bind(this), false);
      this.$el.addEventListener('webkitTransitionStart', this._transitionStart.bind(this), false);
    },
    handleClick: function handleClick($evt) {
      this.$emit('click', $evt);
    }
  },
  mounted: function mounted() {
    // 初始化
    this.items = [].slice.call(this.$el.querySelectorAll('.wui-swipe-item'));
    this.size = this.items.length;

    if (this.index < 0 || this.index >= this.size) {
      this.index = 0;
      console.warn('[Wui warn]:Index out of range');
    }

    this._bindTouch(); //this.distance = -1 * this.index * this.itemWidth;


    this.autoPlay && this._autoPlay();
  }
};

/* script */
var __vue_script__$x = script$x;
/* template */

var __vue_render__$x = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-swipe",
    style: _vm.styles,
    on: {
      click: _vm.handleClick
    }
  }, [_c("div", {
    staticClass: "wui-swipe-wrap",
    class: _vm.classes,
    style: _vm.wrapStyles
  }, [_vm._t("default")], 2), _vm._v(" "), _vm.showDotes ? _c("div", {
    staticClass: "wui-swpier-dotes",
    class: _vm.dotesClass
  }, _vm._l(_vm.items, function (item, i) {
    return _c("span", {
      key: "swiper-" + i,
      class: ["wui-swipe-dot", i == _vm.index ? "wui-swipe-dot-cur" : ""],
      style: [_vm.dotStyles, i == _vm.index ? {
        backgroundColor: _vm.curDotColor
      } : {}],
      on: {
        click: function click($event) {
          $event.stopPropagation();
          return _vm.goIndex(i);
        }
      }
    });
  }), 0) : _vm._e()]);
};

var __vue_staticRenderFns__$x = [];
__vue_render__$x._withStripped = true;
/* style */

var __vue_inject_styles__$x = undefined;
/* scoped */

var __vue_scope_id__$x = undefined;
/* module identifier */

var __vue_module_identifier__$x = undefined;
/* functional template */

var __vue_is_functional_template__$x = false;
/* style inject */

/* style inject SSR */

var Swipe = normalizeComponent_1({
  render: __vue_render__$x,
  staticRenderFns: __vue_staticRenderFns__$x
}, __vue_inject_styles__$x, __vue_script__$x, __vue_scope_id__$x, __vue_is_functional_template__$x, __vue_module_identifier__$x, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$y = {
  name: 'w-swipe'
};

/* script */
var __vue_script__$y = script$y;
/* template */

var __vue_render__$y = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-swipe-item"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$y = [];
__vue_render__$y._withStripped = true;
/* style */

var __vue_inject_styles__$y = undefined;
/* scoped */

var __vue_scope_id__$y = undefined;
/* module identifier */

var __vue_module_identifier__$y = undefined;
/* functional template */

var __vue_is_functional_template__$y = false;
/* style inject */

/* style inject SSR */

var SwipeItem = normalizeComponent_1({
  render: __vue_render__$y,
  staticRenderFns: __vue_staticRenderFns__$y
}, __vue_inject_styles__$y, __vue_script__$y, __vue_scope_id__$y, __vue_is_functional_template__$y, __vue_module_identifier__$y, undefined, undefined);

Swipe.install = function (vue) {
  vue.component('w-swipe-item', SwipeItem);
  vue.component('w-swipe', Swipe);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$z = {
  name: 'bee-action-sheet-item',
  props: {
    action: Function
  },
  methods: {
    handleClick: function handleClick(e) {
      this.$emit('click', e);
    }
  }
};

/* script */
var __vue_script__$z = script$z;
/* template */

var __vue_render__$z = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "bee-action-sheet__item bee-border-1px bee-border-b",
    on: {
      click: _vm.handleClick
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$z = [];
__vue_render__$z._withStripped = true;
/* style */

var __vue_inject_styles__$z = undefined;
/* scoped */

var __vue_scope_id__$z = undefined;
/* module identifier */

var __vue_module_identifier__$z = undefined;
/* functional template */

var __vue_is_functional_template__$z = false;
/* style inject */

/* style inject SSR */

var ActionSheetItem = normalizeComponent_1({
  render: __vue_render__$z,
  staticRenderFns: __vue_staticRenderFns__$z
}, __vue_inject_styles__$z, __vue_script__$z, __vue_scope_id__$z, __vue_is_functional_template__$z, __vue_module_identifier__$z, undefined, undefined);

var script$A = {
  name: 'bee-action-sheet',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    isRemove: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      visiable: this.isShow
    };
  },
  components: _defineProperty({
    'bee-mask': Mask
  }, ActionSheetItem.name, ActionSheetItem),
  watch: {
    isShow: function isShow(val) {
      this.visiable = val;
    },
    visiable: function visiable(val) {
      this.$emit('visiable-change', val);
    }
  },
  computed: {
    styles: function styles() {
      return {};
    }
  },
  methods: {
    hide: function hide() {
      this.visiable = false;
      this.$emit('hide', false);
    },
    show: function show() {
      this.visiable = true;
      this.$emit('show', true);
    },
    _leave: function _leave() {
      // 动画结束，清除元素
      if (this.isRemove) {
        this.$destroy();
      }

      this.$emit('transition-leave', this);
    },
    _enter: function _enter() {
      this.$emit('transition-enter', this);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      console.log(_this.$refs['oel'].offsetHeight);
    });
  }
};

/* script */
var __vue_script__$A = script$A;
/* template */

var __vue_render__$A = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("w-mask", {
    attrs: {
      "is-show": _vm.visiable,
      "is-remove": _vm.isRemove
    },
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.hide($event);
      }
    }
  }, [_c("transition", {
    attrs: {
      name: "bee-animate_bibo"
    },
    on: {
      "after-enter": _vm._enter,
      "after-leave": _vm._leave
    }
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visiable,
      expression: "visiable"
    }],
    ref: "oel",
    staticClass: "bee-action-sheet",
    style: _vm.styles
  }, [_c("div", {
    staticClass: "bee-action-sheet__box"
  }, [_c("div", {
    staticClass: "bee-action-sheet__list"
  }, [_vm._t("default", _vm._l(_vm.actions, function (ac, $i) {
    return _c("w-action-sheet-item", {
      key: "as-" + $i,
      on: {
        click: ac.action
      }
    }, [_vm._v(_vm._s(ac.text))]);
  }))], 2), _vm._v(" "), _c("div", {
    staticClass: "bee-action-sheet__button",
    on: {
      click: _vm.hide
    }
  }, [_vm._v("取消")])])])])], 1);
};

var __vue_staticRenderFns__$A = [];
__vue_render__$A._withStripped = true;
/* style */

var __vue_inject_styles__$A = undefined;
/* scoped */

var __vue_scope_id__$A = undefined;
/* module identifier */

var __vue_module_identifier__$A = undefined;
/* functional template */

var __vue_is_functional_template__$A = false;
/* style inject */

/* style inject SSR */

var ActionSheet = normalizeComponent_1({
  render: __vue_render__$A,
  staticRenderFns: __vue_staticRenderFns__$A
}, __vue_inject_styles__$A, __vue_script__$A, __vue_scope_id__$A, __vue_is_functional_template__$A, __vue_module_identifier__$A, undefined, undefined);

var ActionSheetClass, instance$2, vm$2;
/**
 * w-action-sheet
 * @module ActionSheet
 * @see {@link ../example/all/action-sheet.html 实例}
 * @desc ActionSheet框组件 <w-action-sheet />
 * @param {Array} actions - 动作菜单项
 * @param {Boolean} isShow=false - 是否显示
 * @param {Boolean} isRemove=false - 是否隐藏后删除
 * @param {Function} hide - 隐藏
 * @param {Function} show - 显示
 * @param {Event} show - 显示时触发
 * @param {Event} hide - 隐藏时触发
 * @param {Event} visiable-change - 显示隐藏时都会触发
 * @param {Slot} slot - default - 组件slot
 * @example
 * import {ActionSheet} from 'wui/packages/action-sheet';
 * 
 * // 动态创建
 * ActionSheet.show({
 *  actions:[{
 *      text:'执行动作一',
 *      action(){
 *          console.log('执行动作一')
 *      }
 *  },{
 *      text:'执行动作二',
 *      action(){
 *          console.log('执行动作二')
 *      }
 *  }]
 * });
 * 
 * // 标签方式
 * vue.use(ActionSheet);
 * 
 * <w-action-sheet @visiable-change="visiableChange" :is-show="isShow" :actions="actions"></w-action-sheet>
 * 
 * 
 * new Vue({
 *      el:'#app',
 *      data:function(){
 *          return {
 *              isShow: false,
 *              actions:[{
 *                  text:'执行动作一',
 *                  action(){
 *                      console.log('执行动作一')
 *                  }
 *              },{
 *                  text:'执行动作二',
 *                  action(){
 *                      console.log('执行动作二')
 *                  }
 *              }]
 *          }
 *      },
 *      methods:{
 *          show: function(){
 *              this.isShow = true;
 *          },
 *          hide: function(){
 *              this.isShow = false;
 *          },
 *          visiableChange: function(visiable){
 *              this.isShow = visiable;
 *          },
 *          showActionSheet:function(){
 *              Wui.ActionSheet.show({
 *                 actions: this.actions
 *              });
 *          }
 *     }
 * })
 *
 */

ActionSheet.install = function (vue) {
  vue.component(ActionSheet.name, ActionSheet);
  vue.component(ActionSheetItem.name, ActionSheetItem);
  ActionSheetClass = vue.extend(ActionSheet);
};
/**
 * @method show
 * @param {Object} opts - 配置项, <a href="#module_ActionSheet">参见</a>
 * @static
 * @returns ActionSheetClass实例
 * 
 * @example
 * 
 *      Wui.ActionSheet.show({actions:{text:'执行动作', action: function(){console.log('do something')}}})
 * 
 */


ActionSheet.show = function (opts) {
  if (instance$2) {
    ActionSheet.hide();
  }

  instance$2 = new ActionSheetClass({
    el: document.createElement('div'),
    propsData: Object.assign(opts || {}, {
      isRemove: true
    })
  });
  instance$2.$nextTick(function () {
    vm$2 = instance$2.$mount();
    document.body.appendChild(vm$2.$el);
    instance$2.show();
  });
  return instance$2;
};
/**
 * @method hide
 * @static
 * 
 * @example
 * 
 *   Wui.ActionSheet.hide()
 * 
 */


ActionSheet.hide = function () {
  if (instance$2) {
    instance$2.hide();
    vm$2 = null;
    instance$2 = null;
  }
};
/**
 * @desc 判断actionsheet是否显示
 * @method isVisiable
 * @static
 * @return {Boolean} - 是否显示
 * 
 * @example
 * 
 *   if （Wui.ActionSheet.isVisiable(){
 *     console.log('done something')
 *   }
 * 
 */


ActionSheet.isVisiable = function () {
  return instance$2 && instance$2.isShow;
};

//
var script$B = {
  name: 'w-input',
  props: {
    placeholder: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    maxlength: {
      type: [Number, String],
      default: 50
    },
    pattern: String,
    format: [String, Array],
    value: [String, Number],
    deFormat: Function,
    enFormat: Function,
    styles: Object,
    autofocus: Boolean
  },
  data: function data() {
    return {
      active: false,
      currentValue: this.value,
      selectionStart: 0,
      deFormatFunction: this.deFormat,
      enFormatFunction: this.enFormat
    };
  },
  directives: {
    Clickoutside: Clickoutside
  },
  watch: {
    value: function value(val) {
      this.currentValue = this.hanleFormat(val);
    },
    currentValue: function currentValue(val) {
      if (val === '') {
        return this.$emit('input', val);
      }

      if (this.deFormatFunction) {
        val = this.deFormatFunction(val);

        if (val == this.value) {
          this.currentValue = this.hanleFormat(val);
        }
      }

      this.$emit('input', val);
    },
    autofocus: function autofocus(val) {
      if (val) {
        //this.$nextTick(()=>{
        this.$el.querySelector('.wui-input').focus(); //})
      }
    }
  },
  methods: {
    unActive: function unActive() {
      this.active = false;
    },
    handleEnter: function handleEnter() {
      this.$emit('enter', this.currentValue);
    },
    handleFocus: function handleFocus() {
      if (this.disabled || this.readonly) return;
      this.active = true;
      this.$emit('focus', this.currentValue);
    },
    handleBlur: function handleBlur() {
      this.$emit('blur', this.currentValue);
    },
    handleInput: function handleInput($evt) {//this.$emit('input', $evt);
    },
    handleChange: function handleChange() {},
    hanleFormat: function hanleFormat(val) {
      if (typeof this.enFormatFunction === 'function') {
        return this.enFormatFunction(val);
      }

      return val;
    },
    handleClear: function handleClear() {
      if (this.disabled || this.readonly) return;
      this.currentValue = '';
    }
  },
  mounted: function mounted() {
    if (this.value) {
      this.currentValue = this.hanleFormat(this.value);
    }

    if (this.format) {
      switch (this.format) {
        case 'numberic':
          this.enFormatFunction = enFormatNumberic;
          this.deFormatFunction = deFormatNumberic;
          break;

        case 'bankcard':
          this.deFormatFunction = deFormatBankCard;
          this.enFormatFunction = enFormatBankCard;
          this.dms = ' ';
          break;

        default:
          if (Array.isArray(this.format)) {
            var dms = this.format[1] || ' ';
            var blocks = this.format[0];

            this.enFormatFunction = function (n) {
              return formatBlocks(n, blocks, dms);
            }.bind(this);

            this.deFormatFunction = function (n) {
              return String(n).replace(new RegExp('\\' + dms, 'g'), '');
            }.bind(this);
          }

          break;
      }
    }

    if (this.autofocus) {
      //this.$nextTick(()=>{
      this.$el.querySelector('.wui-input').focus(); //})
    }
  }
};

/* script */
var __vue_script__$B = script$B;
/* template */

var __vue_render__$B = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    directives: [{
      name: "clickoutside",
      rawName: "v-clickoutside",
      value: _vm.unActive,
      expression: "unActive"
    }],
    staticClass: "wui-input-wrap"
  }, [_c("div", {
    staticClass: "wui-input-content"
  }, [_vm.type === "checkbox" ? _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentValue,
      expression: "currentValue"
    }],
    staticClass: "wui-input",
    style: _vm.styles,
    attrs: {
      placeholder: _vm.placeholder,
      disabled: _vm.disabled,
      readonly: _vm.readonly,
      name: _vm.name,
      maxlength: _vm.maxlength,
      pattern: _vm.pattern,
      type: "checkbox"
    },
    domProps: {
      checked: Array.isArray(_vm.currentValue) ? _vm._i(_vm.currentValue, null) > -1 : _vm.currentValue
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.handleEnter($event);
      },
      focus: _vm.handleFocus,
      blur: _vm.handleBlur,
      input: _vm.handleInput,
      change: [function ($event) {
        var $$a = _vm.currentValue,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.currentValue = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.currentValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.currentValue = $$c;
        }
      }, _vm.handleChange]
    }
  }) : _vm.type === "radio" ? _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentValue,
      expression: "currentValue"
    }],
    staticClass: "wui-input",
    style: _vm.styles,
    attrs: {
      placeholder: _vm.placeholder,
      disabled: _vm.disabled,
      readonly: _vm.readonly,
      name: _vm.name,
      maxlength: _vm.maxlength,
      pattern: _vm.pattern,
      type: "radio"
    },
    domProps: {
      checked: _vm._q(_vm.currentValue, null)
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.handleEnter($event);
      },
      focus: _vm.handleFocus,
      blur: _vm.handleBlur,
      input: _vm.handleInput,
      change: [function ($event) {
        _vm.currentValue = null;
      }, _vm.handleChange]
    }
  }) : _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentValue,
      expression: "currentValue"
    }],
    staticClass: "wui-input",
    style: _vm.styles,
    attrs: {
      placeholder: _vm.placeholder,
      disabled: _vm.disabled,
      readonly: _vm.readonly,
      name: _vm.name,
      maxlength: _vm.maxlength,
      pattern: _vm.pattern,
      type: _vm.type
    },
    domProps: {
      value: _vm.currentValue
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.handleEnter($event);
      },
      focus: _vm.handleFocus,
      blur: _vm.handleBlur,
      input: [function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.currentValue = $event.target.value;
      }, _vm.handleInput],
      change: _vm.handleChange
    }
  })]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.active && _vm.currentValue,
      expression: "active && currentValue"
    }],
    staticClass: "wui-input-clear",
    on: {
      click: _vm.handleClear
    }
  }, [_c("w-icon", {
    attrs: {
      type: "roundclosefill",
      fill: "#d8d8d8",
      width: 16,
      height: 16
    }
  })], 1)]);
};

var __vue_staticRenderFns__$B = [];
__vue_render__$B._withStripped = true;
/* style */

var __vue_inject_styles__$B = undefined;
/* scoped */

var __vue_scope_id__$B = undefined;
/* module identifier */

var __vue_module_identifier__$B = undefined;
/* functional template */

var __vue_is_functional_template__$B = false;
/* style inject */

/* style inject SSR */

var Input = normalizeComponent_1({
  render: __vue_render__$B,
  staticRenderFns: __vue_staticRenderFns__$B
}, __vue_inject_styles__$B, __vue_script__$B, __vue_scope_id__$B, __vue_is_functional_template__$B, __vue_module_identifier__$B, undefined, undefined);

Input.install = function (vue) {
  vue.component(Input.name, Input);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$C = {
  name: 'w-switch',
  props: {
    value: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 52
    },
    height: {
      type: [Number, String],
      default: 32
    }
  },
  data: function data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value: function value(val) {
      this.currentValue = val;
    },
    currentValue: function currentValue(val) {
      this.$emit('input', val);
    }
  }
};

/* script */
var __vue_script__$C = script$C;
/* template */

var __vue_render__$C = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("label", [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentValue,
      expression: "currentValue"
    }],
    staticClass: "wui-switch wui-switch-animbg",
    attrs: {
      type: "checkbox"
    },
    domProps: {
      checked: Array.isArray(_vm.currentValue) ? _vm._i(_vm.currentValue, null) > -1 : _vm.currentValue
    },
    on: {
      change: function change($event) {
        var $$a = _vm.currentValue,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.currentValue = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.currentValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.currentValue = $$c;
        }
      }
    }
  })]);
};

var __vue_staticRenderFns__$C = [];
__vue_render__$C._withStripped = true;
/* style */

var __vue_inject_styles__$C = undefined;
/* scoped */

var __vue_scope_id__$C = undefined;
/* module identifier */

var __vue_module_identifier__$C = undefined;
/* functional template */

var __vue_is_functional_template__$C = false;
/* style inject */

/* style inject SSR */

var Switch = normalizeComponent_1({
  render: __vue_render__$C,
  staticRenderFns: __vue_staticRenderFns__$C
}, __vue_inject_styles__$C, __vue_script__$C, __vue_scope_id__$C, __vue_is_functional_template__$C, __vue_module_identifier__$C, undefined, undefined);

Switch.install = function (vue) {
  vue.component(Switch.name, Switch);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
var script$D = {
  name: 'w-option',
  props: {
    value: [Array, String, Object, Number],
    checked: {
      type: Boolean,
      default: false
    },
    Disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      currentValue: this.value
    };
  },
  methods: {
    handleClick: function handleClick($e) {
      this.$parent.$parent.$emit('change', this.value);
    }
  }
};

/* script */
var __vue_script__$D = script$D;
/* template */

var __vue_render__$D = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("li", {
    staticClass: "wui-select-options-item",
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.handleClick($event);
      }
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$D = [];
__vue_render__$D._withStripped = true;
/* style */

var __vue_inject_styles__$D = undefined;
/* scoped */

var __vue_scope_id__$D = undefined;
/* module identifier */

var __vue_module_identifier__$D = undefined;
/* functional template */

var __vue_is_functional_template__$D = false;
/* style inject */

/* style inject SSR */

var Option = normalizeComponent_1({
  render: __vue_render__$D,
  staticRenderFns: __vue_staticRenderFns__$D
}, __vue_inject_styles__$D, __vue_script__$D, __vue_scope_id__$D, __vue_is_functional_template__$D, __vue_module_identifier__$D, undefined, undefined);

var _components;
var script$E = {
  name: 'w-select',
  props: {
    width: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: ''
    },
    inputStyles: Object,
    placeholder: String,
    options: {
      type: Array,
      default: function _default() {
        return [];
      },
      validator: function validator(val) {
        if (!val.length) return true;
        return val.every(function (v) {
          var t = _typeof(v);

          return ['string', 'number'].indexOf(t) > -1 || v.hasOwnProperty('label');
        });
      }
    },
    title: String,
    optionHeight: {
      type: [Number, String]
    },
    value: [Object, String, Number],
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      currentValue: this.value,
      visiable: this.isShow,
      selectedIndex: ''
    };
  },
  components: (_components = {}, _defineProperty(_components, Mask.name, Mask), _defineProperty(_components, Cell.name, Cell), _defineProperty(_components, Row.name, Row), _defineProperty(_components, Input.name, Input), _defineProperty(_components, Option.name, Option), _components),
  computed: {
    styles: function styles() {
      var o = {},
          w = this.width,
          h = this.height;

      if (h) {
        o.height = /^\d+$/.test(h) ? h + 'px' : h;
      }

      if (this.width) {
        o.width = /^\d+$/.test(w) ? w + 'px' : w;
      }

      return o;
    },
    optionStyles: function optionStyles() {
      var oh = this.optionHeight,
          o = {};

      if (oh) {
        o.height = /^\d+$/.test(oh) ? oh + 'px' : oh;
      }

      return o;
    }
  },
  watch: {
    visiable: function visiable(val) {
      if (val === true) {
        this.$emit('show', this);
      }

      if (val === false) {
        this.$emit('hide', this);
      }

      this.$emit('visiable-change', val, this);
    },
    isShow: function isShow(val) {
      this.visiable = val;
    },
    value: function value(val) {
      this.currentValue = val;
    },
    currentValue: function currentValue(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    closeOptions: function closeOptions() {
      this.visiable = false;
    },
    openOptions: function openOptions() {
      this.visiable = true;
    },
    handleClick: function handleClick($e) {
      this.openOptions();
      this.$emit('click', $e);
    },
    handleChange: function handleChange(option) {
      this.currentValue = option;
      this.visiable = false;
    }
  },
  mounted: function mounted() {
    this.$on('change', this.handleChange);
  }
};

/* script */
var __vue_script__$E = script$E;
/* template */

var __vue_render__$E = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-select",
    style: _vm.styles,
    on: {
      "touch-move": function touchMove($evt) {
        return $evt.preventDefault();
      },
      click: function click($event) {
        $event.stopPropagation();
        return _vm.handleClick($event);
      }
    }
  }, [_c("div", {
    staticClass: "wui-select-content"
  }, [Object(_vm.currentValue).hasOwnProperty("label") ? _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentValue.label,
      expression: "currentValue.label"
    }],
    staticClass: "wui-select-input",
    style: _vm.inputStyles,
    attrs: {
      type: "text",
      readonly: "",
      placeholder: _vm.placeholder
    },
    domProps: {
      value: _vm.currentValue.label
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.$set(_vm.currentValue, "label", $event.target.value);
      }
    }
  }) : _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentValue,
      expression: "currentValue"
    }],
    staticClass: "wui-select-input",
    style: _vm.inputStyles,
    attrs: {
      type: "text",
      readonly: "",
      placeholder: _vm.placeholder
    },
    domProps: {
      value: _vm.currentValue
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.currentValue = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("w-mask", {
    attrs: {
      "is-show": _vm.visiable
    },
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.closeOptions($event);
      }
    }
  }, [_c("transition", {
    attrs: {
      name: "wui-bibo"
    }
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visiable,
      expression: "visiable"
    }],
    staticClass: "wui-select-options-con",
    style: _vm.optionStyles
  }, [_c("ul", {
    staticClass: "wui-select-options",
    class: ["c-select-options-list-" + _vm._uid],
    on: {
      touchmove: function touchmove($event) {
        $event.stopPropagation();
        return function (e) {}($event);
      }
    }
  }, [_vm._t("default", _vm._l(_vm.options, function (option, $index) {
    return _c("w-option", {
      key: "select_" + $index,
      attrs: {
        value: option
      }
    }, [_vm._v(_vm._s(option.hasOwnProperty("label") ? option.label : option))]);
  }))], 2)])])], 1)], 1);
};

var __vue_staticRenderFns__$E = [];
__vue_render__$E._withStripped = true;
/* style */

var __vue_inject_styles__$E = undefined;
/* scoped */

var __vue_scope_id__$E = undefined;
/* module identifier */

var __vue_module_identifier__$E = undefined;
/* functional template */

var __vue_is_functional_template__$E = false;
/* style inject */

/* style inject SSR */

var Select = normalizeComponent_1({
  render: __vue_render__$E,
  staticRenderFns: __vue_staticRenderFns__$E
}, __vue_inject_styles__$E, __vue_script__$E, __vue_scope_id__$E, __vue_is_functional_template__$E, __vue_module_identifier__$E, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
var script$F = {
  name: 'w-option',
  props: {
    value: [Array, String, Object, Number],
    checked: {
      type: Boolean,
      default: false
    },
    Disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      currentValue: this.value
    };
  },
  methods: {
    handleClick: function handleClick($e) {
      this.$parent.$parent.$emit('change', this.value);
    }
  }
};

/* script */
var __vue_script__$F = script$F;
/* template */

var __vue_render__$F = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("li", {
    staticClass: "wui-select-options-item",
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.handleClick($event);
      }
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$F = [];
__vue_render__$F._withStripped = true;
/* style */

var __vue_inject_styles__$F = undefined;
/* scoped */

var __vue_scope_id__$F = undefined;
/* module identifier */

var __vue_module_identifier__$F = undefined;
/* functional template */

var __vue_is_functional_template__$F = false;
/* style inject */

/* style inject SSR */

var Option$1 = normalizeComponent_1({
  render: __vue_render__$F,
  staticRenderFns: __vue_staticRenderFns__$F
}, __vue_inject_styles__$F, __vue_script__$F, __vue_scope_id__$F, __vue_is_functional_template__$F, __vue_module_identifier__$F, undefined, undefined);

Select.install = function (vue) {
  vue.component(Option$1.name, Option$1);
  vue.component(Select.name, Select);
};

//
var iconProps = {
  fill: '#c0c0c0',
  width: 18,
  height: 18,
  type: 'right'
};
var script$G = {
  name: 'w-list-item',
  props: {
    height: {
      type: [Number, String],
      default: 42
    },
    label: String,
    content: String,
    labelWidth: {
      type: [Number, String],
      default: 80
    },
    labelAlign: {
      type: String,
      default: 'left'
    },
    labelVertical: {
      type: String,
      default: 'middle'
    },
    labelStyle: Object,
    showLabel: {
      type: Boolean,
      default: true
    },
    iconWidth: {
      type: [Number, String],
      default: 28
    },
    iconAlign: {
      type: String,
      default: 'center'
    },
    iconStyle: Object,
    iconVertical: String,
    showIcon: {
      type: Boolean,
      default: true
    },
    icon: {
      type: Object,
      default: function _default() {
        return iconProps;
      }
    }
  },
  data: function data() {
    return {
      _icon: this.icon
    };
  },
  components: {
    'w-row': Row,
    'w-cell': Cell
  },
  computed: {
    styles: function styles() {
      return {
        height: /^\d+$/.test(String(this.height)) ? this.height + 'px' : this.height
      };
    }
  },
  watch: {
    icon: function icon(val) {
      this._icon = Object.assign(iconProps, val || {});
    }
  },
  methods: {
    handleLabelClick: function handleLabelClick($evt) {
      this.$emit('label-click', $evt);
    },
    handleIconClick: function handleIconClick($evt) {
      this.$emit('icon-click', $evt);
    },
    handleClick: function handleClick($evt) {
      this.$emit('click', $evt);
    }
  }
};

/* script */
var __vue_script__$G = script$G;
/* template */

var __vue_render__$G = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-list-item wui-border-1px wui-border-b",
    on: {
      click: _vm.handleClick
    }
  }, [_c("w-row", {
    staticClass: "wui-list-item-wrap",
    style: _vm.styles
  }, [_vm.showLabel ? _c("w-cell", {
    staticClass: "wui-list-item-label-wrap",
    style: _vm.labelStyle,
    attrs: {
      width: _vm.labelWidth,
      align: _vm.labelAlign,
      vertical: _vm.labelVertical
    },
    on: {
      click: _vm.handleLabelClick
    }
  }, [_vm._t("label", [_c("label", {
    staticClass: "wui-field-label"
  }, [_vm._v(_vm._s(_vm.label))])])], 2) : _vm._e(), _vm._v(" "), _c("w-cell", {
    staticClass: "wui-list-item-content",
    attrs: {
      vertical: "middle"
    }
  }, [_vm._t("content", [_c("div", {
    staticClass: "list-item-content-text"
  }, [_vm._v(_vm._s(_vm.content))])])], 2), _vm._v(" "), _vm.showIcon ? _c("w-cell", {
    style: _vm.iconStyle,
    attrs: {
      width: _vm.iconWidth,
      vertical: _vm.iconVertical,
      align: _vm.iconAlign
    },
    on: {
      click: _vm.handleIconClick
    }
  }, [_vm._t("icon", [_c("w-icon", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.icon.type,
      expression: "icon.type"
    }],
    style: _vm.iconStyle,
    attrs: {
      type: _vm.icon.type,
      fill: _vm.icon.fill,
      width: _vm.icon.width,
      height: _vm.icon.height
    }
  })])], 2) : _vm._e()], 1)], 1);
};

var __vue_staticRenderFns__$G = [];
__vue_render__$G._withStripped = true;
/* style */

var __vue_inject_styles__$G = undefined;
/* scoped */

var __vue_scope_id__$G = undefined;
/* module identifier */

var __vue_module_identifier__$G = undefined;
/* functional template */

var __vue_is_functional_template__$G = false;
/* style inject */

/* style inject SSR */

var ListItem = normalizeComponent_1({
  render: __vue_render__$G,
  staticRenderFns: __vue_staticRenderFns__$G
}, __vue_inject_styles__$G, __vue_script__$G, __vue_scope_id__$G, __vue_is_functional_template__$G, __vue_module_identifier__$G, undefined, undefined);

var script$H = {
  name: 'w-list',
  props: {
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  components: _defineProperty({}, ListItem.name, ListItem)
};

/* script */
var __vue_script__$H = script$H;
/* template */

var __vue_render__$H = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "wui-list wui-border-1px wui-border-tb"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$H = [];
__vue_render__$H._withStripped = true;
/* style */

var __vue_inject_styles__$H = undefined;
/* scoped */

var __vue_scope_id__$H = undefined;
/* module identifier */

var __vue_module_identifier__$H = undefined;
/* functional template */

var __vue_is_functional_template__$H = false;
/* style inject */

/* style inject SSR */

var List = normalizeComponent_1({
  render: __vue_render__$H,
  staticRenderFns: __vue_staticRenderFns__$H
}, __vue_inject_styles__$H, __vue_script__$H, __vue_scope_id__$H, __vue_is_functional_template__$H, __vue_module_identifier__$H, undefined, undefined);

var _components$1;
var script$I = {
  name: 'w-list-input-item',
  extends: ListItem,
  props: {
    placeholder: String,
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    type: String,
    name: String,
    maxlength: Number,
    pattern: String,
    value: String,
    error: String,
    inputStyles: Object
  },
  data: function data() {
    return {
      currentValue: this.value
    };
  },
  components: (_components$1 = {}, _defineProperty(_components$1, ListItem.name, ListItem), _defineProperty(_components$1, Input.name, Input), _components$1),
  computed: {
    inputHeight: function inputHeight() {
      return this.error ? Number(this.height) + 20 : this.height;
    }
  },
  watch: {
    value: function value(val) {
      this.currentValue = val;
    },
    currentValue: function currentValue(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    handleEnter: function handleEnter() {},
    handleFocus: function handleFocus() {
      this.$emit('focus', this.currentValue);
    },
    handleBlur: function handleBlur() {
      this.$emit('blur', this.currentValue);
    },
    handleInput: function handleInput() {
      this.$emit('input', this.currentValue);
    },
    handleChange: function handleChange() {},
    handleLabelClick: function handleLabelClick($e) {
      this.$emit('label-click', $e);
    },
    handleIconClick: function handleIconClick($e) {
      this.$emit('icon-click', $e);
    }
  }
};

/* script */
var __vue_script__$I = script$I;
/* template */

var __vue_render__$I = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("w-list-item", {
    staticClass: "wui-list-input-item",
    attrs: {
      height: _vm.inputHeight,
      label: _vm.label,
      "label-width": _vm.labelWidth,
      "label-align": _vm.labelAlign,
      "label-vertical": _vm.labelVertical,
      "label-style": _vm.labelStyle,
      "show-label": _vm.showLabel,
      "icon-width": _vm.iconWidth,
      "icon-align": _vm.iconAlign,
      "icon-vertical": _vm.iconVertical,
      "icon-style": _vm.iconStyle,
      "show-icon": _vm.showIcon
    },
    on: {
      "label-click": _vm.handleLabelClick,
      "icon-click": _vm.handleIconClick
    }
  }, [_vm.$slots["label"] ? _c("div", {
    attrs: {
      slot: "label"
    },
    slot: "label"
  }, [_vm._t("label")], 2) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "wui-list-input-content",
    attrs: {
      slot: "content"
    },
    slot: "content"
  }, [_c("w-input", {
    staticClass: "wui-list-input",
    attrs: {
      placeholder: _vm.placeholder,
      disabled: _vm.disabled,
      readonly: _vm.readonly,
      type: _vm.type,
      name: _vm.name,
      autofocus: _vm.autofocus,
      maxlength: _vm.maxlength,
      styles: _vm.inputStyles,
      pattern: _vm.pattern
    },
    on: {
      blur: _vm.handleBlur,
      focus: _vm.handleFocus,
      input: _vm.handleInput
    },
    model: {
      value: _vm.currentValue,
      callback: function callback($$v) {
        _vm.currentValue = $$v;
      },
      expression: "currentValue"
    }
  }), _vm._v(" "), _vm.error ? _c("div", {
    staticClass: "wui-list-input-error"
  }, [_vm._v(_vm._s(_vm.error))]) : _vm._e()], 1), _vm._v(" "), _vm.$slots["icon"] ? _c("div", {
    attrs: {
      slot: "icon"
    },
    slot: "icon"
  }, [_vm._t("icon")], 2) : _vm._e()]);
};

var __vue_staticRenderFns__$I = [];
__vue_render__$I._withStripped = true;
/* style */

var __vue_inject_styles__$I = undefined;
/* scoped */

var __vue_scope_id__$I = undefined;
/* module identifier */

var __vue_module_identifier__$I = undefined;
/* functional template */

var __vue_is_functional_template__$I = false;
/* style inject */

/* style inject SSR */

var ListInputItem = normalizeComponent_1({
  render: __vue_render__$I,
  staticRenderFns: __vue_staticRenderFns__$I
}, __vue_inject_styles__$I, __vue_script__$I, __vue_scope_id__$I, __vue_is_functional_template__$I, __vue_module_identifier__$I, undefined, undefined);

List.install = function (vue) {
  vue.component(ListItem.name, ListItem);
  vue.component(ListInputItem.name, ListInputItem);
  vue.component(List.name, List);
};

var install = function install(vue) {
  vue.use(Border);
  vue.use(Toast$1);
  vue.use(Flex);
  vue.use(FlexBox);
  vue.use(Icon);
  vue.use(Button);
  vue.use(Field);
  vue.use(Checkbox);
  vue.use(popup);
  vue.use(Dialog$1);
  vue.use(Alert$1);
  vue.use(Confirm$1);
  vue.use(Prompt$1);
  vue.use(Mask);
  vue.use(Picker);
  vue.use(Spinner);
  vue.use(ToastLoading$1);
  vue.use(Message$1);
  vue.use(Progress);
  vue.use(LoadMore);
  vue.use(Loading);
  vue.use(Swipe);
  vue.use(ActionSheet);
  vue.use(List);
  vue.use(Input);
  vue.use(Switch);
  vue.use(Select);
  vue.prototype.$wui = Wui;
};

var Wui = {
  Border: Border,
  install: install,
  Toast: Toast$1,
  ToastLoading: ToastLoading$1,
  Loading: Loading,
  Icons: Icon,
  Flex: Flex,
  FlexBox: FlexBox,
  Button: Button,
  Field: Field,
  Checkbox: Checkbox,
  Popup: popup,
  Dialog: Dialog$1,
  Alert: Alert$1,
  Confirm: Confirm$1,
  Prompt: Prompt$1,
  Mask: Mask,
  Picker: Picker,
  Message: Message$1,
  Progress: Progress,
  LoadMore: LoadMore,
  Swipe: Swipe,
  ActionSheet: ActionSheet,
  List: List,
  ListItem: ListItem,
  ListInputItem: ListInputItem,
  Input: Input,
  Switch: Switch
};

if (window.Vue) {
  window.Vue.use(Wui);
}

exports.install = install;
exports.Border = Border;
exports.Toast = Toast$1;
exports.ToastLoading = ToastLoading$1;
exports.Loading = Loading;
exports.Icons = Icon;
exports.Flex = Flex;
exports.FlexBox = FlexBox;
exports.Button = Button;
exports.Field = Field;
exports.Checkbox = Checkbox;
exports.Popup = popup;
exports.Dialog = Dialog$1;
exports.Alert = Alert$1;
exports.Confirm = Confirm$1;
exports.Prompt = Prompt$1;
exports.Mask = Mask;
exports.Picker = Picker;
exports.Message = Message$1;
exports.Progress = Progress;
exports.LoadMore = LoadMore;
exports.Swipe = Swipe;
exports.ActionSheet = ActionSheet;
exports.List = List;
exports.ListItem = ListItem;
exports.ListInputItem = ListInputItem;
exports.Input = Input;
exports.Switch = Switch;
exports.default = Wui;
