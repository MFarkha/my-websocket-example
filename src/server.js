const http = require('http');
const socketIo = require('socket.io');
const sockets = require('./sockets'); 

const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
const socketServer = socketIo(httpServer);

const PORT = 3000 || process.env.PORT;
httpServer.listen(PORT, () => {
    console.log('The app is listening on port:', PORT);
});

sockets.listen(socketServer);