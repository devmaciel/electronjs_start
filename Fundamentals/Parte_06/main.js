//Project Index

//Requires
const electron = require("electron");
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

//ipc
const ipc = electron.ipcMain;
const dialog = electron.dialog;

//Window 
let win;

function createWindow(){
    
    win = new BrowserWindow({width:800, height: 600, webPreferences:{nodeIntegration: true, enableRemoteModule: true}});
    win.loadURL(url.format({
        pathname: path.resolve('index.html'),
        protocol: 'file',
        slashes: true
    }));

    //DEV TOOLS
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });

    //IPC Lesson(OLD)
    // ipc.on('open-error-dialog', function(event){
    //     dialog.showErrorBox('An error message', 'Demo Body of an error message');
    // });

    const options = {
        type: 'error',
        title: 'Error',
        message: 'An error message',
        detail: 'Demo Body of an error message',
      };
      

    // ASYNC
    // ipc.on('open-error-dialog', function(event){
    ipc.on('async-message', function(event){
        dialog.showMessageBox(null, options, (response) => {
            console.log(response);
        });

        // event.sender.send('opened-error-dialog', 'Main Process opened error dialog');
        event.sender.send('async-reply', 'Main Process opened error dialog');
    });

    //SYNC
    ipc.on('sync-message', function(event){
        dialog.showMessageBox(null, options, (response) => {
            console.log(response);
        });

        event.returnValue = 'sync-reply';
    });



    win.on('closed', () => {
        win = null;
    });

    win.once('ready-to-show', () => {
        win.show();
    });

}

//Create Window
// app.on('ready', createWindow);
app.whenReady().then(createWindow);

//Quit Program Window
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})

//Create window Again, when browser are created MAC
app.on('activate', () => {
    if(win === null) {
        createWindow();
    }
})