let playerCount = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');
    pongNamespace.on('connection', (socket) => {
        let room;
        console.log('User connected as', socket.id);

        socket.on('ready', () => {
            room = 'room' + Math.floor(playerCount / 2);
            socket.join(room);
            console.log(`Player ${socket.id} entered the ${room}`);
            playerCount++;
            if (playerCount % 2 === 0) {
                pongNamespace.in(room).emit('startGame', socket.id); // socket.id represent id of player who will be a 'referee'
            }
        });
        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', paddleData)  //forwarding position of paddle to another player 
        });
        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData)  //forwarding data of ball coordinates and total score to another player 
        })
        socket.on('disconnect', (reason) => {
            socket.leave(room);
            console.log(`User ${socket.id} has been disconnected: ${reason}`);
        })
    });
}

module.exports = {
    listen,
}