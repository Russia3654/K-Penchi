import React, { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import Modal from "./ui/Modals/Modal";
import ProductView from "./ProductView";
import Button from "./ui/Button/Button";

const ProductDetail = ({ product, texture }) => {
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.combination[0]?.color || ""
  );
  return (
    <div className="productContainer">
      <ImageCarousel pictures={product.pictures.slice(0, 5)} location='mainImage' />
      <h2>{product.name}</h2>
      <p>${product.finalPrice}</p>
      <div style={{ display: "flex", gap: "8px" }}>
        {product.combination && Array.isArray(product.combination) ? (
          product.combination.map((item, index) => {
            const matchedTexture = texture.find(
              (tex) => tex.colorName === item.color
            );
            return (
              <div
                key={index}
                style={{
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border:
                    selectedColor === item.color ? "1px solid gray" : "none", // Highlight selected color
                }}
                onClick={() => setSelectedColor(item.color)}
              >
                {matchedTexture ? (
                  <img
                    src={matchedTexture.colorUrl[0].url}
                    alt={item.color}
                    style={{ width: "30px", height: "30px", objectFit: "cover" }}
                  />
                ) : (
                  item.color
                )}
              </div>
            );
          })
        ) : (
          <div>No colors available</div>
        )}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button onClick={() => setProductModalVisible(true)}>
          View product
        </Button>
      </div>
      {productModalVisible && (
        <Modal
          visible={productModalVisible}
          setVisible={setProductModalVisible}
          type="productForm"
        >
          <ProductView
            product={product}
            texture={texture}
            setVisible={setProductModalVisible}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductDetail;
