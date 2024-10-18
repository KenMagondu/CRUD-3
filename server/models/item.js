// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemImage: {
    data: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
