import Vue from 'vue';

var trim = function(string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

//是否有样式类
var hasClass = function(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') != -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
};

//添加样式类
var addClass = function(el, cls) {
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
};

//移除样式类
var removeClass = function(el, cls) {
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


let hasModal = false;

//初始化模态背景.
const getModal = function() {
    let modalDom = PopupManager.modalDom;
    if (modalDom) {
        hasModal = true;
    } else {
        hasModal = false;
        modalDom = document.createElement('div');
        PopupManager.modalDom = modalDom;

        //遮罩屏蔽滚动
        modalDom.addEventListener('touchmove', function(event) {
            event.preventDefault();
            event.stopPropagation();
        });

        //模态点击事件
        modalDom.addEventListener('click', function() {
            PopupManager.doOnModalClick && PopupManager.doOnModalClick();
        });
    }

    return modalDom;
};

const instances = {};

const PopupManager = {
    zIndex: 2000,

    modalFade: true,

    getInstance: function(id) {
        return instances[id];
    },

    register: function(id, instance) {
        if (id && instance) {
            instances[id] = instance;
        }
    },

    deregister: function(id) {
        if (id) {
            instances[id] = null;
            delete instances[id];
        }
    },

    nextZIndex: function() {
        return PopupManager.zIndex++;
    },

    modalStack: [],

    doOnModalClick: function() {
        const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
        if (!topItem) return;

        const instance = PopupManager.getInstance(topItem.id);
        if (instance && instance.closeOnClickModal) {
            instance.close();
        }
    },

    openModal: function(id, zIndex, dom, modalClass, modalFade) {
        if (Vue.prototype.$isServer) return;
        if (!id || zIndex === undefined) return;
        this.modalFade = modalFade;

        const modalStack = this.modalStack;

        for (let i = 0, j = modalStack.length; i < j; i++) {
            const item = modalStack[i];
            if (item.id === id) {
                return;
            }
        }

        const modalDom = getModal();

        addClass(modalDom, 'v-modal');
        if (this.modalFade && !hasModal) {
            addClass(modalDom, 'v-modal-enter');
        }
        if (modalClass) {
            let classArr = modalClass.trim().split(/\s+/);
            classArr.forEach(item => addClass(modalDom, item));
        }
        setTimeout(() => {
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

        this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
    },

    closeModal: function(id) {
        const modalStack = this.modalStack;
        const modalDom = getModal();

        if (modalStack.length > 0) {
            const topItem = modalStack[modalStack.length - 1];
            if (topItem.id === id) {
                if (topItem.modalClass) {
                    let classArr = topItem.modalClass.trim().split(/\s+/);
                    classArr.forEach(item => removeClass(modalDom, item));
                }

                modalStack.pop();
                if (modalStack.length > 0) {
                    modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
                }
            } else {
                for (let i = modalStack.length - 1; i >= 0; i--) {
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
            setTimeout(() => {
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

export default PopupManager;