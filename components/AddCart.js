import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "./ui/Button/Button";

const AddCart = ({ product, selectedColor, setVisible }) => {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity, selectedColor }, // Include selectedColor

    });
    setQuantity(1);
    setVisible(false);
  };

  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      <Button onClick={decrementQuantity}>-</Button>
      <span>{quantity}</span>
      <Button onClick={incrementQuantity}>+</Button>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
};

export default AddCart;
