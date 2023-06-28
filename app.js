//app.js
const express = require('express');
const app = express();
const server = require('http').Server(app);
const exphbs  = require('express-handlebars');
//Socket.io
const io = require('socket.io')(server);
let onlineUsers = {};

let channels = {"General" : []}

io.on("connection", (socket) => {
  require('./sockets/chat.js')(io, socket, onlineUsers, channels);
})

app.engine('handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "index",
layoutsDir: "views"}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('index.handlebars');
})
server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})
