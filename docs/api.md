## Modules

* [ActionSheet](#module_ActionSheet)
    * [.show(opts)](#module_ActionSheet.show) ⇒
    * [.hide()](#module_ActionSheet.hide)
    * [.isVisiable()](#module_ActionSheet.isVisiable) ⇒ <code>Boolean</code>
* [@busy/border](#module_@busy/border)
* [Dialog](#module_Dialog)
    * _static_
        * [.show(opts)](#module_Dialog.show) ⇒
        * [.show(opts)](#module_Dialog.show) ⇒
    * _inner_
        * [~hide()](#module_Dialog..hide)
* [Toast](#module_Toast)
    * [.show(opts)](#module_Toast.show) ⇒
    * [.show(opts)](#module_Toast.show) ⇒
* [Button](#module_Button)
* [Checkbox](#module_Checkbox)
* [Alert](#module_Alert)
    * [.show(text, opts)](#module_Alert.show) ⇒
* [Confirm](#module_Confirm)
    * [.show(text, opts, callback)](#module_Confirm.show) ⇒
* [Dialog](#module_Dialog)
    * _static_
        * [.show(opts)](#module_Dialog.show) ⇒
        * [.show(opts)](#module_Dialog.show) ⇒
    * _inner_
        * [~hide()](#module_Dialog..hide)
* [Prompt](#module_Prompt)
    * [.show(text, opts, callback)](#module_Prompt.show) ⇒
* [Icon](#module_Icon)
* [Loading](#module_Loading)
* [Loadmore](#module_Loadmore)
* [Mask](#module_Mask)
* [Message](#module_Message)
    * [.show(opts)](#module_Message.show) ⇒
    * [.info(text, opts)](#module_Message.info) ⇒
    * [.success(text, opts)](#module_Message.success) ⇒
    * [.warning(text, opts)](#module_Message.warning) ⇒
    * [.error(text, opts)](#module_Message.error) ⇒
* [Progress](#module_Progress)
* [Spinner](#module_Spinner)
* [Swipe](#module_Swipe)
* [ToastLoading](#module_ToastLoading)
    * [.hide()](#module_ToastLoading.hide)
    * [.show(opts)](#module_ToastLoading.show) ⇒
* [Toast](#module_Toast)
    * [.show(opts)](#module_Toast.show) ⇒
    * [.show(opts)](#module_Toast.show) ⇒

## Functions

<dl>
<dt><a href="#enFormatNumberic">enFormatNumberic(n)</a></dt>
<dd><p>千分位格式化</p>
</dd>
<dt><a href="#deFormatNumberic">deFormatNumberic(n)</a></dt>
<dd><p>千分位化</p>
</dd>
<dt><a href="#cmpUnit">cmpUnit(u)</a></dt>
<dd><p>计算单位</p>
</dd>
<dt><a href="#splitUnit">splitUnit(u)</a></dt>
<dd></dd>
<dt><a href="#validateUnit">validateUnit(u)</a></dt>
<dd><p>验证可用css单位</p>
</dd>
</dl>

<a name="module_ActionSheet"></a>

## ActionSheet
ActionSheet框组件 <busy-action-sheet />

**Busy/action-sheet**:   
**See**: [实例](../example/all/action-sheet.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| actions | <code>Array</code> |  | 动作菜单项 |
| isShow | <code>Boolean</code> | <code>false</code> | 是否显示 |
| isRemove | <code>Boolean</code> | <code>false</code> | 是否隐藏后删除 |
| hide | <code>function</code> |  | 隐藏 |
| show | <code>function</code> |  | 显示 |
| show | <code>Event</code> |  | 显示时触发 |
| hide | <code>Event</code> |  | 隐藏时触发 |
| visiable-change | <code>Event</code> |  | 显示隐藏时都会触发 |
| slot | <code>Slot</code> |  | default - 组件slot |

**Example**  
```js
import ActionSheet from '@busy/action-sheet'

// 动态创建
ActionSheet.show({
 actions:[{
     text:'执行动作一',
     action(){
         console.log('执行动作一')
     }
 },{
     text:'执行动作二',
     action(){
         console.log('执行动作二')
     }
 }]
});

// 标签方式
vue.use(ActionSheet);

<busy-action-sheet @visiable-change="visiableChange" :is-show="isShow" :actions="actions"></busy-action-sheet>


new Vue({
     el:'#app',
     data:function(){
         return {
             isShow: false,
             actions:[{
                 text:'执行动作一',
                 action(){
                     console.log('执行动作一')
                 }
             },{
                 text:'执行动作二',
                 action(){
                     console.log('执行动作二')
                 }
             }]
         }
     },
     methods:{
         show: function(){
             this.isShow = true;
         },
         hide: function(){
             this.isShow = false;
         },
         visiableChange: function(visiable){
             this.isShow = visiable;
         },
         showActionSheet:function(){
             Busy.ActionSheet.show({
                actions: this.actions
             });
         }
    }
})
```

* [ActionSheet](#module_ActionSheet)
    * [.show(opts)](#module_ActionSheet.show) ⇒
    * [.hide()](#module_ActionSheet.hide)
    * [.isVisiable()](#module_ActionSheet.isVisiable) ⇒ <code>Boolean</code>

<a name="module_ActionSheet.show"></a>

### ActionSheet.show(opts) ⇒
**Kind**: static method of <code>[ActionSheet](#module_ActionSheet)</code>  
**Returns**: ActionSheetClass实例  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置项, <a href="#module_ActionSheet">参见</a> |

**Example**  
```js
Busy.ActionSheet.show({actions:{text:'执行动作', action: function(){console.log('do something')}}})
```
<a name="module_ActionSheet.hide"></a>

### ActionSheet.hide()
**Kind**: static method of <code>[ActionSheet](#module_ActionSheet)</code>  
**Example**  
```js
Busy.ActionSheet.hide()
```
<a name="module_ActionSheet.isVisiable"></a>

### ActionSheet.isVisiable() ⇒ <code>Boolean</code>
判断actionsheet是否显示

**Kind**: static method of <code>[ActionSheet](#module_ActionSheet)</code>  
**Returns**: <code>Boolean</code> - - 是否显示  
**Example**  
```js
if （Busy.ActionSheet.isVisiable(){
    console.log('done something')
  }
```
<a name="module_@busy/border"></a>

## @busy/border
1像素边框样式

**See**: [实例](../example/all/border1px.html)  

| Param | Type | Description |
| --- | --- | --- |
| side | <code>String</code> | = '', 设置哪个边框, t=上,b=下,r=右,l=左, lr=左右,tb=上下,no-r=无右,no-l=无左,no-t=无上,no-b=无下 |

**Example**  
```js
<div class="busy-border-1px">四边框</div>

 <div class="busy-border-1px busy-border-t">上边框</div>

 <div class="busy-border-1px busy-border-b">下边框</div>

 <div class="busy-border-1px busy-border-tb">上下边框</div>

 <div class="busy-border-1px busy-border-l">左边框</div>

 <div class="busy-border-1px busy-border-r">右边框</div>

 <div class="busy-border-1px busy-border-lr">左右边框</div>

<div class="busy-border-1px busy-border-no-r">无右边框</div>

<div class="busy-border-1px busy-border-no-l">无左边框</div>

<div class="busy-border-1px busy-border-no-t">无上边框</div>

<div class="busy-border-1px busy-border-no-b">无下边框</div>

// 取值1~10px
<div class="busy-border-1px busy-border-radius-4px">圆角</div>

// 百分比圆角
<div class="busy-border-1px" style="border-radius: 50%;">圆角</div>
```
<a name="module_Dialog"></a>

## Dialog
对话框组件11111 <busy-dialog />

**Busy/dialog**:   
**See**: [实例](../example/all/dialog.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| width | <code>Number</code> | <code>240</code> | 对话框宽度 |
| height | <code>Number</code> | <code>160</code> | 对话框高度 |
| content | <code>String</code> |  | 对话框内容, 必填 |
| title＝'' | <code>String</code> |  | 对话框标题 |
| show | <code>function</code> |  | 对话框标题 |
| hide | <code>function</code> |  | 对话框标题 |
| buttons | <code>Array.&lt;Object&gt;</code> | <code>[{text:&#x27;确定&#x27;},{text:&#x27;取消&#x27;}</code> | 对话框标题 |
| contentStyle | <code>Object</code> |  | 对话框内容样式 |
| showClose | <code>Boolean</code> | <code>false</code> | 是否显示关闭按钮 |

**Example**  
```js
import {Dialog} from '@busy/dialog';

Dialog.show({
     title: '提交信息',
     content: '确定要提交吗？', 
     buttons:[{text:'确定', action:function(){
         // 确认提交
     }},{text:'取消', action: function(){
         // 不提交
     }}]
});
```

* [Dialog](#module_Dialog)
    * _static_
        * [.show(opts)](#module_Dialog.show) ⇒
        * [.show(opts)](#module_Dialog.show) ⇒
    * _inner_
        * [~hide()](#module_Dialog..hide)

<a name="module_Dialog.show"></a>

### Dialog.show(opts) ⇒
显示对话框Dialog

**Kind**: static method of <code>[Dialog](#module_Dialog)</code>  
**Returns**: DialogClass实例  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置项, <a href="#module_Dialog">参见</a> |

**Example**  
```js
Busy.Dialog.show({content:'红包来了!',title:'发红包了'})
```
<a name="module_Dialog.show"></a>

### Dialog.show(opts) ⇒
显示对话框Dialog

**Kind**: static method of <code>[Dialog](#module_Dialog)</code>  
**Returns**: DialogClass实例  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置项, <a href="#module_Dialog">参见</a> |

**Example**  
```js
Busy.Dialog.show({content:'红包来了!',title:'发红包了'})
```
<a name="module_Dialog..hide"></a>

### Dialog~hide()
隐藏对话框

**Kind**: inner method of <code>[Dialog](#module_Dialog)</code>  
<a name="module_Toast"></a>

## Toast
Toast组件 <busy-toast></busy-toast>

**See**: [实例](../example/all/toast.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opts | <code>Object</code> |  | 选项 可选{content:'显示内容', pos: '显示位置', delay: '显示多长时间隐藏', type: 'icon类型'} |
| content | <code>String</code> |  | 显示内容 |
| pos | <code>String</code> | <code>&#x27;middle&#x27;</code> | 显示位置,可以是 'top', 'middle', 'bottom' |
| delay | <code>Number</code> | <code>2000</code> | 显示时间，单位毫秒 |
| type | <code>String</code> |  | icon类型 |
| isShow | <code>Boolean</code> | <code>false</code> | 是否显示 |
| isRemove | <code>Boolean</code> | <code>false</code> | 是否隐藏移除dom |
| autoHide | <code>Boolean</code> | <code>true</code> | 是否自动隐藏 |
| iconHeight | <code>Number</code> | <code>28</code> | 设置图标的高度 |
| iconWidth | <code>Number</code> | <code>28</code> | 设置图标的宽度 |
| color | <code>Number</code> | <code>#fff</code> | 设置图标的颜色 |
| hide | <code>function</code> |  | 隐藏 |
| show | <code>function</code> |  | 显示 |
| hide | <code>Event</code> |  | 隐藏时触发 |
| show | <code>Event</code> |  | 显示时触发 |
| visiable-change | <code>Event</code> |  | 显示,隐藏都会触发 |
| after-leave | <code>Event</code> |  | 隐藏动画结束时触发 |

**Example**  
```js
// use it in module tools
  import Toast from '@busy/toast';
  1, Toast.show('内容')
  2, Toast.show('内容', 5000)
  3, Toast.show('内容', 'top', 5000)
  4, Toast.show({content:'内容', pos: 'top', delay: 5000})

  // use it in html
  <script src="busy.min.js"><\/script>
  <link href="busy.min.css" rel="stylesheet" />

  1, Busy.Toast.show('内容')
  2, Busy.Toast.show('内容', 5000)
  3, Busy.Toast.show('内容', 'top', 5000)
  4, Busy.Toast.show({content:'内容', pos: 'top', delay: 5000})
```

* [Toast](#module_Toast)
    * [.show(opts)](#module_Toast.show) ⇒
    * [.show(opts)](#module_Toast.show) ⇒

<a name="module_Toast.show"></a>

### Toast.show(opts) ⇒
**Kind**: static method of <code>[Toast](#module_Toast)</code>  
**Returns**: ToastClass实例  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置项, <a href="#module_Toast">参见</a> |

**Example**  
```js
Busy.Toast.show({content:'内容', pos: 'top', delay: 5000})
```
<a name="module_Toast.show"></a>

### Toast.show(opts) ⇒
**Kind**: static method of <code>[Toast](#module_Toast)</code>  
**Returns**: ToastClass实例  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置项, <a href="#module_Toast">参见</a> |

**Example**  
```js
Busy.Toast.show({content:'内容', pos: 'top', delay: 5000})
```
<a name="module_Button"></a>

## Button
按钮组件 <busy-button />

**Busy/button**:   
**See**: [实例](../example/all/button.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> | <code>&quot;default&quot;</code> | 显示类型，接受 default, primary, warning |
| nativeType | <code>string</code> | <code>&quot;button&quot;</code> | 按钮类型， button, reset, submit |
| disabled | <code>boolean</code> | <code>false</code> | 禁用 |
| plain | <code>boolean</code> | <code>false</code> | 镂空按钮 |
| ghost | <code>ghost</code> | <code>false</code> | 幽灵按钮 |
| block | <code>boolean</code> | <code>false</code> | 是否100%宽 |
| size | <code>string</code> | <code>&quot;normal&quot;</code> | 尺寸，接受 normal, small, large |
| sharp | <code>Boolean</code> | <code>false</code> | 是否尖角 |
| height | <code>Number</code> |  | 高度 |
| width | <code>Number</code> |  | 宽度 |
| slot | <code>String</code> |  | 显示文本 |
| bgColor | <code>String</code> |  | 按钮背景色 |
| fontColor | <code>String</code> |  | 字体颜色 |
| borderColor | <code>String</code> |  | 边框颜色 |
| borderWidth | <code>String</code> |  | 边框宽度 |
| borderRadius | <code>String</code> |  | 圆角 |

**Example**  
```js
<busy-button size="large" type="primary">按钮</busy-button>

 <busy-button size="small" type="warning">删除</busy-button>
```
<a name="module_Checkbox"></a>

## Checkbox
勾选框  <busy-checkbox />

**Busy/checkbox**:   
**See**: [实例](../example/all/checkbox.html)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | 显示在右侧的内容 |
| disabled | <code>boolean</code> | 是否禁用 |

**Example**  
```js
<busy-checkbox v-model="checked" label="这个位置是标签1"></busy-checkbox>
<busy-checkbox v-model="disable" label="是否禁用下面的按钮"></busy-checkbox>
```
<a name="module_Alert"></a>

## Alert
alert对话框组件

**Busy/alert**:   
**See**: [实例](../example/all/dialog.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>String</code> |  | 显示信息 |
| height | <code>Number</code> | <code>140</code> | 组件高度 |
| width | <code>Number</code> | <code>240</code> | 组件高度 |

**Example**  
```js
// use it in html
<script src="busy.min.js"><\/script>
<link rel="stylesheet" href="busy.min.css" />

Busy.Alert.show('提交申请成功');

// use it in webpack or browserify, rollup
import {Alert} from '@busy/dialog';
// var Aler = require('@busy/dialog/alert.js');

Alert.show('提交申请成功');
```
<a name="module_Alert.show"></a>

### Alert.show(text, opts) ⇒
显示Alert对话框

**Kind**: static method of <code>[Alert](#module_Alert)</code>  
**Returns**: AlertClass实例  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | 内容信息 |
| opts | <code>Object</code> | 配置项, <a href="#module_Alert">参见</a> |

**Example**  
```js
busy.Alert.show('提交申请成功');
```
<a name="module_Confirm"></a>

## Confirm
confirm对话框组件

**See**: [实例](../example/all/dialog.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>String</code> |  | 显示信息 |
| height | <code>Number</code> | <code>140</code> | 组件高度 |
| width | <code>Number</code> | <code>260</code> | 组件高度 |

**Example**  
```js
// use it in html
<script src="busy.min.js"><\/script>
<link rel="stylesheet" href="busy.min.css" />

Busy.Confirm.show('确定要提交吗？', (result)=>{if (result) {console.log('提交')}});

// use it in webpack or browserify, rollup
import {Confirm} from '@busy/dialog';
// var Confirm = require('@busy/dialog/confirm.js');

Confirm.show('确定要提交吗？', (result)=>{if (result) {console.log('提交')}});
```
<a name="module_Confirm.show"></a>

### Confirm.show(text, opts, callback) ⇒
显示Confirm对话框

**Kind**: static method of <code>[Confirm](#module_Confirm)</code>  
**Returns**: ConfirmClass实例  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | 内容信息 |
| opts | <code>Object</code> | 配置项, <a href="#module_Confirm">参见</a> |
| callback | <code>function</code> | 回调函数, 用户选择结果将传参给第一个参数: true of false |

**Example**  
```js
const confirm = Busy.Confirm.show('确认要提交吗？', (rst)=>{if (rs) console.log('确认提交')});
confirm.doClose();
```
<a name="module_Dialog"></a>

## Dialog
对话框组件22222 <busy-dialog />

**Busy/dialog**:   
**See**: [实例](../example/all/dialog.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| width | <code>Number</code> | <code>240</code> | 对话框宽度 |
| height | <code>Number</code> | <code>160</code> | 对话框高度 |
| content | <code>String</code> |  | 对话框内容, 必填 |
| title＝'' | <code>String</code> |  | 对话框标题 |
| show | <code>function</code> |  | 显示 |
| hide | <code>function</code> |  | 隐藏 |
| buttons | <code>Array.&lt;Object&gt;</code> | <code>[{text:&#x27;确定&#x27;},{text:&#x27;取消&#x27;}</code> | 对话框标题 |
| contentStyle | <code>Object</code> |  | 对话框内容样式 |
| showClose | <code>Boolean</code> | <code>false</code> | 是否显示关闭按钮 |

**Example**  
```js
import {Dialog} from '@busy/dialog';

Dialog.show({
     title: '提交信息',
     content: '确定要提交吗？', 
     buttons:[{text:'确定', action:function(){
         // 确认提交
     }},{text:'取消', action: function(){
         // 不提交
     }}]
});
```

* [Dialog](#module_Dialog)
    * _static_
        * [.show(opts)](#module_Dialog.show) ⇒
        * [.show(opts)](#module_Dialog.show) ⇒
    * _inner_
        * [~hide()](#module_Dialog..hide)

<a name="module_Dialog.show"></a>

### Dialog.show(opts) ⇒
显示对话框Dialog

**Kind**: static method of <code>[Dialog](#module_Dialog)</code>  
**Returns**: DialogClass实例  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置项, <a href="#module_Dialog">参见</a> |

**Example**  
```js
Busy.Dialog.show({content:'红包来了!',title:'发红包了'})
```
<a name="module_Dialog.show"></a>

### Dialog.show(opts) ⇒
显示对话框Dialog

**Kind**: static method of <code>[Dialog](#module_Dialog)</code>  
**Returns**: DialogClass实例  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置项, <a href="#module_Dialog">参见</a> |

**Example**  
```js
Busy.Dialog.show({content:'红包来了!',title:'发红包了'})
```
<a name="module_Dialog..hide"></a>

### Dialog~hide()
隐藏对话框

**Kind**: inner method of <code>[Dialog](#module_Dialog)</code>  
<a name="module_Prompt"></a>

## Prompt
prompt对话框组件

**Busy/prompt**:   
**See**: [实例](../example/all/dialog.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| placeholder | <code>String</code> |  | 提示信息 |
| height | <code>Number</code> | <code>140</code> | 组件高度 |
| width | <code>Number</code> | <code>260</code> | 组件高度 |

**Example**  
```js
// use it in html
<script src="busy.min.js"><\/script>
<link rel="stylesheet" href="busy.min.css" />

Busy.Prompt.show('请填写信息？', (val)=>{console.log(val)});

// use it in webpack or browserify, rollup
import {Prompt} from '@busy/dialog';
// var Prompt = require('@busy/dialog/prompt.js');

Prompt.show('请填写信息？', (val)=>{console.log(val)});
```
<a name="module_Prompt.show"></a>

### Prompt.show(text, opts, callback) ⇒
显示Prompt对话框

**Kind**: static method of <code>[Prompt](#module_Prompt)</code>  
**Returns**: PromptClass实例  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | 内容信息 |
| opts | <code>Object</code> | 配置项, <a href="#module_Prompt">参见</a> |
| callback | <code>function</code> | 回调函数, 用户输入信息将传参给第一个参数 |

**Example**  
```js
const confirm = Busy.Prompt.show('请输入要跳转的网址', (url)=>{window.location = url});
prompt.doClose();
```
<a name="module_Icon"></a>

## Icon
icon图标组件

**Busy/icon**:   
**See**: [实例](../example/all/icons.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>String</code> |  | icon名称 |
| width | <code>Number</code> | <code>18</code> | 组件宽度 |
| height | <code>Number</code> | <code>18</code> | 组件高度 |
| fill | <code>String</code> | <code>&#x27;#fff&#x27;</code> | 组件颜色,css color |

**Example**  
```js
<busy-icon type="guanbi" fill="#8a8a8a"></busy-icon>
```
<a name="module_Loading"></a>

## Loading
loading component with mask

**See**: [实例](../example/all/loading.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| spinnerSize | <code>Number</code> | <code>30</code> | spinner直径 |
| spinnerStroke | <code>Number</code> | <code>3</code> | spinner描边宽度 |
| spinnerType | <code>Number</code> | <code>6</code> | spinner类型 0-6 |
| spinnerWidth | <code>Number</code> |  | spinner宽度 |
| spinnerHeight | <code>Number</code> |  | spinner高度 |
| color | <code>String</code> | <code>#478f05</code> | spinner以及text颜色 |
| bgColor | <code>String</code> | <code>rgba(255,</code> | 255, 255, 0.9) - spinner以及text颜色 |
| text | <code>String</code> |  | 加载文字提示 |
| fullPage | <code>Boolean</code> | <code>false</code> | 是否全屏显示 |
| isShow | <code>Boolean</code> | <code>false</code> | 显示隐藏 |
| isRemove | <code>Boolean</code> | <code>false</code> | 隐藏后是否清除 |

**Example**  
```js
<busy-loading>正在加载...</busy-loading>
```
<a name="module_Loadmore"></a>

## Loadmore
加载更多组件

**Busy/loadmore**:   
**See**: [实例](../example/all/loadmore.html)  

| Param | Type | Description |
| --- | --- | --- |
| topPullText | <code>String</code> | 内容上方loading拖动时显示文字 |
| topLoadingText | <code>String</code> | 内容上方loading拖动释放开始加载数据显示文字 |
| topDropText | <code>String</code> | 内容上方loading拖动超出指定距离，释放可加载时显示文字 |
| bottomPullText | <code>String</code> | 内容下方loading拖动时显示文字 |
| bottomLoadingText | <code>String</code> | 内容下方loading拖动释放开始加载数据显示文字 |
| bottomDropText | <code>String</code> | 内容下方loading拖动超出指定距离，释放可加载时显示文字 |
| onRefresh | <code>function</code> | 内容上方loading加载数据方法 |
| onInfinite | <code>function</code> | 内容下方loading加载数据方法 |
| topLimit | <code>Number</code> | 内容上方拖动距离可加载临界值 |
| bottomLimit | <code>function</code> | 内容下方拖动距离可加载临界值 |
| topStatus | <code>String</code> | 内容上方组件状态 |
| bottomStatus | <code>String</code> | 内容下方组件状态 |
| listenScroll | <code>Boolean</code> | 是否监听scroll |

**Example**  
```js
<busy-loadmore>content list</busy-loadmore>
```
<a name="module_Mask"></a>

## Mask
半透明遮罩层 <busy-mask></busy-mask>

**Busy/mask**:   

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| color | <code>String</code> | <code>rgba(0,0,0,</code> | 0.6) - 遮罩颜色, css color |
| isRemove | <code>Boolean</code> | <code>false</code> | 是否隐藏动画完成从dom中清除 |
| isShow | <code>Boolean</code> | <code>false</code> | 显示隐藏 |

**Example**  
```js
<busy-mask color="yellow"></busy-mask>
```
<a name="module_Message"></a>

## Message
浮层提示信息组件 <busy-meesage></busy-meesage>

**Busy/message**:   
**See**: [实例](../example/all/message.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pos | <code>String</code> | <code>&#x27;top&#x27;</code> | 显示位置,可取值 'top', 'middle', 'bottom' |
| type | <code>String</code> | <code>&#x27;info&#x27;</code> | 提示框类型, 可取值 'info', 'success', 'error', 'warning' |
| text | <code>String</code> |  | 提示信息内容, 也可以slot方式传入 |
| delay | <code>Number</code> | <code>3000</code> | 显示多长时间，单位 ms<毫秒> |
| isRemove | <code>Boolean</code> | <code>false</code> | 是否隐藏后移除dom |
| autoHide | <code>Boolean</code> | <code>false</code> | 是否自动隐藏 |

**Example**  
```js
// use it in module tools
 import Message from '@busy/message';
 Message.show('有新信息了');
 Message.info('有新信息了');
 Message.success('信息提交成功');
 Message.warning('内容包含非法词');

 // use it in html
 <script src="busy.min.js"><\/script>
 <link rel="stylesheet" href="Busy.min.css">
 Busy.Message.show('有新信息了');
 Busy.Message.info('有新信息了');
 Busy.Message.success('信息提交成功');
 Busy.Message.warning('内容包含非法词');
```

* [Message](#module_Message)
    * [.show(opts)](#module_Message.show) ⇒
    * [.info(text, opts)](#module_Message.info) ⇒
    * [.success(text, opts)](#module_Message.success) ⇒
    * [.warning(text, opts)](#module_Message.warning) ⇒
    * [.error(text, opts)](#module_Message.error) ⇒

<a name="module_Message.show"></a>

### Message.show(opts) ⇒
显示提示信息

**Kind**: static method of <code>[Message](#module_Message)</code>  
**Returns**: MessageClass实例  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置项, <a href="#module_Message">参考</a> |

**Example**  
```js
Busy.Message.show('有新信息了');
```
<a name="module_Message.info"></a>

### Message.info(text, opts) ⇒
显示提示信息

**Kind**: static method of <code>[Message](#module_Message)</code>  
**Returns**: MessageClass实例  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | 提示信息 |
| opts | <code>Object</code> | 配置项, <a href="#module_Message">参考</a> |

**Example**  
```js
Busy.Message.info('收到一个优惠券');
```
<a name="module_Message.success"></a>

### Message.success(text, opts) ⇒
显示成功提示信息

**Kind**: static method of <code>[Message](#module_Message)</code>  
**Returns**: MessageClass实例  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | 提示信息 |
| opts | <code>Object</code> | 配置项, <a href="#module_Message">参考</a> |

**Example**  
```js
Busy.Message.success('提交成功');
```
<a name="module_Message.warning"></a>

### Message.warning(text, opts) ⇒
显示警告信息

**Kind**: static method of <code>[Message](#module_Message)</code>  
**Returns**: MessageClass实例  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | 提示信息 |
| opts | <code>Object</code> | 配置项, <a href="#module_Message">参考</a> |

**Example**  
```js
Busy.Message.warning('内容包含非法词');
```
<a name="module_Message.error"></a>

### Message.error(text, opts) ⇒
显示错误信息

**Kind**: static method of <code>[Message](#module_Message)</code>  
**Returns**: MessageClass实例  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | 提示信息 |
| opts | <code>Object</code> | 配置项, <a href="#module_Message">参考</a> |

**Example**  
```js
Busy.Message.error('内容包含非法词');
```
<a name="module_Progress"></a>

## Progress
busy-progress

**Des**: 进度条组件  
**See**: [实例](../example/all/progress.html)  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>Number</code> | 环形组件直径大小,默认 100<px> |
| width | <code>Number</code> &#124; <code>String</code> | 线形组件长度,默认 100% |
| duration | <code>Number</code> | 动画持续时间<transition-duration>,默认值500<ms> |
| trackWidth | <code>Number</code> | 进度槽的宽度, 默认值5<px> |
| trackColor | <code>String</code> | 进度槽颜色, 取值范围 css color <hex, rgb, rgba> |
| barColor | <code>String</code> | 进度条颜色, 取值范围 css color <hex, rgb, rgba> |
| content | <code>String</code> | 显示内容, 默认'' |
| type | <code>String</code> | 进度条组件类型, 可取值 'line' [<busy-progress-line />], 'ring' [<busy-progress-ring />], 默认 'line' |

**Example**  
```js
<busy-progress type="ring" :size="50" :track-width="5"></busy-progress>
```
<a name="module_Spinner"></a>

## Spinner
spinner组件

**See**: [实例](../example/all/spinner.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>Number</code> | <code>0</code> | spinner动画类型,取值 0-6 |
| width | <code>Number</code> | <code>32</code> | spinner宽度 |
| height | <code>Number</code> | <code>32</code> | spinner高度 |
| color | <code>String</code> | <code>&quot;#ffffff&quot;</code> | spinner颜色, css color |
| size | <code>Number</code> | <code>50</code> | circle rotae直径 |
| strokeWidth | <code>Number</code> | <code>5</code> | circle rotate 描边宽度 |

**Example**  
```js
<busy-spinner :type="3" color="#666" :width="12"></busy-spinner>
```
<a name="module_Swipe"></a>

## Swipe
切换组件

**See**: [实例](../example/all/swipe.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| height | <code>Number</code> | <code>200</code> | 可视高度 |
| width | <code>Number</code> |  | 可视宽度 |
| defaultIndex | <code>Number</code> |  | 默认当前显示子项索引 |
| dotColor | <code>String</code> | <code>#666</code> | 切换点颜色, css color |
| curDotColor | <code>String</code> | <code>#fff</code> | 当前高亮切换点颜色, css color |
| dirType | <code>String</code> | <code>horizontal</code> | 切换方向，水平或者垂直 |
| showDotes | <code>Boolean</code> | <code>true</code> | 是否显示切换点 |
| autoPlay | <code>Boolean</code> | <code>false</code> | 是否自动播放 |
| interval | <code>Number</code> | <code>2000</code> | 自动播放间隔时间 毫秒 |

**Example**  
```js
<busy-swipe :interval="3000" :auto-play="true" :height="320">
     <busy-swipe__item>内容</busy-swipe__item>
     <busy-swipe__item>内容</busy-swipe__item>
</busy-swipe>
```
<a name="module_ToastLoading"></a>

## ToastLoading
页面toastloading组件 <busy-toast-loading />

**See**: [实例](../example/all/toast-loading.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| height | <code>Number</code> | <code>100</code> | 高度(px) |
| width | <code>Number</code> | <code>100</code> | 宽度(px) |
| color | <code>String</code> | <code>&#x27;#fff&#x27;</code> | spinner和文字颜色, css color |
| bgColor | <code>String</code> | <code>&#x27;rgba(0,0,0,0.6)&#x27;</code> | 背景色, css color |
| direction | <code>String</code> | <code>&#x27;column&#x27;</code> | spinner和文字排列方向, column 垂直方向, row 水平方向 |
| spinner | <code>Object</code> |  | 设置spinner格式 |
| text | <code>String</code> |  | loading文字 |

**Example**  
```js
//  use it in html
 <script src="busy.min.js"><\/script>
 <link rel="stylesheet" href="busy.min.css">

 Busy.ToastLoading.show();
 http.get('url').then(()=>{
   Busy.ToastLoading.hide();
 });

 // use it in module tools
 import ToastLoading from '@busy/toast-loading';
 ToastLoading.show({spinner:{type:2}, direction="row"});
 http.get('url').then(()=>{
   ToastLoading.hide();
 });
```

* [ToastLoading](#module_ToastLoading)
    * [.hide()](#module_ToastLoading.hide)
    * [.show(opts)](#module_ToastLoading.show) ⇒

<a name="module_ToastLoading.hide"></a>

### ToastLoading.hide()
隐藏loading

**Kind**: static method of <code>[ToastLoading](#module_ToastLoading)</code>  
<a name="module_ToastLoading.show"></a>

### ToastLoading.show(opts) ⇒
显示loading

**Kind**: static method of <code>[ToastLoading](#module_ToastLoading)</code>  
**Returns**: LoadingClass实例  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置信息, <a href="#module_Loading">参考</a> |

**Example**  
```js
Busy.ToastLoading.show();
```
<a name="module_Toast"></a>

## Toast
Toast组件 <busy-toast></busy-toast>

**See**: [实例](../example/all/toast.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opts | <code>Object</code> |  | 选项 可选{content:'显示内容', pos: '显示位置', delay: '显示多长时间隐藏', type: 'icon类型'} |
| content | <code>String</code> |  | 显示内容 |
| pos | <code>String</code> | <code>&#x27;middle&#x27;</code> | 显示位置,可以是 'top', 'middle', 'bottom' |
| delay | <code>Number</code> | <code>2000</code> | 显示时间，单位毫秒 |
| type | <code>String</code> |  | icon类型 |
| isShow | <code>Boolean</code> | <code>false</code> | 是否显示 |
| isRemove | <code>Boolean</code> | <code>false</code> | 是否隐藏移除dom |
| autoHide | <code>Boolean</code> | <code>true</code> | 是否自动隐藏 |
| iconHeight | <code>Number</code> | <code>28</code> | 设置图标的高度 |
| iconWidth | <code>Number</code> | <code>28</code> | 设置图标的宽度 |
| color | <code>Number</code> | <code>#fff</code> | 设置图标的颜色 |
| hide | <code>function</code> |  | 隐藏 |
| show | <code>function</code> |  | 显示 |
| hide | <code>Event</code> |  | 隐藏时触发 |
| show | <code>Event</code> |  | 显示时触发 |
| visiable-change | <code>Event</code> |  | 显示,隐藏都会触发 |
| after-leave | <code>Event</code> |  | 隐藏动画结束时触发 |

**Example**  
```js
// use it in module tools
  import Toast from '@busy/toast';
  1, Toast.show('内容')
  2, Toast.show('内容', 5000)
  3, Toast.show('内容', 'top', 5000)
  4, Toast.show({content:'内容', pos: 'top', delay: 5000})

  // use it in html
  <script src="busy.min.js"><\/script>
  <link href="busy.min.css" rel="stylesheet" />

  1, Busy.Toast.show('内容')
  2, Busy.Toast.show('内容', 5000)
  3, Busy.Toast.show('内容', 'top', 5000)
  4, Busy.Toast.show({content:'内容', pos: 'top', delay: 5000})
```

* [Toast](#module_Toast)
    * [.show(opts)](#module_Toast.show) ⇒
    * [.show(opts)](#module_Toast.show) ⇒

<a name="module_Toast.show"></a>

### Toast.show(opts) ⇒
**Kind**: static method of <code>[Toast](#module_Toast)</code>  
**Returns**: ToastClass实例  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置项, <a href="#module_Toast">参见</a> |

**Example**  
```js
Busy.Toast.show({content:'内容', pos: 'top', delay: 5000})
```
<a name="module_Toast.show"></a>

### Toast.show(opts) ⇒
**Kind**: static method of <code>[Toast](#module_Toast)</code>  
**Returns**: ToastClass实例  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | 配置项, <a href="#module_Toast">参见</a> |

**Example**  
```js
Busy.Toast.show({content:'内容', pos: 'top', delay: 5000})
```
<a name="enFormatNumberic"></a>

## enFormatNumberic(n)
千分位格式化

**Kind**: global function  

| Param | Type |
| --- | --- |
| n | <code>Number</code> | 

<a name="deFormatNumberic"></a>

## deFormatNumberic(n)
千分位化

**Kind**: global function  

| Param | Type |
| --- | --- |
| n | <code>String</code> | 

<a name="cmpUnit"></a>

## cmpUnit(u)
计算单位

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| u | <code>\*</code> | 传入单位 |

<a name="splitUnit"></a>

## splitUnit(u)
**Kind**: global function  

| Param | Type |
| --- | --- |
| u | <code>\*</code> | 

<a name="validateUnit"></a>

## validateUnit(u)
验证可用css单位

**Kind**: global function  

| Param | Type |
| --- | --- |
| u | <code>\*</code> | 

