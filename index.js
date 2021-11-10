require('dotenv').config()
const venom = require('venom-bot')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/venom', { useNewUrlParser: true })
const Link = require('./link')
const Doubt = require('./doubt')

const menu = `
Whatsapp Utility Bot
Author: MD Rashid Hussain

==========Commands==========
/bot-help - show this help menu
/bot-all - tag everyone
/bot-add-link data link - save the resource 'link' (with additional associated 'data')
/bot-show-links - show all links in the database
/bot-doubt question - ask a doubt
/bot-show-doubts - show all unanswered doubts
/bot-answered id - mark doubt (with 'id') as answered

/bot-sf problem - search 'problem' in stackoverflow

Run your code here with /bot-run-x your code
where x is one of js(node.js), c, cpp, java or python
Eg: /bot-run-c your code - runs your c code
`

venom.create()
.then(client => start(client))
.catch(err => console.error(err))

const initial = '/bot-'
const group = process.env.TESTING_GROUP     // bot testing group

function sendMessage(client, chatId, message) {
    client.sendText(chatId, message)
    .catch(err => console.error('Error in sending message'))
}

function checkLink(message){
    let checker = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?")
    return checker.test(message)
}

function start(client) {
    sendMessage(client, group, menu)
    client.onMessage(msg => {
        // security checks
        if(msg.chatId != group || !msg.body.startsWith(initial)){ return }
        else{
            let arr = msg.body.split(' ')
            let query = arr[0].split(initial)[1]
            arr.splice(0, 1)
            let additional = arr.join(' ')
            
            switch(query.toLocaleLowerCase()){
                case "help":
                    sendMessage(client, group, menu)
                    break
    
                case "all":
                    let members = []
                    let message = 'Tagged all members here\n'

                    client.getGroupMembersIds(msg.chat.groupMetadata.id)
                    .then(res => {
                        res.forEach(member => {
                            members.push(member.user.toString())
                            message += `@${member.user.toString()} , `
                        })
                        client.sendMentioned(msg.from, message, members)
                        .catch(err => sendMessage(client, group, "Error in tagging members"))
                    })
                    .catch(err => sendMessage(client, group, "Error in tagging members"))                    
                    break
    
                case "add-link":
                    if(checkLink(additional)) {
                        let link = new Link({ data: additional })
                        link.save()
                        sendMessage(client, group, "Successfully added to the database")
                    }
                    else{ sendMessage(client, group, "Message does not contain any link") }
                    break
    
                case "show-links":
                    Link.find({}, (err, links) => {
                        if(!err && links.length > 0) {
                            let message = ''
                            links.forEach(link => { message += `${link.data}\n\n` })
                            sendMessage(client, group, message)
                        }
                        else{ sendMessage(client, group, "No links in the database") }
                    })
                    break
    
                case "doubt":
                    let ques = new Doubt({ data: additional, askedBy: msg.sender.pushname })
                    ques.save()
                    sendMessage(client, group, "Added your question to the database")
                    break

                case "show-doubts":
                    Doubt.find({answered :false}, (err, doubts) => {
                        if(!err && doubts.length > 0) {
                            let message = ''
                            doubts.forEach(doubt => { message += `Doubt ID: ${doubt.id}\nDoubt: ${doubt.data}\nAsked By (tagname): ${doubt.askedBy}\n\n` })
                            sendMessage(client, group, message)
                        }
                        else{ sendMessage(client, group, "No doubts in the database") }
                    })
                    break
    
                case "answered":
                    Doubt.findByIdAndUpdate(additional, {answered: true}, (err, doubt) => {
                        if(err){ sendMessage(client, group, "Doubt not found") }
                        else{ sendMessage(client, group, "Doubt marked as answered") }
                    })
                    break
                
                case "sf":
                    // fetch data for the question (additional) from stackoverflow 
                    break
                    
                case "run-js":
                    // run the javascript code (additional)
                    break
            
                case "run-c":
                    // run the c code (additional)
                    break
        
                case "run-cpp":
                    // run the cpp code (additional)
                    break
    
                case "run-java":
                    // run the java code (additional)
                    break    

                case "run-python":
                    // run the python code (additional)
                    break
                
                default:
                    sendMessage(client, group, "Unknown command")
                    break
            }        
        }
    })
}
