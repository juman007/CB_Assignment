import Product from "../models/products.js";

export const postProduct = async (req, res) => {
   try {
      const { dishName, dishId, imageUrl, isPublished } = req.body;
      const newProduct = new Product({
         dishName,
         dishId,
         imageUrl,
         isPublished,
      });
      await newProduct.save();
      res.status(201).json({
         success: true,
         message: "Product added successfully",
         newProduct,
      });
   } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
   }
};

export const getProduct = async (req, res) => {
   try {
      const products = await Product.find({});
      res.status(201).json({
         success: true,
         products,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export const statusUpdate = async (req, res) => {
   const { isPublished } = req.body;
   const { id } = req.params;

   try {
      const updateproduct = await Product.findByIdAndUpdate(
         id,
         {
            isPublished,
         },
         { new: true }
      );
      res.status(201).json({
         success: true,
         message: "Status Updated Successfully",
         updateproduct,
      });
   } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
   }
};
