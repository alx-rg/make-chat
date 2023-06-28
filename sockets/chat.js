//chat.js
module.exports = (io, socket, onlineUsers, channels) => {

  socket.on('new user', (username) => {
    onlineUsers[username] = socket.id;
    socket["username"] = username;
    console.log(`✋ ${username} has joined the chat! ✋`);
    io.emit("new user", username);
  })

  //Listen for new messages
  socket.on('new message', (data) => {
    channels[data.channel].push({sender: data.sender, message: data.message});
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`)
    io.to(data.channel).emit('new message', data);
  })

  socket.on('new channel', (newChannel) => {
    channels[newChannel] = [];
    socket.join(newChannel);
    io.emit('new channel', newChannel);
    socket.emit('user changed channel', {
      channel : newChannel,
      messages : channels[newChannel]
    });
  });

  socket.on('get online users', () => {
    socket.emit('get online users', onlineUsers);
  })

  socket.on('disconnect', () => {
    //This deletes the user by using the username
    delete onlineUsers[socket.username]
    io.emit('user has left', onlineUsers);
  });
}
