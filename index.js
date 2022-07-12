const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const rest = require('./lib/restaurant.js');
const order = require('./lib/order-manager.js');
app.use(cors());
const io = require('socket.io')(http,{cors: {origin:"http://localhost:3000"}});



// TODO: use two namespaces - guest and staff
let guestNamespace = io.of('/guest');
let staffNamespace = io.of('/staff');

let RATEOFT = new rest.Restaurant(guestNamespace, staffNamespace);



guestNamespace.on('connect', (socket) => {
  console.log('a guest device connected' + socket.id);

  socket.on('message', (msg) =>{
    console.log(msg)
  })

  /*socket.on('new order', orderItems => {
    RATEOFT.addOrder(socket.id, orderItems);
  });*/
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

http.listen(5000, () => {
  console.log('listening on *:5000');
});
