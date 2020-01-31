'use strict';
const elastic = require('./Elasticsearch.js');
const lex = require('./Lex.js');
const rp = require('request-promise');
const TELEGRAM_TOKEN = '1029955190:AAF9dSsVz6kjHs09sGcg6w_NsHHpsyBEITA';
//var telegramHandler =require('lambda-telegram-bot-handler');

function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

exports.handler = function(event, context, callback){
   try {
        dispatch(event,
            (response) => {
                callback(null, response);
            }, context);
    } catch (err) {
        callback(err);
    }
};

/*
module.exports.shortbot = async event => {
  const body = JSON.parse(event.body);
  const {chat, text} = body.message;

  if (text) {
    let message = '';
    try {
      const result = await elastic(text,context);
      message = `Input: ${text}, \nShort: ${result._source.response}`;
    } catch (error) {
      message = `Input: ${text}, \nError: ${error.message}`;
    }

    await sendToUser(chat.id, message);
  } else {
    await sendToUser(chat.id, 'Text message is expected.');
  }

  return { statusCode: 200 };
};*/

//funcio per gestionar les peticions a FQS
async function dispatch(intentRequest, callback, context) {
    const sessionAttributes = intentRequest.sessionAttributes;
    var contenttest = "ERROR";
    var contenttests = "ERROR";
    var code = "000";
    try{
        const resp = await elastic(intentRequest,context);
        contenttest=resp;
       // const res= await sendToUser(chat_id,contenttest);
       // code = res;
    }catch(err){
        return console.log(err.message);
    }
    try{
        const resl = await lex(intentRequest,callback,context);
        contenttests=resl;
    }catch(err){
        return console.log(err.message);
    }
  
    if(contenttest._score > 0,5){
        callback(close(sessionAttributes, 'Fulfilled',
        {'contentType': 'PlainText', 'content': `${code}`}));   
    }
    else
    {
        callback(close(sessionAttributes, 'Fulfilled',
        {'contentType': 'PlainText', 'content': `${contenttests}`}));   
    }
}
/*
async function sendToUser(chat_id, text) {
  const options = {
    method: 'GET',
    uri: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    qs: {
      chat_id,
      text
    }
  };

  return rp(options);
}*/

