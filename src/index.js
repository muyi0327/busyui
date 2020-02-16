
import Border from '../packages/border/index.js'
import Toast from '../packages/toast/index.js'
import ToastLoading from '../packages/toast-loading/index.js'
import Loading from '../packages/loading/index.js'
import Icon from '../packages/icon/index.js'
import { FlexBox, FlexItem } from '../packages/flexbox/index.js'
import Button from '../packages/button/index.js'
import { Checkbox, CheckboxList } from '../packages/checkbox/index.js'
import Radio from '../packages/radio/index.js'
import { Picker, PickerWheel } from '../packages/picker/index.js'
import { Dialog, Alert, Confirm, Prompt } from '../packages/dialog/index.js'
import Mask from '../packages/mask/index.js'
import Spinner from '../packages/spinner/index.js'
import Message from '../packages/message/index.js'
import Progress from '../packages/progress/index.js'
import LoadMore from '../packages/loadmore/index.js'
import Swipe from '../packages/swipe/index.js'
import ActionSheet from '../packages/action-sheet/index.js'
import Input from '../packages/input/index.js'
import Switch from '../packages/switch/index.js'
import Select from '../packages/select/index.js'
import { Segment, SegmentItem } from '../packages/segment/index.js'
import { List, ListItem } from '../packages/list/index.js'
import * as config from './config'

const install = (vue) => {
    vue.use(Mask)
    vue.use(Button)
    vue.use(Icon)
    vue.use(Toast)
    vue.use(ToastLoading)
    vue.use(Loading)
    vue.use(FlexBox)
    vue.use(Checkbox)
    vue.use(CheckboxList)
    vue.use(Radio)
    vue.use(PickerWheel)
    vue.use(Picker)
    vue.use(Dialog)
    vue.use(Alert)
    vue.use(Prompt)
    vue.use(Confirm)
    vue.use(Spinner)
    vue.use(Message)
    vue.use(Progress)
    vue.use(LoadMore)
    vue.use(Swipe)
    vue.use(ActionSheet)
    vue.use(Input)
    vue.use(Switch)
    vue.use(Select)
    vue.use(Segment)
    vue.use(List)
    vue.use(Border)
    vue.prototype[`$${config.libraryName}`] = All
}

const All = {
    install,
    Mask,
    Button,
    Icon,
    Toast,
    ToastLoading,
    Loading,
    FlexBox,
    FlexItem,
    Checkbox,
    CheckboxList,
    Radio,
    Picker,
    Dialog,
    Alert,
    Prompt,
    Confirm,
    Spinner,
    Message,
    Progress,
    LoadMore,
    Swipe,
    ActionSheet,
    Input,
    Switch,
    Select,
    Segment,
    SegmentItem,
    ListItem,
    List
}

if (window.Vue) {
    window.Vue.use(All)
}

if (window) {
    window[config.globalName] = All
}

export {

}

export default All
