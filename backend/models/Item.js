const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  comments: [{ type: String }],
  ratings: [{ type: Number }],
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
