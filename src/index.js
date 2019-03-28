import Border from '../packages/border/index.js'
import Toast from '../packages/toast/index.js';
import ToastLoading from '../packages/toast-loading/index.js';
import Loading from '../packages/loading/index.js';
import Icons from '../packages/icon/index.js';
import Flex from '../packages/layout/index.js';
import FlexBox from '../packages/flexbox/index.js';
import Button from '../packages/button/index.js';
import Field from '../packages/field/index.js';
import Checkbox from '../packages/checkbox/index.js';
import Popup from '../packages/popup/index.js';
import { Dialog, Alert, Confirm, Prompt } from '../packages/dialog/index.js';
import Mask from '../packages/mask/index.js';
import Spinner from '../packages/spinner/index.js';
import Picker from '../packages/picker/index.js';
import Message from '../packages/message/index.js';
import Progress from '../packages/progress/index.js';
import LoadMore from '../packages/loadmore/index.js';
import Swipe from '../packages/swipe/index.js';
import ActionSheet from '../packages/action-sheet/index.js';
import Input from '../packages/input/index.js';
import Switch from '../packages/switch/index.js';
import Select from '../packages/select/index.js';
import {List, ListItem, ListInputItem} from '../packages/list/index.js';


var install = function (vue) {
    vue.use(Border);
    vue.use(Toast);
    vue.use(Flex);
    vue.use(FlexBox);
    vue.use(Icons);
    vue.use(Button);
    vue.use(Field);
    vue.use(Checkbox);
    vue.use(Popup);
    vue.use(Dialog);
    vue.use(Alert);
    vue.use(Confirm);
    vue.use(Prompt);
    vue.use(Mask);
    vue.use(Picker);
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
    vue.prototype.$wui = Wui;
}


var Wui = {
    Border,
    install,
    Toast,
    ToastLoading,
    Loading,
    Icons,
    Flex,
    FlexBox,
    Button,
    Field,
    Checkbox,
    Popup,
    Dialog,
    Alert,
    Confirm,
    Prompt,
    Mask,
    Picker,
    Message,
    Progress,
    LoadMore,
    Swipe,
    ActionSheet,
    List,
    ListItem,
    ListInputItem,
    Input,
    Switch
}

if (window.Vue) {
    window.Vue.use(Wui);
}

export {
    install,
    Border,
    Toast,
    ToastLoading,
    Loading,
    Icons,
    Flex,
    FlexBox,
    Button,
    Field,
    Checkbox,
    Popup,
    Dialog,
    Alert,
    Confirm,
    Prompt,
    Mask,
    Picker,
    Message,
    Progress,
    LoadMore,
    Swipe,
    ActionSheet,
    List,
    ListItem,
    ListInputItem,
    Input,
    Switch
}

export default Wui;
