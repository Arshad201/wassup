const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const PORT = 3000 || process.env.PORT;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

//Socket io
io.on('connection', (socket)=>{
    
    console.log('Connected user');

    socket.on('disconnect', ()=>{
        console.log('user disconnected!');
    })

    //Get Msg from client
    socket.on('message', (msg)=>{
        //Send Msg to all the client
        socket.broadcast.emit('message', msg);
    })


     //Get Msg from client
     socket.on('typing', (msg)=>{
         //Send Msg to all the client
         socket.broadcast.emit('typing', msg);
    })
})

server.listen(PORT, ()=>{
    console.log(`Server is listening on the port - ${PORT}`);
})
