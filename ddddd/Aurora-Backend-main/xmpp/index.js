const xmlparser = require('xml-parser')
const xmlbuilder = require("xmlbuilder")
const Client = require("./Client")
const WebSocket = require('ws');

const Friends = require(`${__dirname}/../model/Friends`)
const logging = require(`${__dirname}/../structs/logs`)
const config = require(`${__dirname}/../config.json`)

const wss = new WebSocket.Server({ port: process.env.xmppPort || config.xmppPort || 443 });


wss.on("connection", ws => {
    var client = new Client(ws) 

    ws.on("close", async (lol) => {
        client.ws.send(xmlbuilder.create({
            "close": {
                "xmlns": "urn:ietf:params:xml:ns:xmpp-framing"
            }
        }))

        if (client.sender) {
            clearInterval(client.sender)
        }
        if (xmppClients[client.id]) delete xmppClients[client.id]
    })
})

wss.on("error", ws => {})