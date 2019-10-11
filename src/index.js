import './style/animate.scss'
import Border from '../packages/border/index.js'
import Toast from '../packages/toast/index.js'
import ToastLoading from '../packages/toast-loading/index.js'
import Loading from '../packages/loading/index.js'
import Icon from '../packages/icon/index.js'
import { FlexBox, FlexItem } from '../packages/flexbox/index.js'
import Button from '../packages/button/index.js'
import Checkbox from '../packages/checkbox/index.js'
import Radio from '../packages/radio/index.js'
import Picker from '../packages/picker/index.js'
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

import { libraryName } from './config'

var install = function (vue) {
    vue.use(Border)
    vue.use(Toast)
    vue.use(FlexBox)
    vue.use(FlexItem)
    vue.use(Icon)
    vue.use(Button)
    vue.use(Checkbox)
    vue.use(Radio)
    vue.use(Picker);
    vue.use(Dialog);
    vue.use(Alert);
    vue.use(Confirm);
    vue.use(Prompt);
    vue.use(Mask);
    vue.use(Spinner);
    vue.use(ToastLoading);
    vue.use(Message);
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
    vue.prototype[`$${libraryName}`] = ALL;
}

var ALL = {
    Border,
    install,
    Toast,
    ToastLoading,
    Loading,
    Icon,
    FlexBox,
    FlexItem,
    Button,
    Checkbox,
    Radio,
    Picker,
    Dialog,
    Alert,
    Confirm,
    Prompt,
    Mask,
    Message,
    Progress,
    LoadMore,
    Swipe,
    ActionSheet,
    List,
    ListItem,
    Input,
    Switch,
    Select
}

if (window && window.Vue) {
    window.Vue.use(ALL);
}

export {
    Border,
    install,
    Toast,
    ToastLoading,
    Loading,
    Icon,
    FlexBox,
    FlexItem,
    Button,
    Checkbox,
    Picker,
    Dialog,
    Alert,
    Confirm,
    Prompt,
    Mask,
    Message,
    Progress,
    LoadMore,
    Swipe,
    ActionSheet,
    List,
    ListItem,
    Input,
    Switch,
    Select
}

export default ALL
