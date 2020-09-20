/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Sep 20 2020 11:56:18 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const express = require('express')
const cors = require('cors')
const os = require('os')

// create http server
const app = express()
// use CORS
app.use(cors())

// GET endpoints
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

// PORT
const PORT = process.env.PORT || 5006
// Print sevrer IP
const networkInterfaces = os.networkInterfaces()
let SERV_URL = networkInterfaces.eth0[0].address

app.listen(PORT, () => console.log(`Server on network: http://${SERV_URL}:${PORT}/`))
