const openBtn = document.getElementById('openBtn');
const shell = require('electron').shell

openBtn.addEventListener('click', () => {
    //open some file in any folder, just need the path/url in your pc
    //some functions are deprecated, openPath in 2020 runs OK
    
    // shell.showItemInFolder('E:\\ElectronFolder\\demo.txt');
    // shell.openItem('E:\\ElectronFolder\\demo.txt');
    // shell.openExternal('https://www.electronjs.org');

    //this path doesn't exist in my PC, its just lesson exemple
    shell.openPath('E:\\ElectronFolder\\demo.txt');
});