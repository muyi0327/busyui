## Modules

<table>
  <thead>
    <tr>
      <th>Module</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#module_ActionSheet">ActionSheet</a></td>
    <td><p>ActionSheet框组件 <w-action-sheet /></p>
</td>
    </tr>
<tr>
    <td><a href="#module_Border1px">Border1px</a></td>
    <td><p>1像素边框样式</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Button">Button</a></td>
    <td><p>按钮组件 <w-button /></p>
</td>
    </tr>
<tr>
    <td><a href="#module_Checkbox">Checkbox</a></td>
    <td><p>勾选框  <w-checkbox /></p>
</td>
    </tr>
<tr>
    <td><a href="#module_Alert">Alert</a></td>
    <td><p>alert对话框组件</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Confirm">Confirm</a></td>
    <td><p>confirm对话框组件</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Dialog">Dialog</a></td>
    <td><p>对话框组件 <w-dialog /></p>
</td>
    </tr>
<tr>
    <td><a href="#module_Prompt">Prompt</a></td>
    <td><p>prompt对话框组件</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Field">Field</a></td>
    <td><p>编辑器</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Icon">Icon</a></td>
    <td><p>icon图标组件</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Cell">Cell</a></td>
    <td><p>单元组件 <w-cell></w-cell>, w-cell只能放在w-row或者w-row内</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Col">Col</a></td>
    <td><p>列组件 <w-col></w-col> w-col里面只能放w-cell</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Row">Row</a></td>
    <td><p>行组件 <w-row></w-row>, w-row里面只能放w-cell</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Loading">Loading</a></td>
    <td><p>loading component with mask</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Loadmore">Loadmore</a></td>
    <td><p>加载更多组件</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Mask">Mask</a></td>
    <td><p>半透明遮罩层 <w-mask></w-mask></p>
</td>
    </tr>
<tr>
    <td><a href="#module_Message">Message</a></td>
    <td><p>浮层提示信息组件 <w-message></w-message></p>
</td>
    </tr>
<tr>
    <td><a href="#module_Picker">Picker</a></td>
    <td><p>弹出层</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Popup">Popup</a></td>
    <td><p>弹出层 <a href="../example/all/popup.html"></a></p>
</td>
    </tr>
<tr>
    <td><a href="#module_Progress">Progress</a></td>
    <td><p>wui-progress</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Spinner">Spinner</a></td>
    <td><p>spinner组件</p>
</td>
    </tr>
<tr>
    <td><a href="#module_Swipe">Swipe</a></td>
    <td><p>切换组件</p>
</td>
    </tr>
<tr>
    <td><a href="#module_ToastLoading">ToastLoading</a></td>
    <td><p>页面toastloading组件 <w-toast-loading /></p>
</td>
    </tr>
<tr>
    <td><a href="#module_Toast">Toast</a></td>
    <td><p>Toast组件 <w-toast></w-toast></p>
</td>
    </tr>
</tbody>
</table>

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
ActionSheet框组件 <w-action-sheet />

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
import {ActionSheet} from 'wui/packages/action-sheet';

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

