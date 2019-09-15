const express = require('express');

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

const server = require('http').Server(app);
const io = require('socket.io')(server);

// 1. Lắng nghe các kết nối từ client
/* 
    Mỗi Client kết nối lên server, server sẽ tạo một biến socket để quản lí kết nối
    Mỗi kết nối sẽ có một socket id riêng
*/
io.on('connection', function(socket){
    console.log(`Có người kết nối ${socket.id}`);

    // ngắt kết nối
    socket.on('disconnect', function(){
        console.log(`${socket.id} ngắt kết nối`);
    });

    // 2. Lắng nghe CSD
    socket.on('CSD', function(data){
        console.log(`${socket.id} vừa gửi ${data}`);
    });
});
// viết disconnect ngoài này là sai vì không được socket quản lí

server.listen(3000);

app.get('/home', (req,res) => res.render('home'));

app.get('/', (req,res) => res.json( { message: 'Hello, World!' } ));

