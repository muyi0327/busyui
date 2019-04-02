# bee-dialog
bee-dialog <w-dialog /> is a mobile dialog component for bee library

## Installation

First, install bee-dialog from wanda npm

    npm install bee-dialog --save -d  or npm install bee --save -d

Then use it:

    import BeeDialog from '@bee/dialog';

    // alert
    BeeDialog.Aler.show('submit sccess!');

    // confirm
    BeeDialog.Confirm.show('submit?', function(rst){
        console.log(rst); // true or false
    });

Or use it in html:

    <script src = 'node_modules/bee/dist/bee.min.js'></script>
    <link rel="stylesheet" href="node_modules/bee/dist/bee.min.css" />

    // alert
    Bee.Alert.show('submit sccess!');

    // prompt
    Bee.Prompt.show('your name?', function(name){
        console.log(name); // prompt info
    });

## options

The arguments form method show of components Bee.Dialog, Bee.Alert, Bee.Confirm, Bee.Prompt

    Bee.Dialog.show(options);

    Bee.Alert.show([text,]options);

    Bee.Confirm.show([text,]options, callback);

    Bee.Prompt.show([text,]options, callback);

# License

MIT
