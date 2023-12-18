const { Schema } = require('mongoose');

module.exports = new Schema(
  {
    ref_id: { type: String, required: [true, 'ref_id is required!'] },
    title: { type: String, required: [true, 'name is required!'] },
    description: { type: String, required: [true, 'description is required!'] },
    price: { type: Number, required: [true, 'price is required!'] },
    quantity: { type: String, required: [true, 'quantity is required!'] },
    type: { type: String, required: [true, 'type is required!'] },
    thumbnail: { type: String, required: [true, 'thumbnail is required!'] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
