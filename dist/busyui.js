(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = global || self, factory(global.BusyUI = {}, global.Vue));
}(this, function (exports, Vue) { 'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

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
     * @module @busyui/border
     * @see {@link ../example/all/border1px.html 实例}
     * @desc 1像素边框样式
     * @param {String} side = '', 设置哪个边框, t=上,b=下,r=右,l=左, lr=左右,tb=上下,no-r=无右,no-l=无左,no-t=无上,no-b=无下
     * 
     * @example
     * 
     *  <div class="busy-border-1px">四边框</div>
     *
     *  <div class="busy-border-1px busy-border-t">上边框</div>
     *
     *  <div class="busy-border-1px busy-border-b">下边框</div>
     *
     *  <div class="busy-border-1px busy-border-tb">上下边框</div>
     *
     *  <div class="busy-border-1px busy-border-l">左边框</div>
     *
     *  <div class="busy-border-1px busy-border-r">右边框</div>
     *
     *  <div class="busy-border-1px busy-border-lr">左右边框</div>
     *
     * <div class="busy-border-1px busy-border-no-r">无右边框</div>
     *
     * <div class="busy-border-1px busy-border-no-l">无左边框</div>
     *
     * <div class="busy-border-1px busy-border-no-t">无上边框</div>
     *
     * <div class="busy-border-1px busy-border-no-b">无下边框</div>
     *
     * // 取值1~10px
     * <div class="busy-border-1px busy-border-radius-4px">圆角</div>
     *
     * // 百分比圆角
     * <div class="busy-border-1px" style="border-radius: 50%;">圆角</div>
     * 
     */

    var Border = {
      prepare: function prepare() {
        var dpr = window.devicePixelRatio;
        var styleTag = document.getElementById('busy-border-1px-style-sheet');
        var sheet = styleTag ? styleTag.sheet || styleTag.styleSheet : null;
        this.sheet = sheet;
        this.dpr = dpr;
        if (sheet) return;
        var style = document.createElement("style");
        style.id = 'busy-border-1px-style-sheet';
        style.type = 'text/css';
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
        sheet = style.sheet;
        this.sheet = sheet;

        if (sheet.insertRule) {
          sheet.insertRule('.busy-border-1px::after{ ' + 'width: ' + Number(dpr) * 100 + '%;' + 'height:' + Number(dpr) * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');' + '}', 0);
        } else if (sheet.addRule) {
          sheet.addRule('.busy-border-1px::after', 'width: ' + Number(dpr) * 100 + '%;' + 'height:' + Number(dpr) * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');');
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
        vue.directive('busy-border-1px', {
          bind: function bind(el, binding) {
            var datas = binding.value;
            var radius = datas.radius,
                side = datas.side,
                color = datas.color;
            var classes = ["busy-border-1px"];

            if (side) {
              classes.push("busy-border-1px-".concat(side));
            }

            if (radius) {
              var name = "busy-border-1px-r-".concat(String(radius).replace('%', 'percent'));
              classes.push(name);

              _this.addStyleRule(name, "\n                        border-radius:".concat(getDPRUnit(radius), ";\n                    "));
            }

            if (color) {
              var _name = "busy-border-1px-c-".concat(color.replace('#', ''));

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

    function _extends() {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends.apply(this, arguments);
    }

    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);

        if (typeof Object.getOwnPropertySymbols === 'function') {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }

        ownKeys.forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      }

      return target;
    }

    ((function () {
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
    })());

    //
    /**
     * @busyui/icon
     * @module Icon
     * @see {@link ../example/all/icons.html 实例}
     * @desc icon图标组件
     * @param {String} type - icon名称
     * @param {Number} width=18 - 组件宽度
     * @param {Number} height=18 - 组件高度
     * @param {String} fill='#fff' - 组件颜色,css color
     * 
     * @example
     *  <busy-icon type="guanbi" fill="#8a8a8a"></busy-icon>
     * 
     */

    var script = {
      name: 'busy-icon',
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

      return _c('svg', {
        staticClass: "busy-icon",
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_c('use', {
        attrs: {
          "xlink:href": _vm.itype
        }
      })]);
    };

    var __vue_staticRenderFns__ = [];
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
      name: 'busy-toast',
      props: {
        delay: {
          type: Number,
          default: 2500
        },
        iconType: {
          type: String,
          default: ''
        },
        iconHeight: {
          type: Number,
          default: 24
        },
        iconWidth: {
          type: Number,
          default: 24
        },
        content: {
          type: [String, Number],
          default: ''
        },
        pos: {
          type: String,
          default: 'top'
        },
        zIndex: {
          type: Number
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
          default: false
        }
      },
      data: function data() {
        return {
          visiable: this.isShow,
          timmer: null
        };
      },
      components: _defineProperty({}, Icon.name, Icon),
      computed: {
        posClass: function posClass() {
          return ["busy-toast--pos-".concat(this.pos)];
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
          this.$emit('after-leave', this); // 动画结束，清除元素

          if (this.isRemove) {
            this.$destroy();
            this.$emit('destroy', this);
            this.$el.remove();
          }
        },
        clearTimmer: function clearTimmer() {
          if (this.timmer) {
            clearTimeout(this.timmer);
            this.timmer = null;
          }
        },
        afterLeave: function afterLeave(cb) {
          this.$on('after-leave', cb);
        }
      },
      watch: {
        isShow: function isShow(val) {
          this.visiable = val;
        },
        visiable: function visiable(val) {
          this.$emit('visiable-change', val);
          this.clearTimmer();

          if (val === true && this.autoHide) {
            this.timmer = setTimeout(this.hide, this.delay);
          }
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

      return _c('transition', {
        attrs: {
          "name": "busy-animate--fade"
        },
        on: {
          "after-leave": _vm._leave
        }
      }, [_c('article', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        staticClass: "busy-toast",
        class: _vm.posClass
      }, [_c('div', {
        staticClass: "busy-toast__wrap"
      }, [_vm.iconType ? _c('span', {
        staticClass: "busy-toast__icon"
      }, [_c('busy-icon', {
        attrs: {
          "type": _vm.iconType,
          "width": _vm.iconWidth,
          "height": _vm.iconHeight,
          "fill": "#ffffff"
        }
      })], 1) : _vm._e(), _vm._v(" "), _c('p', {
        staticClass: "busy-toast__text"
      }, [_vm._t("default", [_vm._v("\n                    " + _vm._s(_vm.contentString) + "\n                ")])], 2)])])]);
    };

    var __vue_staticRenderFns__$1 = [];
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

    var ToastClass = Vue.extend(Toast),
        instance;
    /**
     * Toast component
     * @module Toast
     * @see {@link ../example/all/toast.html 实例}
     * @desc Toast组件 <busy-toast></busy-toast>
     * @param {Object} opts - 选项 可选{content:'显示内容', pos: '显示位置', delay: '显示多长时间隐藏', type: 'icon类型'}
     * @param {String} content - 显示内容
     * @param {String} pos='middle' - 显示位置,可以是 'top', 'middle', 'bottom'
     * @param {Number} delay=2000 - 显示时间，单位毫秒
     * @param {String} iconType - icon类型
     * @param {Boolean} isShow=false - 是否显示
     * @param {Boolean} isRemove=false - 是否隐藏移除dom
     * @param {Boolean} autoHide=true - 是否自动隐藏
     * @param {Number} iconHeight=28 - 设置图标的高度
     * @param {Number} iconWidth=28 - 设置图标的宽度
     * @param {Function} hide - 隐藏
     * @param {Function} show - 显示
     * @param {Event} hide - 隐藏时触发
     * @param {Event} show - 显示时触发
     * @param {Event} visiable-change - 显示,隐藏都会触发
     * @param {Event} after-leave - 隐藏动画结束时触发
     * 
     */

    var Toast$1 = _extends(Toast, {
      install: function install(vue) {
        vue.component(Toast.name, Toast);
      },

      /**
       * @method show
       * @param {Object} opts - 配置项, <a href="#module_Toast">参见</a>
       * @static
       * @returns ToastClass实例
       * 
       * @example
       * Busy.Toast.show({content:'内容', pos: 'top', delay: 5000})
       * 
       */
      show: function show(content, opts) {
        if (instance) {
          this.hide();
        }

        var type = _typeof(content);

        if (type === 'object') {
          opts = content;
          content = opts.content;
        } else if (type == 'string' || type === 'number') {
          opts = _objectSpread({}, opts, {
            content: content
          });
        }

        instance = new ToastClass({
          el: document.createElement('div'),
          propsData: _objectSpread({
            isRemove: true,
            autoHide: true
          }, opts)
        });
        Vue.nextTick(function () {
          var vm = instance.$mount();
          document.body.appendChild(vm.$el);
          instance.show();
        });
        return instance;
      },
      hide: function hide() {
        if (instance) {
          instance.hide();
          instance = null;
        }
      }
    });

    setTimeout(function () {
      var dpr = window.devicePixelRatio;
      document.documentElement.dataset && (document.documentElement.dataset.dpr = dpr);
    }, 0);

    //
    var script$2 = {
      name: 'busy-spinner-circle-dash',
      props: {
        color: {
          type: String
        },
        width: {
          type: [Number, String],
          default: 64
        },
        height: {
          type: [Number, String],
          default: 64
        },
        strokeWidth: [Number, String]
      },
      computed: {
        styles: function styles() {
          var width = cmpUnit(this.width);
          var height = cmpUnit(this.height);
          return {
            width: width,
            height: height
          };
        },
        svgStyles: function svgStyles() {
          var stroke = this.color;
          var strokeWidth = this.strokeWidth;
          return {
            stroke: stroke,
            strokeWidth: strokeWidth
          };
        }
      }
    };

    /* script */
    var __vue_script__$2 = script$2;
    /* template */

    var __vue_render__$2 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('span', {
        staticClass: "busy-spinner-circle-dash"
      }, [_c('svg', {
        staticClass: "busy-spinner-circle-dash__svg",
        style: _vm.styles,
        attrs: {
          "viewBox": "0 0 64 64"
        }
      }, [_c('g', {
        staticClass: "busy-spinner-circle-dash__wrap",
        style: _vm.svgStyles
      }, [_c('circle', {
        staticClass: "busy-spinner-circle-dash__path",
        attrs: {
          "cx": "32",
          "cy": "32",
          "r": "28",
          "fill": "none"
        }
      })])])]);
    };

    var __vue_staticRenderFns__$2 = [];
    /* style */

    var __vue_inject_styles__$2 = undefined;
    /* scoped */

    var __vue_scope_id__$2 = "data-v-5d069369";
    /* module identifier */

    var __vue_module_identifier__$2 = undefined;
    /* functional template */

    var __vue_is_functional_template__$2 = false;
    /* style inject */

    /* style inject SSR */

    var CircleDash = normalizeComponent_1({
      render: __vue_render__$2,
      staticRenderFns: __vue_staticRenderFns__$2
    }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, undefined, undefined);

    //
    var script$3 = {
      name: 'busy-spinner-circle-gradient',
      props: {
        color: {
          type: String,
          default: '#008b8b'
        },
        width: {
          type: [Number, String],
          default: 64
        },
        height: {
          type: [Number, String],
          default: 64
        },
        strokeWidth: {
          type: [Number, String],
          default: 6
        }
      },
      data: function data() {
        return {
          flag: 1
        };
      },
      watch: {},
      computed: {
        styles: function styles() {
          var width = cmpUnit(this.width);
          var height = cmpUnit(this.height);
          return {
            width: width,
            height: height
          };
        },
        svgStyles: function svgStyles() {
          var stroke = this.color;
          var strokeWidth = this.strokeWidth;
          return {
            strokeWidth: strokeWidth
          };
        },
        r: function r() {
          return 32 - this.strokeWidth;
        },
        gid: function gid() {
          return "gradient__".concat(btoa(this.color || '#222222'));
        }
      }
    };

    /* script */
    var __vue_script__$3 = script$3;
    /* template */

    var __vue_render__$3 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('span', {
        staticClass: "busy-spinner-circle-gradient"
      }, [_c('svg', {
        staticClass: "busy-spinner-circle-gradient__svg",
        style: _vm.styles,
        attrs: {
          "viewBox": "0 0 64 64"
        }
      }, [_c('g', {
        staticClass: "busy-spinner-circle-gradient__wrap",
        style: _vm.svgStyles
      }, [_c('defs', [_c('linearGradient', {
        attrs: {
          "id": _vm.gid,
          "x1": "0%",
          "y1": "0%",
          "x2": "0%",
          "y2": "100%"
        }
      }, [_c('stop', {
        attrs: {
          "offset": "10%",
          "stop-color": _vm.color,
          "stop-opacity": "0"
        }
      }), _vm._v(" "), _c('stop', {
        attrs: {
          "offset": "100%",
          "stop-color": _vm.color
        }
      })], 1)], 1), _vm._v(" "), _c('circle', {
        staticStyle: {
          "transform-origin": "center",
          "transform": "rotate(110deg)"
        },
        attrs: {
          "stroke-linecap": "round",
          "cx": "32",
          "cy": "32",
          "stroke-dasharray": "83 175",
          "r": "28",
          "stroke": _vm.color,
          "fill": "none"
        }
      }), _vm._v(" "), _c('circle', {
        attrs: {
          "cx": "32",
          "cy": "32",
          "stroke-dasharray": "60",
          "r": "28",
          "stroke": "url(#" + _vm.gid + ")",
          "fill": "none"
        }
      })])])]);
    };

    var __vue_staticRenderFns__$3 = [];
    /* style */

    var __vue_inject_styles__$3 = undefined;
    /* scoped */

    var __vue_scope_id__$3 = "data-v-df92e63e";
    /* module identifier */

    var __vue_module_identifier__$3 = undefined;
    /* functional template */

    var __vue_is_functional_template__$3 = false;
    /* style inject */

    /* style inject SSR */

    var CircleGradient = normalizeComponent_1({
      render: __vue_render__$3,
      staticRenderFns: __vue_staticRenderFns__$3
    }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, undefined, undefined);

    //
    var script$4 = {
      name: 'busy-spinner-circle-line',
      props: {
        color: {
          type: String
        },
        width: {
          type: [Number, String],
          default: 64
        },
        height: {
          type: [Number, String],
          default: 64
        },
        strokeWidth: [Number, String]
      },
      computed: {
        styles: function styles() {
          var width = cmpUnit(this.width);
          var height = cmpUnit(this.height);
          return {
            width: width,
            height: height
          };
        },
        svgStyles: function svgStyles() {
          var strokeWidth = this.strokeWidth;
          var stroke = this.color;
          console.log(stroke);
          return {
            strokeWidth: strokeWidth,
            stroke: stroke
          };
        }
      }
    };

    /* script */
    var __vue_script__$4 = script$4;
    /* template */

    var __vue_render__$4 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('span', {
        staticClass: "busy-spinner-circle-line"
      }, [_c('svg', {
        staticClass: "busy-spinner-circle-line__svg",
        style: _vm.styles,
        attrs: {
          "viewBox": "0 0 64 64"
        }
      }, [_c('g', {
        staticClass: "busy-spinner-circle-line__wrap",
        style: _vm.svgStyles,
        attrs: {
          "stroke-linecap": "round"
        }
      }, [_c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(180)"
        }
      }), _vm._v(" "), _c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(210)"
        }
      }), _vm._v(" "), _c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(240)"
        }
      }), _vm._v(" "), _c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(270)"
        }
      }), _vm._v(" "), _c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(300)"
        }
      }), _vm._v(" "), _c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(330)"
        }
      }), _vm._v(" "), _c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(0)"
        }
      }), _vm._v(" "), _c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(30)"
        }
      }), _vm._v(" "), _c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(60)"
        }
      }), _vm._v(" "), _c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(90)"
        }
      }), _vm._v(" "), _c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(120)"
        }
      }), _vm._v(" "), _c('line', {
        attrs: {
          "y1": "17",
          "y2": "29",
          "transform": "translate(32,32) rotate(150)"
        }
      })])])]);
    };

    var __vue_staticRenderFns__$4 = [];
    /* style */

    var __vue_inject_styles__$4 = undefined;
    /* scoped */

    var __vue_scope_id__$4 = "data-v-e9a98daa";
    /* module identifier */

    var __vue_module_identifier__$4 = undefined;
    /* functional template */

    var __vue_is_functional_template__$4 = false;
    /* style inject */

    /* style inject SSR */

    var CircleLine = normalizeComponent_1({
      render: __vue_render__$4,
      staticRenderFns: __vue_staticRenderFns__$4
    }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, undefined, undefined);

    //
    /**
     * busy-circle-rotate
     * @desc 旋转圆环动画
     * @param {Number} width=24 - 组件宽度
     * @param {Number} height=24 - 组件高度
     * @param {String} color="#ffffff" - 组件颜色
     * @param {Number} strokeWidth=3 - 描边宽度
     * @example
     *      <busy-circle-rotate color="red"></busy-circle-rotate>
     **/

    var script$5 = {
      name: 'busy-spinner-circle-rotate',
      props: {
        height: {
          type: [Number, String],
          default: 64
        },
        width: {
          type: [Number, String],
          default: 64
        },
        color: {
          type: String
        },
        strokeWidth: {
          type: [Number, String],
          default: 6
        }
      },
      data: function data() {
        return {
          visiable: true
        };
      },
      computed: {
        styles: function styles() {
          var width = cmpUnit(this.width);
          var height = cmpUnit(this.height);
          return {
            width: width,
            height: height
          };
        },
        svgStyles: function svgStyles() {
          var strokeWidth = this.strokeWidth;
          var stroke = this.color;
          return {
            strokeWidth: strokeWidth,
            stroke: stroke
          };
        },
        r: function r() {
          return 32 - this.strokeWidth;
        }
      },
      mounted: function mounted() {}
    };

    /* script */
    var __vue_script__$5 = script$5;
    /* template */

    var __vue_render__$5 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('span', {
        staticClass: "busy-spinner-circle-rotate"
      }, [_c('svg', {
        staticClass: "busy-spinner-circle-rotate__svg",
        style: _vm.styles,
        attrs: {
          "version": "1.1",
          "viewBox": "0 0 64 64",
          "xml:space": "preserve"
        }
      }, [_c('g', {
        staticClass: "busy-spinner-circle-rotate__wrap",
        style: _vm.svgStyles,
        attrs: {
          "stroke-linecap": "round"
        }
      }, [_c('circle', {
        attrs: {
          "cx": "32",
          "cy": "32",
          "r": _vm.r,
          "opacity": "0.5",
          "fill": "none"
        }
      }), _vm._v(" "), _c('circle', {
        attrs: {
          "cx": "32",
          "cy": "32",
          "r": _vm.r,
          "stroke-dasharray": "20 175",
          "stroke-dashoffset": "0",
          "fill": "none"
        }
      })])])]);
    };

    var __vue_staticRenderFns__$5 = [];
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

    var CircleRotate = normalizeComponent_1({
      render: __vue_render__$5,
      staticRenderFns: __vue_staticRenderFns__$5
    }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, undefined, undefined);

    //
    var script$6 = {
      name: 'busy-spinner-circle-half',
      props: {
        color: {
          type: String
        },
        width: {
          type: [Number, String],
          default: 64
        },
        height: {
          type: [Number, String],
          default: 64
        },
        strokeWidth: {
          type: [Number, String],
          default: 6
        }
      },
      computed: {
        styles: function styles() {
          var width = cmpUnit(this.width);
          var height = cmpUnit(this.height);
          return {
            width: width,
            height: height
          };
        },
        svgStyles: function svgStyles() {
          var stroke = this.color;
          var strokeWidth = this.strokeWidth;
          return {
            stroke: stroke,
            strokeWidth: strokeWidth
          };
        }
      }
    };

    /* script */
    var __vue_script__$6 = script$6;
    /* template */

    var __vue_render__$6 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('span', {
        staticClass: "busy-spinner-circle-half"
      }, [_c('svg', {
        staticClass: "busy-spinner-circle-half__svg",
        style: _vm.styles,
        attrs: {
          "viewBox": "0 0 64 64"
        }
      }, [_c('g', {
        staticClass: "busy-spinner-circle-half__wrap",
        style: _vm.svgStyles
      }, [_c('circle', {
        staticClass: "busy-spinner-circle-half__path",
        attrs: {
          "cx": "32",
          "cy": "32",
          "r": "28",
          "fill": "none"
        }
      })])])]);
    };

    var __vue_staticRenderFns__$6 = [];
    /* style */

    var __vue_inject_styles__$6 = undefined;
    /* scoped */

    var __vue_scope_id__$6 = "data-v-5161ca0b";
    /* module identifier */

    var __vue_module_identifier__$6 = undefined;
    /* functional template */

    var __vue_is_functional_template__$6 = false;
    /* style inject */

    /* style inject SSR */

    var CircleHalf = normalizeComponent_1({
      render: __vue_render__$6,
      staticRenderFns: __vue_staticRenderFns__$6
    }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, undefined, undefined);

    //
    /**
     * busy-spinner
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
     *  <busy-spinner :type="3" color="#666" :width="12"></busy-spinner>
     *
     */

    var script$7 = {
      name: 'busy-spinner',
      props: {
        type: {
          type: String,
          default: 'circle-line'
        },
        height: {
          type: [Number, String],
          default: 64
        },
        width: {
          type: [Number, String],
          default: 64
        },
        color: {
          type: String
        },
        strokeWidth: [Number, String]
      },
      data: function data() {
        return {
          visiable: true
        };
      },
      components: {
        CircleDash: CircleDash,
        CircleGradient: CircleGradient,
        CircleLine: CircleLine,
        CircleRotate: CircleRotate,
        CircleHalf: CircleHalf
      },
      watch: {
        visiable: function visiable(val, old) {
          this.$emit('visiable-change', val);
        }
      }
    };

    /* script */
    var __vue_script__$7 = script$7;
    /* template */

    var __vue_render__$7 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-spinner"
      }, [_vm.type === 'circle-line' ? _c('CircleLine', _vm._b({}, 'CircleLine', _vm.$props, false)) : _vm.type === 'circle-dash' ? _c('CircleDash', _vm._b({}, 'CircleDash', _vm.$props, false)) : _vm.type === 'circle-gradient' ? _c('CircleGradient', _vm._b({}, 'CircleGradient', _vm.$props, false)) : _vm.type === 'circle-rotate' ? _c('CircleRotate', _vm._b({}, 'CircleRotate', _vm.$props, false)) : _c('CircleHalf', _vm._b({}, 'CircleHalf', _vm.$props, false))], 1);
    };

    var __vue_staticRenderFns__$7 = [];
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

    var Spinner = normalizeComponent_1({
      render: __vue_render__$7,
      staticRenderFns: __vue_staticRenderFns__$7
    }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, undefined, undefined);

    //import svgCircleRotate from './svg-circle-rotate/index.js';

    Spinner.install = function (vue) {
      vue.component(CircleDash.name, CircleDash);
      vue.component(CircleGradient.name, CircleGradient);
      vue.component(CircleLine.name, CircleLine);
      vue.component(Spinner.name, Spinner);
      vue.component(CircleRotate.name, CircleRotate);
    };

    var script$8 = {
      name: 'busy-toast-loading',
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
      components: _defineProperty({}, Spinner.name, Spinner),
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
          return [this.direction == 'row' ? 'busy-toast-loading--dir-row' : 'busy-toast-loading--dir-column'];
        }
      },
      watch: {
        visiable: function visiable(val, old) {
          this.$emit('visiable-change', val);
        }
      }
    };

    /* script */
    var __vue_script__$8 = script$8;
    /* template */

    var __vue_render__$8 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('busy-mask', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }]
      }, [_c('transition', {
        attrs: {
          "name": "loading-opacity-fade"
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        staticClass: "busy-toast-loading",
        class: _vm.classes,
        style: _vm.styles
      }, [_c('div', {
        staticClass: "busy-toast-loading__icon"
      }, [_c('busy-spinner', {
        attrs: {
          "type": _vm.spinner.type,
          "height": _vm.spinner.height,
          "width": _vm.spinner.width,
          "color": _vm.spinner.color
        }
      })], 1), _vm._v(" "), _vm.text ? _c('div', {
        staticClass: "busy-toast-loading__text",
        style: {
          color: _vm.color,
          fontSize: _vm.fontSize + 'px'
        }
      }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2) : _vm._e()])])], 1);
    };

    var __vue_staticRenderFns__$8 = [];
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

    var ToastLoading = normalizeComponent_1({
      render: __vue_render__$8,
      staticRenderFns: __vue_staticRenderFns__$8
    }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, undefined, undefined);

    var ToastLoadingClass = Vue.extend(ToastLoading);
    var tlInstance, tlVm;
    /**
     * busy-toast-loading
     * @module ToastLoading
     * @see {@link ../example/all/toast-loading.html 实例}
     * @desc 页面toastloading组件 <busy-toast-loading />
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
     *  <script src="busyui.js"><\/script>
     *  <link rel="stylesheet" href="busyui.css">
     *
     *  Busy.ToastLoading.show();
     *  http.get('url').then(()=>{
     *    Busy.ToastLoading.hide();
     *  });
     *
     *  // use it in module tools
     *  import ToastLoading from '@busyui/toast-loading';
     *  ToastLoading.show({spinner:{type:2}, direction="row"});
     *  http.get('url').then(()=>{
     *    ToastLoading.hide();
     *  });
     **/

    var ToastLoading$1 = _extends(ToastLoading, {
      install: function install(vue) {
        vue.component('busy-toast-loading', ToastLoading);
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
       * Busy.ToastLoading.show();
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
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
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
     * @busyui/mask
     * @module Mask
     * @desc 半透明遮罩层 <busy-mask></busy-mask>
     * @param {String} color=rgba(0,0,0, 0.6) - 遮罩颜色, css color
     * @param {Boolean} isRemove=false - 是否隐藏动画完成从dom中清除
     * @param {Boolean} isShow=false - 显示隐藏
     * @example 
     *      <busy-mask color="yellow"></busy-mask>
     **/
    var script$9 = {
      name: 'busy-mask',
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
        },
        position: {
          type: String
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
            zIndex: this.zIndex,
            position: this.position
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
    var __vue_script__$9 = script$9;
    /* template */

    var __vue_render__$9 = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": "busy-animate--fade"
        },
        on: {
          "after-leave": _vm._leave
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        staticClass: "busy-mask",
        style: _vm.styles,
        on: {
          "touchmove": _vm.handleTouchmove,
          "click": _vm.handleClick
        }
      }, [_vm._t("default")], 2)]);
    };

    var __vue_staticRenderFns__$9 = [];
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

    var Mask = normalizeComponent_1({
      render: __vue_render__$9,
      staticRenderFns: __vue_staticRenderFns__$9
    }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, undefined, undefined);

    Mask.install = function (vue) {
      vue.component(Mask.name, Mask);
    };

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
     * @param {Boolean} isShow=false - 显示隐藏
     * @param {Boolean} isRemove=false - 隐藏后是否清除
     * 
     * @example
     *  <busy-loading>正在加载...</busy-loading>
     */

    var script$a = {
      name: 'busy-inline-loading',
      props: {
        spinnerType: {
          type: String
        },
        spinnerWidth: {
          type: [String, Number],
          default: 24
        },
        spinnerHeight: {
          type: [String, Number],
          default: 24
        },
        color: {
          type: String,
          default: '#222222'
        },
        text: {
          type: String,
          default: ''
        },
        fontSize: {
          type: Number
        },
        isShow: {
          type: Boolean,
          default: false
        },
        isRemove: {
          type: Boolean,
          default: false
        },
        direction: {
          type: String
        }
      },
      data: function data() {
        return {
          visiable: this.isShow
        };
      },
      components: {
        Spinner: Spinner
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
            this.$el.remove();
          }
        }
      },
      computed: {
        classes: function classes() {
          return {
            'busy-inline-loading--column': this.direction === 'column'
          };
        },
        spinnerProps: function spinnerProps() {
          var spinnerType = this.spinnerType,
              spinnerWidth = this.spinnerWidth,
              spinnerHeight = this.spinnerHeight,
              color = this.color;
          return {
            type: spinnerType,
            width: cmpUnit(spinnerWidth),
            height: cmpUnit(spinnerHeight),
            color: color
          };
        },
        textStyle: function textStyle() {
          var color = this.color,
              fontSize = this.fontSize;
          return {
            color: color,
            fontSize: cmpUnit(fontSize)
          };
        }
      },
      watch: {
        isShow: function isShow(val) {
          this.visiable = val;
          this.$emit('visiable-change', val);
        }
      },
      mounted: function mounted() {
        console.log(this.color);
      }
    };

    /* script */
    var __vue_script__$a = script$a;
    /* template */

    var __vue_render__$a = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": "busy-animate--fade"
        },
        on: {
          "after-leave": _vm._leave
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        staticClass: "busy-inline-loading",
        class: [_vm.classes]
      }, [_c('div', {
        staticClass: "busy-inline-loading__spinner"
      }, [_c('Spinner', _vm._b({}, 'Spinner', _vm.spinnerProps, false))], 1), _vm._v(" "), _c('div', {
        staticClass: "busy-inline-loading__text",
        style: _vm.textStyle
      }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2)])]);
    };

    var __vue_staticRenderFns__$a = [];
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

    var InlineLoading = normalizeComponent_1({
      render: __vue_render__$a,
      staticRenderFns: __vue_staticRenderFns__$a
    }, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, undefined, undefined);

    //
    var script$b = {
      name: 'busy-loading',
      extends: InlineLoading,
      props: {
        showMask: {
          type: Boolean,
          default: true
        },
        spinnerWidth: {
          type: [Number, String],
          default: 36
        },
        spinnerHeight: {
          type: [Number, String],
          default: 36
        },
        color: {
          type: String,
          default: '#ffffff'
        }
      },
      data: function data() {
        return {
          visiable: this.isShow
        };
      },
      watch: {
        isShow: function isShow(val) {
          this.visiable = !!val;
        }
      },
      components: {
        BusyMask: Mask,
        InlineLoading: InlineLoading
      },
      computed: {
        ILProps: function ILProps() {
          var spinnerWidth = this.spinnerWidth,
              spinnerHeight = this.spinnerHeight,
              spinnerType = this.spinnerType,
              color = this.color,
              isRemove = this.isRemove,
              visiable = this.visiable,
              direction = this.direction,
              text = this.text,
              fontSize = this.fontSize;
          return {
            spinnerWidth: spinnerWidth,
            spinnerHeight: spinnerHeight,
            spinnerType: spinnerType,
            color: color,
            isRemove: isRemove,
            isShow: visiable,
            text: text,
            direction: direction,
            fontSize: fontSize
          };
        },
        styles: function styles() {
          var position = this.position;
          return {
            position: position
          };
        }
      }
    };

    /* script */
    var __vue_script__$b = script$b;
    /* template */

    var __vue_render__$b = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-loading",
        style: _vm.styles
      }, [_c('BusyMask', {
        attrs: {
          "isShow": _vm.showMask && _vm.visiable,
          "position": "absolute",
          "z-index": 1
        }
      }), _vm._v(" "), _c('transition', {
        attrs: {
          "name": "busy-animate--fade"
        },
        on: {
          "after-leave": _vm._leave
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        staticClass: "busy-loading__wrap"
      }, [_c('InlineLoading', _vm._b({}, 'InlineLoading', _vm.ILProps, false), [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2)], 1)])], 1);
    };

    var __vue_staticRenderFns__$b = [];
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
    var instance$1;

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
        propsData: _extends({}, {
          isRemove: true,
          position: 'fixed'
        }, opts)
      });
      Vue.nextTick(function () {
        var vm = instance$1.$mount();
        document.body.appendChild(vm.$el);
        instance$1.show();
      });
    };

    Loading.hide = function () {
      if (instance$1) {
        instance$1.hide();
      }

      instance$1 = null;
    };

    //
    var script$c = {
      name: 'busy-flexitem',
      props: {
        basis: [String, Number],
        shrink: [String, Number],
        grow: [String, Number],
        flex: [String, Number],
        alginSelf: String,
        order: Number,
        width: [String, Number],
        height: [String, Number]
      },
      computed: {
        styles: function styles() {
          var w = this.width,
              h = this.height;
          w = cmpUnit(w);
          h = cmpUnit(h);
          return {
            flex: this.flex,
            order: this.order,
            width: w,
            height: h,
            alginSelf: this.alginSelf
          };
        }
      },
      methods: {
        handleClick: function handleClick(e) {
          this.$emit('click', e);
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

      return _c('div', {
        staticClass: "busy-flex__item",
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__$c = [];
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

    var FlexItem = normalizeComponent_1({
      render: __vue_render__$c,
      staticRenderFns: __vue_staticRenderFns__$c
    }, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, undefined, undefined);

    /**
     * @class
     * @constructor
     * @module Flexbox
     * @desc Flexbox
     * @param {Boolean} inline = false - display属性, flex 或者 inline-flex
     * @param {Number|String} width - 宽度, 取值范围css单位尺寸,数字＋单位,单位限制px、em、rem, 还可以是%,inherit,auto.整数单位默认px
     * @param {String} alignMain - 主轴(main axis)对齐方式, 取值start,end,around,between,center
     * @param {String} alignCross - 侧轴(cross axis)对齐方式, 取值start,end,cneter,baseline,stretch,between,around
     * @param {String} wrap - 换行, 取值nowrap,wrap, wrap-reverse
     * @param {String} direction - 主轴方向, 取值row,row-reverse,column,column-reverse
     */

    var script$d = {
      name: 'busy-flexbox',
      props: {
        inline: {
          type: Boolean,
          default: false
        },
        width: {
          type: [Number, String]
        },
        height: {
          type: [Number, String]
        },
        wrap: {
          type: String
        },
        direction: {
          type: String,
          validator: function validator(val) {
            return val && 'row column'.split(/\s/).indexOf(String(val)) > -1;
          }
        },
        alignMain: {
          type: String
        },
        alignCross: {
          type: String
        }
      },
      components: _defineProperty({}, FlexItem.name, FlexItem),
      data: function data() {
        return {};
      },
      computed: {
        classes: function classes() {
          var am = this.alignMain,
              ac = this.alignCross,
              flag = am || ac;
          return [this.inline ? "busy-flex--inline" : "busy-flex", flag ? "busy-flex--".concat(am || 'start', "-").concat(ac || 'start') : null, !this.direction ? '' : "busy-flex--".concat(this.direction)];
        },
        styles: function styles() {
          var h = this.height,
              w = this.width;
          h = /^\d+$/.test(h) ? h + 'px' : h;
          w = /^\d+$/.test(w) ? w + 'px' : w;
          return {
            height: h,
            width: w,
            flexWrap: this.wrap
          };
        }
      },
      methods: {
        handleClick: function handleClick(e) {
          /**
           * Flexbox event.
           *
           * @event Flexbox#click
           * @type {Event}
           */
          this.$emit('click', e);
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

      return _c('div', {
        class: _vm.classes,
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__$d = [];
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

    var FlexBox = normalizeComponent_1({
      render: __vue_render__$d,
      staticRenderFns: __vue_staticRenderFns__$d
    }, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, undefined, undefined);

    FlexBox.install = function (vue) {
      vue.component(FlexItem.name, FlexItem);
      vue.component(FlexBox.name, FlexBox);
    };

    //
    setTimeout(function () {
      var dpr = window.devicePixelRatio; //if (this.borderColor) {

      var styleTag = document.getElementById('busy-button-border-1px');
      var sheet = styleTag ? styleTag.sheet || styleTag.styleSheet : null;

      if (!sheet) {
        var style = document.createElement("style");
        style.id = 'busy-button-border-1px';
        style.type = 'text/css';
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
        sheet = style.sheet;
      }

      if (sheet.addRule) {
        sheet.addRule('button > .busy-button__border', 'width: ' + dpr * 100 + '%;' + 'height: ' + dpr * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');');
      } else if (sheet.insertRule) {
        sheet.insertRule('button > .busy-button__border' + 'width: ' + dpr * 100 + '%;' + 'height: ' + dpr * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');', 0);
      } //}

    }, 0);
    /**
     * @busyui/button
     * @module Button
     * @see {@link ../example/all/button.html 实例}
     * @desc 按钮组件 <busy-button />
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
     * @param {String} borderColor - 边框颜色
     * @param {String} borderWidth - 边框宽度
     * @param {String} borderRadius - 圆角
     *
     * @example
     *  <busy-button size="large" type="primary">按钮</busy-button>
     *
     *  <busy-button size="small" type="warning">删除</busy-button>
     *
     */

    var script$e = {
      name: 'busy-button',
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
          validator: validateUnit
        },
        bgColor: String,
        borderColor: String,
        borderStyle: {
          type: String
        },
        borderWidth: {
          type: [Number, String],
          validator: validateUnit
        },
        fontColor: String,
        borderRadius: {
          type: [Number, String],
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
            return ['normal', 'small', 'large'].indexOf(value) > -1;
          }
        }
      },
      data: function data() {
        var bw = this.borderWidth;

        if (!bw && (this.type === 'default' || this.ghost) && !/^0(\w?|%)$/.test(bw)) {
          bw = 1;
        }

        return {
          isThin: bw === 1 || bw === '1px'
        };
      },
      methods: {
        handleClick: function handleClick(evt) {
          this.$emit('click', evt);
        }
      },
      computed: {
        classes: function classes() {
          var _this$type = this.type,
              type = _this$type === void 0 ? 'default' : _this$type,
              _this$size = this.size,
              size = _this$size === void 0 ? 'normal' : _this$size,
              disabled = this.disabled,
              block = this.block,
              ghost = this.ghost;
          return [type === 'default' ? null : 'busy-button--' + type, size === 'normal' ? null : 'busy-button--' + size, {
            'is-disabled': disabled,
            'is-block': block,
            'is-ghost': ghost
          }];
        },
        thinBorder: function thinBorder() {
          if (!this.isThin) return null;
          var br = this.sharp ? 0 : this.borderRadius || 4,
              regBr;
          var dpr = window.devicePixelRatio;

          if (br) {
            if (/^\d+$/.test(br)) {
              br = br * dpr + 'px';
            } else if (!/%$/.test(br)) {
              regBr = String(br).match(/(\d+)([a-zA-Z]+)/);
              br = regBr[1] * dpr + regBr[2];
            }
          }

          return {
            borderRadius: br,
            borderColor: this.borderColor
          };
        },
        styles: function styles() {
          var h = cmpUnit(this.height),
              w = cmpUnit(this.width),
              br = this.sharp ? 0 : this.borderRadius || null,
              fs = this.fontSize,
              size = this.size;
          var o = {
            height: h,
            borderWidth: !this.isThin ? this.borderWidth || null : null,
            borderColor: !this.isThin ? this.borderColor : null,
            width: w,
            fontSize: /^\d+$/.test(fs) ? fs + 'px' : fs || null,
            backgroundColor: this.ghost ? 'transparent' : this.bgColor,
            color: this.fontColor,
            borderRadius: /^\d+$/.test(br) ? br + 'px' : br
          };
          return o;
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

      return _c('button', {
        staticClass: "busy-button",
        class: _vm.classes,
        style: _vm.styles,
        attrs: {
          "type": _vm.nativeType,
          "disabled": _vm.disabled
        },
        on: {
          "click": _vm.handleClick
        }
      }, [_c('label', {
        staticClass: "busy-button__text"
      }, [_vm._t("default", [_vm._v(_vm._s(_vm.content))])], 2), _vm._v(" "), _vm.isThin ? _c('span', {
        staticClass: "busy-button__border",
        style: _vm.thinBorder
      }) : _vm._e()]);
    };

    var __vue_staticRenderFns__$e = [];
    /* style */

    var __vue_inject_styles__$e = undefined;
    /* scoped */

    var __vue_scope_id__$e = "data-v-1a6524fb";
    /* module identifier */

    var __vue_module_identifier__$e = undefined;
    /* functional template */

    var __vue_is_functional_template__$e = false;
    /* style inject */

    /* style inject SSR */

    var Button = normalizeComponent_1({
      render: __vue_render__$e,
      staticRenderFns: __vue_staticRenderFns__$e
    }, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, undefined, undefined);

    Button.install = function (vue) {
      vue.component(Button.name, Button);
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

    /**
     * @busyui/checkbox
     * @desc 勾选框  <busy-checkbox />
     * @module Checkbox
     * @see {@link ../example/all/checkbox.html 实例}
     * @param {string} label 显示在右侧的内容
     * @param {boolean} disabled 是否禁用
     *
     * @example
     * <busy-checkbox v-model="checked" label="这个位置是标签1"></busy-checkbox>
     * <busy-checkbox v-model="disable" label="是否禁用下面的按钮"></busy-checkbox>
     */
    var script$f = {
      name: 'busy-checkbox',
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
    var __vue_script__$f = script$f;
    /* template */

    var __vue_render__$f = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-checkbox"
      }, [_c('label', {
        staticClass: "busy-checkbox__label"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        staticClass: "busy-checkbox__input",
        attrs: {
          "type": "checkbox",
          "disabled": _vm.disabled
        },
        domProps: {
          "checked": Array.isArray(_vm.currentValue) ? _vm._i(_vm.currentValue, null) > -1 : _vm.currentValue
        },
        on: {
          "change": function change($event) {
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
      }), _vm._v(" "), _c('span', {
        staticClass: "busy-checkbox__core",
        style: _vm.styles
      }), _vm._v(" "), _vm.label || _vm.$slots.default ? _c('span', {
        staticClass: "busy-checkbox__content"
      }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2) : _vm._e()])]);
    };

    var __vue_staticRenderFns__$f = [];
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

    var Checkbox = normalizeComponent_1({
      render: __vue_render__$f,
      staticRenderFns: __vue_staticRenderFns__$f
    }, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, undefined, undefined);

    Checkbox.install = function (vue) {
      vue.component(Checkbox.name, Checkbox);
    };

    var script$g = {
      name: 'busy-picker',
      props: {
        columns: {
          type: Array
        }
      },
      data: function data() {
        return {
          cols: ['选项xx', '选项xx', '选项xx', '选项xx', '选项xx', '选项xx', '选项xx']
        };
      },
      components: _defineProperty({}, Mask.name, Mask),
      mounted: function mounted() {}
    };

    /* script */
    var __vue_script__$g = script$g;
    /* template */

    var __vue_render__$g = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('busy-mask', {
        attrs: {
          "is-show": true
        }
      }, [_c('div', {
        staticClass: "busy-picker"
      }, [_c('div', {
        staticClass: "busy-picker__title"
      }), _vm._v(" "), _c('div', {
        staticClass: "busy-picker__wrap",
        attrs: {
          "id": "wrapper"
        }
      }, [_c('div', {
        staticClass: "busy-picker__box"
      }, [_c('div', {
        staticClass: "busy-picker__column"
      }, [_c('div', {
        staticClass: "busy-picker_scoll",
        attrs: {
          "id": "aa"
        }
      }, _vm._l(_vm.cols, function (col) {
        return _c('div', {
          key: col,
          staticClass: "busy-picker__item"
        }, [_c('span', [_vm._v(_vm._s(col))])]);
      }), 0)]), _vm._v(" "), _c('div', {
        staticClass: "busy-picker__column"
      }, _vm._l(_vm.cols, function (col) {
        return _c('div', {
          key: col,
          staticClass: "busy-picker__item"
        }, [_c('span', [_vm._v(_vm._s(col))])]);
      }), 0)]), _vm._v(" "), _c('div', {
        staticClass: "busy-picker__mask"
      })])])]);
    };

    var __vue_staticRenderFns__$g = [];
    /* style */

    var __vue_inject_styles__$g = undefined;
    /* scoped */

    var __vue_scope_id__$g = "data-v-8947c9f8";
    /* module identifier */

    var __vue_module_identifier__$g = undefined;
    /* functional template */

    var __vue_is_functional_template__$g = false;
    /* style inject */

    /* style inject SSR */

    var Picker = normalizeComponent_1({
      render: __vue_render__$g,
      staticRenderFns: __vue_staticRenderFns__$g
    }, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, undefined, undefined);

    Picker.install = function (vue) {
      vue.component(Picker.name, Picker);
    };

    //
    var script$h = {
      name: 'busy-dialog',
      props: {
        mask: {
          type: Boolean,
          default: true
        },
        width: {
          type: [Number, String]
        },
        zIndex: {
          type: [Number, String]
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
          type: [Number, String]
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
          visiable: this.isShow,
          leave: !this.isShow
        };
      },
      components: {
        Icon: Icon,
        BusyMask: Mask
      },
      computed: {
        styles: function styles() {
          var w = this.width,
              h = this.height;

          if (this.width) {
            w = /^\d+$/.test(w) ? w + 'px' : w;
          }

          if (this.height) {
            h = /^\d+$/.test(h) ? h + 'px' : h;
          }

          return {
            height: h,
            width: w,
            zIndex: this.zIndex
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
          if (val === true) {
            this.leave = false;
          }

          this.$emit('visiable-change', val);
        }
      },
      methods: {
        hide: function hide() {
          this.visiable = false;
          this.$emit('hide');
          return this;
        },
        show: function show() {
          this.visiable = true;
          this.$emit('show');
          return this;
        },
        _leave: function _leave() {
          this.leave = true;
          this.$emit('after-leave'); // 动画结束，清除元素

          if (this.isRemove) {
            this.$destroy();
            this.$el.remove();
            this.$emit('destroy', this);
          }

          this.$emit('hide-end', this);
        }
      }
    };

    /* script */
    var __vue_script__$h = script$h;
    /* template */

    var __vue_render__$h = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: !_vm.leave,
          expression: "!leave"
        }],
        staticClass: "busy-dialog"
      }, [_c('transition', {
        attrs: {
          "name": "busy-animate--scale"
        },
        on: {
          "after-leave": _vm._leave
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        staticClass: "busy-dialog__wrap",
        style: _vm.styles
      }, [_vm.showClose ? _c('p', {
        staticClass: "busy-dialog__close",
        on: {
          "click": function click($event) {
            $event.stopPropagation();
            return _vm.hide($event);
          }
        }
      }, [_c('Icon', {
        attrs: {
          "type": "close",
          "width": 20,
          "height": 20,
          "fill": "#8a8a8a"
        }
      })], 1) : _vm._e(), _vm._v(" "), _vm.title ? _c('header', {
        staticClass: "busy-dialog__header"
      }, [_vm._t("header", [_c('div', {
        staticClass: "busy-dialog__title"
      }, [_vm._v(_vm._s(_vm.title))])])], 2) : _vm._e(), _vm._v(" "), _vm.content || _vm.$slots['default'] ? _c('div', {
        staticClass: "busy-dialog__body"
      }, [_vm._t("default", [_c('div', {
        style: _vm.contentStyle,
        domProps: {
          "innerHTML": _vm._s(_vm.content)
        }
      })])], 2) : _vm._e(), _vm._v(" "), _c('footer', {
        staticClass: "busy-dialog__footer",
        class: {
          'busy-dialog__footer_row': _vm.buttonDirection == 'row',
          'busy-dialog__footer_column': _vm.buttonDirection == 'column'
        }
      }, [_vm._t("footer", [_vm._l(_vm.bindButtons, function (btn, $i) {
        return [_c('p', {
          key: 'btn-' + $i,
          staticClass: "busy-dialog__button",
          class: btn.class,
          style: btn.style,
          on: {
            "click": function click($event) {
              $event.stopPropagation();
              return btn.action($event);
            }
          }
        }, [_vm._v(_vm._s(btn.text))])];
      })])], 2)])]), _vm._v(" "), _c('BusyMask', {
        attrs: {
          "is-show": _vm.visiable,
          "is-remove": _vm.isRemove,
          "color": "rgba(0,0,0,.6)"
        }
      })], 1);
    };

    var __vue_staticRenderFns__$h = [];
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

    var Dialog = normalizeComponent_1({
      render: __vue_render__$h,
      staticRenderFns: __vue_staticRenderFns__$h
    }, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, undefined, undefined);

    var DialogClass = Vue.extend(Dialog);
    /**
     * @busyui/dialog
     * @module Dialog
     * @see {@link ../example/all/dialog.html 实例}
     * @desc 对话框组件
     * @param {Number} width=80% - 对话框宽度
     * @param {Number} height=160 - 对话框高度
     * @param {String} content - 对话框内容, 必填
     * @param {String} title＝'' - 对话框标题
     * @param {Function} show - 显示
     * @param {Function} hide - 隐藏
     * @param {Array<Object>} buttons=[{text:'确定'},{text:'取消'}] - 对话框标题
     * @param {Object} contentStyle - 对话框内容样式
     * @param {Boolean} showClose=false - 是否显示关闭按钮
     * @param {Boolean} isRemove=false - 是否隐藏后移除,动态创建时会用到
     * @param {Boolean} isShow=false - 是否显示
     * @param {Number|String} zIndex=1000 - z-index值控制层叠
     * @param {String} buttonDirection=row - 横向排列按钮(row)/纵向排列按钮(column)
     * @example
     * import {Dialog} from '@busyui/dialog';
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

    var Dialog$1 = _extends(Dialog, {
      install: function install(vue) {
        vue.component(Dialog.name, Dialog);
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
       * Busy.Dialog.show({content:'红包来了!',title:'发红包了'})
       * 
       */
      show: function show(opts) {
        opts = opts || {};
        var instance = new DialogClass({
          el: document.createElement('div'),
          propsData: _extends({}, opts, {
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

    var script$i = {
      name: 'busy-alert',
      extends: Dialog,
      components: {
        BusyDialog: Dialog
      },
      computed: {
        datas: function datas() {
          return _objectSpread({}, this.$props, {
            isShow: this.visiable,
            buttons: [{
              text: '确定'
            }]
          });
        }
      },
      methods: {
        handleVisiable: function handleVisiable(visiable) {
          this.visiable = visiable;
        }
      }
    };

    /* script */
    var __vue_script__$i = script$i;
    /* template */

    var __vue_render__$i = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('BusyDialog', _vm._b({
        ref: "dialog",
        staticClass: "busy-alert",
        on: {
          "visiable-change": _vm.handleVisiable
        }
      }, 'BusyDialog', _vm.datas, false), [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__$i = [];
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

    var Alert = normalizeComponent_1({
      render: __vue_render__$i,
      staticRenderFns: __vue_staticRenderFns__$i
    }, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, undefined, undefined);

    var AlertClass = Vue.extend(Alert);
    /**
     * @busyui/alert
     * @module Alert
     * @see {@link ../example/all/dialog.html 实例}
     * @desc alert对话框组件
     * @param {String} content - 显示信息
     * @param {Number} height=140 - 组件高度
     * @param {Number} width=240 - 组件高度
     * 
     * @example
     * // use it in html
     * <script src="busyui.js"><\/script>
     * <link rel="stylesheet" href="busyui.css" />
     * 
     * Busy.Alert.show('提交申请成功');
     *
     * // use it in webpack or browserify, rollup
     * import {Alert} from '@busyui/dialog';
     * // var Aler = require('@busyui/dialog/alert.js');
     *
     * Alert.show('提交申请成功');
     *
     */

    var Alert$1 = _extends(Alert, {
      $type: 'alert',
      install: function install(vue) {
        vue.component(Alert.name, Alert);
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
       * busy.Alert.show('提交申请成功');
       */
      show: function show(text, opts) {
        if (_typeof(text) === 'object') {
          opts = text;
          text = opts.content;
        }

        opts = opts || {};
        var instance = new AlertClass({
          el: document.createElement('div'),
          propsData: _extends(opts, {
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

    var script$j = {
      name: 'busy-confirm',
      extends: Dialog,
      components: {
        BusyDialog: Dialog
      },
      computed: {
        _buttons: function _buttons() {
          return [{
            text: '取消',
            action: this.handleCancel
          }, {
            text: '确定',
            action: this.handleConfirm
          }];
        },
        datas: function datas() {
          return _objectSpread({}, this.$props, {
            isShow: this.visiable,
            buttons: this._buttons
          });
        }
      },
      methods: {
        handleConfirm: function handleConfirm() {
          this.$emit('confirm');
        },
        handleCancel: function handleCancel() {
          this.$emit('cancel');
        },
        handleVisiable: function handleVisiable(visiable) {
          this.visiable = visiable;
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

      return _c('BusyDialog', _vm._b({
        ref: "dialog",
        on: {
          "visiable-change": _vm.handleVisiable
        }
      }, 'BusyDialog', _vm.datas, false), [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__$j = [];
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

    var Confirm = normalizeComponent_1({
      render: __vue_render__$j,
      staticRenderFns: __vue_staticRenderFns__$j
    }, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, undefined, undefined);

    var ConfirmClass = Vue.extend(Confirm);
    var instance$2;
    /**
     * busy-confirm
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
     * <script src="busyui.js"><\/script>
     * <link rel="stylesheet" href="busyui.css" />
     * 
     * Busy.Confirm.show('确定要提交吗？', (result)=>{if (result) {console.log('提交')}});
     * 
     * // use it in webpack or browserify, rollup
     * import {Confirm} from '@busyui/dialog';
     * // var Confirm = require('@busyui/dialog/confirm.js');
     *
     * Confirm.show('确定要提交吗？').then((result)=>{if (result) {console.log('提交')}});
     *
     */

    var Confirm$1 = _extends(Confirm, {
      $type: 'confirm',
      install: function install(vue) {
        vue.component(Confirm.name, Confirm);
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
       * const confirm = Busy.Confirm.show('确认要提交吗？', (rst)=>{if (rs) console.log('确认提交')});
       * confirm.doClose();
       * 
       */
      show: function show(text, opts) {
        if (_typeof(text) === 'object') {
          opts = text;
          text = opts.content;
        }

        opts = opts || {};
        instance$2 = new ConfirmClass({
          el: document.createElement('div'),
          propsData: _extends(opts, {
            content: text,
            isRemove: true
          })
        });
        return new Promise(function (resolve, reject) {
          Vue.nextTick(function () {
            var vm = instance$2.$mount();
            document.body.appendChild(vm.$el);
            instance$2.show();
          });
          instance$2.$on('confirm', function () {
            return resolve();
          });
          instance$2.$on('cancel', function () {
            return reject();
          });
        });
      },
      hide: function hide() {
        if (instance$2) {
          instance$2.hide();
          instance$2 = null;
        }
      }
    });

    var script$k = {
      name: 'busy-prompt',
      extends: Dialog,
      components: {
        BusyDialog: Dialog
      },
      props: {
        placeholder: String,
        height: {
          type: [String, Number],
          default: 180
        },
        content: String,
        value: [String, Number]
      },
      data: function data() {
        return {
          currentVal: this.value
        };
      },
      watch: {
        value: function value(val) {
          this.currentVal = val;
        },
        currentVal: function currentVal(val) {
          this.$emit('input', val);
        }
      },
      computed: {
        _buttons: function _buttons() {
          return [{
            text: '取消',
            action: this.handleCancel
          }, {
            text: '确定',
            action: this.handleConfirm
          }];
        },
        datas: function datas() {
          return _objectSpread({}, this.$props, {
            isShow: this.visiable,
            buttons: this._buttons
          });
        }
      },
      methods: {
        handleConfirm: function handleConfirm() {
          this.$emit('confirm', this.currentVal);
        },
        handleCancel: function handleCancel() {
          this.$emit('cancel');
        },
        handleVisiable: function handleVisiable(visiable) {
          this.visiable = visiable;
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

      return _c('BusyDialog', _vm._b({
        ref: "dialog",
        on: {
          "visiable-change": _vm.handleVisiable
        }
      }, 'BusyDialog', _vm.datas, false), [_c('div', [_vm.content ? _c('div', {
        staticClass: "busy-prompt__text"
      }, [_vm._v("\n            " + _vm._s(_vm.content) + "\n        ")]) : _vm._e(), _vm._v(" "), _c('div', {
        staticClass: "busy-prompt__input_box"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentVal,
          expression: "currentVal"
        }],
        staticClass: "busy-prompt__input",
        attrs: {
          "type": "text",
          "placeholder": _vm.placeholder
        },
        domProps: {
          "value": _vm.currentVal
        },
        on: {
          "input": function input($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.currentVal = $event.target.value;
          }
        }
      })])])]);
    };

    var __vue_staticRenderFns__$k = [];
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

    var Prompt = normalizeComponent_1({
      render: __vue_render__$k,
      staticRenderFns: __vue_staticRenderFns__$k
    }, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, undefined, undefined);

    var PromptClass = Vue.extend(Prompt);
    var instance$3;
    /**
     * @busyui/prompt
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
     * <script src="busyui.js"><\/script>
     * <link rel="stylesheet" href="busyui.css" />
     * 
     * Busy.Prompt.show('请填写信息？', (val)=>{console.log(val)});
     * 
     * // use it in webpack or browserify, rollup
     * import {Prompt} from '@busyui/dialog';
     * // var Prompt = require('@busyui/dialog/prompt.js');
     *
     * Prompt.show('请填写信息？', (val)=>{console.log(val)});
     *
     */

    var Prompt$1 = _extends(Prompt, {
      $type: 'prompt',
      install: function install(vue) {
        vue.component(Prompt.name, Prompt);
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
       * const confirm = Busy.Prompt.show('请输入要跳转的网址', (url)=>{window.location = url});
       * prompt.doClose();
       * 
       */
      show: function show(placeholder, opts) {
        if (_typeof(placeholder) === 'object') {
          opts = placeholder;
          placeholder = opts.placeholder;
        }

        opts = opts || {};
        var val = '';

        if (instance$3) {
          this.hide();
        }

        instance$3 = new PromptClass({
          el: document.createElement('div'),
          propsData: _extends(opts, {
            placeholder: placeholder,
            isRemove: true,
            value: val
          })
        });
        return new Promise(function (resolve, reject) {
          Vue.nextTick(function () {
            var vm = instance$3.$mount();
            document.body.appendChild(vm.$el);
            instance$3.show();
          });
          instance$3.$on('confirm', function () {
            return resolve(val);
          });
          instance$3.$on('cancel', function () {
            return reject();
          });
          instance$3.$on('input', function (newVal) {
            return val = newVal;
          });
        });
      },
      hide: function hide() {
        if (instance$3) {
          instance$3.hide();
          instance$3 = null;
        }
      }
    });

    var script$l = {
      name: 'busy-message',
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
      components: _defineProperty({}, Icon.name, Icon),
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
          return 'busy-message--pos-' + this.pos;
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
    var __vue_script__$l = script$l;
    /* template */

    var __vue_render__$l = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": "msg-scale"
        },
        on: {
          "after-leave": _vm._leave
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        staticClass: "busy-message",
        class: _vm._posClass,
        style: _vm.styles
      }, [_vm.type ? _c('div', {
        staticClass: "busy-message__icon"
      }, [_c('busy-icon', {
        attrs: {
          "type": _vm._iconStyles.t,
          "fill": _vm._iconStyles.c
        }
      })], 1) : _vm._e(), _vm._v(" "), _c('div', {
        staticClass: "busy-message__text"
      }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2)])]);
    };

    var __vue_staticRenderFns__$l = [];
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

    var Message = normalizeComponent_1({
      render: __vue_render__$l,
      staticRenderFns: __vue_staticRenderFns__$l
    }, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, undefined, undefined);

    var MessageClass = Vue.extend(Message);
    /**
     * @busyui/message
     * @module Message
     * @see {@link ../example/all/message.html 实例}
     * @desc 浮层提示信息组件 <busy-meesage></busy-meesage>
     * @param {String} pos='top' - 显示位置,可取值 'top', 'middle', 'bottom'
     * @param {String} type='info' - 提示框类型, 可取值 'info', 'success', 'error', 'warning'
     * @param {String} text - 提示信息内容, 也可以slot方式传入
     * @param {Number} delay=3000 - 显示多长时间，单位 ms<毫秒>
     * @param {Boolean} isRemove=false - 是否隐藏后移除dom
     * @param {Boolean} autoHide=false - 是否自动隐藏
     * @example
     * 
     *  // use it in module tools
     *  import Message from '@busyui/message';
     *  Message.show('有新信息了');
     *  Message.info('有新信息了');
     *  Message.success('信息提交成功');
     *  Message.warning('内容包含非法词');
     * 
     *  // use it in html
     *  <script src="busyui.js"><\/script>
     *  <link rel="stylesheet" href="Busy.min.css">
     *  Busy.Message.show('有新信息了');
     *  Busy.Message.info('有新信息了');
     *  Busy.Message.success('信息提交成功');
     *  Busy.Message.warning('内容包含非法词');
     * 
     */

    var Message$1 = _extends(Message, {
      install: function install(vue) {
        vue.component(Message.name, Message);
      },

      /**
       * 显示提示信息
       * @method show
       * @static
       * @param {Object} opts - 配置项, <a href="#module_Message">参考</a>
       * @returns MessageClass实例
       * 
       * @example
       * Busy.Message.show('有新信息了');
       * 
       */
      show: function show(opts) {
        opts = opts || {};
        var msg = new MessageClass({
          el: document.createElement('div'),
          propsData: _extends({}, {
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
       *  Busy.Message.info('收到一个优惠券');
       * 
       */
      info: function info(text, opts) {
        return this.show(_extends(opts || {}, {
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
       *  Busy.Message.success('提交成功');
       * 
       */
      success: function success(text, opts) {
        return this.show(_extends(opts || {}, {
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
       *  Busy.Message.warning('内容包含非法词');
       * 
       */
      warning: function warning(text, opts) {
        return this.show(_extends(opts || {}, {
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
       *  Busy.Message.error('内容包含非法词');
       * 
       */
      error: function error(text, opts) {
        return this.show(_extends(opts || {}, {
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

    /**
     * busy-progress-ring
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
     *      <busy-progress-ring :size="50" :track-width="10"></busy-progress-ring>
     **/
    var script$m = {
      name: 'busy-progress-ring',
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
    var __vue_script__$m = script$m;
    /* template */

    var __vue_render__$m = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-progress-ring",
        on: {
          "click": _vm.handleClick
        }
      }, [_c('svg', {
        attrs: {
          "width": _vm.size,
          "height": _vm.size,
          "viewport": _vm.viewport,
          "version": "1.1",
          "xmlns": "http://www.w3.org/2000/svg"
        }
      }, [_c('circle', {
        staticClass: "busy-progress-ring__track",
        style: _vm.trackStyles,
        attrs: {
          "cx": _vm.radius,
          "cy": _vm.radius,
          "r": _vm.sRdius,
          "fill": "transparent",
          "stroke-linecap": _vm.linecap,
          "stroke-dasharray": _vm.dasharray,
          "stroke-dashoffset": 0
        }
      }), _vm._v(" "), _c('circle', {
        staticClass: "busy-progress-ring__bar",
        style: _vm.barStyles,
        attrs: {
          "cx": _vm.radius,
          "cy": _vm.radius,
          "r": _vm.sRdius,
          "fill": "transparent",
          "stroke-linecap": _vm.linecap,
          "stroke-dasharray": _vm.dasharray,
          "stroke-dashoffset": _vm.dashoffset
        }
      })])]);
    };

    var __vue_staticRenderFns__$m = [];
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

    var ProgressRing = normalizeComponent_1({
      render: __vue_render__$m,
      staticRenderFns: __vue_staticRenderFns__$m
    }, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, undefined, undefined);

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
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
     * busy-progress-line
     * @des 线形进度条组件
     * @param {Number} width - 组件长度,默认 100%
     * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
     * @param {Number | String} trackWidth - 进度槽的宽度, 默认值5<px>
     * @param {String} trackColor - 进度槽颜色, 取值范围 css color
     * @param {String} barColor - 进度条颜色, 取值范围 css color
     * @param {String} showText - 是否显示进度数值, 默认 false
     * @example
     *      <busy-progress-line :percent="45" :width="150" :track-width="4"></busy-progress-line>
     *      <busy-progress-ring :percent="45" :width="150" :track-width="4"></busy-progress-ring>
     **/
    var script$n = {
      name: 'busy-progress-line',
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
    var __vue_script__$n = script$n;
    /* template */

    var __vue_render__$n = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-progress-line",
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_c('div', {
        staticClass: "busy-progress-line__bar",
        style: _vm.barStyles
      }), _vm._v(" "), _vm.showText ? _c('div', {
        staticClass: "busy-progtress-line__text",
        style: _vm.textStyle
      }, [_vm._v(_vm._s(_vm.percent) + "%")]) : _vm._e()]);
    };

    var __vue_staticRenderFns__$n = [];
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

    var ProgressLine = normalizeComponent_1({
      render: __vue_render__$n,
      staticRenderFns: __vue_staticRenderFns__$n
    }, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, undefined, undefined);

    var _component;
    /**
     * busy-progress
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
     * @param {String} type - 进度条组件类型, 可取值 'line' [<busy-progress-line />], 'ring' [<busy-progress-ring />], 默认 'line'
     * @example
     *      <busy-progress type="ring" :size="50" :track-width="5"></busy-progress>
     **/

    var script$o = {
      name: 'busy-progress',
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
      component: (_component = {}, _defineProperty(_component, ProgressLine.name, ProgressLine), _defineProperty(_component, ProgressRing.name, ProgressRing), _component),
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
    var __vue_script__$o = script$o;
    /* template */

    var __vue_render__$o = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-progress",
        on: {
          "click": _vm.handleClick
        }
      }, [_vm.type === 'line' ? _c('busy-progress-line', {
        ref: "child-line",
        attrs: {
          "width": _vm.width,
          "bar-color": _vm.barColor,
          "track-color": _vm.trackColor,
          "track-width": _vm.trackWidth,
          "percent": _vm.percent,
          "show-text": _vm.showText,
          "duration": _vm.duration
        }
      }) : _vm._e(), _vm._v(" "), _vm.type === 'ring' ? _c('busy-progress-ring', {
        ref: "child-ring",
        attrs: {
          "size": _vm.size,
          "bar-color": _vm.barColor,
          "track-color": _vm.trackColor,
          "track-width": _vm.trackWidth,
          "percent": _vm.percent,
          "direction": _vm.direction,
          "show-text": _vm.showText,
          "duration": _vm.duration
        }
      }, [_vm._v(_vm._s(_vm.mycontent))]) : _vm._e()], 1);
    };

    var __vue_staticRenderFns__$o = [];
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

    var Progress = normalizeComponent_1({
      render: __vue_render__$o,
      staticRenderFns: __vue_staticRenderFns__$o
    }, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, undefined, undefined);

    Progress.install = function (vue) {
      vue.component(ProgressRing.name, ProgressRing);
      vue.component(ProgressLine.name, ProgressLine);
      vue.component(Progress.name, Progress);
    };

    var _components;
    var script$p = {
      name: 'busy-loadmore-bar',
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
      components: (_components = {}, _defineProperty(_components, Spinner.name, Spinner), _defineProperty(_components, Icon.name, Icon), _components),
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
    var __vue_script__$p = script$p;
    /* template */

    var __vue_render__$p = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.pos == 'top' || _vm.pos == 'bottom' && _vm.status == 'loading',
          expression: "pos=='top' || pos=='bottom' && status=='loading'"
        }],
        staticClass: "busy-loadmore__bar busy-al-cm"
      }, [_c('p', {
        staticClass: "busy-loadmore__spinner"
      }, [_c('busy-spinner', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.status === 'loading',
          expression: "status==='loading'"
        }],
        style: {
          verticalAlign: 'middle'
        },
        attrs: {
          "size": _vm.size,
          "type": 6,
          "color": "#aaa"
        }
      })], 1), _vm._v(" "), _c('p', {
        staticClass: "busy-loadmore__text",
        class: ['busy-loadmore--' + _vm.status]
      }, [_vm.pos == 'top' ? _c('span', {
        staticClass: "busy-loadmore__arrow"
      }, [_c('busy-icon', {
        attrs: {
          "height": 30,
          "type": "refresharrow",
          "fill": "#000"
        }
      })], 1) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.loadText))])])]);
    };

    var __vue_staticRenderFns__$p = [];
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

    var loadMoreBar = normalizeComponent_1({
      render: __vue_render__$p,
      staticRenderFns: __vue_staticRenderFns__$p
    }, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, undefined, undefined);

    /**
     * @busyui/loadmore
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
     *  <busy-loadmore>content list</busy-loadmore>
     */

    var script$q = {
      name: 'busy-loadmore',
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
      components: _defineProperty({}, loadMoreBar.name, loadMoreBar),
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
    var __vue_script__$q = script$q;
    /* template */

    var __vue_render__$q = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-loadmore"
      }, [_c('div', {
        staticClass: "busy-loadmore__content",
        style: _vm.styles
      }, [_vm._t("top", [_vm.onRefresh ? _c('busy-loadmore-bar', {
        ref: "top",
        staticClass: "busy-loadmore__top",
        attrs: {
          "pull-text": _vm.topPullText,
          "loading-text": _vm.topLoadingText,
          "drop-text": _vm.topDropText,
          "show-status": _vm.tStatus,
          "pos": "top"
        }
      }) : _vm._e()]), _vm._v(" "), _c('div', {
        staticClass: "busy-loadmore__content"
      }, [_vm._t("default")], 2), _vm._v(" "), _vm.onInfinite ? _vm._t("bottom", [_c('busy-loadmore-bar', {
        ref: "bottom",
        staticClass: "busy-loadmore__bottom",
        attrs: {
          "pull-text": _vm.bottomPullText,
          "loading-text": _vm.bottomLoadingText,
          "drop-text": _vm.bottomDropText,
          "show-status": _vm.bStatus,
          "pos": "bottom"
        }
      })]) : _vm._e(), _vm._v(" "), _vm.noMore ? _vm._t("no-more", [_c('div', {
        staticClass: "busy-loadmore__nomore"
      }, [_vm._v(_vm._s(_vm.noMoreText))])]) : _vm._e()], 2)]);
    };

    var __vue_staticRenderFns__$q = [];
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

    var LoadMore = normalizeComponent_1({
      render: __vue_render__$q,
      staticRenderFns: __vue_staticRenderFns__$q
    }, __vue_inject_styles__$q, __vue_script__$q, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, undefined, undefined);

    LoadMore.install = function (vue) {
      vue.component(LoadMore.name, LoadMore);
    };

    //
    var VERTICAL = 'vertical';
    var HORIZONTAL = 'horizontal';
    /**
     * busy-swipe
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
     *  <busy-swipe :interval="3000" :auto-play="true" :height="320">
     *      <busy-swipe__item>内容</busy-swipe__item>
     *      <busy-swipe__item>内容</busy-swipe__item>
     * </busy-swipe>
     */

    var script$r = {
      name: 'busy-swipe',
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
          return ["busy-swipe__dots--pos-".concat(this.dotesPos)];
        },
        classes: function classes() {
          return [this.status == "transition" ? 'busy-swipe--transition' : '', this.dirType == HORIZONTAL ? 'busy-swipe--horizontal' : 'busy-swipe--vertical'];
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
        this.items = [].slice.call(this.$el.querySelectorAll('.busy-swipe__item'));
        this.size = this.items.length;

        if (this.index < 0 || this.index >= this.size) {
          this.index = 0;
          console.warn('[Busy warn]:Index out of range');
        }

        this._bindTouch(); //this.distance = -1 * this.index * this.itemWidth;


        this.autoPlay && this._autoPlay();
      }
    };

    /* script */
    var __vue_script__$r = script$r;
    /* template */

    var __vue_render__$r = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-swipe",
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_c('div', {
        staticClass: "busy-swipe__wrap",
        class: _vm.classes,
        style: _vm.wrapStyles
      }, [_vm._t("default")], 2), _vm._v(" "), _vm.showDotes ? _c('div', {
        staticClass: "busy-swpier__dotes",
        class: _vm.dotesClass
      }, _vm._l(_vm.items, function (item, i) {
        return _c('span', {
          key: 'swiper-' + i,
          class: ['busy-swipe__dot', i == _vm.index ? 'busy-swipe__dot--cur' : ''],
          style: [_vm.dotStyles, i == _vm.index ? {
            backgroundColor: _vm.curDotColor
          } : {}],
          on: {
            "click": function click($event) {
              $event.stopPropagation();
              return _vm.goIndex(i);
            }
          }
        });
      }), 0) : _vm._e()]);
    };

    var __vue_staticRenderFns__$r = [];
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

    var Swipe = normalizeComponent_1({
      render: __vue_render__$r,
      staticRenderFns: __vue_staticRenderFns__$r
    }, __vue_inject_styles__$r, __vue_script__$r, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, undefined, undefined);

    //
    //
    //
    //
    //
    //
    var script$s = {
      name: 'busy-swipe__item'
    };

    /* script */
    var __vue_script__$s = script$s;
    /* template */

    var __vue_render__$s = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-swipe__item"
      }, [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__$s = [];
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

    var SwipeItem = normalizeComponent_1({
      render: __vue_render__$s,
      staticRenderFns: __vue_staticRenderFns__$s
    }, __vue_inject_styles__$s, __vue_script__$s, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, undefined, undefined);

    Swipe.install = function (vue) {
      vue.component(SwipeItem.name, SwipeItem);
      vue.component(Swipe.name, Swipe);
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
    var script$t = {
      name: 'busy-action-sheet-item',
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
    var __vue_script__$t = script$t;
    /* template */

    var __vue_render__$t = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-action-sheet__item busy-border-1px busy-border-b",
        on: {
          "click": _vm.handleClick
        }
      }, [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__$t = [];
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

    var ActionSheetItem = normalizeComponent_1({
      render: __vue_render__$t,
      staticRenderFns: __vue_staticRenderFns__$t
    }, __vue_inject_styles__$t, __vue_script__$t, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, undefined, undefined);

    var _components$1;
    var script$u = {
      name: 'busy-action-sheet',
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
      components: (_components$1 = {}, _defineProperty(_components$1, Mask.name, Mask), _defineProperty(_components$1, ActionSheetItem.name, ActionSheetItem), _components$1),
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
    var __vue_script__$u = script$u;
    /* template */

    var __vue_render__$u = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('busy-mask', {
        attrs: {
          "is-show": _vm.visiable,
          "is-remove": _vm.isRemove
        },
        on: {
          "click": function click($event) {
            $event.stopPropagation();
            return _vm.hide($event);
          }
        }
      }, [_c('transition', {
        attrs: {
          "name": "busy-animate_bibo"
        },
        on: {
          "after-enter": _vm._enter,
          "after-leave": _vm._leave
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        ref: "oel",
        staticClass: "busy-action-sheet",
        style: _vm.styles
      }, [_c('div', {
        staticClass: "busy-action-sheet__box"
      }, [_c('div', {
        staticClass: "busy-action-sheet__list"
      }, [_vm._t("default", _vm._l(_vm.actions, function (ac, $i) {
        return _c('busy-action-sheet-item', {
          key: 'as-' + $i,
          on: {
            "click": ac.action
          }
        }, [_vm._v(_vm._s(ac.text))]);
      }))], 2), _vm._v(" "), _c('div', {
        staticClass: "busy-action-sheet__button",
        on: {
          "click": _vm.hide
        }
      }, [_vm._v("取消")])])])])], 1);
    };

    var __vue_staticRenderFns__$u = [];
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

    var ActionSheet = normalizeComponent_1({
      render: __vue_render__$u,
      staticRenderFns: __vue_staticRenderFns__$u
    }, __vue_inject_styles__$u, __vue_script__$u, __vue_scope_id__$u, __vue_is_functional_template__$u, __vue_module_identifier__$u, undefined, undefined);

    var ActionSheetClass, instance$4, vm;
    /**
     * @busyui/action-sheet
     * @module ActionSheet
     * @see {@link ../example/all/action-sheet.html 实例}
     * @desc ActionSheet框组件 <busy-action-sheet />
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
     * import ActionSheet from '@busyui/action-sheet'
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
     * <busy-action-sheet @visiable-change="visiableChange" :is-show="isShow" :actions="actions"></busy-action-sheet>
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
     *              Busy.ActionSheet.show({
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
     *      Busy.ActionSheet.show({actions:{text:'执行动作', action: function(){console.log('do something')}}})
     * 
     */


    ActionSheet.show = function (opts) {
      if (instance$4) {
        ActionSheet.hide();
      }

      instance$4 = new ActionSheetClass({
        el: document.createElement('div'),
        propsData: _extends(opts || {}, {
          isRemove: true
        })
      });
      instance$4.$nextTick(function () {
        vm = instance$4.$mount();
        document.body.appendChild(vm.$el);
        instance$4.show();
      });
      return instance$4;
    };
    /**
     * @method hide
     * @static
     * 
     * @example
     * 
     *   Busy.ActionSheet.hide()
     * 
     */


    ActionSheet.hide = function () {
      if (instance$4) {
        instance$4.hide();
        vm = null;
        instance$4 = null;
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
     *   if （Busy.ActionSheet.isVisiable(){
     *     console.log('done something')
     *   }
     * 
     */


    ActionSheet.isVisiable = function () {
      return !!instance$4 && instance$4.isShow;
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
    var script$v = {
      name: 'busy-input',
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
            this.$el.querySelector('input').focus(); //})
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
          this.$el.querySelector('input').focus(); //})
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

      return _c('div', {
        directives: [{
          name: "clickoutside",
          rawName: "v-clickoutside",
          value: _vm.unActive,
          expression: "unActive"
        }],
        staticClass: "busy-input"
      }, [_c('div', {
        staticClass: "busy-input__content"
      }, [_vm.type === 'checkbox' ? _c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        staticClass: "busy-input__input",
        style: _vm.styles,
        attrs: {
          "placeholder": _vm.placeholder,
          "disabled": _vm.disabled,
          "readonly": _vm.readonly,
          "name": _vm.name,
          "maxlength": _vm.maxlength,
          "pattern": _vm.pattern,
          "type": "checkbox"
        },
        domProps: {
          "checked": Array.isArray(_vm.currentValue) ? _vm._i(_vm.currentValue, null) > -1 : _vm.currentValue
        },
        on: {
          "keyup": function keyup($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
              return null;
            }

            return _vm.handleEnter($event);
          },
          "focus": _vm.handleFocus,
          "blur": _vm.handleBlur,
          "input": _vm.handleInput,
          "change": [function ($event) {
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
      }) : _vm.type === 'radio' ? _c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        staticClass: "busy-input__input",
        style: _vm.styles,
        attrs: {
          "placeholder": _vm.placeholder,
          "disabled": _vm.disabled,
          "readonly": _vm.readonly,
          "name": _vm.name,
          "maxlength": _vm.maxlength,
          "pattern": _vm.pattern,
          "type": "radio"
        },
        domProps: {
          "checked": _vm._q(_vm.currentValue, null)
        },
        on: {
          "keyup": function keyup($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
              return null;
            }

            return _vm.handleEnter($event);
          },
          "focus": _vm.handleFocus,
          "blur": _vm.handleBlur,
          "input": _vm.handleInput,
          "change": [function ($event) {
            _vm.currentValue = null;
          }, _vm.handleChange]
        }
      }) : _c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        staticClass: "busy-input__input",
        style: _vm.styles,
        attrs: {
          "placeholder": _vm.placeholder,
          "disabled": _vm.disabled,
          "readonly": _vm.readonly,
          "name": _vm.name,
          "maxlength": _vm.maxlength,
          "pattern": _vm.pattern,
          "type": _vm.type
        },
        domProps: {
          "value": _vm.currentValue
        },
        on: {
          "keyup": function keyup($event) {
            if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
              return null;
            }

            return _vm.handleEnter($event);
          },
          "focus": _vm.handleFocus,
          "blur": _vm.handleBlur,
          "input": [function ($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.currentValue = $event.target.value;
          }, _vm.handleInput],
          "change": _vm.handleChange
        }
      })]), _vm._v(" "), _c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.active && _vm.currentValue,
          expression: "active && currentValue"
        }],
        staticClass: "busy-input__clear",
        on: {
          "click": _vm.handleClear
        }
      }, [_c('busy-icon', {
        attrs: {
          "type": "roundclosefill",
          "fill": "#d8d8d8",
          "width": 16,
          "height": 16
        }
      })], 1)]);
    };

    var __vue_staticRenderFns__$v = [];
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

    var Input = normalizeComponent_1({
      render: __vue_render__$v,
      staticRenderFns: __vue_staticRenderFns__$v
    }, __vue_inject_styles__$v, __vue_script__$v, __vue_scope_id__$v, __vue_is_functional_template__$v, __vue_module_identifier__$v, undefined, undefined);

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
    //
    //
    //
    //
    //
    //
    //
    //
    var script$w = {
      name: 'busy-switch',
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
    var __vue_script__$w = script$w;
    /* template */

    var __vue_render__$w = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('label', [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        staticClass: "busy-switch busy-switch__animbg",
        attrs: {
          "type": "checkbox"
        },
        domProps: {
          "checked": Array.isArray(_vm.currentValue) ? _vm._i(_vm.currentValue, null) > -1 : _vm.currentValue
        },
        on: {
          "change": function change($event) {
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

    var __vue_staticRenderFns__$w = [];
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

    var Switch = normalizeComponent_1({
      render: __vue_render__$w,
      staticRenderFns: __vue_staticRenderFns__$w
    }, __vue_inject_styles__$w, __vue_script__$w, __vue_scope_id__$w, __vue_is_functional_template__$w, __vue_module_identifier__$w, undefined, undefined);

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
    var script$x = {
      name: 'busy-option',
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
    var __vue_script__$x = script$x;
    /* template */

    var __vue_render__$x = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('li', {
        staticClass: "busy-select__options__item",
        on: {
          "click": function click($event) {
            $event.stopPropagation();
            return _vm.handleClick($event);
          }
        }
      }, [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__$x = [];
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

    var Option = normalizeComponent_1({
      render: __vue_render__$x,
      staticRenderFns: __vue_staticRenderFns__$x
    }, __vue_inject_styles__$x, __vue_script__$x, __vue_scope_id__$x, __vue_is_functional_template__$x, __vue_module_identifier__$x, undefined, undefined);

    var _components$2;
    var script$y = {
      name: 'busy-select',
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
      components: (_components$2 = {}, _defineProperty(_components$2, Mask.name, Mask), _defineProperty(_components$2, Input.name, Input), _defineProperty(_components$2, Option.name, Option), _components$2),
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
    var __vue_script__$y = script$y;
    /* template */

    var __vue_render__$y = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-select",
        style: _vm.styles,
        on: {
          "touch-move": function touchMove($evt) {
            return $evt.preventDefault();
          },
          "click": function click($event) {
            $event.stopPropagation();
            return _vm.handleClick($event);
          }
        }
      }, [_c('div', {
        staticClass: "busy-select__content"
      }, [Object(_vm.currentValue).hasOwnProperty('label') ? _c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue.label,
          expression: "currentValue.label"
        }],
        staticClass: "busy-select__input",
        style: _vm.inputStyles,
        attrs: {
          "type": "text",
          "readonly": "",
          "placeholder": _vm.placeholder
        },
        domProps: {
          "value": _vm.currentValue.label
        },
        on: {
          "input": function input($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.$set(_vm.currentValue, "label", $event.target.value);
          }
        }
      }) : _c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        staticClass: "busy-select__input",
        style: _vm.inputStyles,
        attrs: {
          "type": "text",
          "readonly": "",
          "placeholder": _vm.placeholder
        },
        domProps: {
          "value": _vm.currentValue
        },
        on: {
          "input": function input($event) {
            if ($event.target.composing) {
              return;
            }

            _vm.currentValue = $event.target.value;
          }
        }
      })]), _vm._v(" "), _c('busy-mask', {
        attrs: {
          "is-show": _vm.visiable
        },
        on: {
          "click": function click($event) {
            $event.stopPropagation();
            return _vm.closeOptions($event);
          }
        }
      }, [_c('transition', {
        attrs: {
          "name": "busy-animate--bibo"
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        staticClass: "busy-select__options",
        style: _vm.optionStyles
      }, [_c('ul', {
        staticClass: "busy-select__options__list",
        class: ['busy-select__options__list-' + _vm._uid],
        on: {
          "touchmove": function touchmove($event) {
            $event.stopPropagation();
            return function (e) {}($event);
          }
        }
      }, [_vm._t("default", _vm._l(_vm.options, function (option, $index) {
        return _c('busy-option', {
          key: 'select_' + $index,
          attrs: {
            "value": option
          }
        }, [_vm._v(_vm._s(option.hasOwnProperty('label') ? option.label : option))]);
      }))], 2)])])], 1)], 1);
    };

    var __vue_staticRenderFns__$y = [];
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

    var Select = normalizeComponent_1({
      render: __vue_render__$y,
      staticRenderFns: __vue_staticRenderFns__$y
    }, __vue_inject_styles__$y, __vue_script__$y, __vue_scope_id__$y, __vue_is_functional_template__$y, __vue_module_identifier__$y, undefined, undefined);

    //
    //
    //
    //
    //
    //
    //
    //
    var script$z = {
      name: 'busy-option',
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
    var __vue_script__$z = script$z;
    /* template */

    var __vue_render__$z = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('li', {
        staticClass: "busy-select__options__item",
        on: {
          "click": function click($event) {
            $event.stopPropagation();
            return _vm.handleClick($event);
          }
        }
      }, [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__$z = [];
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

    var Option$1 = normalizeComponent_1({
      render: __vue_render__$z,
      staticRenderFns: __vue_staticRenderFns__$z
    }, __vue_inject_styles__$z, __vue_script__$z, __vue_scope_id__$z, __vue_is_functional_template__$z, __vue_module_identifier__$z, undefined, undefined);

    Select.install = function (vue) {
      vue.component(Option$1.name, Option$1);
      vue.component(Select.name, Select);
    };

    var _components$3;
    var iconProps = {
      fill: '#c0c0c0',
      width: 18,
      height: 18,
      type: 'right'
    };
    var script$A = {
      name: 'busy-list-item',
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
        labelAlignH: {
          type: String,
          default: 'start'
        },
        labelAlignV: {
          type: String,
          default: 'center'
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
        iconAlignH: {
          type: String,
          default: 'center'
        },
        iconAlignV: {
          type: String,
          default: 'center'
        },
        iconStyle: Object,
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
      components: (_components$3 = {}, _defineProperty(_components$3, FlexBox.name, FlexBox), _defineProperty(_components$3, FlexItem.name, FlexItem), _defineProperty(_components$3, Icon.name, Icon), _components$3),
      computed: {
        styles: function styles() {
          return {
            height: /^\d+$/.test(String(this.height)) ? this.height + 'px' : this.height
          };
        },
        labelFlex: function labelFlex() {
          return "0 0 ".concat(this.labelWidth, "px");
        },
        iconFlex: function iconFlex() {
          return "0 0 ".concat(this.iconWidth, "px");
        },
        labelClass: function labelClass() {
          var ah = this.labelAlignH,
              av = this.labelAlignV;
          return ['busy-list-item__label', "busy-flex busy-flex--".concat(ah, "-").concat(av)];
        },
        iconClass: function iconClass() {
          var ah = this.iconAlignH,
              av = this.iconAlignV;
          return ['busy-list-item__icon', "busy-flex busy-flex--".concat(ah, "-").concat(av)];
        }
      },
      watch: {
        icon: function icon(val) {
          this._icon = _extends(iconProps, val || {});
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
    var __vue_script__$A = script$A;
    /* template */

    var __vue_render__$A = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('busy-flexbox', {
        staticClass: "busy-list-item busy-border-1px busy-border-b",
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_vm.showLabel ? _c('busy-flexitem', {
        class: _vm.labelClass,
        style: _vm.labelStyle,
        attrs: {
          "flex": _vm.labelFlex
        },
        on: {
          "click": _vm.handleLabelClick
        }
      }, [_vm._t("label", [_c('label', {
        staticClass: "busy-list-item__label_text"
      }, [_vm._v(_vm._s(_vm.label))])])], 2) : _vm._e(), _vm._v(" "), _c('busy-flexitem', {
        staticClass: "busy-list-item__content busy-flex busy-flex--start-center"
      }, [_vm._t("default", [_c('div', {
        staticClass: "busy-list-item__content_text"
      }, [_vm._v(_vm._s(_vm.content))])])], 2), _vm._v(" "), _vm.showIcon ? _c('busy-flexitem', {
        class: _vm.iconClass,
        style: _vm.iconStyle,
        attrs: {
          "flex": _vm.iconFlex
        },
        on: {
          "click": _vm.handleIconClick
        }
      }, [_vm._t("icon", [_c('busy-icon', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.icon.type,
          expression: "icon.type"
        }],
        style: _vm.iconStyle,
        attrs: {
          "type": _vm.icon.type,
          "fill": _vm.icon.fill,
          "width": _vm.icon.width,
          "height": _vm.icon.height
        }
      })])], 2) : _vm._e()], 1);
    };

    var __vue_staticRenderFns__$A = [];
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

    var ListItem = normalizeComponent_1({
      render: __vue_render__$A,
      staticRenderFns: __vue_staticRenderFns__$A
    }, __vue_inject_styles__$A, __vue_script__$A, __vue_scope_id__$A, __vue_is_functional_template__$A, __vue_module_identifier__$A, undefined, undefined);

    var script$B = {
      name: 'busy-list',
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
    var __vue_script__$B = script$B;
    /* template */

    var __vue_render__$B = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "busy-list busy-border-1px busy-border-tb"
      }, [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__$B = [];
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

    var List = normalizeComponent_1({
      render: __vue_render__$B,
      staticRenderFns: __vue_staticRenderFns__$B
    }, __vue_inject_styles__$B, __vue_script__$B, __vue_scope_id__$B, __vue_is_functional_template__$B, __vue_module_identifier__$B, undefined, undefined);

    List.install = function (vue) {
      vue.component(ListItem.name, ListItem);
      vue.component(List.name, List);
    };

    var install = function install(vue) {
      vue.use(Border);
      vue.use(Toast$1);
      vue.use(FlexBox);
      vue.use(FlexItem);
      vue.use(Icon);
      vue.use(Button);
      vue.use(Checkbox);
      vue.use(Picker);
      vue.use(Dialog$1);
      vue.use(Alert$1);
      vue.use(Confirm$1);
      vue.use(Prompt$1);
      vue.use(Mask);
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
      vue.prototype.$busyui = BusyUI;
    };

    var BusyUI = {
      Border: Border,
      install: install,
      Toast: Toast$1,
      ToastLoading: ToastLoading$1,
      Loading: Loading,
      Icons: Icon,
      FlexBox: FlexBox,
      FlexItem: FlexItem,
      Button: Button,
      Checkbox: Checkbox,
      Picker: Picker,
      Dialog: Dialog$1,
      Alert: Alert$1,
      Confirm: Confirm$1,
      Prompt: Prompt$1,
      Mask: Mask,
      Message: Message$1,
      Progress: Progress,
      LoadMore: LoadMore,
      Swipe: Swipe,
      ActionSheet: ActionSheet,
      List: List,
      ListItem: ListItem,
      Input: Input,
      Switch: Switch
    };

    if (window && window.Vue) {
      window.Vue.use(BusyUI);
    }

    exports.Border = Border;
    exports.install = install;
    exports.Toast = Toast$1;
    exports.ToastLoading = ToastLoading$1;
    exports.Loading = Loading;
    exports.Icons = Icon;
    exports.FlexBox = FlexBox;
    exports.FlexItem = FlexItem;
    exports.Button = Button;
    exports.Checkbox = Checkbox;
    exports.Picker = Picker;
    exports.Dialog = Dialog$1;
    exports.Alert = Alert$1;
    exports.Confirm = Confirm$1;
    exports.Prompt = Prompt$1;
    exports.Mask = Mask;
    exports.Message = Message$1;
    exports.Progress = Progress;
    exports.LoadMore = LoadMore;
    exports.Swipe = Swipe;
    exports.ActionSheet = ActionSheet;
    exports.List = List;
    exports.ListItem = ListItem;
    exports.Input = Input;
    exports.Switch = Switch;
    exports.default = BusyUI;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
