import React, { useState } from "react";
import Button from "../components/ui/Button/Button";

const SortingComponent = ({
  filter,
  setFilter,
  uniqueColors,
  uniqueMaterials,
  ...props
}) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isMaterialsOpen, setMaterialsOpen] = useState(false);
  const [isPriceOpen, setPriceOpen] = useState(false);
  const [isColorOpen, setColorOpen] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  const toggleMaterials = () => {
    setMaterialsOpen(!isMaterialsOpen);
  };

  const togglePrice = () => {
    setPriceOpen(!isPriceOpen);
  };

  const toggleColor = () => {
    setColorOpen(!isColorOpen);
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return (
      <div>
        <Button onClick={() => setIsFilter(!isFilter)}>Filter</Button>
        {isFilter && (
          <div {...props}>
            <div>
              <h3>MATERIALS</h3>
              <div>
                {uniqueMaterials.map((material) => (
                  <label key={material}>
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={() => handleMaterialChange(material)}
                    />
                    {material}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3>Color</h3>
              <div>
                {uniqueColors.map((color) => (
                  <label key={color}>
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => handleColorChange(color)}
                    />
                    {color}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3>Price</h3>
              <div>
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button
                location="sorting"
                onClick={() => {
                  const appliedFilters = {
                    minPrice: minPrice === "" ? 0 : minPrice,
                    maxPrice: maxPrice === "" ? 99999 : maxPrice,
                    materials: selectedMaterials,
                    colors: selectedColors,
                  };
                  setFilter(appliedFilters);
                  setIsFilter(false);
                }}
              >
                Apply Filters
              </Button>
              <Button
                location="sorting"
                onClick={() => {
                  setSelectedMaterials([]);
                  setSelectedColors([]);
                  setMinPrice("");
                  setMaxPrice("");
                  setFilter({
                    sort: "",
                    materials: [],
                    colors: [],
                    minPrice: 0,
                    maxPrice: 99999,
                  });
                  setIsFilter(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h3 onClick={toggleMaterials} style={{ cursor: "pointer" }}>
          MATERIALS {isMaterialsOpen ? "-" : "+"}
        </h3>
        {isMaterialsOpen && (
          <div>
            {uniqueMaterials.map((material) => (
              <label key={material}>
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(material)}
                  onChange={() => handleMaterialChange(material)}
                />
                {material}
              </label>
            ))}
          </div>
        )}

        <h3 onClick={toggleColor} style={{ cursor: "pointer" }}>
          COLOR {isColorOpen ? "-" : "+"}
        </h3>
        {isColorOpen && (
          <div>
            {uniqueColors.map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorChange(color)}
                />
                {color}
              </label>
            ))}
          </div>
        )}

        <h3 onClick={togglePrice} style={{ cursor: "pointer" }}>
          PRICE {isPriceOpen ? "-" : "+"}
        </h3>
        {isPriceOpen && (
          <div>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        )}

        <Button
          location="sorting"
          onClick={() => {
            const appliedFilters = {
              minPrice: minPrice === "" ? 0 : minPrice,
              maxPrice: maxPrice === "" ? 99999 : maxPrice,
              materials: selectedMaterials,
              colors: selectedColors,
            };
            setFilter(appliedFilters);
          }}
        >
          Apply Filters
        </Button>
        <Button
          location="sorting"
          onClick={() => {
            setSelectedMaterials([]);
            setSelectedColors([]);
            setMinPrice("");
            setMaxPrice("");
            setFilter({
              sort: "",
              materials: [],
              colors: [],
              minPrice: 0,
              maxPrice: 99999,
            });
          }}
        >
          Cancel
        </Button>
      </div>
    );
  }
};
export default SortingComponent;