let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let rest = require('./lib/restaurant.js');
let order = require('./lib/order-manager.js');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/guest-app.html');
});

app.get('/staff', (req, res) => {
  res.sendFile(__dirname + '/templates/staff-app.html');
});

// TODO: use two namespaces - guest and staff
let guestNamespace = io.of('/guest');
let staffNamespace = io.of('/staff');

let RATEOFT = new rest.Restaurant(guestNamespace, staffNamespace);

guestNamespace.on('connection', socket => {
  console.log('a guest device connected');

  socket.on('new order', orderItems => {
    RATEOFT.addOrder(socket.id, orderItems);
  });
});

staffNamespace.on('connection', (socket) => {
  console.log('a staff member connected');

  socket.on('login', (creds, fn) => {
    let name = creds.name;
    let type = creds.type;

    RATEOFT.joinStaff(name, type, socket.id);
    if (fn) {
        fn({status: 'ok'});
    }
  });

  socket.on('order item ready', (guestId, orderItem) => {
    RATEOFT.orderItemReady(guestId, orderItem);
  });

  socket.on('order served', order => {
    RATEOFT.markOrderAsServed(order);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
