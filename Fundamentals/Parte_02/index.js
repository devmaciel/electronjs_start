//Project Index

//Requires
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const { create } = require("domain");

//Window
let win; 
function createWindow(){
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    //DEV TOOLS (f12 chrome)
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    })

    win.on('closed', () => {
        win = null;
    });
}

//Create Window
app.on('ready', createWindow);

//Quit Program Window
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})

//Create window Again, when browser are created
app.on('activate', () => {
    if(win === null) {
        createWindow();
    }
})