import React, { useEffect, useState } from "react";
import { getProductById, getProducts, getProductsCount } from "../api/products"; // Import the API functions

import ProductDetail from "../components/ProductDetail";
import SortingComponent from "../components/SortingComponent"; // Import the SortingComponent
import Select from "../components/ui/Select/Select";
import { useSortedProducts } from "../hooks/useProducts";
import ProductView from "../components/ProductView";
import Modal from "../components/ui/Modals/Modal";
import { useRouter } from "next/router";
import { getTextures } from "../api/textures";

const ProductsPage = () => {
  const [filter, setFilter] = useState({
    sort: "",
    materials: [],
    colors: [],
    minPrice: 0,
    maxPrice: 99999,
  }); // Include materials, colors, minPrice, and maxPrice in filter state
  const [isSmall, setIsSmall] = useState(false);
  const [products, setProducts] = useState([]);
  const [texture, setTexture] = useState([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0); // New state for total count
  const [uniqueColors, setUniqueColors] = useState([]);
  const [uniqueMaterials, setUniqueMaterials] = useState([]);
  const [productSelectModalVisible, setProductSelectModalVisible] =
    useState(false);
  const [selectedState, setSelectedState] = useState();

  const router = useRouter();
  const { urlId, urlModal } = router.query;
  const sortedProducts = useSortedProducts(products, filter.sort);

  useEffect(() => {
    if (urlId) {
      getProductById(urlId).then((fetchedProduct) => {
        setSelectedState(fetchedProduct);
      });
    }
  }, [urlId, selectedState]);

  useEffect(() => {
    if (urlModal) {
      setProductSelectModalVisible(urlModal);
    }
  }, [urlModal]);

  useEffect(() => {
    const loadProducts = async () => {
      const count = await getProductsCount(); // Get total products count
      setTotalProductsCount(count); // Set the total count

      const productList = await getProducts();
      setProducts(productList);

      const textureList = await getTextures();
      setTexture(textureList);

      // Extract unique colors and materials
      const colors = [
        ...new Set(
          productList.flatMap((product) =>
            product.combination.map((item) => item.color)
          )
        ),
      ];
      const materials = [
        ...new Set(
          productList.flatMap((product) =>
            product.combination.map((item) => item.material)
          )
        ),
      ];
      setUniqueColors(colors);
      setUniqueMaterials(materials);
    };

    loadProducts();
  }, []);

  // Filter products based on selected materials and colors
  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.finalPrice >= filter.minPrice &&
      product.finalPrice <= filter.maxPrice &&
      (filter.materials.length === 0 ||
        product.combination.some((item) =>
          filter.materials.includes(item.material)
        )) &&
      (filter.colors.length === 0 ||
        product.combination.some((item) => filter.colors.includes(item.color)))
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth <= 768);
    };
    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="page">
      <h1>Products</h1>
      <div className="productsSortingContainer">
        <div>
          {isSmall === false && (
            <SortingComponent
              filter={filter}
              setFilter={setFilter}
              uniqueColors={uniqueColors}
              uniqueMaterials={uniqueMaterials}
            />
          )}
        </div>
        <div>
          <div className="productHead">
            {isSmall === true && (
              <SortingComponent
                filter={filter}
                setFilter={setFilter}
                uniqueColors={uniqueColors}
                uniqueMaterials={uniqueMaterials}
                className="sortingContainer"
              />
            )}
            <Select
              value={filter.sort}
              onChange={(selectedSort) =>
                setFilter({ ...filter, sort: selectedSort })
              }
              defaultValue="feature"
              options={[
                { value: "name_acs", name: "form A to Z" },
                { value: "name_des", name: "form Z to A" },
                { value: "price_low", name: "price, low to high" },
                { value: "price_high", name: "price, high to low" },
              ]}
            />
          </div>
          <div className="productSection">
            {filteredProducts.map((product) => (
              <ProductDetail key={product.id} product={product} texture={texture}/>
            ))}
            {productSelectModalVisible && (
              <Modal
                visible={productSelectModalVisible}
                setVisible={setProductSelectModalVisible}
                type="productForm"
              >
                {selectedState && (
                  <ProductView
                    product={selectedState}
                    texture={texture}
                    setVisible={setProductSelectModalVisible}
                  />
                )}
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
