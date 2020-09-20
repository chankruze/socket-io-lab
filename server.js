/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Sep 20 2020 11:56:18 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const express = require('express')
const cors = require('cors')
const os = require('os')
const path = require('path')

// create http server
const app = express()
// use CORS
app.use(cors())

// use static to render html
app.use(express.static('public'))

// GET endpoints
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// PORT
const PORT = process.env.PORT || 5006
// Print sevrer IP
const networkInterfaces = os.networkInterfaces()
let SERV_URL = networkInterfaces.eth0[0].address

const server = app.listen(PORT, () => console.log(`Server on network: http://${SERV_URL}:${PORT}/`))

// socket IO
const io = require('socket.io')(server)
// socket connection event
io.on('connection', (socket) => {
    console.log(`a user connected`)

    // chat message event
    socket.on('chat_message', (payload) => {
        io.emit('chat_message', payload)
    })

    // disconnect event
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})
