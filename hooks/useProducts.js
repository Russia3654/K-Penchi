import { useMemo } from "react";

export const useSortedProducts = (products, sort) => {
  const sortedProducts = useMemo(() => {
    if (sort) {
      return [...products].sort((a, b) => {
        if (sort === 'name_acs' && a.name && b.name) {
          return a.name.localeCompare(b.name);
        }
        if (sort === 'name_des' && a.name && b.name) {
          return b.name.localeCompare(a.name);
        }
        if (sort === 'price_low' && a.finalPrice !== undefined && b.finalPrice !== undefined) {
          return a.finalPrice - b.finalPrice;
        }
        if (sort === 'price_high' && a.finalPrice !== undefined && b.finalPrice !== undefined) {
          return b.finalPrice - a.finalPrice;
        }
        return 0;
      });
    }
    return products;
  }, [sort, products]);

  return sortedProducts;
};

// New function specifically for product list sorting
export const useSortedListProduct = (products, sort) => {
  const sortedProducts = useMemo(() => {
    if (sort) {
      return [...products].sort((a, b) => {
        if (sort === 'name_acs' && a.name && b.name) {
          return a.name.localeCompare(b.name);
        }
        if (sort === 'name_des' && a.name && b.name) {
          return b.name.localeCompare(a.name);

        }
        if (sort === 'price_low' && a.finalPrice !== undefined && b.finalPrice !== undefined) {
          return a.finalPrice - b.finalPrice;
        }
        if (sort === 'price_high' && a.finalPrice !== undefined && b.finalPrice !== undefined) {
          return b.finalPrice - a.finalPrice;
        }
        if (sort === 'quantity_low' && a.quantity !== undefined && b.quantity !== undefined) {
          return a.quantity - b.quantity;
        }
        if (sort === 'quantity_high' && a.quantity !== undefined && b.quantity !== undefined) {
          return b.quantity - a.quantity;
        }
        return 0;
      });
    }
    return products;
  }, [sort, products]);

  return sortedProducts;
};

export const usePosts = (products, sort, query) => {
    const sortedProducts = useSortedProducts(products, sort);
    const sortedAndSearchedProducts = useMemo(()=>{
        return sortedProducts.filter(product => product.name.toLowerCase().includes(query))
    }, [query, sortedProducts])

    return sortedAndSearchedProducts;
}