<w-action-sheet @visiable-change="visiableChange" :is-show="isShow" :actions="actions"></w-action-sheet>


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
             Wui.ActionSheet.show({
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
Wui.ActionSheet.show({actions:{text:'执行动作', action: function(){console.log('do something')}}})
```
<a name="module_ActionSheet.hide"></a>

### ActionSheet.hide()
**Kind**: static method of <code>[ActionSheet](#module_ActionSheet)</code>  
**Example**  
```js
Wui.ActionSheet.hide()
```
<a name="module_ActionSheet.isVisiable"></a>

### ActionSheet.isVisiable() ⇒ <code>Boolean</code>
判断actionsheet是否显示

**Kind**: static method of <code>[ActionSheet](#module_ActionSheet)</code>  
**Returns**: <code>Boolean</code> - - 是否显示  
**Example**  
```js
if （Wui.ActionSheet.isVisiable(){
    console.log('done something')
  }
```
<a name="module_Border1px"></a>

## Border1px
1像素边框样式

**See**: [实例](../example/all/border1px.html)  

| Param | Type | Description |
| --- | --- | --- |
| side | <code>String</code> | = '', 设置哪个边框, t=上,b=下,r=右,l=左, lr=左右,tb=上下,no-r=无右,no-l=无左,no-t=无上,no-b=无下 |

**Example**  
```js
<div class="wui-border-1px">四边框</div>

 <div class="wui-border-1px wui-border-t">上边框</div>

 <div class="wui-border-1px wui-border-b">下边框</div>

 <div class="wui-border-1px wui-border-tb">上下边框</div>

 <div class="wui-border-1px wui-border-l">左边框</div>

 <div class="wui-border-1px wui-border-r">右边框</div>

 <div class="wui-border-1px wui-border-lr">左右边框</div>

<div class="wui-border-1px wui-border-no-r">无右边框</div>

<div class="wui-border-1px wui-border-no-l">无左边框</div>

<div class="wui-border-1px wui-border-no-t">无上边框</div>

<div class="wui-border-1px wui-border-no-b">无下边框</div>

// 取值1~10px
<div class="wui-border-1px wui-border-radius-4px">圆角</div>

// 百分比圆角
<div class="wui-border-1px" style="border-radius: 50%;">圆角</div>
```
<a name="module_Button"></a>

## Button
按钮组件 <w-button />

**See**: [实例](../example/all/button.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> | <code>&quot;default&quot;</code> | 显示类型，接受 default, primary, highlight |
| nativeType | <code>string</code> | <code>&quot;button&quot;</code> | 按钮类型， button, reset, submit |
| disabled | <code>boolean</code> | <code>false</code> | 禁用 |
| plain | <code>boolean</code> | <code>false</code> | 镂空按钮 |
| block | <code>boolean</code> | <code>false</code> | 是否100%宽 |
| size | <code>string</code> | <code>&quot;normal&quot;</code> | 尺寸，接受 normal, small, large |
| sharp | <code>Boolean</code> | <code>false</code> | 是否尖角 |
| height | <code>Number</code> |  | 高度 |
| width | <code>Number</code> |  | 宽度 |
| slot | <code>String</code> |  | 显示文本 |
| bgColor | <code>String</code> |  | 按钮背景色 |
| fontColor | <code>String</code> |  | 字体颜色 |

**Example**  
```js
<w-button size="large" type="primary">按钮</w-button>

 <w-button size="small" type="highlight">删除</w-button>
```
<a name="module_Checkbox"></a>

## Checkbox
勾选框  <w-checkbox />

**See**: [实例](../example/all/checkbox.html)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | 显示在右侧的内容 |
| disabled | <code>boolean</code> | 是否禁用 |

**Example**  
```js
<w-checkbox v-model="checked" label="这个位置是标签1"></w-checkbox>
<w-checkbox v-model="disable" label="是否禁用下面的按钮"></w-checkbox>
```
<a name="module_Alert"></a>

## Alert
alert对话框组件

**See**: [实例](../example/all/dialog.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>String</code> |  | 显示信息 |
| height | <code>Number</code> | <code>140</code> | 组件高度 |
| width | <code>Number</code> | <code>240</code> | 组件高度 |

**Example**  
```js
// use it in html
<script src="wui.min.js"><\/script>
<link rel="stylesheet" href="wui.min.css" />

Wui.Alert.show('提交申请成功');

// use it in webpack or browserify, rollup
import {Alert} from 'wui/packages/dialog';
// var Aler = require('wui/packages/dialog/alert.js');

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
Wui.Alert.show('提交申请成功');
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
<script src="wui.min.js"><\/script>
<link rel="stylesheet" href="wui.min.css" />

Wui.Confirm.show('确定要提交吗？', (result)=>{if (result) {console.log('提交')}});

// use it in webpack or browserify, rollup
import {Confirm} from 'wui/packages/dialog';
// var Confirm = require('wui/packages/dialog/confirm.js');

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
const confirm = Wui.Confirm.show('确认要提交吗？', (rst)=>{if (rs) console.log('确认提交')});
confirm.doClose();
```
<a name="module_Dialog"></a>

## Dialog
对话框组件 <w-dialog />

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
import {Dialog} from 'wui/packages/dialog';

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
Wui.Dialog.show({content:'红包来了!',title:'发红包了'})
```
<a name="module_Prompt"></a>

## Prompt
prompt对话框组件

**See**: [实例](../example/all/dialog.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| placeholder | <code>String</code> |  | 提示信息 |
| height | <code>Number</code> | <code>140</code> | 组件高度 |
| width | <code>Number</code> | <code>260</code> | 组件高度 |

**Example**  
```js
// use it in html
<script src="wui.min.js"><\/script>
<link rel="stylesheet" href="wui.min.css" />

Wui.Prompt.show('请填写信息？', (val)=>{console.log(val)});

// use it in webpack or browserify, rollup
import {Prompt} from 'wui/packages/dialog';
// var Prompt = require('wui/packages/dialog/prompt.js');

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
const confirm = Wui.Prompt.show('请输入要跳转的网址', (url)=>{window.location = url});
prompt.doClose();
```
<a name="module_Field"></a>

## Field
编辑器

**See**: [实例](../example/all/field.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>String</code> | <code>&#x27;text&#x27;</code> | field 类型，接受 text, textarea 等 特殊:custom 在custom type下slot=custom生效,无input |
| label | <code>String</code> |  | 标签 |
| labelWidth | <code>String</code> &#124; <code>Number</code> |  | 标签 |
| lableAlign | <code>String</code> | <code>&#x27;center&#x27;</code> | label的对齐方式,见w-cell |
| lableVertical | <code>String</code> | <code>&#x27;middle&#x27;</code> | label的对齐方式,见w-cell |
| icon | <code>Object</code> |  | icon设置选项, w-icon |
| iconWidth | <code>Number</code> | <code>28</code> | icon容器宽度 |
| iconAlign | <code>String</code> | <code>&#x27;center&#x27;</code> | icon容器水平对齐方式,见w-cell |
| iconVertical | <code>String</code> | <code>&#x27;center&#x27;</code> | icon容器垂直对齐方式,见w-cell |
| rows | <code>String</code> |  | textarea 的 rows |
| placeholder | <code>String</code> |  | placeholder |
| disabled | <code>String</code> |  | 是否禁用 |
| readonly | <code>String</code> |  | 是否只读 |
| error | <code>String</code> |  | 是否发生错误,错误信息通过slot=error 来自定义 |
| attr | <code>Object</code> |  | 设置input, textarea原生属性 |
| enFormat | <code>function</code> |  | value格式化 |
| deFormat | <code>function</code> |  | value反格式化 |
| icon | <code>Slot</code> |  | right slot内容 |
| label | <code>Slot</code> |  | left slot内容 |
| content | <code>Slot</code> |  | center slot内容 |
| focus | <code>Event</code> |  | 触发focus事件 |
| blur | <code>Event</code> |  | 触发blur事件 |
| icon-click | <code>Event</code> |  | 点击icon区域触发 |
| label-click | <code>Event</code> |  | 点击label区域触发 |
| format | <code>String</code> |  | 内置格式化方法 numberic:千分位格式化，最多保留两位小数, bankcard:银行卡格式化, [[4,2,3], '-']:按分组格式化 xxxx-xx-xxx |

**Example**  
```js
<w-field v-model="value" label="用户名"></w-field>
 <w-field v-model="value" label="密码" placeholder="请输入密码"></w-field>
 <w-field v-model="value" label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></w-field>
 <w-field v-model="value" label="邮箱" placeholder="成功状态" state="success"></w-field>
```
<a name="module_Icon"></a>

## Icon
icon图标组件

**See**: [实例](../example/all/icons.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>String</code> |  | icon名称 |
| width | <code>Number</code> | <code>18</code> | 组件宽度 |
| height | <code>Number</code> | <code>18</code> | 组件高度 |
| fill | <code>String</code> | <code>&#x27;#fff&#x27;</code> | 组件颜色,css color |

**Example**  
```js
<w-icon type="guanbi" fill="#8a8a8a"></w-icon>
```
<a name="module_Cell"></a>

## Cell
单元组件 <w-cell></w-cell>, w-cell只能放在w-row或者w-row内

**See**: [实例](../example/all/flex.html)  

| Param | Default | Description |
| --- | --- | --- |
| width | <code>&#x27;auto&#x27;</code> | 列宽, 数字, 百分比, auto |
| height | <code>&#x27;auto&#x27;</code> | 列高, 数字, 百分比, auto |
| align | <code>&#x27;left&#x27;</code> | 水平对齐, left 居左, right 居右, center 居中, between 等间距, around |
| vertical | <code>&#x27;middle&#x27;</code> | 垂直对齐, top 居顶, bottom 居底, middle 居中, between 等间距, around, stretch |

**Example**  
```js
<w-row>
     <w-cell :width="90">手机号</w-cell>
     <w-cell><input type="number" name="phone" placehoder="请填写手机号码"></w-cell>
     <w-cell :width="40"><w-icon type＝"fankui"></w-icon></w-cell>
</w-row>
```
<a name="module_Cell.computed"></a>

### Cell.computed
TODO 视情况处理flexGrow

**Kind**: static property of <code>[Cell](#module_Cell)</code>  
<a name="module_Col"></a>

## Col
列组件 <w-col></w-col> w-col里面只能放w-cell

**See**: [实例](../example/all/flex.html)  

| Param | Default | Description |
| --- | --- | --- |
| width | <code>&#x27;auto&#x27;</code> | 列宽, 数字, 百分比, auto |
| direction | <code>&#x27;column&#x27;</code> | 方向, 'normal' flex-direction: column, 'reverse' flex-direction: column-reverse; |

**Example**  
```js
<w-row>
     <w-cell :width="90">手机号</w-cell>
     <w-cell>
         <w-col>
             <w-cell><input type="number" name="phone" placehoder="请填写手机号码"></w-cell>
             <w-cell>请填写正确手机号码，确保能收到验证短信</w-cell>
         </w-col>
     </w-cell>
     <w-cell :width="40"><w-icon type＝"fankui"></w-icon></w-cell>
</w-row>
```
<a name="module_Row"></a>

## Row
行组件 <w-row></w-row>, w-row里面只能放w-cell

**See**: [实例](../example/all/flex.html)  

| Param | Default | Description |
| --- | --- | --- |
| height | <code>&#x27;auto&#x27;</code> | 列高, 数字, 百分比, auto |
| isItems | <code>false</code> | 是否flex-item |
| direction | <code>&#x27;row&#x27;</code> | 方向, 'row' -> flex-direction: row, 'reverse' -> flex-direction: row-reverse; |

**Example**  
```js
<w-row>
     <w-cell :width="90">手机号</w-cell>
     <w-cell>
         <w-col>
             <w-cell><input type="number" name="phone" placehoder="请填写手机号码"></w-cell>
             <w-cell>请填写正确手机号码，确保能收到验证短信</w-cell>
         </w-col>
     </w-cell>
     <w-cell :width="40"><w-icon type＝"fankui"></w-icon></w-cell>
</w-row>
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
<w-loading>正在加载...</w-loading>
```
<a name="module_Loadmore"></a>

## Loadmore
加载更多组件

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
<w-loadmore>content list</w-loadmore>
```
<a name="module_Mask"></a>

## Mask
半透明遮罩层 <w-mask></w-mask>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| color | <code>String</code> | <code>rgba(0,0,0,</code> | 0.6) - 遮罩颜色, css color |
| isRemove | <code>Boolean</code> | <code>false</code> | 是否隐藏动画完成从dom中清除 |
| isShow | <code>Boolean</code> | <code>false</code> | 显示隐藏 |

**Example**  
```js
<w-mask color="yellow"></mask>
```
<a name="module_Message"></a>

## Message
浮层提示信息组件 <w-message></w-message>

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
 import Message from 'wui/packages/message';
 Message.show('有新信息了');
 Message.info('有新信息了');
 Message.success('信息提交成功');
 Message.warning('内容包含非法词');

 // use it in html
 <script src="wui.min.js"><\/script>
 <link rel="stylesheet" href="wui.min.css">
 Wui.Message.show('有新信息了');
 Wui.Message.info('有新信息了');
 Wui.Message.success('信息提交成功');
 Wui.Message.warning('内容包含非法词');
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
Wui.Message.show('有新信息了');
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
Wui.Message.info('收到一个优惠券');
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
Wui.Message.success('提交成功');
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
Wui.Message.warning('内容包含非法词');
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
Wui.Message.error('内容包含非法词');
```
<a name="module_Picker"></a>

## Picker
弹出层

**See**: [实例](../example/all/picker.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| show | <code>Boolean</code> |  | 显示模态背景 |
| options | <code>Array</code> |  | 下拉列表的数据源 |
| visibleCount | <code>Number</code> | <code>3</code> | 展示数 |
| showCancelButton | <code>Boolean</code> |  | 展示取消按钮 |
| showConfirmButton | <code>Boolean</code> |  | 展示确认按钮 |
| cancelButtonText | <code>String</code> | <code>&#x27;取消&#x27;</code> | 取消按钮的显示 |
| confirmButtonText | <code>String</code> | <code>&#x27;确认&#x27;</code> | 确认按钮的显示,默认 确认 |
| buttonsPosition＝'button' | <code>String</code> |  | 按钮组的位置[button,top];现在暂不支持top |
| select | <code>function</code> |  | 选择回调,回调参数(下标,值,对象(原始)) |
| hide | <code>function</code> |  |  |

**Example**  
```js
<w-picker v-model="pickValue" :show="popupVisible" @select="onItemSelect" :options="items" @hide="popupVisible= arguments[0]"></w-picker>
     <w-picker v-model="pickValue2" :show="popupVisible2" @select="onItemSelect2" :options="items2" @hide="popupVisible2= arguments[0]"></w-picker>
     <w-picker :show="popupVisible3" @select="onItemSelect3" :options="items3" @hide="popupVisible3= arguments[0]"></w-picker>
     <w-picker :show="popupVisible4" @select="onItemSelect4" :options="items4" :visibleCount="5" @hide="popupVisible4= arguments[0]"></w-picker>
```
<a name="module_Popup"></a>

## Popup
弹出层 <a href="../example/all/popup.html"></a>

**See**: [实例](../example/all/popup.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| modal | <code>bool</code> | <code>true</code> | 显示模态背景 |
| closeOnClickModal | <code>bool</code> |  | 点击模态背景时是否关闭popup |
| popupTransition | <code>string</code> |  | 效果,目前只有popup-slide,为默认 |
| position | <code>string</code> |  | popup位置,目前只有bottom |

**Example**  
```js
<w-popup v-model="popupShow" position="bottom"></w-popup>
 <w-popup v-model="popup2Show" position="bottom" :modal="false"></w-popup>
 <w-popup v-model="popup3Show" :closeOnClickModal="false"></w-popup>
```
<a name="module_Progress"></a>

## Progress
wui-progress

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
| type | <code>String</code> | 进度条组件类型, 可取值 'line' [<w-progress-line />], 'ring' [<w-progress-ring />], 默认 'line' |

**Example**  
```js
<w-progress type="ring" :size="50" :track-width="5"></w-progress>
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
<w-spinner :type="3" color="#666" :width="12"></w-spinner>
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
<w-swipe :interval="3000" :auto-play="true" :height="320">
     <w-swipte-item>内容</w-swipe-item>
     <w-swipte-item>内容</w-swipe-item>
</w-swipe>
```
<a name="module_ToastLoading"></a>

## ToastLoading
页面toastloading组件 <w-toast-loading />

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
 <script src="wui.min.js"><\/script>
 <link rel="stylesheet" href="wui.min.css">

 Wui.ToastLoading.show();
 http.get('url').then(()=>{
   Wui.ToastLoading.hide();
 });

 // use it in module tools
 import ToastLoading from 'wui/packages/toast-loading';
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
Wui.ToastLoading.show();
```
<a name="module_Toast"></a>

## Toast
Toast组件 <w-toast></w-toast>

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
  import Toast from 'wui/packages/toast';
  1, Toast.show('内容')
  2, Toast.show('内容', 5000)
  3, Toast.show('内容', 'top', 5000)
  4, Toast.show({content:'内容', pos: 'top', delay: 5000})

  // use it in html
  <script src="wui.min.js"><\/script>
  <link href="wui.min.css" rel="stylesheet" />

  1, Wui.Toast.show('内容')
  2, Wui.Toast.show('内容', 5000)
  3, Wui.Toast.show('内容', 'top', 5000)
  4, Wui.Toast.show({content:'内容', pos: 'top', delay: 5000})
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
Wui.Toast.show({content:'内容', pos: 'top', delay: 5000})
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

