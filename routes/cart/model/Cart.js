// routes/cart/model/Cart.js
const mongoose = require("mongoose");
const { Schema } = mongoose;


const CartItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  quantity: {
    type: Number,
    required: true,
  },
});

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      item: {
        type: CartItemSchema,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});


module.exports = mongoose.model("Cart", CartSchema);
