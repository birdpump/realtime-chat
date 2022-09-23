const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//data.json 
const datas = require("./data");
const fs = require("fs");

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    socket.on('chat id', (ids) => {
        console.log(`New user: ${ids}`);
        for (let i = 0; i < datas.length; i++) {
            socket.emit('update', { user: datas[i].user, msg: datas[i].msg });
        }
    });

    socket.on('event', (usr) => {
        console.log(`User: ${usr.user}`)
        console.log(`Msg: ${usr.msg}`)
        //write to data.json
        let msgdata = {
            msg: usr.msg,
            user: usr.user,
        };
        datas.push(msgdata);
        fs.writeFile("data.json", JSON.stringify(datas), err => { });

        io.emit('chat message', { user: usr.user, msg: usr.msg });
    });
});


server.listen(3000, '192.168.0.3');
