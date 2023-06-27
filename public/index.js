//index.js
$(document).ready(()=>{
  const socket = io.connect();

  $('#create-user-btn').click((e)=>{
    e.preventDefault();
    if($('#username-input').val().length > 0){
      socket.emit('new user', $('#username-input').val());
      $('.username-form').remove();
      // Have the main page visible
      $('.main-container').css('display', 'flex');
    }
  });

  $('#send-chat-btn').click((e)=>{
    e.preventDefault();
    if($('#chat-input').val().length > 0){
      // Get the message text value
      let message = $('#chat-input').val();
      // Emit the message with the socket
      socket.emit('new message', message);
      // Append the message to the chat div
      $('#chat-input').val('');
      $('.chat-messages').append(`
        <div class="message">
          <p class="message-user">${username}: </p>
          <p class="message-text">${message}</p>
        </div>
      `);
    }
  })

  //socket listeners
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat`);
    // Add the new user to the online users div
    $('.users-online').append(`<div class="user-online">${username}</div>`);
  })

})
