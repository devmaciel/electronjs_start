//Essa API cada vez que abre a janela, vai criar uma random quote
//com setInterval vai mudando a cada 5segundos.
//praticamente um texto aleatório que injeta do div de id="quote"

let request = require('request');

setInterval(function(){
    request("URL_DA_API_QUOTE", function(err, response, body){
        let bodyJson = JSON.parte(body);
        let randomQuote = bodyJson[0]['content'];
    
        document.getElementById("quote").innerHTML = randomQuote;
    });
}, 5000);