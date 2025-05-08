import React, { useState } from "react";
import ImageCarousel from "./ImageCarousel"; // Import the ImageCarousel component
import Button from "./ui/Button/Button";
import AddCart from "./AddCart";
import { useRouter } from "next/router";

const ProductView = ({ product, texture, setVisible }) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(product.combination[0]?.color || "");
  
  return (
    <div className="product-view-container">
      <div className="pictures-section">
        <ImageCarousel pictures={product.pictures} location='mainImage' />
        {product.pictures.length !== 1 &&
          <div className="pictureContainer">
            <ImageCarousel pictures={product.pictures} ITS='3' />
          </div>}
      </div>
      <div className="product-section">
        <h2>{product.name}</h2>
        <p>Price: ${product.finalPrice}</p>
        <p>Description: {product.description}</p>
        <div id="availability-message">
          {product.combination && product.combination.find(item => item.color === selectedColor && item.quantity > 0) ? <div>Available</div> : <div>Unavailable</div>}
        </div>

        <div>
          {product.combination && Array.isArray(product.combination) ? (
            product.combination.map((item, index) => {
              const matchedTexture = texture.find(
                (tex) => tex.colorName === item.color
              );
              return (
                <div key={index}>
                  <input
                    type="radio"
                    id={`color-${index}`}
                    name="color"
                    value={item.color}
                    checked={selectedColor === item.color}
                    onChange={() => setSelectedColor(item.color)} // Update selectedColor on change
                  />
                  <label
                    htmlFor={`color-${index}`}
                    style={{
                      width: "50px",
                      height: "20px",
                      display: "inline-block",
                      margin: "0px 10px 0px 0px",
                    }}
                  >
                    {matchedTexture ? (
                      <img
                        src={matchedTexture.colorUrl[0].url}
                        alt={item.color}
                        style={{ width: "50px", height: "20px", objectFit: "cover" }}
                      />
                    ) : (
                      <span style={{ backgroundColor: item.color, display: "inline-block", width: "50px", height: "20px" }}></span>
                    )}
                  </label>
                </div>
              );
            })
          ) : (
            <div>No colors available</div>
          )}
        </div>
        <AddCart product={product} selectedColor={selectedColor} setVisible={setVisible} /> {/* Pass selectedColor to AddCart */}

        <Button
          onClick={() => {
            setVisible(false);
            router.push(
              `/products`
            );
          }}
        >
          go back
        </Button>
      </div>
    </div>
  );
}

export default ProductView;