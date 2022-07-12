let io = require('socket.io-client')
let guest = io.connect("http://localhost:5000/guest")

guest.emit('message', {message:"hello"})