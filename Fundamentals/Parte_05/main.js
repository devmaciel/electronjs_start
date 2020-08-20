//Project Index

//Requires
const electron = require("electron");
// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

//Window 
let win;

function createWindow(){
    
    win = new BrowserWindow({height:150,width:500,frame:false,show:false});
    win.loadURL(url.format({
        pathname: path.resolve('index.html'),
        protocol: 'file',
        slashes: true
    }));

    // DEV TOOLS
    // win.webContents.openDevTools();
    // win.on('closed', () => {
    //     win = null;
    // });

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