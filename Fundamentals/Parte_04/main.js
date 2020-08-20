//Project Index

//Requires
const electron = require("electron");
// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

//Window 
let win, dimWindow, colorWindow, framelessWindow; 
let parentWindow, childWindow;

function createWindow(){
    
    // win = new BrowserWindow();
    // dimWindow = new BrowserWindow({width:400,height:400,maxWidth:600,maxHeight:600});
    // colorWindow = new BrowserWindow({backgroundColor: '#228b22'});
    // framelessWindow = new BrowserWindow({backgroundColor: '#800000', frame: false});


    //Child sempre Z-Index na frente da janela, igaul aquelas como
    //propriedades do windows, sao childs window;
    //Modal é preciso usar a child so fechando a child pra usar a parent.
    parent = new BrowserWindow({title: 'Parent'});
    childWindow = new BrowserWindow({show: false, title: 'Child', parent: parentWindow, modal: true});
    childWindow.loadURL('https://github.com/joomaciiel/electronjs_start'); //carrega url externa
    childWindow.once('ready-to-show', () => { //quando estiver carregado, finally mostra a janela
        childWindow.show();
    })


    
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