import React, { useState, useEffect } from 'react';
import ProductDetail from './ProductDetail';
import Info from './Info';
import Button from './ui/Button/Button';

const ProductCarousel = ({ type, products, texture }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3); // Always show 3 items
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 720) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextProduct = () => {
    if (type === "info") {
      if (counter + 1 === 4) {
        setCounter(1);
      } else {
        setCounter(counter + 1);
      }
    } else {
      if (itemsToShow == 1) {
        setCurrentIndex(currentIndex + 1);
        if (currentIndex == 2) {
          setCurrentIndex(0);
        }
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedProducts.length);
      }
    }
  };

  const prevProduct = () => {
    if (type === "info") {
      if (counter - 1 === 0) {
        setCounter(3);
      } else {
        setCounter(counter - 1);
      }
    } else {
      if (itemsToShow == 1) {
        setCurrentIndex(currentIndex - 1);
        if (currentIndex == 0) {
          setCurrentIndex(2);
        }
      } else {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + displayedProducts.length) % displayedProducts.length);
      }
    }
  };

  useEffect(() => {
    // Update displayedProducts based on currentIndex and itemsToShow
    const endIndex = (currentIndex + itemsToShow) % products.length;
    const slicedProducts = products.slice(currentIndex, endIndex);

    if (slicedProducts.length < itemsToShow) {
      // If there are not enough products to fill the display, wrap around to the beginning
      const remainingProducts = products.slice(0, itemsToShow - slicedProducts.length);
      setDisplayedProducts([...slicedProducts, ...remainingProducts]);
    } else {
      setDisplayedProducts(slicedProducts);
    }
  }, [products, currentIndex, itemsToShow]);

  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  if (type === "info") {
    return (
      <div className='info-carousel'>
        <Button onClick={prevProduct} location="carousel">{"<"}</Button>
        <Info counter={counter} />
        <Button onClick={nextProduct} location="carousel">{">"}</Button>
      </div>
    )
  }

  return (
    <div className="product-carousel">
      {itemsToShow < 3 && <Button onClick={prevProduct} location="carousel">{"<"}</Button>}
      {displayedProducts.map(product => (
        <ProductDetail key={product.id} product={product} texture={texture} />
      ))}
      {itemsToShow < 3 && <Button onClick={nextProduct} location="carousel">{">"}</Button>}
    </div>
  );
};

export default ProductCarousel;
