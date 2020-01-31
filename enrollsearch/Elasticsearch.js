/* == Imports == */
var AWS = require('aws-sdk');
var path = require('path');
/* == Globals ==*/
var esDomain = {
    region: 'eu-west-1',
    endpoint: 'https://search-autonoma-ppok3pjkdkyot3qzdevrliytye.eu-west-1.es.amazonaws.com',
    index: 'autonoma',
    doctype: '_doc'
};
var endpoint = new AWS.Endpoint(esDomain.endpoint);
var creds = new AWS.EnvironmentCredentials('AWS');

//funcio per gestionar les peticions a FQS
async function elastic(text, context) {//intentRequest, context) {
    
   // console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    //const slots = intentRequest.currentIntent.slots;
    //const preposition = slots.Preposition;
  //const perm = slots.perm;
    //const question = slots.question;
    //const verb = slots.verb;
    //const credits = slots.credits;
    console.log(`request received: ${text}`);
    //var contenttest = "Error";
    var resl='ERROR';
    
    
    const promise = new Promise(function(resolve,reject){
        setTimeout(function(){
           /* if(preposition != null)
            {*/
                try{
                    const resp =  getToES(context,text);//preposition,verb);
                    console.log(resp);
                    console.log("resp is "+ typeof(resp));
                    resl=resp;
                }catch(err){
                    return console.log(err.message);
                }
           /* }
            else{
                if(question != null)
                {
                   try{
                        const resp =  getToES(context,question,verb);
                        console.log("resposta " + resp);
                        resl=resp;
                    }catch(err){
                        return console.log(err.message);
                    }
                }
                else{
                    try{
                        const resp =  getToES(context,verb,credits);
                        console.log("resposta " + resp);
                        resl=resp;
                    }catch(err){
                        return console.log(err.message);
                    }
                }
            }*/
             resolve(resl);
        }, 1000);
        
    });
    return promise;
}
module.exports = elastic;

//funcio per enviar les cerques a ElasticSearch i que es respongui el GET "FUNCIONA"
function getToES(context, text){//val1, val2) {
    var req = new AWS.HttpRequest(endpoint);
    var res, rel;
    
    req.method = 'GET';
    req.path = path.join('/', esDomain.index,'/', esDomain.doctype,'/_search?q="',text,'"');//val1,'"&q="', val2,'"');
    req.region = esDomain.region;
    req.headers['Content-Type'] = "aplication/json";
    req.headers['Host'] = endpoint.host;
    req.body = '';//doc;

    var signer = new AWS.Signers.V4(req , 'es');  // es: service code
    signer.addAuthorization(creds, new Date());

    var send = new AWS.NodeHttpClient();
    const promise = new Promise(function(resolve,reject){
        setTimeout(function(){
            send.handleRequest(req, null, function(httpResp) {
            var respBody = '';
            httpResp.on('data', function (chunk) {
                respBody += chunk;
                //res += chunk;
            });
            httpResp.on('end', function (chunk) {
                console.log('Response: ' + respBody);
                if(respBody){
                    res=JSON.parse(respBody);
                }
                rel = res.hits.hits[0];
                console.log("hi: "+ rel);
                resolve(rel);
            });
            }, function(err) {
                console.log('Error: ' + err);
                context.fail('Lambda failed with error ' + err);
                reject(new Error('ERROR'));
            });
        }, 1000);
    });
    return promise;
}
