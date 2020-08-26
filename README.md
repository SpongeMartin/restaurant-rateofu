# restaurant-rateofu-server


WebSocket server

With `node index.js`, you'll start a websocket server listening on port 3000.

The serves has two namespaces, which send and accept respective messages:

Guest namespace (served on `/guest`)

The server sends:

- `new order confirmed` message

- `order refreshed` message

The client can send:

- `new order`
  The payload is a list of objects with `title` and `qty` fields

Staff namespace (served on `/staff`)

The server sends:

- `new work order`

- `order refreshed`

- `order marked as ready`

- `new servable order`

- `order was served`

The client can send:

- `login`
   The payload is an object with `name` and `type`; available types are: `waiter, barman, chef`
   
- `order item ready`
   The payload has two arguments: the first one is `guestId`, the second one is an object with `title` field (the item's title)
   
- `order served`
   The payload is an object, which must include `guestId`
