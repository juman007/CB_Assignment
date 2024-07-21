import express from "express";
import {
   getProduct,
   postProduct,
   statusUpdate,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/getproducts", getProduct);
router.post("/postproducts", postProduct);
router.post("/status/:id", statusUpdate);

export default router;
