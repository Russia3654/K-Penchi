import React, { useEffect, useState } from "react";
import Button from "./ui/Button/Button";

const ImageCarousel = ({ pictures = [], location, ITS }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [btnDisplay, setBtnDisplay] = useState(false);
  const [itemsToShow] = useState(ITS);
  const [displayPictures, setDisplayPictures] = useState([]);
  const [isMultiImage, setIsMultiImage] = useState(false);

  const isMulti = () => {
    if (ITS > 1) {
      setIsMultiImage(true);
    } else {
      setIsMultiImage(false);
    }
  }

  useEffect(() => {
    isMulti();
  }, [pictures]);

  const nextImage = () => {
    if (ITS) {
      if (itemsToShow == 1) {
        setCurrentIndex(currentIndex + 1);
        if (currentIndex == 2) {
          setCurrentIndex(0);
        }
      }
      else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayPictures.length);
      }
    }
    else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pictures.length);
    }
  };

  const prevImage = () => {
    if (ITS) {
      if (itemsToShow == 1) {
        setCurrentIndex(currentIndex - 1);
        if (currentIndex == 0) {
          setCurrentIndex(2);
        }
      }
      else {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + displayPictures.length) % displayPictures.length);
      }
    } else {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + pictures.length) % pictures.length
      );
    }
  };

  useEffect(() => {
    const picturesLength = pictures.length;

    if (location === 'mainImage') {
      if (picturesLength === 1) {
        setBtnDisplay(false);
      } else {
        setBtnDisplay(true);
      }
    } else {
      if (picturesLength > 3) {
        setBtnDisplay(true);
      }
      else {
        setBtnDisplay(false);
      }
    }

    if (picturesLength <= itemsToShow) {
      // If fewer pictures than itemsToShow, display all pictures without wrap-around
      setDisplayPictures(pictures);
    } else {
      // Otherwise, display itemsToShow pictures with wrap-around
      const newDisplayPictures = [];
      for (let i = 0; i < itemsToShow; i++) {
        const index = (currentIndex + i) % picturesLength;
        newDisplayPictures.push(pictures[index]);
      }
      setDisplayPictures(newDisplayPictures);
    }
  }, [pictures, currentIndex, itemsToShow]);

  if (!pictures || pictures.length === 0) {
    return (
      <div className="carousel">
        <img
          src="/images/placeholder.jpg"
          alt="No images available"
          style={{ height: 200, width: 200 }}
          loading="lazy"
        />
      </div>
    );
  }

  if (location === "thumbnail") {
    return (
      <div className="carousel">
        <div style={{ position: "relative" }}>
          <img
            src={pictures[currentIndex]?.url || "/images/placeholder.jpg"}
            alt={`image ${currentIndex + 1}`}
            style={{ height: "100vh", width: "100%" }}
            loading="lazy"
          />
        </div>
        <Button
          style={{ position: "absolute", top: "50vh" }}
          onClick={prevImage}
          location="carousel"
        >
          {"<"}
        </Button>
        <Button
          style={{
            position: "absolute",
            top: "50vh",
            right: 0,
          }}
          onClick={nextImage}
          location="carousel"
        >
          {">"}
        </Button>
      </div>
    );
  } else {
    return (
      <div className="carousel">
        {btnDisplay &&
          <Button
            onClick={prevImage}
            location="carousel"
          >
            {"<"}
          </Button>
        }
        {isMultiImage &&
          displayPictures.map((picture, index) => (
            <img
              key={index}
              src={picture.url}
              alt={`Product image ${index + 1}`}
            />
          ))
        }
        {!isMultiImage &&
          <img
            src={pictures[currentIndex]?.url || "/images/placeholder.jpg"}
            alt={`image ${currentIndex + 1}`}
            style={{ height: 200, width: 200 }}
            loading="lazy"
          />
        }
        {btnDisplay &&
          <Button
            onClick={nextImage}
            location="carousel"
          >
            {">"}
          </Button>}
      </div>
    );
  }
};

export default ImageCarousel;
