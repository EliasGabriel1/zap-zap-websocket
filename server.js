const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});


io.on('connection', (socket) => {
  console.log(`Nova conexão estabelecida: ${socket.id}`);

  socket.on('chat message', (msg) => {
    console.log(`Nova mensagem recebida: ${msg} ${socket.id}`);
    var x = [msg,socket.id]
    io.emit('chat message',x );
  });

  socket.on('disconnect', () => {
    console.log(`Conexão encerrada: ${socket.id}`);
  });
});

const port = 4000;
io.listen(port);
console.log(`Servidor Socket.io escutando na porta ${port}`);