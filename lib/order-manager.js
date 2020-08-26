class Order {
    constructor(guestId, orderItems) {
        this.guestId = guestId;
        this.status = 'PROCESSING';
        this.waiter = null;
        this.items = orderItems.map(item => {
            return new OrderItem(item.title, item.qty);
        });
    }

    ready() {
        this.status = 'READY';
    }

    served() {
        this.status = 'SERVED';
    }
}

class OrderItem {
    constructor(title, qty) {
        this.title = title;
        this.qty = qty;
        this.status = 'PROCESSING';
    }
}

exports.OrderItem = OrderItem;
exports.Order = Order;