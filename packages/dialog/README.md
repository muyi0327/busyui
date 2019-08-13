# Dialog
Dialog is a mobile dialog component for library

## Installation

First, install busyuifrom by npm

    npm install busyui --save -d  or npm install busyui --save -d

Then use it:

    import BusyDialog from '@busyui/dialog';

    // alert
    BusyDialog.Aler.show('submit sccess!');

    // confirm
    BusyDialog.Confirm.show('submit?', function(rst){
        console.log(rst); // true or false
    });

Or use it in html:

    <script src = 'node_modules/busy/dist/busyui.js'></script>
    <link rel="stylesheet" href="node_modules/busy/dist/busyui.css" />

    // alert
    Busy.Alert.show('submit sccess!');

    // prompt
    Busy.Prompt.show('your name?', function(name){
        console.log(name); // prompt info
    });

## options

The arguments form method show of components Busy.Dialog, Busy.Alert, Busy.Confirm, Busy.Prompt

    Busy.Dialog.show(options);

    Busy.Alert.show([text,]options);

    Busy.Confirm.show([text,]options, callback);

    Busy.Prompt.show([text,]options, callback);

# License

MIT
