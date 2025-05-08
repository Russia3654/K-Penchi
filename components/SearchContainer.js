import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Modal from "./ui/Modals/Modal";
import ProductView from "./ProductView";

const SearchContainer = ({ product, onClose }) => {
  const router = useRouter();
  const [productModalVisible, setProductModalVisible] = useState(false);

  const handleClick = () => {
    setProductModalVisible(true);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (productModalVisible) {
      router.push(
        `/products?urlId=${product.id}&urlModal=${productModalVisible}`
      );
    }
  }, [productModalVisible]);

  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onClick={handleClick}
    >
      <div>
        {product.pictures ? (
          <img
            src={product.pictures[0].url}
            alt={product.name}
            style={{ width: "50px", height: "50px" }}
          />
        ) : (
          "No image available"
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>{product.name}</div>
        <div>${product.finalPrice}</div>
      </div>
    </div>
  );
};

export default SearchContainer;
