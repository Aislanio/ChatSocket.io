let express = require('express');
let app = express();

let http = require('http').Server(app);

app.use(express.static('assets'));

let io = require('socket.io')(http);
let clients ={};
let img_perfil = {};
app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(client){
  client.on("join", (name,img) =>{
    console.log("jon:" + name);
    clients[client.id] = name;
    img_perfil[client.id] = img;
    client.emit("chatBot",'loli.png','Loli #bot',"Você se conectou ao server !!");
    client.broadcast.emit("chatBot",'loli.png','Loli #Bot', name + " acabou de conectar ao server")
  });

  client.on('send',(msg) =>{
    console.log(msg);
    client.broadcast.emit("chat",img_perfil[client.id], clients[client.id], msg);
    client.emit("chat",img_perfil[client.id], 'you',msg);
  });

  client.on("disconnect", function(){
      console.log("Disconnect");
        io.emit("chatBot",'loli.png','Loli #Bot', clients[client.id] + " acabou de desconectar do server");
        delete clients[client.id];
        delete img_perfil[client.id];
    });

});



http.listen(300,() =>{
    console.log('Servidor rodando')
});

