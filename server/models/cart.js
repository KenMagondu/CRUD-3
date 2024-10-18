// models/cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item', // Reference to your Item model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
