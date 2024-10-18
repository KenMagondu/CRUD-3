// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cartItems: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', // Make sure this matches your Item model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalSales: {
    type: Number,
    required: true,
  },
  totalCapitalUsed: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
  },
  // Add any other fields you need for an order
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
