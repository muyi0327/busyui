var BusyUI = (function (exports, Vue) {
    'use strict';

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

      return String(n).trim().replace(/[^-\d.]/g, '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
    }
    /**
     * @desc 千分位化
     * @param {String} n 
     */

    function deFormatNumberic(n) {
      if (!n) {
        return '';
      }

      return String(n).trim().replace(/,/g, '');
    }
    function enFormatBankCard(n) {
      n = String(n).replace(/\D/g, '');
      return format(n, 4, ' ');
    }
    function deFormatBankCard(n) {
      return n.replace(/\s/g, '').replace(/\D/g, '');
    }
    function getDPRUnit(n) {
      n = String(n).trim();
      n = n.split(/\s/);
      var dpr = window.devicePixelRatio;
      var reg = /^(\d+)([a-z]+)$/;
      n = n.map(function (item) {
        var regMatch = String(item).match(reg);

        if (regMatch) {
          return "".concat(Number(dpr) * regMatch[1]).concat(regMatch[2]);
        } else if (pureNumber.test(item)) {
          return "".concat(Number(dpr) * item, "px");
        }

        return item;
      });
      return n.join(' ');
    }
    /**
     * @desc 计算单位
     * @param {*} u - 传入单位
     */

    function cmpUnit(u) {
      if (!u && u !== '0' && u !== '0') return u;
      u = String(u).split(/\s+/);
      u = u.map(function (item) {
        return pureNumber.test(String(item)) ? item + 'px' : item;
      });
      return u.join(' ');
    }
    /**
     * @desc 验证可用css单位
     * @param {*} u 
     */

    function validateUnit(u) {
      u = String(u);
      return cssUnit.test(u) || /^auto|inherit$/.test(u);
    }

    var prefix = 'busy';
    var prefixCls = 'busy';
    var libraryName = 'busyui';

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

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys(source, true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(source).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    }

    var base = function base(config) {
      return {
        data: function data() {
          return _objectSpread2({}, config);
        }
      };
    };

    setTimeout(function () {
      var dpr = window.devicePixelRatio;
      document.documentElement.dataset && (document.documentElement.dataset.dpr = dpr);
    }, 0);

    var initName = function initName(name) {
      return "".concat(prefix, "-").concat(name);
    };

    var baseMixins = base({
      prefix: prefix,
      prefixCls: prefixCls
    });

    /**
     * @class
     * @constructor
     * @module Border
     * @see {@link ../example/all/border1px.html 实例}
     * @desc 1像素边框样式
     * @param {String} side = '', 设置哪个边框, t=上,b=下,r=右,l=左, lr=左右,tb=上下,no-r=无右,no-l=无左,no-t=无上,no-b=无下
     */

    var Border = {
      prepare: function prepare() {
        var dpr = window.devicePixelRatio;
        var styleTag = document.getElementById("".concat(prefix, "-border-1px-style-sheet"));
        var sheet = styleTag ? styleTag.sheet || styleTag.styleSheet : null;
        this.sheet = sheet;
        this.dpr = dpr;
        if (sheet) return;
        var style = document.createElement("style");
        style.id = "".concat(prefix, "-border-1px-style-sheet");
        style.type = 'text/css';
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
        sheet = style.sheet;
        this.sheet = sheet;

        if (sheet.insertRule) {
          sheet.insertRule(".".concat(prefix, "-border-1px::after{ ") + 'width: ' + Number(dpr) * 100 + '%;' + 'height:' + Number(dpr) * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');' + '}', 0);
        } else if (sheet.addRule) {
          sheet.addRule(".".concat(prefix, "-border-1px::after"), 'width: ' + Number(dpr) * 100 + '%;' + 'height:' + Number(dpr) * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');');
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
        vue.directive("".concat(prefix, "-border-1px"), {
          bind: function bind(el, binding) {
            var datas = binding.value;
            var radius = datas.radius,
                side = datas.side,
                color = datas.color;
            var classes = ["".concat(prefix, "-border-1px")];

            if (radius) {
              var name = "".concat(prefix, "-border-1px-r-").concat(String(radius).replace('%', 'percent').replace(/\s+/g, '-'));
              classes.push(name);

              _this.addStyleRule(name, "\n                        border-radius:".concat(getDPRUnit(radius), ";\n                    "));
            }

            if (color) {
              var _name = "".concat(prefix, "-border-1px-c-").concat(color.replace('#', ''));

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

    !function (a) {
      var c,
          h = '<svg><symbol id="busy-yes" viewBox="0 0 1025 1024"><path d="M6.8 551c-3.8-3.8-4.2-10.4-1-14.8l44.2-60c3.2-4.4 9.2-5.2 13.4-2l251 192.4c8.4 6.4 21.8 6.2 30.2-0.6L965 149.2c4.2-3.4 10.6-3.2 14.2 0.6l42 41.4c3.8 3.8 3.8 9.8 0 13.6L343.2 871.8c-7.6 7.4-19.6 7.2-27-0.4L6.8 551z"  ></path></symbol><symbol id="busy-check1" viewBox="0 0 1024 1024"><path d="M921.4 192.5c-3.7-3.5-9.4-3.8-13.4-0.6L357.1 650.7c-3.8 3.1-10.2 3.3-14.1 0.3L116.7 477.5c-1.9-1.5-4.3-2.1-6.7-1.7-2.4 0.3-4.5 1.6-5.9 3.6l-38 51.8c-3 4.3-2.6 10.1 0.9 13.9l276.9 286.6c1.7 1.7 4 2.7 6.4 2.7 2.4 0 4.7-0.9 6.4-2.6l600.7-591.1c1.7-1.7 2.7-4 2.7-6.4 0-2.4-1-4.7-2.7-6.4l-36-35.4z"  ></path></symbol><symbol id="busy-check-circle" viewBox="0 0 1024 1024"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8c12.7 17.7 39 17.7 51.7 0l210.6-292c3.9-5.3 0.1-12.7-6.4-12.7z"  ></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"  ></path></symbol><symbol id="busy-close-circle" viewBox="0 0 1024 1024"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 0.3L512 465.6l-99.3-118.4-66.1-0.3c-4.4 0-8 3.5-8 8 0 1.9 0.7 3.7 1.9 5.2l130.1 155L340.5 670c-1.2 1.5-1.9 3.3-1.9 5.2 0 4.4 3.6 8 8 8l66.1-0.3L512 564.4l99.3 118.4 66 0.3c4.4 0 8-3.5 8-8 0-1.9-0.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"  ></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"  ></path></symbol><symbol id="busy-info-circle" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"  ></path><path d="M512 336m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"  ></path><path d="M536 448h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"  ></path></symbol><symbol id="busy-redo" viewBox="0 0 1024 1024"><path d="M758.2 839.1C851.8 765.9 912 651.9 912 523.9 912 303 733.5 124.3 512.6 124 291.4 123.7 112 302.8 112 523.9c0 125.2 57.5 236.9 147.6 310.2 3.5 2.8 8.6 2.2 11.4-1.3l39.4-50.5c2.7-3.4 2.1-8.3-1.2-11.1-8.1-6.6-15.9-13.7-23.4-21.2-29.4-29.4-52.5-63.6-68.6-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 124.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.1-25.1 124.5c-16.1 38.1-39.2 72.3-68.6 101.7-9.3 9.3-19.1 18-29.3 26L668.2 724c-4.1-5.3-12.5-3.5-14.1 3l-39.6 162.2c-1.2 5 2.6 9.9 7.7 9.9l167 0.8c6.7 0 10.5-7.7 6.3-12.9l-37.3-47.9z"  ></path></symbol><symbol id="busy-setting" viewBox="0 0 1024 1024"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56c10.1-8.6 13.8-22.6 9.3-35.2l-0.9-2.6c-18.1-50.5-44.9-96.9-79.7-137.9l-1.8-2.1c-8.6-10.1-22.5-13.9-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85c-2.4-13.1-12.7-23.3-25.8-25.7l-2.7-0.5c-52.1-9.4-106.9-9.4-159 0l-2.7 0.5c-13.1 2.4-23.4 12.6-25.8 25.7l-15.8 85.4c-35.9 13.6-69.2 32.9-99 57.4l-81.9-29.1c-12.5-4.4-26.5-0.7-35.1 9.5l-1.8 2.1c-34.8 41.1-61.6 87.5-79.7 137.9l-0.9 2.6c-4.5 12.5-0.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5c-10.1 8.6-13.8 22.6-9.3 35.2l0.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1c8.6 10.1 22.5 13.9 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4c2.4 13.1 12.7 23.3 25.8 25.7l2.7 0.5c26.1 4.7 52.8 7.1 79.5 7.1 26.7 0 53.5-2.4 79.5-7.1l2.7-0.5c13.1-2.4 23.4-12.6 25.8-25.7l15.7-85c36.2-13.6 69.7-32.9 99.7-57.6l81.3 28.9c12.5 4.4 26.5 0.7 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l0.9-2.6c4.5-12.3 0.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9c-11.3 26.1-25.6 50.7-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97c-28.1 3.2-56.8 3.2-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9z"  ></path><path d="M512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z m79.2 255.2C570 602.3 541.9 614 512 614c-29.9 0-58-11.7-79.2-32.8C411.7 560 400 531.9 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8C612.3 444 624 472.1 624 502c0 29.9-11.7 58-32.8 79.2z"  ></path></symbol><symbol id="busy-location" viewBox="0 0 1024 1024"><path d="M854.6 289.1c-18.8-43.4-45.7-82.3-79.9-115.7-34.2-33.4-73.9-59.5-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8-34.2 33.4-61.1 72.4-79.9 115.7-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153 6.9 4.1 14.7 6.1 22.4 6.1 7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 880.2c-65.9-41.9-300-207.8-300-449.1 0-77.9 31.1-151.1 87.6-206.3C356.3 169.5 431.7 139 512 139s155.7 30.5 212.4 85.9C780.9 280 812 353.2 812 431.1c0 241.3-234.1 407.2-300 449.1z"  ></path><path d="M512 263c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z m79.2 255.2C570 539.3 541.9 551 512 551c-29.9 0-58-11.7-79.2-32.8C411.7 497 400 468.9 400 439c0-29.9 11.7-58 32.8-79.2C454 338.6 482.1 327 512 327c29.9 0 58 11.6 79.2 32.8C612.4 381 624 409.1 624 439c0 29.9-11.6 58-32.8 79.2z"  ></path></symbol><symbol id="busy-edit-square" viewBox="0 0 1024 1024"><path d="M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"  ></path><path d="M355.9 534.9L354 653.8c-0.1 8.9 7.1 16.2 16 16.2h0.4l118-2.9c2-0.1 4-0.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1 0.8-5.7 2.3l-415.8 415c-1.4 1.5-2.3 3.5-2.3 5.6z m63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1 0.7-46.4z"  ></path></symbol><symbol id="busy-user" viewBox="0 0 1024 1024"><path d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"  ></path></symbol><symbol id="busy-team" viewBox="0 0 1024 1024"><path d="M824.2 699.9c-25.4-25.4-54.7-45.7-86.4-60.4C783.1 602.8 812 546.8 812 484c0-110.8-92.4-201.7-203.2-200-109.1 1.7-197 90.6-197 200 0 62.8 29 118.8 74.2 155.5-31.7 14.7-60.9 34.9-86.4 60.4C345 754.6 314 826.8 312 903.8c-0.1 4.5 3.5 8.2 8 8.2h56c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5C493.8 707.7 551.1 684 612 684c60.9 0 118.2 23.7 161.3 66.8C814.5 792 838 846.3 840 904.3c0.1 4.3 3.7 7.7 8 7.7h56c4.5 0 8.1-3.7 8-8.2-2-77-33-149.2-87.8-203.9zM612 612c-34.2 0-66.4-13.3-90.5-37.5-24.5-24.5-37.9-57.1-37.5-91.8 0.3-32.8 13.4-64.5 36.3-88 24-24.6 56.1-38.3 90.4-38.7 33.9-0.3 66.8 12.9 91 36.6 24.8 24.3 38.4 56.8 38.4 91.4 0 34.2-13.3 66.3-37.5 90.5-24.2 24.2-56.4 37.5-90.6 37.5z"  ></path><path d="M361.5 510.4c-0.9-8.7-1.4-17.5-1.4-26.4 0-15.9 1.5-31.4 4.3-46.5 0.7-3.6-1.2-7.3-4.5-8.8-13.6-6.1-26.1-14.5-36.9-25.1-25.8-25.2-39.7-59.3-38.7-95.4 0.9-32.1 13.8-62.6 36.3-85.6 24.7-25.3 57.9-39.1 93.2-38.7 31.9 0.3 62.7 12.6 86 34.4 7.9 7.4 14.7 15.6 20.4 24.4 2 3.1 5.9 4.4 9.3 3.2 17.6-6.1 36.2-10.4 55.3-12.4 5.6-0.6 8.8-6.6 6.3-11.6-32.5-64.3-98.9-108.7-175.7-109.9-110.9-1.7-203.3 89.2-203.3 199.9 0 62.8 28.9 118.8 74.2 155.5-31.8 14.7-61.1 35-86.5 60.4-54.8 54.7-85.8 126.9-87.8 204-0.1 4.5 3.5 8.2 8 8.2h56.1c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5 29.4-29.4 65.4-49.8 104.7-59.7 3.9-1 6.5-4.7 6-8.7z"  ></path></symbol><symbol id="busy-mobile" viewBox="0 0 1024 1024"><path d="M744 62H280c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h464c35.3 0 64-28.7 64-64V126c0-35.3-28.7-64-64-64z m-8 824H288V134h448v752z"  ></path><path d="M512 784m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z"  ></path></symbol><symbol id="busy-bell" viewBox="0 0 1024 1024"><path d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"  ></path></symbol><symbol id="busy-home" viewBox="0 0 1024 1024"><path d="M946.5 505L560.1 118.8l-25.9-25.9c-12.3-12.2-32.1-12.2-44.4 0L77.5 505c-12.3 12.3-18.9 28.6-18.8 46 0.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8 12.1-12.1 18.7-28.2 18.7-45.3 0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204z m217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"  ></path></symbol><symbol id="busy-like" viewBox="0 0 1024 1024"><path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4-20.5-21.5-48.1-33.4-77.9-33.4-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-0.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81z m636.4-353l-21.9 19 13.9 25.4c4.6 8.4 6.9 17.6 6.9 27.3 0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4c4.6 8.4 6.9 17.6 6.9 27.3 0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4c4.6 8.4 6.9 17.6 6.9 27.3 0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5c5.2-18.9 22.5-32.2 42.2-32.3 7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"  ></path></symbol><symbol id="busy-unlike" viewBox="0 0 1024 1024"><path d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4-8.3-3.6-17.2-5.4-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81z m627.2 160.4H496.8l9.6 198.4c0.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7-19.6-0.1-36.9-13.4-42.2-32.3L329 459.2V172h415.4c20.4 9.2 33.6 29.4 33.6 51.8 0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19c12.5 10.8 19.6 26.5 19.6 43 0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19c12.5 10.8 19.6 26.5 19.6 43 0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19c12.5 10.8 19.6 26.5 19.6 43 0 19.1-11 37.5-28.8 48.4z"  ></path></symbol><symbol id="busy-unlock" viewBox="0 0 1024 1024"><path d="M832 464H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v68c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-68c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32z m-40 376H232V536h560v304z"  ></path><path d="M484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53c12.1-8.7 20-22.9 20-39 0-26.5-21.5-48-48-48s-48 21.5-48 48c0 16.1 7.9 30.3 20 39z"  ></path></symbol><symbol id="busy-lock" viewBox="0 0 1024 1024"><path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240z m460 600H232V536h560v304z"  ></path><path d="M484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53c12.1-8.7 20-22.9 20-39 0-26.5-21.5-48-48-48s-48 21.5-48 48c0 16.1 7.9 30.3 20 39z"  ></path></symbol><symbol id="busy-customerservice" viewBox="0 0 1024 1024"><path d="M512 128c-212.1 0-384 171.9-384 384v360c0 13.3 10.7 24 24 24h184c35.3 0 64-28.7 64-64V624c0-35.3-28.7-64-64-64H200v-48c0-172.3 139.7-312 312-312s312 139.7 312 312v48H688c-35.3 0-64 28.7-64 64v208c0 35.3 28.7 64 64 64h184c13.3 0 24-10.7 24-24V512c0-212.1-171.9-384-384-384zM328 632v192H200V632h128z m496 192H696V632h128v192z"  ></path></symbol><symbol id="busy-moneycollect" viewBox="0 0 1024 1024"><path d="M911.5 700.7c-1.5-4.2-6.1-6.3-10.3-4.8L840 718.2V180c0-37.6-30.4-68-68-68H252c-37.6 0-68 30.4-68 68v538.2l-61.3-22.3c-0.9-0.3-1.8-0.5-2.7-0.5-4.4 0-8 3.6-8 8V763c0 3.3 2.1 6.3 5.3 7.5L501 910.1c7.1 2.6 14.8 2.6 21.9 0l383.8-139.5c3.2-1.2 5.3-4.2 5.3-7.5v-59.6c0-1-0.2-1.9-0.5-2.8zM512 837.5l-256-93.1V184h512v560.4l-256 93.1z"  ></path><path d="M660.6 312h-54.5c-3 0-5.8 1.7-7.1 4.4l-84.7 168.8H511l-84.7-168.8c-1.4-2.7-4.1-4.4-7.1-4.4h-55.7c-1.3 0-2.6 0.3-3.8 1-3.9 2.1-5.3 7-3.2 10.8l103.9 191.6h-57c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76v39h-76c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76V704c0 4.4 3.6 8 8 8h49.9c4.4 0 8-3.6 8-8v-63.5h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8h-76.3v-39h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8H564l103.7-191.6c0.6-1.2 1-2.5 1-3.8-0.1-4.3-3.7-7.9-8.1-7.9z"  ></path></symbol><symbol id="busy-barcode" viewBox="0 0 1024 1024"><path d="M120 160H72c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zM953 160h-48c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8zM200 736h112c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zM521 736h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zM647 736h178c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8H647c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zM392 736h48c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8zM313 800H201c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM570 800h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM826 800H648c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h178c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM441 800h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"  ></path></symbol><symbol id="busy-camera" viewBox="0 0 1024 1024"><path d="M864 248H728l-32.4-90.8C691 144.5 679 136 665.4 136H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 248H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V328c0-44.2-35.8-80-80-80z m8 536c0 4.4-3.6 8-8 8H160c-4.4 0-8-3.6-8-8V328c0-4.4 3.6-8 8-8h186.7l17.1-47.8 22.9-64.2h250.5l22.9 64.2 17.1 47.8H864c4.4 0 8 3.6 8 8v456z"  ></path><path d="M512 384c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160z m0 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"  ></path></symbol><symbol id="busy-cloud-download" viewBox="0 0 1024 1024"><path d="M624 706.3h-74.1V464c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v242.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.7c3.2 4.1 9.4 4.1 12.6 0l112-141.7c4.1-5.2 0.4-12.9-6.3-12.9z"  ></path><path d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7-23.5-24.2-36-56.8-34.9-90.6 0.9-26.4 9.9-51.2 26.2-72.1 16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4 14.9-19.2 32.6-35.9 52.4-49.9 41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7-23.4 23.4-54.5 36.3-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"  ></path></symbol><symbol id="busy-heart" viewBox="0 0 1024 1024"><path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"  ></path></symbol><symbol id="busy-star" viewBox="0 0 1024 1024"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3-12.3 12.7-12.1 32.9 0.6 45.3l183.7 179.1-43.4 252.9c-1.2 6.9-0.1 14.1 3.2 20.3 8.2 15.6 27.6 21.7 43.2 13.4L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"  ></path></symbol><symbol id="busy-wifi" viewBox="0 0 1024 1024"><path d="M723 620.5C666.8 571.6 593.4 542 513 542s-153.8 29.6-210.1 78.6c-3.2 2.8-3.6 7.8-0.8 11.2l36 42.9c2.9 3.4 8 3.8 11.4 0.9C393.1 637.2 450.3 614 513 614s119.9 23.2 163.5 61.5c3.4 2.9 8.5 2.5 11.4-0.9l36-42.9c2.8-3.3 2.4-8.3-0.9-11.2zM840.4 480.4C751.7 406.5 637.6 362 513 362s-238.7 44.5-327.5 118.4c-3.4 2.8-3.8 7.9-1 11.3l36 42.9c2.8 3.4 7.9 3.8 11.2 1C308 472.2 406.1 434 513 434s205 38.2 281.2 101.6c3.4 2.8 8.4 2.4 11.2-1l36-42.9c2.8-3.4 2.4-8.5-1-11.3z"  ></path><path d="M957.1 341.4C835.7 241.8 680.3 182 511 182c-168.2 0-322.6 59-443.7 157.4-3.5 2.8-4 7.9-1.1 11.4l36 42.9c2.8 3.3 7.8 3.8 11.1 1.1C222 306.7 360.3 254 511 254c151.8 0 291 53.5 400 142.7 3.4 2.8 8.4 2.3 11.2-1.1l36-42.9c2.9-3.4 2.4-8.5-1.1-11.3z"  ></path><path d="M512 778m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path></symbol><symbol id="busy-right" viewBox="0 0 1024 1024"><path d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"  ></path></symbol><symbol id="busy-left" viewBox="0 0 1024 1024"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"  ></path></symbol><symbol id="busy-up" viewBox="0 0 1024 1024"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"  ></path></symbol><symbol id="busy-down" viewBox="0 0 1024 1024"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"  ></path></symbol><symbol id="busy-arrowdown" viewBox="0 0 1024 1024"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861c12.7 14.7 35.5 14.7 48.3 0L868 478.5c4.5-5.2 0.8-13.2-6-13.2z"  ></path></symbol><symbol id="busy-check" viewBox="0 0 1024 1024"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474c-6.1-7.7-15.3-12.2-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1 0.4-12.8-6.3-12.8z"  ></path></symbol><symbol id="busy-close" viewBox="0 0 1024 1024"><path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"  ></path></symbol><symbol id="busy-minus" viewBox="0 0 1024 1024"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"  ></path></symbol><symbol id="busy-close-circle-fill" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m165.4 618.2l-66-0.3L512 563.4l-99.3 118.4-66.1 0.3c-4.4 0-8-3.5-8-8 0-1.9 0.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1 0.3L512 464.6l99.3-118.4 66-0.3c4.4 0 8 3.5 8 8 0 1.9-0.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"  ></path></symbol><symbol id="busy-warning-circle-fill" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296z m32 440c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"  ></path></symbol><symbol id="busy-plus" viewBox="0 0 1024 1024"><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"  ></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"  ></path></symbol></svg>',
          l = (c = document.getElementsByTagName("script"))[c.length - 1].getAttribute("data-injectcss");

      if (l && !a.__iconfont__svg__cssinject__) {
        a.__iconfont__svg__cssinject__ = !0;

        try {
          document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
        } catch (c) {
          console && console.log(c);
        }
      }

      !function (c) {
        if (document.addEventListener) {
          if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) setTimeout(c, 0);else {
            var l = function l() {
              document.removeEventListener("DOMContentLoaded", l, !1), c();
            };

            document.addEventListener("DOMContentLoaded", l, !1);
          }
        } else document.attachEvent && (t = c, s = a.document, o = !1, (_e = function e() {
          try {
            s.documentElement.doScroll("left");
          } catch (c) {
            return void setTimeout(_e, 50);
          }

          h();
        })(), s.onreadystatechange = function () {
          "complete" == s.readyState && (s.onreadystatechange = null, h());
        });

        function h() {
          o || (o = !0, t());
        }

        var t, s, o, _e;
      }(function () {
        var c, l;
        (c = document.createElement("div")).innerHTML = h, h = null, (l = c.getElementsByTagName("svg")[0]) && (l.setAttribute("aria-hidden", "true"), l.style.position = "absolute", l.style.width = 0, l.style.height = 0, l.style.overflow = "hidden", function (c, l) {
          l.firstChild ? function (c, l) {
            l.parentNode.insertBefore(c, l);
          }(c, l.firstChild) : l.appendChild(c);
        }(l, document.body));
      });
    }(window);

    //
    /**
     * @class
     * @constructor
     * @module Icon
     * @see {@link ../example/all/icons.html 实例}
     * @desc Icon 图标组件
     * @param {String} type - icon名称
     * @param {Number} width=18 - 组件宽度
     * @param {Number} height=18 - 组件高度
     * @param {String} fill='#fff' - 组件颜色,css color
     */

    var script = {
      name: initName('icon'),
      mixins: [baseMixins],
      props: {
        name: {
          type: String,
          "default": ''
        },
        width: {
          type: [Number, String],
          "default": 18
        },
        height: {
          type: [Number, String],
          "default": 18
        },
        color: {
          type: String,
          "default": '#fff'
        }
      },
      computed: {
        styles: function styles() {
          return {
            width: cmpUnit(this.width),
            height: cmpUnit(this.height),
            fill: this.color
          };
        },
        iconName: function iconName() {
          return "#".concat(this.prefix, "-").concat(this.name);
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
        "class": _vm.prefixCls + "-icon",
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_c('use', {
        attrs: {
          "xlink:href": _vm.iconName
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
      name: initName('toast'),
      mixins: [baseMixins],
      props: {
        width: {
          type: [String, Number]
        },
        height: {
          type: [String, Number]
        },
        delay: {
          type: Number,
          "default": 2500
        },
        iconName: {
          type: String,
          "default": ''
        },
        iconHeight: {
          type: [Number, String],
          "default": 24
        },
        iconWidth: {
          type: [Number, String],
          "default": 24
        },
        content: {
          type: [String, Number],
          "default": ''
        },
        pos: {
          type: String,
          "default": 'top'
        },
        zIndex: {
          type: Number
        },
        isShow: {
          type: Boolean,
          "default": false
        },
        isRemove: {
          type: Boolean,
          "default": false
        },
        autoHide: {
          type: Boolean,
          "default": false
        },
        direction: {
          type: String,
          "default": ''
        },
        color: {
          type: String,
          "default": '#fff'
        }
      },
      data: function data() {
        return {
          visiable: this.isShow,
          timmer: null
        };
      },
      components: {
        Icon: Icon
      },
      computed: {
        posClass: function posClass() {
          return ['top,middle,bottom'.split(',').indexOf(this.pos) > -1 ? "".concat(this.prefixCls, "-toast--pos-").concat(this.pos) : ''];
        },
        styles: function styles() {
          var width = cmpUnit(this.width);
          var height = cmpUnit(this.height);
          return {
            color: this.color,
            width: width,
            height: height
          };
        },
        classess: function classess() {
          return ["".concat(this.prefixCls, "-toast__wrap"), this.direction ? "".concat(this.prefixCls, "-toast--").concat(this.direction) : null];
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
          "name": _vm.prefixCls + "-animate--fade"
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
        "class": [_vm.prefixCls + "-toast", _vm.posClass]
      }, [_c('div', {
        "class": _vm.classess,
        style: _vm.styles
      }, [_vm.iconName ? _c('span', {
        "class": _vm.prefixCls + "-toast__icon"
      }, [_c('Icon', {
        attrs: {
          "name": _vm.iconName,
          "width": _vm.iconWidth,
          "height": _vm.iconHeight,
          "color": _vm.color
        }
      })], 1) : _vm._e(), _vm._v(" "), _c('p', {
        "class": _vm.prefixCls + "-toast__text"
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
     * @desc Toast组件
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
          opts = _objectSpread2({}, opts, {
            content: content
          });
        }

        instance = new ToastClass({
          el: document.createElement('div'),
          propsData: _objectSpread2({
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
      success: function success(content, opts) {
        return this.show.apply(this, [content, _objectSpread2({
          iconHeight: 30,
          iconWidth: 30,
          iconName: 'yes',
          direction: 'column'
        }, opts)]);
      },
      fail: function fail(content, opts) {
        return this.show.apply(this, [content, _objectSpread2({
          iconHeight: 30,
          iconWidth: 30,
          iconName: 'close',
          direction: 'column'
        }, opts)]);
      },
      hide: function hide() {
        if (instance) {
          instance.hide();
          instance = null;
        }
      }
    });

    //
    var script$2 = {
      name: initName('spinner-circle-dash'),
      mixins: [baseMixins],
      props: {
        color: {
          type: String
        },
        width: {
          type: [Number, String],
          "default": 64
        },
        height: {
          type: [Number, String],
          "default": 64
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
        "class": _vm.prefixCls + "-spinner-circle-dash"
      }, [_c('svg', {
        "class": _vm.prefixCls + "-spinner-circle-dash__svg",
        style: _vm.styles,
        attrs: {
          "viewBox": "0 0 64 64"
        }
      }, [_c('g', {
        "class": _vm.prefixCls + "-spinner-circle-dash__wrap",
        style: _vm.svgStyles
      }, [_c('circle', {
        "class": _vm.prefixCls + "-spinner-circle-dash__path",
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

    var __vue_scope_id__$2 = "data-v-16abeac0";
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
      name: initName('spinner-circle-gradient'),
      mixins: [baseMixins],
      inheritAttrs: false,
      props: {
        color: {
          type: String,
          "default": '#008b8b'
        },
        width: {
          type: [Number, String],
          "default": 64
        },
        height: {
          type: [Number, String],
          "default": 64
        },
        strokeWidth: {
          type: [Number, String],
          "default": 6
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
        "class": _vm.prefixCls + "-spinner-circle-gradient"
      }, [_c('svg', {
        "class": _vm.prefixCls + "-spinner-circle-gradient__svg",
        style: _vm.styles,
        attrs: {
          "viewBox": "0 0 64 64"
        }
      }, [_c('g', {
        "class": _vm.prefixCls + "-spinner-circle-gradient__wrap",
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

    var __vue_scope_id__$3 = "data-v-3135c9b2";
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
      name: initName('spinner-circle-line'),
      mixins: [baseMixins],
      inheritAttrs: false,
      props: {
        color: {
          type: String
        },
        width: {
          type: [Number, String],
          "default": 64
        },
        height: {
          type: [Number, String],
          "default": 64
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
        "class": _vm.prefixCls + "-spinner-circle-line"
      }, [_c('svg', {
        "class": _vm.prefixCls + "-spinner-circle-line__svg",
        style: _vm.styles,
        attrs: {
          "viewBox": "0 0 64 64"
        }
      }, [_c('g', {
        "class": _vm.prefixCls + "-spinner-circle-line__wrap",
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

    var __vue_scope_id__$4 = "data-v-abbb51fa";
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
     * @class
     * @constructor
     * @desc 旋转圆环动画
     * @param {Number} width=24 - 组件宽度
     * @param {Number} height=24 - 组件高度
     * @param {String} color="#ffffff" - 组件颜色
     * @param {Number} strokeWidth=3 - 描边宽度
     **/

    var script$5 = {
      name: initName('spinner-circle-rotate'),
      mixins: [baseMixins],
      props: {
        height: {
          type: [Number, String],
          "default": 64
        },
        width: {
          type: [Number, String],
          "default": 64
        },
        color: {
          type: String
        },
        strokeWidth: {
          type: [Number, String],
          "default": 6
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
        "class": _vm.prefixCls + "-spinner-circle-rotate"
      }, [_c('svg', {
        "class": _vm.prefixCls + "-spinner-circle-rotate__svg",
        style: _vm.styles,
        attrs: {
          "version": "1.1",
          "viewBox": "0 0 64 64",
          "xml:space": "preserve"
        }
      }, [_c('g', {
        "class": _vm.prefixCls + "-spinner-circle-rotate__wrap",
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
      name: initName('spinner-circle-half'),
      mixins: [baseMixins],
      props: {
        color: {
          type: String
        },
        width: {
          type: [Number, String],
          "default": 64
        },
        height: {
          type: [Number, String],
          "default": 64
        },
        strokeWidth: {
          type: [Number, String],
          "default": 6
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
        "class": _vm.prefixCls + "-spinner-circle-half"
      }, [_c('svg', {
        "class": _vm.prefixCls + "-spinner-circle-half__svg",
        style: _vm.styles,
        attrs: {
          "viewBox": "0 0 64 64"
        }
      }, [_c('g', {
        "class": _vm.prefixCls + "-spinner-circle-half__wrap",
        style: _vm.svgStyles
      }, [_c('circle', {
        "class": _vm.prefixCls + "-spinner-circle-half__path",
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

    var __vue_scope_id__$6 = "data-v-6aa0d830";
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
     * @param {Number} type=circle-line - spinner动画类型,取值 0-6
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
      inheritAttrs: false,
      props: {
        type: {
          type: String
        },
        height: {
          type: [Number, String],
          "default": 64
        },
        width: {
          type: [Number, String],
          "default": 64
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
      },
      computed: {
        currentComponent: function currentComponent() {
          switch (this.type) {
            case 'circle-gradient':
              return CircleGradient;

            case 'circle-dash':
              return CircleDash;

            case 'circle-rotate':
              return CircleRotate;

            case 'circle-half':
              return CircleHalf;

            default:
              return CircleLine;
          }
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

      return _c(_vm.currentComponent, _vm._b({
        tag: "component"
      }, 'component', _vm.$props, false));
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

    //
    /**
     * @class
     * @constructor
     * @module Mask
     * @desc 遮罩层
     * @param {String} color=rgba(0,0,0, 0.6) - 遮罩颜色, css color
     * @param {Boolean} isRemove=false - 是否隐藏动画完成从dom中清除
     * @param {Boolean} isShow=false - 显示隐藏
     **/

    var script$8 = {
      name: initName('mask'),
      mixins: [baseMixins],
      props: {
        color: {
          type: String,
          "default": 'rgba(0,0,0, 0.6)'
        },
        isRemove: {
          type: Boolean,
          "default": false
        },
        isShow: {
          type: Boolean,
          "default": false
        },
        zIndex: {
          type: Number,
          "default": 1000
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

      return _c('transition', {
        attrs: {
          "name": _vm.prefixCls + "-animate--fade"
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
        "class": _vm.prefixCls + "-mask",
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_vm._t("default")], 2)]);
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

    var Mask = normalizeComponent_1({
      render: __vue_render__$8,
      staticRenderFns: __vue_staticRenderFns__$8
    }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, undefined, undefined);

    Mask.install = function (vue) {
      vue.component(Mask.name, Mask);
    };

    var spinnerProps = {
      width: 24,
      height: 24,
      color: '#fff',
      type: 'circle-line'
    };
    var script$9 = {
      name: initName('toast-loading'),
      mixins: [baseMixins],
      props: {
        width: {
          type: [Number, String]
        },
        height: {
          type: [Number, String]
        },
        color: {
          type: String,
          "default": '#ffffff'
        },
        bgColor: {
          type: String
        },
        direction: {
          type: String,
          "default": 'column'
        },
        spinner: {
          type: Object,
          "default": function _default() {
            return spinnerProps;
          }
        },
        text: {
          type: String,
          "default": ''
        },
        fontSize: {
          type: [Number, String],
          "default": 12
        },
        closable: {
          type: Boolean,
          "default": false
        },
        maskColor: {
          type: String
        }
      },
      components: {
        Spinner: Spinner,
        NativeMask: Mask
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
          this.visiable = false;
          this.$emit('hide');
        },
        handleClick: function handleClick(e) {
          this.closable && this.hide.call(this, e);
        }
      },
      computed: {
        styles: function styles() {
          var width = cmpUnit(this.width);
          var height = cmpUnit(this.height);
          return {
            height: height,
            width: width,
            backgroundColor: this.bgColor
          };
        },
        textStyles: function textStyles() {
          var fontSize = cmpUnit(this.fontSize);
          var color = this.color;
          return {
            color: color,
            fontSize: fontSize
          };
        },
        classes: function classes() {
          return [this.direction == 'row' ? "".concat(this.prefixCls, "-toast-loading--dir-row") : "".concat(this.prefixCls, "-toast-loading--dir-column")];
        },
        spinnerData: function spinnerData() {
          return _objectSpread2({}, spinnerProps, {}, this.spinner);
        }
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

      return _c('NativeMask', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        attrs: {
          "color": _vm.maskColor
        },
        on: {
          "click": _vm.handleClick
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        "class": [_vm.prefixCls + "-toast-loading", _vm.classes],
        style: _vm.styles
      }, [_c('div', {
        "class": _vm.prefixCls + "-toast-loading__icon"
      }, [_c('Spinner', _vm._b({}, 'Spinner', _vm.spinnerData, false))], 1), _vm._v(" "), _vm.text || _vm.$slots['default'] ? _c('div', {
        "class": _vm.prefixCls + "-toast-loading__text",
        style: _vm.textStyles
      }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2) : _vm._e()])]);
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

    var ToastLoading = normalizeComponent_1({
      render: __vue_render__$9,
      staticRenderFns: __vue_staticRenderFns__$9
    }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, undefined, undefined);

    var ToastLoadingClass = Vue.extend(ToastLoading);
    var tlInstance, tlVm;
    /**
     * @module ToastLoading
     * @see {@link ../example/all/toast-loading.html 实例}
     * @desc ToastLoading
     * @param {Number} height=100 - 高度(px)
     * @param {Number} width=100 - 宽度(px)
     * @param {String} color='#fff' - spinner和文字颜色, css color
     * @param {String} bgColor='rgba(0,0,0,0.6)' - 背景色, css color
     * @param {String} direction='column' - spinner和文字排列方向, column 垂直方向, row 水平方向
     * @param {Object} spinner - 设置spinner格式
     * @param {String} text - loading文字
     **/

    var ToastLoading$1 = _extends(ToastLoading, {
      install: function install(vue) {
        vue.component(ToastLoading.name, ToastLoading);
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

    /**
     * @class
     * @constructor
     * @module Loading
     * @desc Loading
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
     */

    var script$a = {
      name: initName('inline-loading'),
      mixins: [baseMixins],
      props: {
        spinnerType: {
          type: String
        },
        spinnerWidth: {
          type: [String, Number],
          "default": 24
        },
        spinnerHeight: {
          type: [String, Number],
          "default": 24
        },
        color: {
          type: String,
          "default": '#222222'
        },
        text: {
          type: String,
          "default": ''
        },
        fontSize: {
          type: Number
        },
        isShow: {
          type: Boolean,
          "default": false
        },
        isRemove: {
          type: Boolean,
          "default": false
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
          var prefixCls = this.prefixCls;
          return ["".concat(prefixCls, "-inline-loading"), _defineProperty({}, "".concat(prefixCls, "-inline-loading--column"), this.direction === 'column')];
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
          "name": _vm.prefixCls + "-animate--fade"
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
        "class": _vm.classes
      }, [_c('div', {
        "class": _vm.prefixCls + "-inline-loading__spinner"
      }, [_c('Spinner', _vm._b({}, 'Spinner', _vm.spinnerProps, false))], 1), _vm._v(" "), _c('div', {
        "class": _vm.prefixCls + "-inline-loading__text",
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
      name: initName('loading'),
      "extends": InlineLoading,
      props: {
        showMask: {
          type: Boolean,
          "default": true
        },
        spinnerWidth: {
          type: [Number, String],
          "default": 36
        },
        spinnerHeight: {
          type: [Number, String],
          "default": 36
        },
        color: {
          type: String,
          "default": '#ffffff'
        },
        position: {
          type: String,
          "default": 'absolute'
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
        "class": _vm.prefixCls + "-loading",
        style: _vm.styles
      }, [_c('BusyMask', {
        attrs: {
          "isShow": _vm.showMask && _vm.visiable,
          "position": _vm.position,
          "z-index": 1
        }
      }), _vm._v(" "), _c('transition', {
        attrs: {
          "name": _vm.prefixCls + "-animate--fade"
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
        "class": _vm.prefixCls + "-loading__wrap"
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
      name: initName('flexitem'),
      mixins: [baseMixins],
      props: {
        basis: [String, Number],
        shrink: [String, Number],
        grow: [String, Number],
        flex: [String, Number],
        alginSelf: String,
        order: Number,
        width: [String, Number],
        height: [String, Number],
        flexible: {
          type: Boolean,
          "default": false
        },
        alignMain: String,
        alignCross: String,
        direction: String
      },
      computed: {
        styles: function styles() {
          var w = this.width,
              h = this.height;
          w = cmpUnit(w);
          h = cmpUnit(h);
          return {
            flex: this.flex,
            '-webkit-flex': this.flex,
            order: this.order,
            '-webkit-order': this.order,
            width: w,
            height: h,
            alginSelf: this.alginSelf,
            '-webkit-align-self': this.alginSelf
          };
        },
        classes: function classes() {
          var am = this.alignMain,
              ac = this.alignCross,
              flag = am || ac,
              prefixCls = this.prefixCls;
          return ["".concat(prefixCls, "-flex-item"), this.flexible ? ["".concat(prefixCls, "-flex"), flag ? "".concat(prefixCls, "-flex--").concat(am || 'start', "-").concat(ac || 'start') : '', this.direction ? "".concat(prefixCls, "-flex--").concat(this.direction) : ''] : null];
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
        "class": _vm.classes,
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
      name: initName('flexbox'),
      mixins: [baseMixins],
      props: {
        inline: {
          type: Boolean,
          "default": false
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
              flag = am || ac,
              prefixCls = this.prefixCls;
          return [this.inline ? "".concat(prefixCls, "-flex--inline") : "".concat(prefixCls, "-flex"), flag ? "".concat(prefixCls, "-flex--").concat(am || 'start', "-").concat(ac || 'start') : null, !this.direction ? '' : "".concat(prefixCls, "-flex--").concat(this.direction)];
        },
        styles: function styles() {
          var h = this.height,
              w = this.width;
          h = cmpUnit(h);
          w = cmpUnit(w);
          return _defineProperty({
            height: h,
            width: w,
            flexWrap: this.wrap
          }, '-wekit-flex-wrap', this.wrap);
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
        "class": _vm.classes,
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
      var dpr = window.devicePixelRatio;
      var id = initName('button-border-1px');
      var className = initName('button__border'); //if (this.borderColor) {

      var styleTag = document.getElementById(id);
      var sheet = styleTag ? styleTag.sheet || styleTag.styleSheet : null;

      if (!sheet) {
        var style = document.createElement("style");
        style.id = id;
        style.type = 'text/css';
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
        sheet = style.sheet;
      }

      if (sheet.addRule) {
        sheet.addRule(".".concat(className), 'width: ' + dpr * 100 + '%;' + 'height: ' + dpr * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');');
      } else if (sheet.insertRule) {
        sheet.insertRule(".".concat(className) + 'width: ' + dpr * 100 + '%;' + 'height: ' + dpr * 100 + '%;' + 'transform: scale(' + 1 / dpr + ');}', 0);
      }
    }, 0);
    /**
     * @class
     * @constructor
     * @module Button 
     * @see {@link ../example/all/button.html 实例}
     * @desc Button 按钮组件
     * @param {string} type=default - 显示类型，接受 default, primary, warning
     * @param {string} nativeType=button - 按钮类型， button, reset, submit
     * @param {boolean} disabled=false - 禁用
     * @param {ghost} ghost=false - 幽灵按钮
     * @param {boolean} block=false - 是否100%宽
     * @param {string} size=normal - 尺寸，接受 normal, small, large
     * @param {Boolean} sharp=false - 是否尖角
     * @param {String} slot - 显示文本
     * @param {String} radius - 圆角
     */

    var script$e = {
      name: initName('button'),
      mixins: [baseMixins],
      props: {
        disabled: Boolean,
        nativeType: {
          type: String,
          "default": 'button'
        },
        content: {
          type: String
        },
        sharp: Boolean,
        block: Boolean,
        radius: {
          type: [Number, String],
          validator: validateUnit
        },
        type: {
          type: String,
          "default": 'default',
          validator: function validator(value) {
            return ['default', 'primary', 'warning'].indexOf(value) > -1;
          }
        },
        ghost: {
          type: Boolean,
          "default": false
        },
        thin: {
          type: Boolean
        },
        size: {
          type: String,
          "default": 'normal',
          validator: function validator(value) {
            return ['normal', 'small', 'large'].indexOf(value) > -1;
          }
        },
        icon: String
      },
      methods: {
        handleClick: function handleClick(evt) {
          if (!this.disabled) {
            this.$emit('click', evt);
          }
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
              ghost = this.ghost,
              prefixCls = this.prefixCls;
          return [type === 'default' ? null : "".concat(prefixCls, "-button--").concat(type), size === 'normal' ? null : "".concat(prefixCls, "-button--").concat(size), {
            'is-disabled': disabled,
            'is-block': block,
            'is-ghost': ghost
          }];
        },
        isThin: function isThin() {
          return this.thin || this.ghost || this.type === 'default';
        },
        thinBorder: function thinBorder() {
          if (!this.isThin) return null;
          var br = this.sharp ? 0 : this.radius || 4;
          var dpr = window.devicePixelRatio;

          if (br) {
            br = getDPRUnit(br);
          }

          return {
            borderRadius: br
          };
        },
        styles: function styles() {
          var h = cmpUnit(this.height),
              w = cmpUnit(this.width),
              br = this.sharp ? 0 : this.radius || null,
              size = this.size;
          var o = {
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

      return _c('div', {
        "class": [_vm.prefixCls + "-button", _vm.classes],
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_vm.icon || _vm.$slots['icon'] ? [_vm._t("icon", [_vm._v(_vm._s(_vm.icon))])] : _vm._e(), _vm._v(" "), _c('button', {
        "class": _vm.prefixCls + "-button__button",
        attrs: {
          "type": _vm.nativeType,
          "disabled": _vm.disabled
        }
      }, [_vm._t("default", [_vm._v(_vm._s(_vm.content))])], 2), _vm._v(" "), _vm.isThin ? _c('span', {
        "class": _vm.prefixCls + "-button__border",
        style: _vm.thinBorder
      }) : _vm._e()], 2);
    };

    var __vue_staticRenderFns__$e = [];
    /* style */

    var __vue_inject_styles__$e = undefined;
    /* scoped */

    var __vue_scope_id__$e = "data-v-34c9f8a8";
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

    var iconProps = {
      color: '#ffffff',
      width: '70%',
      height: '70%',
      name: 'yes'
      /**
       * @class
       * @constructor
       * @desc Checkbox 复选框
       * @module Checkbox
       * @see {@link ../example/all/checkbox.html 实例}
       * @param {String} label 显示在右侧的内容
       * @param {Boolean} disabled 是否禁用
       * @param {Number | String} size 尺寸
       * @param {String} color 颜色
       */

    };
    var script$f = {
      name: initName('checkbox'),
      mixins: [baseMixins],
      model: {
        prop: 'modelVal',
        event: 'change'
      },
      props: {
        label: String,
        value: [Boolean, String, Array, Number, Object],
        disabled: Boolean,
        modelVal: [Boolean, String, Array],
        width: [Number, String],
        height: [Number, String],
        color: String,
        icon: {
          type: Object,
          "default": function _default() {
            return iconProps;
          }
        },
        borderRadius: {
          type: [Number, String]
        }
      },
      data: function data() {
        return {
          currentValue: this.modelVal
        };
      },
      components: {
        Icon: Icon
      },
      watch: {
        modelVal: function modelVal(val) {
          this.currentValue = val;
        },
        currentValue: function currentValue(val) {
          this.$emit('change', val);
        }
      },
      computed: {
        coreStyles: function coreStyles() {
          var color = this.disabled ? '#dadada' : this.color;
          return {
            width: cmpUnit(this.width),
            height: cmpUnit(this.height),
            background: this.isChecked && color || null,
            borderRadius: cmpUnit(this.borderRadius)
          };
        },
        styles: function styles() {
          return {
            height: cmpUnit(this.height)
          };
        },
        iconModel: function iconModel() {
          return _objectSpread2({}, iconProps, {}, this.icon);
        },
        isChecked: function isChecked() {
          var _this = this;

          return Array.isArray(this.currentValue) ? this.currentValue.some(function (c) {
            return c === _this.value || JSON.stringify(c) === JSON.stringify(_this.value);
          }) : !!this.currentValue;
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
        "class": _vm.prefixCls + "-checkbox",
        style: _vm.styles,
        on: {
          "click": function click($event) {
            $event.stopPropagation();
            return function () {}();
          }
        }
      }, [_c('label', {
        "class": [_vm.prefixCls + "-checkbox__label"]
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        ref: "native-checkbox",
        "class": _vm.prefixCls + "-checkbox__input",
        attrs: {
          "type": "checkbox",
          "disabled": _vm.disabled
        },
        domProps: {
          "value": _vm.value,
          "checked": Array.isArray(_vm.currentValue) ? _vm._i(_vm.currentValue, _vm.value) > -1 : _vm.currentValue
        },
        on: {
          "change": function change($event) {
            var $$a = _vm.currentValue,
                $$el = $event.target,
                $$c = $$el.checked ? true : false;

            if (Array.isArray($$a)) {
              var $$v = _vm.value,
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
        "class": _vm.prefixCls + "-checkbox__core",
        style: _vm.coreStyles
      }, [_c('transition', {
        attrs: {
          "name": _vm.prefixCls + "-animate--scalein"
        }
      }, [_c('Icon', _vm._b({
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.isChecked,
          expression: "isChecked"
        }],
        "class": _vm.prefixCls + "-checkbox__icon"
      }, 'Icon', _vm.iconModel, false))], 1)], 1), _vm._v(" "), _vm.label || _vm.$slots["default"] ? _c('span', {
        "class": _vm.prefixCls + "-checkbox__text"
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

    //
    var script$g = {
      name: initName('radio'),
      mixins: [baseMixins],
      model: {
        prop: 'modelValue',
        event: 'change'
      },
      props: {
        name: {
          type: String
        },
        value: '',
        modelValue: null,
        text: String,
        disabled: {
          type: Boolean,
          "default": false
        },
        color: String,
        disabledColor: String,
        iconColor: {
          type: String,
          "default": '#ffffff'
        },
        checked: {
          type: Boolean,
          "default": false
        }
      },
      data: function data() {
        return {
          currentValue: this.modelValue
        };
      },
      components: {
        Icon: Icon
      },
      computed: {
        styles: function styles() {
          return {
            height: cmpUnit(this.height)
          };
        },
        radioStyles: function radioStyles() {
          var color = null;

          if (this.disabled) {
            color = this.disabledColor || null;
          } else if (this.isChecked) {
            color = this.color || null;
          }

          return {
            background: color
          };
        },
        isChecked: function isChecked() {
          return this.currentValue === this.value || JSON.stringify(this.currentValue) === JSON.stringify(this.value);
        }
      },
      watch: {
        modelValue: function modelValue(val) {
          this.currentValue = val;
        },
        currentValue: function currentValue(val) {
          this.$emit('change', val);
        }
      },
      methods: {
        handleChange: function handleChange(e) {
          console.log(e.target.value);
        }
      }
    };

    var __vue_script__$g = script$g;
    /* template */

    var __vue_render__$g = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        "class": _vm.prefixCls + "-radio",
        style: _vm.styles
      }, [_c('label', {
        "class": _vm.prefixCls + "-radio__label"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        ref: "nativeRadio",
        "class": _vm.prefixCls + "-radio__input",
        attrs: {
          "name": _vm.name,
          "disabled": _vm.disabled,
          "type": "radio"
        },
        domProps: _defineProperty({
          "value": _vm.value,
          "checked": _vm.checked
        }, "checked", _vm._q(_vm.currentValue, _vm.value)),
        on: {
          "change": [function ($event) {
            _vm.currentValue = _vm.value;
          }, _vm.handleChange]
        }
      }), _vm._v(" "), _c('span', {
        "class": _vm.prefixCls + "-radio__radio",
        style: _vm.radioStyles
      }, [_c('transition', {
        attrs: {
          "name": _vm.prefixCls + "-animate--scalein"
        }
      }, [_c('Icon', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.isChecked,
          expression: "isChecked"
        }],
        attrs: {
          "width": "70%",
          "height": "70%",
          "color": _vm.iconColor,
          "name": "yes"
        }
      })], 1)], 1), _vm._v(" "), _c('span', {
        "class": _vm.prefixCls + "-radio__text"
      }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2)])]);
    };

    var __vue_staticRenderFns__$g = [];
    /* style */

    var __vue_inject_styles__$g = undefined;
    /* scoped */

    var __vue_scope_id__$g = "data-v-5bf4df58";
    /* module identifier */

    var __vue_module_identifier__$g = undefined;
    /* functional template */

    var __vue_is_functional_template__$g = false;
    /* style inject */

    /* style inject SSR */

    var Radio = normalizeComponent_1({
      render: __vue_render__$g,
      staticRenderFns: __vue_staticRenderFns__$g
    }, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, undefined, undefined);

    Radio.install = function (vue) {
      return vue.component(Radio.name, Radio);
    };

    var script$h = {
      name: initName('picker-wheel'),
      mixins: [baseMixins],
      props: {
        items: Array,
        value: '',
        index: {
          type: Number,
          "default": 0
        }
      },
      data: function data() {
        return {
          startY: 0,
          startTime: 0,
          top: 0,
          itemHeight: 40,
          curIndex: 0,
          transition: false,
          allHeight: 0,
          startPoint: 0,
          currentValue: this.value
        };
      },
      computed: {
        styles: function styles() {
          return {
            marginTop: "".concat(this.itemHeight * 2, "px"),
            transform: "translate3d(0, ".concat(this.top, "px, 0)")
          };
        },
        classess: function classess() {
          return _defineProperty({}, "".concat(this.prefixCls, "-picker__transition"), this.transition);
        }
      },
      watch: {
        curIndex: function curIndex(val) {
          this.currentValue = this.items[val];
        },
        value: function value(val) {
          this.currentValue = val;
        },
        currentValue: function currentValue(val) {
          this.$emit('change', val);
        }
      },
      methods: {
        enforceLimit: function enforceLimit(t) {
          if (t > 0) {
            t = 0;
          } else if (Math.abs(t) > this.allHeight) {
            t = this.allHeight * -1;
          }

          console.log(t);
          return t;
        },
        transitionTo: function transitionTo(i) {
          this.transition = true;
          this.top = this.enforceLimit(i * this.itemHeight);
        },
        _transitionEnd: function _transitionEnd(e) {
          this.transition = false;
          this.curIndex = Math.abs(this.top / this.itemHeight);
        },
        isOutLimit: function isOutLimit(t) {
          var b = t > 0 || Math.abs(t) > this.allHeight;
          return b;
        },
        _start: function _start(e) {
          var pageX = e.touches[0].pageX,
              pageY = e.touches[0].pageY;
          this.transition = false;
          this.startY = pageY;
          this.startTime = e.timeStamp || Date.now();
          this.startPoint = pageY;
          this.top = new WebKitCSSMatrix(this.$el.style.transform).m42;
          this.startTop = this.top;
          this.allHeight = this.$el.scrollHeight - this.$el.clientHeight + this.itemHeight * 2;
        },
        _move: function _move(e) {
          var PY = e.touches[0].pageY;
          var distance = PY - this.startY;
          var top = this.startTop + distance,
              durantion;
          this.direction = distance < 0 ? 'up' : 'down';

          if (top > 0 || Math.abs(top) > this.allHeight) {
            distance = distance / 2;
          }

          this.top = this.startTop + distance;
          this.status = 'moving';
          var endTime = e.timeStamp || Date.now();
          durantion = endTime - this.startTime;

          if (durantion > 100) {
            this.speed = (PY - this.startPoint) * 1000 / durantion;
            this.startTime = endTime;
            this.startPoint = PY;
          }
        },
        _end: function _end(e) {
          var _this = this;

          this.status = 'end';
          var top = this.top,
              endTime = e.timeStamp || Date.now();
          this.$nextTick(function () {
            var top = _this.top;
            top += _this.speed * 0.2;
            _this.transition = true;
            _this.top = _this.enforceLimit(Math.round(top / _this.itemHeight) * _this.itemHeight);
          });
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

      return _c('ul', {
        "class": [_vm.prefixCls + "-picker__wheel", _vm.classess],
        style: _vm.styles,
        on: {
          "touchstart": _vm._start,
          "&touchmove": function touchmove($event) {
            return _vm._move($event);
          },
          "touchend": _vm._end,
          "touchcancel": _vm._end,
          "transitionend": _vm._transitionEnd
        }
      }, _vm._l(_vm.items, function (item, $i) {
        return _c('li', {
          key: $i,
          "class": _vm.prefixCls + "-picker__item"
        }, [_c('span', [_vm._v(_vm._s(item.label || item))])]);
      }), 0);
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

    var Wheel = normalizeComponent_1({
      render: __vue_render__$h,
      staticRenderFns: __vue_staticRenderFns__$h
    }, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, undefined, undefined);

    //
    var script$i = {
      name: initName('picker'),
      mixins: [baseMixins],
      model: {
        prop: 'value',
        event: 'change'
      },
      props: {
        columns: {
          type: Array
        },
        value: Array,
        isShow: {
          type: Boolean,
          "default": true
        }
      },
      data: function data() {
        return {
          currentValue: this.value,
          visiable: this.isShow
        };
      },
      components: {
        NativeMask: Mask,
        Wheel: Wheel
      },
      watch: {
        value: function value(val) {
          this.currentValue = val;
        },
        isShow: function isShow(val) {
          this.visiable = val;
        },
        visiable: function visiable(val) {
          this.$emit('visiable', val);
        }
      },
      methods: {
        handleChange: function handleChange(val, i) {
          // 解除引用关联
          var v = this.currentValue.slice();
          v.splice(i, 1, val);
          this.currentValue = v;
        },
        confirm: function confirm() {
          this.hide();
          this.$emit('change', this.currentValue);
        },
        cancel: function cancel() {
          this.hide();
        },
        hide: function hide() {
          this.visiable = false;
        }
      },
      mounted: function mounted() {}
    };

    /* script */
    var __vue_script__$i = script$i;
    /* template */

    var __vue_render__$i = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('NativeMask', {
        attrs: {
          "is-show": _vm.visiable
        }
      }, [_c('transition', {
        attrs: {
          "name": _vm.prefixCls + "-animation--bibo"
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        "class": _vm.prefixCls + "-picker"
      }, [_c('div', {
        "class": _vm.prefixCls + "-picker__header"
      }, [_c('span', {
        "class": _vm.prefixCls + "-picker__cancel",
        on: {
          "click": _vm.cancel
        }
      }, [_vm._v("取消")]), _vm._v(" "), _c('span', {
        "class": _vm.prefixCls + "-picker__title"
      }), _vm._v(" "), _c('span', {
        "class": _vm.prefixCls + "-picker__confirm",
        on: {
          "click": _vm.confirm
        }
      }, [_vm._v("确定")])]), _vm._v(" "), _c('div', {
        "class": _vm.prefixCls + "-picker__box"
      }, [_vm._t("default", _vm._l(_vm.columns, function (col, $i) {
        return _c('Wheel', {
          key: $i,
          attrs: {
            "value": _vm.currentValue && _vm.currentValue[$i],
            "index": $i,
            "items": col
          },
          on: {
            "change": function () {
              return function (val) {
                return _vm.handleChange(val, $i);
              };
            }()
          }
        });
      })), _vm._v(" "), _c('div', {
        "class": _vm.prefixCls + "-picker__mask_top"
      }), _vm._v(" "), _c('div', {
        "class": _vm.prefixCls + "-picker__mask_bottom"
      })], 2)])])], 1);
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

    var Picker = normalizeComponent_1({
      render: __vue_render__$i,
      staticRenderFns: __vue_staticRenderFns__$i
    }, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, undefined, undefined);

    Picker.install = function (vue) {
      vue.component(Picker.name, Picker);
    };

    var script$j = {
      name: initName('dialog'),
      mixins: [baseMixins],
      props: {
        mask: {
          type: Boolean,
          "default": true
        },
        width: {
          type: [Number, String]
        },
        zIndex: {
          type: [Number, String]
        },
        content: {
          type: [String, Number],
          "default": ''
        },
        contentStyle: {
          type: Object
        },
        title: {
          type: String,
          "default": ''
        },
        height: {
          type: [Number, String]
        },
        closable: {
          type: Boolean,
          "default": false
        },
        buttons: {
          type: Array,
          "default": function _default() {
            return [{
              text: '取消'
            }, {
              text: '确定'
            }];
          }
        },
        buttonDirection: {
          type: String,
          "default": 'row'
        },
        isShow: {
          type: Boolean,
          "default": false
        },
        isRemove: {
          type: Boolean,
          "default": false
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
          return {
            height: cmpUnit(h),
            width: cmpUnit(w),
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
        },
        footerClasses: function footerClasses() {
          var _ref;

          var prefixCls = this.prefixCls,
              buttonDirection = this.buttonDirection;
          return ["".concat(prefixCls, "-dialog__footer"), (_ref = {}, _defineProperty(_ref, "".concat(prefixCls, "-dialog__footer_row"), buttonDirection === 'row'), _defineProperty(_ref, "".concat(prefixCls, "-dialog__footer_column"), buttonDirection === 'column'), _ref)];
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
    var __vue_script__$j = script$j;
    /* template */

    var __vue_render__$j = function __vue_render__() {
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
        "class": _vm.prefixCls + "-dialog"
      }, [_c('transition', {
        attrs: {
          "name": _vm.prefixCls + "-animate--scale"
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
        "class": _vm.prefixCls + "-dialog__wrap",
        style: _vm.styles
      }, [_vm.closable ? _c('p', {
        "class": _vm.prefixCls + "-dialog__close",
        on: {
          "click": function click($event) {
            $event.stopPropagation();
            return _vm.hide($event);
          }
        }
      }, [_c('Icon', {
        attrs: {
          "name": "close",
          "width": 20,
          "height": 20,
          "color": "#8a8a8a"
        }
      })], 1) : _vm._e(), _vm._v(" "), _vm.title ? _c('header', {
        "class": _vm.prefixCls + "-dialog__header"
      }, [_vm._t("header", [_c('div', {
        "class": _vm.prefixCls + "-dialog__title"
      }, [_vm._v(_vm._s(_vm.title))])])], 2) : _vm._e(), _vm._v(" "), _vm.content || _vm.$slots['default'] ? _c('div', {
        "class": _vm.prefixCls + "-dialog__body"
      }, [_vm._t("default", [_c('div', {
        "class": _vm.prefixCls + "-dialog__content",
        style: _vm.contentStyle,
        domProps: {
          "innerHTML": _vm._s(_vm.content)
        }
      })])], 2) : _vm._e(), _vm._v(" "), _c('footer', {
        "class": _vm.footerClasses
      }, [_vm._t("footer", [_vm._l(_vm.bindButtons, function (btn, $i) {
        return [_c('p', {
          key: 'btn-' + $i,
          "class": [_vm.prefixCls + "-dialog__button", btn["class"]],
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

    var Dialog = normalizeComponent_1({
      render: __vue_render__$j,
      staticRenderFns: __vue_staticRenderFns__$j
    }, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, undefined, undefined);

    var DialogClass = Vue.extend(Dialog);
    /**
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
     * @param {Boolean} closable=false - 是否显示关闭按钮
     * @param {Boolean} isRemove=false - 是否隐藏后移除,动态创建时会用到
     * @param {Boolean} isShow=false - 是否显示
     * @param {Number|String} zIndex=1000 - z-index值控制层叠
     * @param {String} buttonDirection=row - 横向排列按钮(row)/纵向排列按钮(column)
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

    var script$k = {
      name: initName('alert'),
      "extends": Dialog,
      props: {
        action: Function
      },
      components: {
        BusyDialog: Dialog
      },
      computed: {
        datas: function datas() {
          return _objectSpread2({}, this.$props, {
            isShow: this.visiable,
            buttons: [{
              text: '确定',
              action: this.action
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
    var __vue_script__$k = script$k;
    /* template */

    var __vue_render__$k = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('BusyDialog', _vm._b({
        ref: "dialog",
        "class": _vm.prefixCls + "-alert",
        on: {
          "visiable-change": _vm.handleVisiable
        }
      }, 'BusyDialog', _vm.datas, false), [_vm._t("default")], 2);
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

    var Alert = normalizeComponent_1({
      render: __vue_render__$k,
      staticRenderFns: __vue_staticRenderFns__$k
    }, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, undefined, undefined);

    var AlertClass = Vue.extend(Alert);
    /**
     * @module Alert
     * @see {@link ../example/all/dialog.html 实例}
     * @desc alert对话框组件
     * @param {String} content - 显示信息
     * @param {Number} height=140 - 组件高度
     * @param {Number} width=240 - 组件高度
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

    var script$l = {
      name: initName('confirm'),
      "extends": Dialog,
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
          return _objectSpread2({}, this.$props, {
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
    var __vue_script__$l = script$l;
    /* template */

    var __vue_render__$l = function __vue_render__() {
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

    var Confirm = normalizeComponent_1({
      render: __vue_render__$l,
      staticRenderFns: __vue_staticRenderFns__$l
    }, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, undefined, undefined);

    var ConfirmClass = Vue.extend(Confirm);
    var instance$2;
    /**
     * @module Confirm
     * @see {@link ../example/all/dialog.html 实例}
     * @desc confirm对话框组件
     * @param {String} content - 显示信息
     * @param {Number} height=140 - 组件高度
     * @param {Number} width=260 - 组件高度
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

    var script$m = {
      name: initName('prompt'),
      "extends": Dialog,
      components: {
        BusyDialog: Dialog
      },
      props: {
        placeholder: String,
        height: {
          type: [String, Number],
          "default": 180
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
          return _objectSpread2({}, this.$props, {
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
    var __vue_script__$m = script$m;
    /* template */

    var __vue_render__$m = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('BusyDialog', _vm._b({
        ref: "dialog",
        on: {
          "visiable-change": _vm.handleVisiable
        }
      }, 'BusyDialog', _vm.datas, false), [_c('div', [_vm.content ? _c('div', {
        "class": _vm.prefixCls + "-prompt__text"
      }, [_vm._v("\n            " + _vm._s(_vm.content) + "\n        ")]) : _vm._e(), _vm._v(" "), _c('div', {
        "class": _vm.prefix + "-prompt__input_box"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentVal,
          expression: "currentVal"
        }],
        "class": _vm.prefixCls + "-prompt__input",
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

    var Prompt = normalizeComponent_1({
      render: __vue_render__$m,
      staticRenderFns: __vue_staticRenderFns__$m
    }, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, undefined, undefined);

    var PromptClass = Vue.extend(Prompt);
    var instance$3;
    /**
     * @module Prompt
     * @see {@link ../example/all/dialog.html 实例}
     * @desc prompt对话框组件
     * @param {String} placeholder - 提示信息
     * @param {Number} height=140 - 组件高度
     * @param {Number} width=260 - 组件高度
     */

    var Prompt$1 = _extends(Prompt, {
      $type: 'prompt',
      install: function install(vue) {
        vue.component(Prompt.name, Prompt);
      },

      /**
       * @method show
       * @desc 显示Prompt对话框
       * @param {String} text - 内容信息
       * @param {Object} opts - 配置项, <a href="#module_Prompt">参见</a>
       * @param {Function} callback - 回调函数, 用户输入信息将传参给第一个参数
       * @static
       * @returns PromptClass实例
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

    //
    var script$n = {
      name: initName('message'),
      mixins: [baseMixins],
      props: {
        pos: {
          type: String,
          "default": 'top'
        },
        mode: {
          type: String,
          "default": ''
        },
        text: {
          type: String,
          "default": ''
        },
        bgColor: {
          type: String
        },
        height: {
          type: [String, Number],
          validator: validateUnit
        },
        width: {
          type: [String, Number],
          validator: validateUnit
        },
        delay: {
          type: Number,
          "default": 3000
        },
        closable: {
          type: Boolean,
          "default": false
        },
        isShow: {
          type: Boolean,
          "default": false
        },
        isRemove: {
          type: Boolean,
          "default": false
        },
        autoHide: {
          type: Boolean,
          "default": true
        }
      },
      data: function data() {
        return {
          visiable: this.isShow,
          timmer: null
        };
      },
      components: {
        Icon: Icon
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

          this.$emit('visiable-change', val);
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
          var h = cmpUnit(this.height);
          var w = cmpUnit(this.width);
          return {
            backgroundColor: this.bgColor,
            height: h,
            width: w,
            lineHeight: h
          };
        },
        classes: function classes() {
          var prefixCls = this.prefixCls,
              pos = this.pos,
              mode = this.mode;
          return ["".concat(prefixCls, "-message"), "".concat(prefixCls, "-message--pos-").concat(pos), "".concat(prefixCls, "-message--").concat(mode)];
        },
        animation: function animation() {
          var m = this.pos == 'bottom' ? 'bibo' : 'tito';
          return "".concat(this.prefixCls, "-animate--").concat(m);
        },
        _statusStyles: function _statusStyles() {
          var t = '',
              c = '';

          switch (this.mode) {
            case 'success':
              t = 'check-circle';
              c = '#57c986';
              break;

            case 'error':
              t = 'close-circle';
              c = '#f63e4b';
              break;

            case 'warning':
              t = 'info-circle';
              c = '#fb6700';
              break;

            default:
              t = '';
              c = '';
          }

          return {
            icon: t,
            color: c
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
    var __vue_script__$n = script$n;
    /* template */

    var __vue_render__$n = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('transition', {
        attrs: {
          "name": _vm.animation
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
        "class": _vm.classes,
        style: _vm.styles
      }, [_c('div', {
        "class": _vm.prefixCls + "-message__icon"
      }, [_c('Icon', {
        attrs: {
          "name": _vm._statusStyles.icon,
          "width": "24",
          "height": "24",
          "color": _vm._statusStyles.color
        }
      })], 1), _vm._v(" "), _c('div', {
        "class": _vm.prefixCls + "-message__text"
      }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2), _vm._v(" "), _c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.closable,
          expression: "closable"
        }],
        "class": _vm.prefixCls + "-message__close",
        on: {
          "click": _vm.hide
        }
      }, [_c('Icon', {
        attrs: {
          "name": "close",
          "width": "24",
          "height": "24",
          "color": _vm._statusStyles.color
        }
      })], 1)])]);
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

    var Message = normalizeComponent_1({
      render: __vue_render__$n,
      staticRenderFns: __vue_staticRenderFns__$n
    }, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, undefined, undefined);

    var MessageClass = Vue.extend(Message);
    /**
     * @class
     * @constructor
     * @module Message
     * @see {@link ../example/all/message.html 实例}
     * @desc 浮层提示信息组件
     * @param {String} pos='top' - 显示位置,可取值 'top', 'middle', 'bottom'
     * @param {String} type='info' - 提示框类型, 可取值 'info', 'success', 'error', 'warning'
     * @param {String} text - 提示信息内容, 也可以slot方式传入
     * @param {Number} delay=3000 - 显示多长时间，单位 ms<毫秒>
     * @param {Boolean} isRemove=false - 是否隐藏后移除dom
     * @param {Boolean} autoHide=false - 是否自动隐藏
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
       */
      info: function info(text, opts) {
        return this.show(_extends(opts || {}, {
          mode: 'info',
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
       */
      success: function success(text, opts) {
        return this.show(_extends(opts || {}, {
          mode: 'success',
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
       */
      warning: function warning(text, opts) {
        return this.show(_extends(opts || {}, {
          mode: 'warning',
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
       */
      error: function error(text, opts) {
        return this.show(_extends(opts || {}, {
          mode: 'error',
          text: text
        }));
      }
    });

    var mixins = {
      mixins: [baseMixins],
      props: {
        trackWidth: {
          type: Number,
          "default": 1
        },
        trackColor: {
          type: [String, Array],
          "default": ''
        },
        lineColor: {
          type: [String, Array],
          "default": ''
        },
        value: {
          "default": 0,
          validator: function validator(val) {
            return typeof val === 'number' && val >= 0 && val <= 100;
          }
        }
      },
      methods: {
        handleClick: function handleClick($evt) {
          this.$emit('click', $evt);
        }
      }
    };

    //
    /**
     * @class
     * @constructor
     * @des 环形进度条组件
     * @param {Number} size - 组件直径大小,默认 100<px>
     * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
     * @param {Number | String} trackWidth - 进度槽的宽度, 默认值5<px>
     * @param {String} trackColor - 进度槽颜色, 取值范围 css color
     * @param {String} lineColor - 进度条颜色, 取值范围 css color
     * @param {String} linecap=round - 进度条终结形半, 取值范围 butt, round, square
     * @param {String} direction = '1' - 顺时针还是逆时针, 取值范围 '1','-1'
     * @param {String} content - 显示内容，this.value + '%'
     **/

    var script$o = {
      name: initName('progress-ring'),
      mixins: [mixins],
      props: {
        size: {
          type: [Number, String],
          "default": 100
        },
        direction: {
          type: [Number, String],
          "default": 1
        },
        linecap: {
          type: String,
          "default": 'round'
        }
      },
      computed: {
        dasharray: function dasharray() {
          return (this.size - 2 * this.trackWidth) * Math.PI;
        },
        dashoffset: function dashoffset() {
          var d = Number(this.direction);
          var p = (100 + -1 * d * this.value) / 100;
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
            s.strokeWidth = cmpUnit(this.trackWidth);
          }

          if (this.trackColor) {
            s.stroke = this.trackColor;
          }

          return s;
        },
        barStyles: function barStyles() {
          var s = {};

          if (this.trackWidth) {
            s.strokeWidth = cmpUnit(this.trackWidth);
          }

          if (this.lineColor) {
            s.stroke = this.lineColor;
          }

          return s;
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
        "class": _vm.prefixCls + "-progress-ring",
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
        "class": _vm.prefixCls + "-progress-ring__track",
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
        "class": _vm.prefixCls + "-progress-ring__bar",
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
      })]), _vm._v(" "), _vm.$slots["default"] ? _c('div', {
        "class": _vm.prefixCls + "-progress-ring__text"
      }, [_vm._t("default")], 2) : _vm._e()]);
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

    var ProgressRing = normalizeComponent_1({
      render: __vue_render__$o,
      staticRenderFns: __vue_staticRenderFns__$o
    }, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, undefined, undefined);

    //
    /**
     * @des 线形进度条组件
     * @param {Number} width - 组件长度,默认 100%
     * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
     * @param {Number | String} trackWidth - 进度槽的宽度, 默认值5<px>
     * @param {String} trackColor - 进度槽颜色, 取值范围 css color
     * @param {String} lineColor - 进度条颜色, 取值范围 css color
     * @param {String} showText - 是否显示进度数值, 默认 false
     **/

    var script$p = {
      name: initName('progress-line'),
      mixins: [mixins],
      props: {
        height: {
          type: [Number, String]
        },
        width: {
          type: [Number, String]
        }
      },
      computed: {
        styles: function styles() {
          return {
            width: cmpUnit(this.width),
            height: cmpUnit(this.height)
          };
        },
        trackStyles: function trackStyles() {
          return {
            background: this.trackColor,
            height: cmpUnit(this.trackWidth)
          };
        },
        barStyles: function barStyles() {
          return {
            width: this.value + '%',
            background: this.lineColor
          };
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
        "class": _vm.prefixCls + "-progress-line",
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.$slots['start'],
          expression: "$slots['start']"
        }],
        "class": _vm.prefixCls + "-progress-line__start"
      }, [_vm._t("start")], 2), _vm._v(" "), _c('div', {
        "class": _vm.prefixCls + "-progress-line__wrap",
        style: _vm.trackStyles
      }, [_c('div', {
        "class": _vm.prefixCls + "-progress-line__bar",
        style: _vm.barStyles
      })]), _vm._v(" "), _c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.$slots['end'],
          expression: "$slots['end']"
        }],
        "class": _vm.prefixCls + "-progress-line__end"
      }, [_vm._t("end")], 2)]);
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

    var ProgressLine = normalizeComponent_1({
      render: __vue_render__$p,
      staticRenderFns: __vue_staticRenderFns__$p
    }, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, undefined, undefined);

    //
    /**
     * @module Progress
     * @see {@link ../example/all/progress.html 实例}
     * @des 进度条组件
     * @param {Number} size - 环形组件直径大小,默认 100<px>
     * @param {Number | String} width - 线形组件长度,默认 100%
     * @param {Number} duration - 动画持续时间<transition-duration>,默认值500<ms>
     * @param {Number} trackWidth - 进度槽的宽度, 默认值5<px>
     * @param {String} trackColor - 进度槽颜色, 取值范围 css color <hex, rgb, rgba>
     * @param {String} lineColor - 进度条颜色, 取值范围 css color <hex, rgb, rgba>
     * @param {String} content - 显示内容, 默认''
     * @param {String} type - 进度条组件类型, 可取值 'line', 'ring', 默认 'line'
     **/

    var script$q = {
      name: initName('progress'),
      mixins: [mixins],
      props: {
        size: {
          type: [Number, String],
          "default": 80
        },
        direction: String,
        type: {
          type: String,
          "default": 'line'
        },
        height: {
          type: [Number, String]
        },
        width: {
          type: [Number, String]
        }
      },
      components: {
        ProgressLine: ProgressLine,
        ProgressRing: ProgressRing
      },
      computed: {
        lineModel: function lineModel() {
          var width = this.width,
              height = this.height,
              lineColor = this.lineColor,
              trackWidth = this.trackWidth,
              trackColor = this.trackColor,
              value = this.value;
          return {
            width: width,
            height: height,
            lineColor: lineColor,
            trackWidth: trackWidth,
            trackColor: trackColor,
            value: value
          };
        },
        ringModel: function ringModel() {
          var size = this.size,
              lineColor = this.lineColor,
              trackWidth = this.trackWidth,
              trackColor = this.trackColor,
              value = this.value,
              direction = this.direction,
              linecap = this.linecap;
          return {
            size: size,
            lineColor: lineColor,
            trackWidth: trackWidth,
            trackColor: trackColor,
            value: value,
            direction: direction,
            linecap: linecap
          };
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

      return _c('div', {
        "class": _vm.prefixCls + "-progress",
        on: {
          "click": _vm.handleClick
        }
      }, [_vm.type === 'line' ? _c('ProgressLine', _vm._b({
        ref: "child-line"
      }, 'ProgressLine', _vm.lineModel, false), [_c('template', {
        slot: "start"
      }, [_vm._t("start")], 2), _vm._v(" "), _c('template', {
        slot: "end"
      }, [_vm._t("end")], 2)], 2) : _vm._e(), _vm._v(" "), _vm.type === 'ring' ? _c('ProgressRing', _vm._b({
        ref: "child-ring"
      }, 'ProgressRing', _vm.ringModel, false), [_vm._t("default")], 2) : _vm._e()], 1);
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

    var Progress = normalizeComponent_1({
      render: __vue_render__$q,
      staticRenderFns: __vue_staticRenderFns__$q
    }, __vue_inject_styles__$q, __vue_script__$q, __vue_scope_id__$q, __vue_is_functional_template__$q, __vue_module_identifier__$q, undefined, undefined);

    Progress.install = function (vue) {
      vue.component(ProgressRing.name, ProgressRing);
      vue.component(ProgressLine.name, ProgressLine);
      vue.component(Progress.name, Progress);
    };

    //
    var script$r = {
      name: initName('loadmore-bar'),
      mixins: [baseMixins],
      props: {
        size: {
          type: Number,
          "default": 20
        },
        pullText: {
          type: String,
          "default": '刷新加载'
        },
        loadingText: {
          type: String,
          "default": '加载中...'
        },
        dropText: {
          type: String,
          "default": '释放刷新'
        },
        pos: {
          type: String,
          "default": ''
        },
        showStatus: {
          type: String,
          "default": 'init'
        }
      },
      data: function data() {
        return {
          status: this.showStatus
        };
      },
      components: {
        Spinner: Spinner,
        Icon: Icon
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
    var __vue_script__$r = script$r;
    /* template */

    var __vue_render__$r = function __vue_render__() {
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
        "class": _vm.prefixCls + "-loadmore__bar " + _vm.prefixCls + "-flex--center-center"
      }, [_c('p', {
        "class": _vm.prefixCls + "-loadmore__spinner"
      }, [_c('Spinner', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.status === 'loading',
          expression: "status==='loading'"
        }],
        attrs: {
          "width": _vm.size,
          "height": _vm.size,
          "type": "circle-rotate",
          "color": "#aaa"
        }
      })], 1), _vm._v(" "), _c('p', {
        "class": [_vm.prefixCls + "-loadmore__text", _vm.prefixCls + "-loadmore--" + _vm.status]
      }, [_vm.pos == 'top' ? _c('span', {
        "class": _vm.prefixCls + "-loadmore__arrow"
      }, [_c('Icon', {
        attrs: {
          "height": 30,
          "name": "arrowdown",
          "color": "#000"
        }
      })], 1) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.loadText))])])]);
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

    var LoadMoreBar = normalizeComponent_1({
      render: __vue_render__$r,
      staticRenderFns: __vue_staticRenderFns__$r
    }, __vue_inject_styles__$r, __vue_script__$r, __vue_scope_id__$r, __vue_is_functional_template__$r, __vue_module_identifier__$r, undefined, undefined);

    //
    /**
     * @class
     * @constructor
     * @module Loadmore
     * @see {@link ../example/all/loadmore.html 实例}
     * @desc 加载更多组件
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
     */

    var script$s = {
      name: initName('loadmore'),
      mixins: [baseMixins],
      props: {
        topPullText: {
          type: String,
          "default": '下拉刷新'
        },
        topLoadingText: {
          type: String,
          "default": '正在加载新数据'
        },
        topDropText: {
          type: String,
          "default": '释放加载'
        },
        bottomPullText: {
          type: String,
          "default": '上拉刷新'
        },
        bottomLoadingText: {
          type: String,
          "default": '加载中...'
        },
        bottomDropText: {
          type: String,
          "default": '释放加载'
        },
        noMoreText: {
          type: String,
          "default": '全部数据已加载'
        },
        onInfinite: {
          type: Function
        },
        onRefresh: {
          type: Function
        },
        topLimit: {
          type: Number,
          "default": 60
        },
        bottomLimit: {
          type: Number,
          "default": 120
        },
        topStatus: {
          type: String,
          "default": 'init'
        },
        bottomStatus: {
          type: String,
          "default": 'init'
        },
        noMoreData: {
          type: Boolean,
          "default": false
        },
        listenScroll: {
          type: Boolean,
          "default": true
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
        LoadMoreBar: LoadMoreBar
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
    var __vue_script__$s = script$s;
    /* template */

    var __vue_render__$s = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        "class": _vm.prefixCls + "-loadmore"
      }, [_c('div', {
        "class": _vm.prefixCls + "-loadmore__content",
        style: _vm.styles
      }, [_vm._t("top", [_vm.onRefresh ? _c('LoadMoreBar', {
        ref: "top",
        "class": _vm.prefixCls + "-loadmore__top",
        attrs: {
          "pull-text": _vm.topPullText,
          "loading-text": _vm.topLoadingText,
          "drop-text": _vm.topDropText,
          "show-status": _vm.tStatus,
          "pos": "top"
        }
      }) : _vm._e()]), _vm._v(" "), _c('div', {
        "class": _vm.prefixCls + "-loadmore__content"
      }, [_vm._t("default")], 2), _vm._v(" "), _vm.onInfinite ? _vm._t("bottom", [_c('LoadMoreBar', {
        ref: "bottom",
        "class": _vm.prefixCls + "-loadmore__bottom",
        attrs: {
          "pull-text": _vm.bottomPullText,
          "loading-text": _vm.bottomLoadingText,
          "drop-text": _vm.bottomDropText,
          "show-status": _vm.bStatus,
          "pos": "bottom"
        }
      })]) : _vm._e(), _vm._v(" "), _vm.noMore ? _vm._t("no-more", [_c('div', {
        "class": _vm.prefixCls + "-loadmore__nomore"
      }, [_vm._v(_vm._s(_vm.noMoreText))])]) : _vm._e()], 2)]);
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

    var LoadMore = normalizeComponent_1({
      render: __vue_render__$s,
      staticRenderFns: __vue_staticRenderFns__$s
    }, __vue_inject_styles__$s, __vue_script__$s, __vue_scope_id__$s, __vue_is_functional_template__$s, __vue_module_identifier__$s, undefined, undefined);

    LoadMore.install = function (vue) {
      vue.component(LoadMore.name, LoadMore);
    };

    //
    var VERTICAL = 'vertical';
    var HORIZONTAL = 'horizontal';
    /**
     * @class
     * @constructor
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
     */

    var script$t = {
      name: initName('swipe'),
      mixins: [baseMixins],
      props: {
        height: {
          type: Number,
          "default": 200
        },
        width: {
          type: Number
        },
        defaultIndex: {
          type: Number,
          "default": 0
        },
        dotColor: {
          type: String
        },
        curDotColor: {
          type: String
        },
        dirType: {
          type: String,
          "default": HORIZONTAL
        },
        showDotes: {
          type: Boolean,
          "default": true
        },
        dotesPos: {
          type: String,
          "default": 'bottom'
        },
        autoPlay: {
          type: Boolean,
          "default": false
        },
        interval: {
          type: Number,
          "default": 2000
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
            height: cmpUnit(this.height),
            width: cmpUnit(this.width)
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
          return ["".concat(this.prefixCls, "-swipe__dots--pos-").concat(this.dotesPos)];
        },
        classes: function classes() {
          return [this.status == "transition" ? "".concat(this.prefixCls, "-swipe--transition") : '', this.dirType == HORIZONTAL ? "".concat(this.prefixCls, "-swipe--horizontal") : "".concat(this.prefixCls, "-swipe--vertical")];
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
        this.items = [].slice.call(this.$el.querySelectorAll(".".concat(this.prefixCls, "-swipe__item")));
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
    var __vue_script__$t = script$t;
    /* template */

    var __vue_render__$t = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        "class": _vm.prefixCls + "-swipe",
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_c('div', {
        "class": [_vm.prefixCls + "-swipe__wrap", _vm.classes],
        style: _vm.wrapStyles
      }, [_vm._t("default")], 2), _vm._v(" "), _vm.showDotes ? _c('div', {
        "class": [_vm.prefixCls + "-swpier__dotes", _vm.dotesClass]
      }, _vm._l(_vm.items, function (item, i) {
        return _c('span', {
          key: 'swiper-' + i,
          "class": [_vm.prefixCls + "-swipe__dot", i == _vm.index ? _vm.prefixCls + "-swipe__dot--cur" : ''],
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

    var Swipe = normalizeComponent_1({
      render: __vue_render__$t,
      staticRenderFns: __vue_staticRenderFns__$t
    }, __vue_inject_styles__$t, __vue_script__$t, __vue_scope_id__$t, __vue_is_functional_template__$t, __vue_module_identifier__$t, undefined, undefined);

    //
    var script$u = {
      name: initName('swipe-item'),
      mixins: [baseMixins]
    };

    /* script */
    var __vue_script__$u = script$u;
    /* template */

    var __vue_render__$u = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        "class": _vm.prefixCls + "-swipe__item"
      }, [_vm._t("default")], 2);
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

    var SwipeItem = normalizeComponent_1({
      render: __vue_render__$u,
      staticRenderFns: __vue_staticRenderFns__$u
    }, __vue_inject_styles__$u, __vue_script__$u, __vue_scope_id__$u, __vue_is_functional_template__$u, __vue_module_identifier__$u, undefined, undefined);

    Swipe.install = function (vue) {
      vue.component(SwipeItem.name, SwipeItem);
      vue.component(Swipe.name, Swipe);
    };

    //
    var script$v = {
      name: initName('action-sheet-item'),
      mixins: [baseMixins],
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
    var __vue_script__$v = script$v;
    /* template */

    var __vue_render__$v = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        "class": [_vm.prefixCls + "-action-sheet__item", _vm.prefixCls + "-border-1px", _vm.prefixCls + "-border-b"],
        on: {
          "click": _vm.handleClick
        }
      }, [_vm._t("default")], 2);
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

    var ActionSheetItem = normalizeComponent_1({
      render: __vue_render__$v,
      staticRenderFns: __vue_staticRenderFns__$v
    }, __vue_inject_styles__$v, __vue_script__$v, __vue_scope_id__$v, __vue_is_functional_template__$v, __vue_module_identifier__$v, undefined, undefined);

    //
    var script$w = {
      name: initName('action-sheet'),
      mixins: [baseMixins],
      props: {
        isShow: {
          type: Boolean,
          "default": false
        },
        actions: {
          type: Array,
          "default": function _default() {
            return [];
          }
        },
        isRemove: {
          type: Boolean,
          "default": false
        }
      },
      data: function data() {
        return {
          visiable: this.isShow
        };
      },
      components: {
        BusyMask: Mask,
        ActionSheetItem: ActionSheetItem
      },
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
      mounted: function mounted() {}
    };

    /* script */
    var __vue_script__$w = script$w;
    /* template */

    var __vue_render__$w = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('BusyMask', {
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
          "name": _vm.prefixCls + "-animate--bibo"
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
        "class": _vm.prefixCls + "-action-sheet"
      }, [_c('div', {
        "class": _vm.prefixCls + "-action-sheet__box"
      }, [_c('div', {
        "class": _vm.prefixCls + "-action-sheet__list"
      }, [_vm._t("default", _vm._l(_vm.actions, function (ac, $i) {
        return _c('ActionSheetItem', {
          key: 'as-' + $i,
          on: {
            "click": ac.action
          }
        }, [_vm._v(_vm._s(ac.text))]);
      }))], 2), _vm._v(" "), _c('div', {
        "class": _vm.prefixCls + "-action-sheet__button",
        on: {
          "click": _vm.hide
        }
      }, [_vm._v("取消")])])])])], 1);
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

    var ActionSheet = normalizeComponent_1({
      render: __vue_render__$w,
      staticRenderFns: __vue_staticRenderFns__$w
    }, __vue_inject_styles__$w, __vue_script__$w, __vue_scope_id__$w, __vue_is_functional_template__$w, __vue_module_identifier__$w, undefined, undefined);

    var ActionSheetClass, instance$4, vm;
    /**
     * @class
     * @constructor
     * @module ActionSheet
     * @see {@link ../example/all/action-sheet.html 实例}
     * @desc ActionSheet框组件
     * @param {Array} actions - 动作菜单项
     * @param {Boolean} isShow=false - 是否显示
     * @param {Boolean} isRemove=false - 是否隐藏后删除
     * @param {Function} hide - 隐藏
     * @param {Function} show - 显示
     * @param {Event} show - 显示时触发
     * @param {Event} hide - 隐藏时触发
     * @param {Event} visiable-change - 显示隐藏时都会触发
     * @param {Slot} slot - default - 组件slot
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
    var script$x = {
      name: initName('input'),
      mixins: [baseMixins],
      props: {
        placeholder: String,
        disabled: Boolean,
        readonly: Boolean,
        type: {
          type: String,
          "default": 'text'
        },
        name: String,
        maxlength: {
          type: [Number, String],
          "default": 50
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
      components: {
        Icon: Icon
      },
      computed: {
        datas: function datas() {
          var placeholder = this.placeholder,
              readonly = this.readonly,
              autofocus = this.autofocus,
              disabled = this.disabled,
              type = this.type,
              name = this.name,
              maxlength = this.maxlength,
              pattern = this.pattern,
              value = this.value;
          return {
            placeholder: placeholder,
            readonly: readonly,
            autofocus: autofocus,
            disabled: disabled,
            type: type,
            name: name,
            maxlength: maxlength,
            pattern: pattern,
            value: value
          };
        },
        listeners: function listeners() {
          return this.$listeners;
        }
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
    var __vue_script__$x = script$x;
    /* template */

    var __vue_render__$x = function __vue_render__() {
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
        "class": _vm.prefixCls + "-input"
      }, [_c('div', {
        "class": _vm.prefixCls + "-input__content"
      }, [_vm.datas.type === 'checkbox' ? _c('input', _vm._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        "class": _vm.prefixCls + "-input__input",
        style: _vm.styles,
        attrs: {
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
      }, 'input', _vm.datas, false)) : _vm.datas.type === 'radio' ? _c('input', _vm._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        "class": _vm.prefixCls + "-input__input",
        style: _vm.styles,
        attrs: {
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
      }, 'input', _vm.datas, false)) : _c('input', _vm._b({
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        "class": _vm.prefixCls + "-input__input",
        style: _vm.styles,
        attrs: {
          "type": _vm.datas.type
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
      }, 'input', _vm.datas, false))]), _vm._v(" "), _c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.active && _vm.currentValue,
          expression: "active && currentValue"
        }],
        "class": _vm.prefixCls + "-input__clear",
        on: {
          "click": _vm.handleClear
        }
      }, [_c('Icon', {
        attrs: {
          "name": "close-circle-fill",
          "color": "#d8d8d8",
          "width": 16,
          "height": 16
        }
      })], 1)]);
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

    var Input = normalizeComponent_1({
      render: __vue_render__$x,
      staticRenderFns: __vue_staticRenderFns__$x
    }, __vue_inject_styles__$x, __vue_script__$x, __vue_scope_id__$x, __vue_is_functional_template__$x, __vue_module_identifier__$x, undefined, undefined);

    Input.install = function (vue) {
      vue.component(Input.name, Input);
    };

    //
    var script$y = {
      name: initName('switch'),
      mixins: [baseMixins],
      props: {
        value: Boolean,
        disabled: {
          type: Boolean,
          "default": false
        },
        color: {
          type: String,
          "default": ''
        },
        width: {
          type: [Number, String],
          "default": 52
        },
        height: {
          type: [Number, String],
          "default": 32
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
    var __vue_script__$y = script$y;
    /* template */

    var __vue_render__$y = function __vue_render__() {
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
        "class": _vm.prefixCls + "-switch " + _vm.prefixCls + "-switch__animbg",
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

    var Switch = normalizeComponent_1({
      render: __vue_render__$y,
      staticRenderFns: __vue_staticRenderFns__$y
    }, __vue_inject_styles__$y, __vue_script__$y, __vue_scope_id__$y, __vue_is_functional_template__$y, __vue_module_identifier__$y, undefined, undefined);

    Switch.install = function (vue) {
      vue.component(Switch.name, Switch);
    };

    //
    var script$z = {
      name: initName('select-option'),
      mixins: [baseMixins],
      props: {
        value: [Array, String, Object, Number],
        checked: {
          type: Boolean,
          "default": false
        },
        Disabled: {
          type: Boolean,
          "default": false
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
        "class": _vm.prefix + "-select__item",
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

    var Option = normalizeComponent_1({
      render: __vue_render__$z,
      staticRenderFns: __vue_staticRenderFns__$z
    }, __vue_inject_styles__$z, __vue_script__$z, __vue_scope_id__$z, __vue_is_functional_template__$z, __vue_module_identifier__$z, undefined, undefined);

    var script$A = {
      name: initName('select'),
      mixins: [baseMixins],
      props: {
        width: {
          type: [Number, String],
          "default": ''
        },
        height: {
          type: [Number, String],
          "default": ''
        },
        inputStyles: Object,
        placeholder: String,
        multiple: {
          type: Boolean,
          "default": false
        },
        autofocus: {
          type: Boolean,
          "default": false
        },
        options: {
          type: Array,
          "default": function _default() {
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
          "default": false
        }
      },
      data: function data() {
        return {
          currentValue: this.value,
          visiable: this.isShow,
          selectedIndex: ''
        };
      },
      components: {
        NativeMask: Mask,
        NativeOption: Option
      },
      computed: {
        styles: function styles() {
          return {
            width: cmpUnit(this.width),
            height: cmpUnit(this.height)
          };
        },
        optionStyles: function optionStyles() {
          return {
            height: cmpUnit(this.optionHeight)
          };
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
    var __vue_script__$A = script$A;
    /* template */

    var __vue_render__$A = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        "class": _vm.prefixClas + "-select",
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
        "class": _vm.prefixClas + "-select__content"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }],
        "class": _vm.prefixClas + "-select__input",
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
      })]), _vm._v(" "), _c('NativeMask', {
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
          "name": _vm.prefixClas + "-animate--bibo"
        }
      }, [_c('div', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.visiable,
          expression: "visiable"
        }],
        "class": _vm.prefixClas + "-select__options",
        style: _vm.optionStyles
      }, [_c('ul', {
        "class": [_vm.prefixClas + "-select__list", _vm.prefixCls + "-select__list- + " + _vm._uid],
        on: {
          "touchmove": function touchmove($event) {
            $event.stopPropagation();
            return function (e) {}();
          }
        }
      }, [_vm._t("default", _vm._l(_vm.options, function (option, $index) {
        return _c('NativeOption', {
          key: 'select_' + $index,
          attrs: {
            "value": option
          }
        }, [_vm._v(_vm._s(option.hasOwnProperty('label') ? option.label : option))]);
      }))], 2)])])], 1)], 1);
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

    var Select = normalizeComponent_1({
      render: __vue_render__$A,
      staticRenderFns: __vue_staticRenderFns__$A
    }, __vue_inject_styles__$A, __vue_script__$A, __vue_scope_id__$A, __vue_is_functional_template__$A, __vue_module_identifier__$A, undefined, undefined);

    //
    var script$B = {
      name: initName('select-option'),
      mixins: [baseMixins],
      props: {
        value: [Array, String, Object, Number],
        checked: {
          type: Boolean,
          "default": false
        },
        Disabled: {
          type: Boolean,
          "default": false
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
    var __vue_script__$B = script$B;
    /* template */

    var __vue_render__$B = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('li', {
        "class": _vm.prefix + "-select__item",
        on: {
          "click": function click($event) {
            $event.stopPropagation();
            return _vm.handleClick($event);
          }
        }
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

    var Option$1 = normalizeComponent_1({
      render: __vue_render__$B,
      staticRenderFns: __vue_staticRenderFns__$B
    }, __vue_inject_styles__$B, __vue_script__$B, __vue_scope_id__$B, __vue_is_functional_template__$B, __vue_module_identifier__$B, undefined, undefined);

    Select.install = function (vue) {
      vue.component(Option$1.name, Option$1);
      vue.component(Select.name, Select);
    };

    var script$C = {
      name: initName('segment-item'),
      mixins: [baseMixins],
      model: {
        prop: 'modelValue',
        event: 'change'
      },
      props: {
        value: null,
        modelValue: null,
        disabled: {
          type: Boolean,
          "default": false
        }
      },
      data: function data() {
        return {};
      },
      computed: {
        isChecked: function isChecked() {
          return this.modelValue === this.value || JSON.stringify(this.modelValue) === JSON.stringify(this.value);
        },
        classes: function classes() {
          var _ref;

          return ["".concat(this.prefixCls, "-segment__item"), (_ref = {}, _defineProperty(_ref, "".concat(this.prefixCls, "-segment__item--checked"), this.isChecked), _defineProperty(_ref, "".concat(this.prefixCls, "-segment__item--disabled"), this.disabled), _ref)];
        },
        color: function color() {
          return this.$options.parent.$options.propsData.color;
        },
        styles: function styles() {
          return this.color ? {
            borderColor: this.color,
            background: this.isChecked ? this.color : null
          } : null;
        }
      },
      methods: {
        handleChange: function handleChange() {
          if (!this.disabled) {
            this.$emit('change', this.value);
          }
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

      return _c('div', {
        "class": _vm.classes,
        style: _vm.styles,
        on: {
          "click": _vm.handleChange
        }
      }, [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__$C = [];
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

    var SegmentItem = normalizeComponent_1({
      render: __vue_render__$C,
      staticRenderFns: __vue_staticRenderFns__$C
    }, __vue_inject_styles__$C, __vue_script__$C, __vue_scope_id__$C, __vue_is_functional_template__$C, __vue_module_identifier__$C, undefined, undefined);

    //
    var script$D = {
      name: initName('segment'),
      mixins: [baseMixins],
      model: {
        prop: 'value',
        event: 'change'
      },
      props: {
        color: {
          type: String
        },
        options: Array,
        value: null,
        borderRadius: [String, Number]
      },
      components: {
        SegmentItem: SegmentItem
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
          this.$emit('change', val);
        }
      },
      computed: {
        styles: function styles() {
          return {
            borderColor: this.color,
            color: this.color,
            borderRadius: cmpUnit(this.borderRadius)
          };
        }
      },
      mounted: function mounted() {
        console.log(this);
      }
    };

    /* script */
    var __vue_script__$D = script$D;
    /* template */

    var __vue_render__$D = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        "class": _vm.prefixCls + "-segment",
        style: _vm.styles
      }, [_vm._t("default", _vm._l(_vm.options, function (opt) {
        return _c('SegmentItem', {
          key: opt.value || opt,
          attrs: {
            "value": opt.value || opt
          },
          model: {
            value: _vm.currentValue,
            callback: function callback($$v) {
              _vm.currentValue = $$v;
            },
            expression: "currentValue"
          }
        }, [_vm._v(_vm._s(opt.text || opt))]);
      }))], 2);
    };

    var __vue_staticRenderFns__$D = [];
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

    var Segment = normalizeComponent_1({
      render: __vue_render__$D,
      staticRenderFns: __vue_staticRenderFns__$D
    }, __vue_inject_styles__$D, __vue_script__$D, __vue_scope_id__$D, __vue_is_functional_template__$D, __vue_module_identifier__$D, undefined, undefined);

    Segment.install = function (vue) {
      vue.component(SegmentItem.name, SegmentItem);
      vue.component(Segment.name, Segment);
    };

    var iconProps$1 = {
      color: '#c0c0c0',
      width: 18,
      height: 18,
      name: 'right'
    };
    var script$E = {
      name: initName('list-item'),
      mixins: [baseMixins],
      props: {
        height: {
          type: [Number, String],
          "default": 42
        },
        label: String,
        content: String,
        labelWidth: {
          type: [Number, String],
          "default": 80
        },
        labelAlignH: {
          type: String,
          "default": 'start'
        },
        labelAlignV: {
          type: String,
          "default": 'center'
        },
        showLabel: {
          type: Boolean,
          "default": false
        },
        iconWidth: {
          type: [Number, String],
          "default": 28
        },
        iconAlignH: {
          type: String,
          "default": 'center'
        },
        iconAlignV: {
          type: String,
          "default": 'center'
        },
        showIcon: {
          type: Boolean,
          "default": true
        },
        icon: {
          type: Object
        }
      },
      data: function data() {
        return {
          iconModel: _objectSpread2({}, iconProps$1, {}, this.icon)
        };
      },
      components: {
        FlexBox: FlexBox,
        FlexItem: FlexItem,
        Icon: Icon
      },
      computed: {
        styles: function styles() {
          return {
            height: cmpUnit(this.height)
          };
        },
        labelClass: function labelClass() {
          var prefixCls = this.prefixCls,
              labelAlignH = this.labelAlignH,
              labelAlignV = this.labelAlignV;
          return ["".concat(prefixCls, "-list-item__label"), "".concat(prefixCls, "-flex"), "".concat(prefixCls, "-flex--").concat(labelAlignH, "-").concat(labelAlignV)];
        },
        iconClass: function iconClass() {
          var prefixCls = this.prefixCls,
              iconAlignH = this.iconAlignH,
              iconAlignV = this.iconAlignV;
          return ["".concat(prefixCls, "-list-item__icon"), "".concat(prefixCls, "-flex"), "".concat(prefixCls, "-flex--").concat(iconAlignH, "-").concat(iconAlignV)];
        }
      },
      watch: {
        icon: function icon(val) {
          this._icon = _objectSpread2({}, iconProps$1, {}, val);
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
    var __vue_script__$E = script$E;
    /* template */

    var __vue_render__$E = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('FlexBox', {
        "class": _vm.prefixCls + "-list-item " + _vm.prefixCls + "-border-1px " + _vm.prefixCls + "-border-b",
        style: _vm.styles,
        on: {
          "click": _vm.handleClick
        }
      }, [_vm.showLabel ? _c('FlexItem', {
        "class": _vm.labelClass,
        attrs: {
          "flex": "none",
          "width": _vm.labelWidth
        },
        on: {
          "click": _vm.handleLabelClick
        }
      }, [_vm._t("label", [_c('label', {
        "class": _vm.prefixCls + "-list-item__label_text"
      }, [_vm._v(_vm._s(_vm.label))])])], 2) : _vm._e(), _vm._v(" "), _c('FlexItem', {
        "class": _vm.prefixCls + "-list-item__content " + _vm.prefixCls + "-flex " + _vm.prefixCls + "-flex--start-center"
      }, [_vm._t("default", [_c('div', {
        "class": _vm.prefixCls + "-list-item__content_text"
      }, [_vm._v(_vm._s(_vm.content))])])], 2), _vm._v(" "), _vm.showIcon ? _c('FlexItem', {
        "class": _vm.iconClass,
        attrs: {
          "flex": "none",
          "width": _vm.iconWidth
        },
        on: {
          "click": _vm.handleIconClick
        }
      }, [_vm._t("icon", [_c('Icon', _vm._b({
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.iconModel.name,
          expression: "iconModel.name"
        }]
      }, 'Icon', _vm.iconModel, false))])], 2) : _vm._e()], 1);
    };

    var __vue_staticRenderFns__$E = [];
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

    var ListItem = normalizeComponent_1({
      render: __vue_render__$E,
      staticRenderFns: __vue_staticRenderFns__$E
    }, __vue_inject_styles__$E, __vue_script__$E, __vue_scope_id__$E, __vue_is_functional_template__$E, __vue_module_identifier__$E, undefined, undefined);

    //
    var script$F = {
      name: initName('list'),
      mixins: [baseMixins],
      props: {
        items: {
          type: Array,
          "default": function _default() {
            return [];
          }
        }
      },
      components: {
        ListItem: ListItem
      }
    };

    /* script */
    var __vue_script__$F = script$F;
    /* template */

    var __vue_render__$F = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        "class": [_vm.prefixCls + "-list", _vm.prefixCls + "-border-1px", _vm.prefixCls + "-border-tb"]
      }, [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__$F = [];
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

    var List = normalizeComponent_1({
      render: __vue_render__$F,
      staticRenderFns: __vue_staticRenderFns__$F
    }, __vue_inject_styles__$F, __vue_script__$F, __vue_scope_id__$F, __vue_is_functional_template__$F, __vue_module_identifier__$F, undefined, undefined);

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
      vue.use(Radio);
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
      vue.use(Segment);
      vue.prototype["$".concat(libraryName)] = ALL;
    };

    var ALL = {
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
      Radio: Radio,
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
      Switch: Switch,
      Select: Select
    };

    if (window && window.Vue) {
      window.Vue.use(ALL);
    }

    exports.ActionSheet = ActionSheet;
    exports.Alert = Alert$1;
    exports.Border = Border;
    exports.Button = Button;
    exports.Checkbox = Checkbox;
    exports.Confirm = Confirm$1;
    exports.Dialog = Dialog$1;
    exports.FlexBox = FlexBox;
    exports.FlexItem = FlexItem;
    exports.Icons = Icon;
    exports.Input = Input;
    exports.List = List;
    exports.ListItem = ListItem;
    exports.LoadMore = LoadMore;
    exports.Loading = Loading;
    exports.Mask = Mask;
    exports.Message = Message$1;
    exports.Picker = Picker;
    exports.Progress = Progress;
    exports.Prompt = Prompt$1;
    exports.Select = Select;
    exports.Swipe = Swipe;
    exports.Switch = Switch;
    exports.Toast = Toast$1;
    exports.ToastLoading = ToastLoading$1;
    exports.default = ALL;
    exports.install = install;

    return exports;

}({}, Vue));
