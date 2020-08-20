//Requires
const electron = require('electron');
const ipc = electron.ipcRenderer;

const asyncBtn = document.getElementById('asyncBtn');
const syncBtn = document.getElementById('syncBtn');

//Async Message
asyncBtn.addEventListener('click', function() {
    // ipc.send('open-error-dialog');
    console.log('async msg 1');
    ipc.send('async-message');
    console.log('async msg 2');
});

//Sync Message
syncBtn.addEventListener('click', function() {
    // ipc.send('open-error-dialog');
    console.log('sync msg 1');
    const reply = ipc.sendSync('sync-message');
    console.log(reply);
    console.log('sync msg 2');
});

// ipc.on('opened-error-dialog', function(event, arg){
ipc.on('async-reply', function(event, arg){
    console.log(arg);
});

ipc.on('sync-reply', function(event, arg){
    console.log(arg);
});


//REMOTE (window renderer process)
const BrowserWindow = electron.remote.BrowserWindow;
let win = new BrowserWindow({enableRemoteModule: true});
win.loadURL('https://github.com/joomaciiel/electronjs_start/tree/master/Fundamentals');