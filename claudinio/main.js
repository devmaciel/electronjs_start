'use strict';
//Requires
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

const Menu = electron.Menu;

const Tray = electron.Tray;
const iconPath = path.resolve('images/claudio.png');


//Window, tray
let win;
let tray = null;

//CREATE WINDOW FUNCTION
function createWindow(){
    win = new BrowserWindow({
        width: 400,
        maxWidth: 400,
        height: 400,
        maxHeight:400,
        maximizable: false,
        resizable: false,
        icon: __dirname + '/favicon.ico',
        webPreferences: {nodeIntegration: true}
    });

    win.loadURL(url.format({
        pathname: path.resolve('src/index.html'),
        protocol: 'file',
        slashes: true
    }));

    //DEV TOOLS (f12 chrome) Only for dev
    // win.webContents.openDevTools();
   
    win.on('closed', () => {
        win = null;
    })

}

//MENU
function menuFunc(){

    //Menu
    const template = [
        {
            label: 'Menu',
            submenu: [
                {label: 'Sair', role: 'quit' },
                
            ],
            accelerator: 'Alt + F4'
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}

//TRAY FUNCTION
function trayFunc(){
    //Tray icon
    tray = new Tray(iconPath);
    let template = [
        {
            label: 'Sair',
            role: 'quit'
        }
    ];

    const ctxMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(ctxMenu);
    tray.setToolTip('Olha o Minimapa');

    tray.on('click', function(e){
        if (win.isVisible()) {
          win.hide()
        } else {
          win.show()
        }
    });
    tray.setIgnoreDoubleClickEvents(true);
}


//READY
app.on('ready', () => {

    //create windows
    createWindow();

    //menu
    menuFunc();

    //tray
    trayFunc();

});

//Quit Program Window
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

//Create window Again, when browser are created
app.on('activate', () => {
    if(win === null) {
        createWindow();
    }
    
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});