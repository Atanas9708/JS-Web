const Product = require('../models/Product');
const Order = require('../models/Order');


module.exports = {
    customizeOrder: (req, res) => {
        let productId = req.params.id;

        Product.findById(productId)
            .then((product) => {
                res.render('customize-order', { product });

            }).catch((err) => {
                console.log(err);
                return;
            });
    },
    orderDetailsGet: (req, res) => {
        let orderId = req.params.id;

        Order.findById(orderId)
            .populate('product')
            .then((order) => {
                let productOutput = {
                    category: order.product.category,
                    size: order.product.size
                };
                
                let parsedDate = order.date.toDateString();
                let orderOutput = {
                    date: parsedDate,
                    toppings: order.toppings
                };

                let isPending = 'checkpoint ';
                let inProgress = 'checkpoint ';
                let inTransit = 'checkpoint ';
                let isDelivered = 'checkpoint ';

                switch (order.status) {
                    case 'Pending':
                        isPending += 'current';
                        break;
                    case 'inProgress':
                        inProgress += 'current';
                        break;
                    case 'inTransit':
                        inTransit += 'current';
                        break;
                    case 'delivered':
                        isDelivered += 'current';
                }

                res.render('order-details', {
                    product: productOutput,
                    order: orderOutput,
                    isPending,
                    isDelivered,
                    inProgress,
                    inTransit
                });

            }).catch((err) => {
                console.log(err);
                return;
            });
    },
    orderDetailsPost: (req, res) => {
        let productId = req.params.id;

        Product.findById(productId)
            .then((product) => {
                let orderObj = {
                    creator: req.user._id,
                    product: product._id,
                    date: Date.now(),
                    toppings: req.body.toppings,
                    status: 'Pending'
                };

                let isPending = 'checkpoint current';
                let inProgress = 'checkpoint ';
                let inTransit = 'checkpoint ';
                let isDelivered = 'checkpoint ';

                Order.create(orderObj)
                .then((order) => {
                    let status = product.status;
                    res.render('order-details', { 
                        product,
                        order,
                        isPending,
                        inTransit,
                        inProgress,
                        isDelivered
                    });

                }).catch((err) => {
                    console.log(err);
                    return;
                });

            }).catch((err) => {
                console.log(err);
                return;
            });
    },
    orderStatus: (req, res) => {
        let currentUser = req.user._id.toHexString();

        Order.find({ creator: currentUser })
            .populate('product')
            .then((orders) => {
                let outputOrders = [];
                for (let order of orders) {
                    order.parsedDate = order.date.toDateString();
                    let orderObj = {
                        date: order.parsedDate,
                        product: order.product.category,
                        size: order.product.size,
                        status: order.status,
                        _id: order._id
                    };
                    outputOrders.push(orderObj);
                }

                res.render('order-status', { orders: outputOrders });

            }).catch((err) => {
                console.log(err);
                return;
            });
    },
    allOrdersGet: (req, res) => {
        Order.find({})
            .populate('product')
            .then((orders) => {

                for (let order of orders) {
                    order.parsedDate = order.date.toDateString();
                    order.isPending = order.status === 'Pending';
                    order.isDelivered = order.status === 'delivered';
                    order.inTransit = order.status === 'inTransit';
                    order.inProgress = order.status === 'inProgress';
                }

                res.render('order-status-admin', { orders });

            }).catch((err) => {
                console.log(err);
                return;
            });
    },
    allOrdersPost: (req, res) => {
        let orderIds = req.body;
        for (let id in orderIds) {
            let status = orderIds[id];
            Order.findByIdAndUpdate(id, { status: `${status}` })
                .then((order) => {
                   res.redirect('/');

                }).catch((err) => {
                    console.log(err);
                    return;
                });
        }
    }
}