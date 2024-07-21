import mongoose, { Schema } from "mongoose";

const productsSchema = new Schema({
   dishName: {
      type: String,
      required: true,
   },
   dishId: {
      type: String,
      required: true,
   },
   imageUrl: {
      type: String,
      required: true,
   },
   isPublished: {
      type: Boolean,
      default: true,
   },
});

const Product = mongoose.model("Product", productsSchema);
export default Product;
