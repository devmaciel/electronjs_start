const fs = require('fs'); //filesystem module
const path = require('path'); //pathfilesystem

//Get Element ID
btnCreate = document.getElementById('btnCreate');
btnRead = document.getElementById('btnRead');
btnDelete = document.getElementById('btnDelete');
fileName = document.getElementById('fileName');
fileContents = document.getElementById('fileContents');

//Files
let pathName = path.resolve('Files');

//----------Events
//Create
btnCreate.addEventListener('click', () => {

    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;

    fs.writeFile(file, contents, (err) => {
        if(err){
            return console.log(err)
        }

        console.log("The file was created");
    })
});

//Read
btnRead.addEventListener('click', () => {

    let file = path.join(pathName, fileName.value);

    fs.readFile(file, (err, data) => {
        if(err){
            return console.log(err)
        }

        fileContents.value = data;
        console.log("The file was read");
    })
});

//Update
// you read the file, and change de value and "create" again.

//Delete
btnDelete.addEventListener('click', () => {

    let file = path.join(pathName, fileName.value);

    fs.unlink(file, (err) => {
        if(err){
            return console.log(err)
        }

        fileName.value = '';
        fileContents.value = '';
        console.log("The file was deleted");
    })
});
