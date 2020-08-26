let order = require('./order-manager.js');

class Restaurant {
    constructor(guestIO, staffIO) {
        this.guestIO = guestIO;
        this.staffIO = staffIO;
        this.orders = {};
        this.kitchen = new Kitchen(staffIO);
        this.availableWaiters = [];
    }

    joinStaff(name, type, socketId) {
        if (type === 'chef') {
            this.kitchen.addChef([name, socketId]);
        }
        else if (type === 'barman') {
            this.barmans.push(name);
        }
        else {
            this.availableWaiters.push([name, socketId]);
        }

        console.log(type + ' joined with name ' + name + " and socket id = " + socketId);
    }

    addOrder(guestId, orderItems) {
        if (guestId in this.orders) {
            // todo
            console.log('adding to order');
        } else {
            let newOrder = new order.Order(guestId, orderItems);
            this.kitchen.request(newOrder);
            this.orders[guestId] = newOrder;

            // Message the guest about order confirmation.
            this.guestIO.to(guestId).emit('new order confirmed', newOrder);
        }
    }

    orderItemReady(guestId, orderItem) {
        this.kitchen.markOrderItemAsReady(guestId, orderItem);
        this.processServableOrders();
    }

    processServableOrders() {
        if (this.availableWaiters.length === 0) return;
        if (!this.kitchen.outQueueHasItems()) return;

        let waiter = this.availableWaiters.shift();
        this.kitchen.processOutQueue(waiter);
    }

    markOrderAsServed(order) {
        let [waiterName, waiterSocketId] = order.waiter;
        order.waiter = null;
        this.availableWaiters.push([waiterName, waiterSocketId]);

        this.staffIO.to(waiterSocketId).emit('order was served', order);
        this.guestIO.to(order.guestId).emit('order refreshed', order);
    }
}

class Kitchen {
    constructor(io) {
        this.io = io;
        this.inQueue = [];
        this.outQueue = [];
        this.availableChefs = [];
        this.inWork = [];
    }

    addChef(chef) {
        this.availableChefs.push(chef);
    }

    request(order) {
        this.inQueue.push(order);
        this.processInQueue();
    }

    markOrderItemAsReady(orderId, orderItem) {
        let idx = this.inWork.findIndex(work => work.order.guestId === orderId);

        if (idx === -1) {
            throw new Error('No order? :(');
        }

        let order = this.inWork[idx].order;
        let itemIdx = order.items.findIndex(item => item.title === orderItem.title);

        if (itemIdx === -1) {
            throw new Error('No order item? :(');
        }

        order.items[itemIdx].status = 'READY';

        let allItemsReady = order.items.every(item => item.status === 'READY');
        let [chefName, chefSocketId] = this.inWork[idx].chef;

        if (allItemsReady) {
            let readyOrder = this.inWork.splice(idx, 1);
            readyOrder = readyOrder[0].order;

            this.outQueue.push(readyOrder);
            this.addChef([chefName, chefSocketId]);

            this.io.to(chefSocketId).emit('order marked as ready', order);
        } else {
            this.inWork[idx].order = order;

            this.io.to(chefSocketId).emit('order refreshed', order);
        }
    }

    processInQueue() {
        // Anything to do at all?
        if (this.inQueue.length === 0) return;
        if (this.availableChefs.length === 0) return;

        let nextOrder = this.inQueue.shift();
        let [chefName, chefSocketId] = this.availableChefs.shift();

        this.inWork.push({ order: nextOrder, chef: [chefName, chefSocketId]});
        this.io.to(chefSocketId).emit('new work order', nextOrder);
    }

    outQueueHasItems() {
        return this.outQueue.length > 0;
    }

    processOutQueue(waiter) {
        let [waiterName, waiterSocketId] = waiter;
        let order = this.outQueue.shift();
        order.waiter = waiter;

        this.io.to(waiterSocketId).emit('new servable order', order);
    }
}

exports.Restaurant = Restaurant;


