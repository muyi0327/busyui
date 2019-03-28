# Wui
基于vue2.0开发的一套，手机端组件库

## 准备工作
    修改~/.npmrc

    registry = http://nexus.wdjr.local/repository/NPM-COMMON-GROUP/

## 安装
    npm install wui-mobile -S

## 快速上手
    import Vue from 'vue';
    import Wui from 'wui-mobile';

    Vue.use(Wui);

    // or
    <script src="node_modules/wui-mobile/dist/wui.js"></sciprt>
    <script src="node_modules/wui-mobile/dist/wui.css"></sciprt>

    // or
    import Icon from 'wui-mobile/packages/icon';
    Vue.use(Icon);

    <w-icon fill="orange"></w-icon>

## 流览器兼容

    iOS
    Android 4.2+

## Links

[API文档](./docs/api.md)    

# License
MIT

