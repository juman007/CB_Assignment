import React, { useEffect, useState } from "react";
import "./Products.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios, { all } from "axios";
import { toast } from "react-toastify";

const Products = () => {
   const [allProducts, setAllProducts] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [updateStatus, setUpdateStatus] = useState("");
   const [showModal, setShowModal] = useState(false);

   const handleClose = () => setShowModal(false);

   const handleShow = (products) => {
      setSelectedProduct(products);
      setUpdateStatus(products.isPublished ? "Published" : "Not Published");
      setShowModal(true);
   };

   const getProducts = async () => {
      try {
         const response = await axios.get(
            "http://localhost:4000/api/getproducts"
         );
         setAllProducts(response.data.products);
      } catch (error) {
         console.error("Error fetching products:", error);
      }
   };

   useEffect(() => {
      getProducts();
      // eslint-disable-next-line
   }, []);

   const handleStatusChange = (e) => {
      setUpdateStatus(e.target.value);
   };

   const handleSaveChanges = async () => {
      if (selectedProduct) {
         try {
            const updatedProduct = {
               ...selectedProduct,
               isPublished: updateStatus === "Published" ? true : false,
            };
            await axios.post(
               `http://localhost:4000/api/status/${selectedProduct._id}`,
               updatedProduct
            );

            console.log("Status updated successfully");
            setShowModal(false);
            getProducts();
            toast.success("Product status updated successfully!");
         } catch (error) {
            console.log(error);
         }
      }
   };

   return (
      <>
         <h1 className="text-center text-body-tertiary fw-bold mt-4">
            All Products
         </h1>

         <div className="container">
            <div className="d-flex flex-wrap m-4">
               {allProducts.map((p, index) => (
                  <div
                     className="card m-2"
                     style={{ width: "18rem" }}
                     key={index}
                  >
                     <img
                        src={p.imageUrl}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                        alt={p.dishName}
                     />
                     <div className="card-body">
                        <h5 className="card-title">{p.dishName}</h5>
                        <h6 className="card-title text-danger">
                           {p.isPublished ? "Published" : "Not Published"}
                        </h6>
                        <button
                           className="btn btn-primary"
                           onClick={() => handleShow(p)}
                        >
                           Published Status
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Publish Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <select
                  id="statusSelect"
                  className="form-control"
                  value={updateStatus}
                  onChange={handleStatusChange}
               >
                  <option value="Not-Published">Not Published</option>
                  <option value="Published">Published</option>
               </select>
               <p className="mt-2 text-danger fw-semibold">
                  Selected Status: {updateStatus}
               </p>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="primary" onClick={handleSaveChanges}>
                  Save changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default Products;
