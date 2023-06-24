// App.js

const express = require('express');
const app = express(); // Create express app
const server = require('http').Server(app);

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'hanglebars');

app.get('/', (req, res) => {
  res.render('index.handlebars');
})

server.listen('3000', () => {
  console.log('Server is running on port 3000');
})
