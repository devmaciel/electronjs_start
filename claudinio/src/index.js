'use strict';
// console.log('funcionando');

//Element
var audioID = document.getElementById('audioID');
var interval = document.getElementById('interval');

//20s
var maxInterval = 20000;
// var maxInterval = (interval.value) * 1000;

var timer = setInterval(() => {
    // audioID.play();
    // interval.addEventListener("change", () => {
    //     maxInterval = (interval.value) * 1000;
    //     console.log(maxInterval);

    //     // return maxInterval;
    // });

    audioID.play();

}, maxInterval);



