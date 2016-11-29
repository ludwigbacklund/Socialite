exports.sucket = function (socket) {
    var room = socket.handshake['query']['room'];
    if (room) {
        socket.join(room);
    }
    socket.on('send:message', function (data) {
        socket.to(room).broadcast.emit('send:message',
            {
                text: data.text,
                user: data.user
            });
    });
};