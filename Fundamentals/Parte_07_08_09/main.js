//Project Index

//Requires
const electron = require("electron");
const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const url = require('url');
const { create } = require("domain");

//Menu
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
//GlobalShortcut
// const GlobalShortcut = electron.GlobalShortcut;

//Window 
let win;

function createWindow(){
    
    win = new BrowserWindow({width:800, height: 600, webPreferences:{nodeIntegration: true}});
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

    //Configs
    win.on('closed', () => {
        win = null;
    });

    win.once('ready-to-show', () => {
        win.show();
    });

}

//Create Window (MENU)
// app.whenReady().then(createWindow);
app.on('ready', function(){
    createWindow();

    //Menu Part07
    const template = [
        //roles (first menu example) key shortcuts and submenu with style, electron native
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' }
            ]
        },

        //first menu
        {
            label: 'demo',
            //submenu [{}]
            submenu: [
                //submenu1
                {
                    label: 'submenu1',
                    click: function(){
                        console.log('Clicked submenu1');
                    }
                },

                //separator submenu
                {
                    type: 'separator'
                },

                //submenu2
                {
                    label: 'submenu2'
                }
            ],
        },

        //second menu
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About electron',
                    click: function(){
                        //open external link on menu
                        electron.shell.openExternal('https://www.electronjs.org');
                    },
                    accelerator: 'CmdOrCtrl + Shift + H'
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    //Menu Part08 (right click)
    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem({
        label: 'Hello',
        click: function(){
            console.log('context menu item clicked');
        }
    }));
    ctxMenu.append(new MenuItem({ role: 'selectall' }));

    win.webContents.on('context-menu', function(event, params){
        ctxMenu.popup(win, params.x, params.y);
    });

    //globalshortcut, windows not focus
    globalShortcut.register('Alt+1', () => {
        win.show();
    });


});

//GlobalShortcut Desative on Program Quit
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
})

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