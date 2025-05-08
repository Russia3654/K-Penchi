import React, { useState, useEffect } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/products"; // Import API functions
import ProductList from "./ProductList"; // Import the ProductList component
import Picture from "./Picture"; // Import the PictureModal
import Loader from "./ui/Loader/Loader"; // Import the Loader component
import Modal from "./ui/Modals/Modal";
import ProductForm from "./ProductForm";
import Button from "./ui/Button/Button";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [profit, setProfit] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [combination, setCombination] = useState([]);
  const [productPictures, setProductPictures] = useState([]); // Array for multiple pictures
  const [currentPictures, setCurrentPictures] = useState([]); // State for current pictures in preview
  const [productId, setProductId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [modal, setModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading

  const loadProducts = async () => {
    setLoading(true); // Set loading to true
    const productList = await getProducts();
    setProducts(productList);
    setLoading(false); // Set loading to false
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      await addProduct({
        name: productName,
        finalPrice: parseFloat(productPrice) + parseFloat(profit),
        price: parseFloat(productPrice),
        profit: parseFloat(profit),
        description: productDescription,
        combination: combination,
        pictures: productPictures, // Include uploaded picture paths
      });
      resetForm();
      loadProducts(); // Refresh product list
    } catch (error) {
      console.error("Error adding product: ", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      await updateProduct(productId, {
        name: productName,
        finalPrice: parseFloat(productPrice) + parseFloat(profit),
        price: parseFloat(productPrice),
        profit: parseFloat(profit),
        description: productDescription,
        combination: combination,
        pictures: productPictures, // Include uploaded picture paths
      });
      resetForm();
      loadProducts(); // Refresh product list
    } catch (error) {
      console.error("Error updating product: ", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleDeleteProduct = async (id) => {
    setLoading(true); // Set loading to true
    try {
      await deleteProduct(id);
      resetForm();
      loadProducts(); // Refresh product list
    } catch (error) {
      console.error("Error deleting product: ", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProfit("");
    setProductDescription("");
    setCombination([]);
    setProductPictures([]); // Reset pictures
    setProductId("");
    setIsEditing(false);
    setProductModal(false);
  };

  return (
    <div>
      <div style={{display: 'flex'}}>
        <h2>Product List</h2>
        <Button onClick={() => { setProductModal(true) }} location="element">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"
            style={{ fill: '#FFFFFF' }}>
            <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"></path>
          </svg>
        </Button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ProductList
          products={products}
          onEdit={(product) => {
            setProductId(product.id);
            setProductName(product.name);
            setProductPrice(product.price);
            setProfit(product.profit);
            setProductDescription(product.description);
            setProductPictures(product.pictures);
            setCombination(product.combination);
            setIsEditing(true);
            setProductModal(true);
          }}
          onDelete={handleDeleteProduct}
        />
      )}
      {productModal && (
        <Modal visible={productModal} setVisible={setProductModal} type="productForm">
          <ProductForm
            product={{
              productName,
              productDescription,
              productPrice,
              profit,
              combination,
              currentPictures,
              productPictures
            }}
            setProduct={{
              setProductName,
              setProductDescription,
              setProductPrice,
              setProfit,
              setCombination,
              setCurrentPictures,
              setModal,
            }}
            onAdd={handleAddProduct}
            onEdit={handleUpdateProduct}
            isEditing={isEditing}
            setIsSelecting={setIsSelecting}
            resetForm={resetForm}
          />
        </Modal>
      )}
      {modal && (
        <Modal visible={modal} setVisible={setModal} type="picture">
          <Picture
            pictures={currentPictures}
            setVisible={setModal}
            productId={productId}
            setPicture={setProductPictures}
            modes={{
              isEditing,
              isSelecting
            }}
            cloudLoader={null}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductManagement;
