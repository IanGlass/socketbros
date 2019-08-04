var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Tell express to use ejs template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

var messages = [];

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/messages', (req, res) => {
  res.send(messages);
})

app.post('/messages', (req, res) => {
  messages.push({
    name: req.body.name,
    message: req.body.message
  });
  io.emit('message', req.body);
  res.status(200).send(messages);
})

io.on('connection', () =>{
  console.log('a user is connected')
})

var server = http.listen(process.env.PORT || 5000, () => {
  console.log('server is running on port', server.address().port);
});