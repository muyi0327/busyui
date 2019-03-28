# wui-dialog
wui-dialog <w-dialog /> is a mobile dialog component for wui library

## Installation

First, install wui-dialog from wanda npm

    npm install wui-dialog --save -d  or npm install wui --save -d

Then use it:

    import WuiDialog from 'wui-dialog';

    // alert
    WuiDialog.Aler.show('submit sccess!');

    // confirm
    WuiDialog.Confirm.show('submit?', function(rst){
        console.log(rst); // true or false
    });

Or use it in html:

    <script src = 'node_modules/wui/dist/wui.min.js'></script>
    <link rel="stylesheet" href="node_modules/wui/dist/wui.min.css" />

    // alert
    Wui.Alert.show('submit sccess!');

    // prompt
    Wui.Prompt.show('your name?', function(name){
        console.log(name); // prompt info
    });

## options

The arguments form method show of components Wui.Dialog, Wui.Alert, Wui.Confirm, Wui.Prompt

    Wui.Dialog.show(options);

    Wui.Alert.show([text,]options);

    Wui.Confirm.show([text,]options, callback);

    Wui.Prompt.show([text,]options, callback);

# License

MIT