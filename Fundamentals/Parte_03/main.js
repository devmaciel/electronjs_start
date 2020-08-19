//Project Index

//Requires
const electron = require("electron");
// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

//Window (2janelas agoras)
let winOne; 
let winTwo; 
function createWindow(){
    // win = new BrowserWindow();
    winOne = new BrowserWindow({
        webPreferences: {
            width: 800,
            height: 600,
            nativeWindowOpen: true,
            enableRemoteModule: true,
            nodeIntegration: true //false or true with use node
        }
    });

    winTwo = new BrowserWindow({
        webPreferences: {
            width: 800,
            height: 600,
            nodeIntegration: false //false or true with use node
        }
    });


    winOne.loadURL(url.format({
        pathname: path.join(__dirname, 'one.html'),
        protocol: 'file',
        slashes: true
    }));

    winTwo.loadURL(url.format({
        pathname: path.join(__dirname, 'two.html'),
        protocol: 'file',
        slashes: true
    }));


    //DEV TOOLS (f12 chrome)
    winOne.webContents.openDevTools();
    winTwo.webContents.openDevTools();

    winOne.on('closed', () => {
        win = null;
    });

    winTwo.on('closed', () => {
        win = null;
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