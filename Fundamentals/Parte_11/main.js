//Project Index

//Requires
const electron = require("electron");
const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
const path = require('path');
// const url = require('url');

const Menu = electron.Menu;

const Tray = electron.Tray;
const iconPath = path.join(__dirname, 'claudio.png');

//Tray
let tray = null; 

//System Tray, windows ocult icons etc.
app.on('ready', function(){
    tray = new Tray(iconPath);

    let template = [
        {
            label: 'Audio',
            submenu: [
                {
                    label: 'Low',
                    type: 'radio',
                    checked: true
                },
                {
                    label: 'High',
                    type: 'radio'
                }
            ]
        },

        {
            label: 'Video',
            submenu: [
                {
                    label: '1280x720',
                    type: 'radio',
                    checked: true
                },
                {
                    label: '1920x1080',
                    type: 'radio'
                }
            ]
        }
    ];

    const ctxMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(ctxMenu);
    tray.setToolTip('Tray Application');

});



//Quit Program Window
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})
