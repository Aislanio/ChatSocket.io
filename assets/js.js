let mensagens = document.getElementById('messages');
      document.getElementById('menssagem').addEventListener('keypress', function(e) {
        var key = e.which || e.keyCode;
        if (key == 13) {
            enviar_menssagem(document.getElementById('menssagem').value);
            document.getElementById('menssagem').value = '';
        }
    });
    // inicia o client socketIO
    var socket = io();
    // Abre um popup perguntando o nome da pessoa
    var nome_usuario = prompt("Qual seu nome?");
    // Lista com alguns nomes do Final Fantasy
    var ff = [
        "Cloud Strife",
        "Sephiroth",
        "Vincent Valentine",
        "Zack Fair",
        "Aerith Gainsborough",
        "Tifa Lockhart",
        "Barret Wallace",
        "Yuffie Kisaragi",
    ];
    // Caso usuário não informe um nome será atribuido um nome aleatório da lista
    if (nome_usuario === null || nome_usuario == "" || nome_usuario == " ") {
        nome_usuario = ff[Math.floor(Math.random() * ff.length)];
    }
    socket.emit("join",nome_usuario);
    socket.on("update",(msg)=>{
      console.log(msg);
      mensagens.innerHTML += `<li class='info'>${msg}</li>`;
    });
    function enviar_menssagem(msg){
      socket.emit("send",msg);
    }
    socket.on("chat",(client,msg) =>{
      let time = new Date();
      mensagens.innerHTML += '<li class="field"><div class="msg"><span>' + client + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>';
    });
 