import express from 'express';
import { Server as socketIO } from 'socket.io';

const app = express();
const port = 3000;

const server = app.listen(port, ()=>{
    console.log('Listening at port http://localhost:'+port);
});

const io = new socketIO(server, {
    cors: {
        origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    }
});

io.on('connection', (socket)=>{
    console.log("user connected");
    console.log(socket.id); //an id is given by the socket to each user who joins the server
    //this id acts as their room id

    socket.on('send-msg', (message, room)=>{
        console.log(message, room);
        if (room == '') {
            socket.broadcast.emit('recieve-msg', message);
        } else{
            socket.to(room).emit('recieve-msg', message);
        }
    });

    socket.on('join-room', (room, callbackFuncFromCLient)=>{
        socket.join(room); //joins into the mentioned room
        callbackFuncFromCLient("****Joined room: "+room+"****");
    });
})