import React, { useState } from "react";
import SearchContainer from "./SearchContainer";

const SearchModal = ({ products, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div>
      <h2>Search Results</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredProducts.length > 0 ? (
        filteredProducts.map((result, index) => (
          <SearchContainer key={index} product={result} onClose={onClose} />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchModal;
