const express = require('express');

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

const server = require('http').Server(app);
const io = require('socket.io')(server);


io.on('connection', function(socket){
    console.log(`Có người kết nối ${socket.id}`);

    socket.on('CLIENT-SEND-COLOR', function(data){
        console.log(data);
        io.sockets.emit('SERVER-SEND-COLOR', data);
    });

});


server.listen(3000);

app.get('/home', (req,res) => res.render('home'));

app.get('/', (req,res) => res.json( { message: 'Hello, World!' } ));

