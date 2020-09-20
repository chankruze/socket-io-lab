/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Sep 20 2020 14:03:28 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

// definitions
// generate random username
const genUserName = () => Math.random().toString(36).substring(7)

// handle form submit & message emmition
const emmitData = () => {
    const socket = io()
    const username = genUserName()

    $('form').submit(function (e) {
        // prevents page reloading
        e.preventDefault()

        const msg = $('#inputMessage').val()

        if (msg && msg.trim().length != 0) {
            // data to send
            const payload = {
                user: username,
                msg
            }

            // socket emmit (send data to server)
            socket.emit('chat_message', payload)

            // clean input
            $('#inputMessage').val('')
            return false
        }
    })

    // handle broadcast from server
    socket.on('chat_message', (payload) => {
        const { user, msg } = payload

        // check if message is from other users
        if (user == username) {
            $('#messages').append($('<li class="own-msg">').text(`${payload.msg}`))
        } else {
            $('#messages').append($('<li>').html(`<b>${payload.user}</b>: ${payload.msg}`))
        }
    })
}

// calls
emmitData()
