function lex(intentRequest, callback, context) {
   //console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    //const sessionAttributes = intentRequest.sessionAttributes;
   //const nameIntent = intentRequest.currentIntent.name;
    //const slots = intentRequest.currentIntent.slots;
    //const preposition = slots.Preposition;
  //const perm = slots.perm;
    //const question = slots.question;
    //const verb = slots.verb;
    //const credits = slots.credits;
    var contenttest = "Error";
   
    const promise = new Promise(function(resolve,reject){
        setTimeout(function(){
            /*
            switch(nameIntent){
                case "Enrolment":
                    switch(preposition){
                        case "How":
                            if(verb == 'do'){
                              
                            }
                            break;
                        case "What":
                            switch(verb){
                                case 'go':
                                 
                                    break;
                                case 'happen':
                                   
                                    break;
                                case 'need':
                                  
                                    break;
                                default:
                                    contenttest= `${preposition} and ${verb} not a question`;
                            }
                            break;
                        case "When":
                            if(verb == 'need'){
                              
                            }
                            break;
                        case "Where":
                            if(verb == 'go'){
                               
                            }
                           break;
                        default:
                            contenttest='Sorry! Question not exists in enroll ';
                    } 
                    switch(question){
                        case "can":
                            switch(verb){
                                case 'come':
                                   
                                    break;
                                case 'choose':
                                  
                                    
                                    break;
                                default:
                                    contenttest= `${question} and ${verb} not a question`;
                            }
                            break;
                        case "is":
                            if(verb == 'be'){
                               
                            }
                            break;
                        default:
                            contenttest='Sorry! ${question} and ${verb} not a question';
                    } 
                    if(verb == "can"){
                        if(credits == "credits"){
                           
                        }
                        break;
                    }
                    break;
               
                default:
                    contenttest='Sorry! We need Intent!';
            }*/
            resolve(contenttest);
        }, 1000);
        
    });
    return promise;
}
module.exports = lex;