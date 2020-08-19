console.log('Renderer 1')

// const BrowserWindow = require('electron').remote.BrowserWindow;
const { BrowserWindow } = require('electron').remote;
const path = require('path');
const url = require('url');

const newWindowBtn = document.getElementById('newWindowBtn');

newWindowBtn.addEventListener('click', function(event){
    let winThree = new BrowserWindow({
        webPreferences: {
            width: 800,
            height: 600,
            nodeIntegration: true //false or true with use node
        }
    });

    winThree.loadURL(url.format({
        pathname: path.join(__dirname, 'three.html'),
        protocol: 'file',
        slashes: true
    }));

    winThree.webContents.openDevTools();
});