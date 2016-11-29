const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

var http = require('http');
var server = http.createServer(app);

app.use(express.static(__dirname + '/public'));

app.get('*', function (request, response){
    response.sendFile(path.resolve('./public', 'index.html'))
});

console.log("server started on port " + port);

var io = require('socket.io').listen(server);
var socket = require('./src/socket').sucket;

exports.io = io;
io.sockets.on('connection', socket);

server.listen(port);
module.exports = app;