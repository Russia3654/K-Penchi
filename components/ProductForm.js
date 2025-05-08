import React, { useEffect, useState } from 'react';
import Tag from "./ui/Tag/Tag";
import Input from "./ui/Input/Input";
import { getPictures } from '../api/pictures';
import Button from './ui/Button/Button';

const ProductForm = ({ product, setProduct, onAdd, onEdit, isEditing, setIsSelecting, resetForm }) => {
  const [loadPictures, setLoadPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colorInput, setColorInput] = useState('');
  const [materialInput, setMaterialInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const clearInputs = () => {
    setColorInput('');
    setMaterialInput('');
    setQuantityInput('');
    setEditIndex(-1);
  };

  useEffect(() => {
    loadCloudPictures()
  }, [])

  const handleAddOrUpdateItem = () => {
    if (colorInput && materialInput && quantityInput) {
      const newItem = { color: colorInput, material: materialInput, quantity: quantityInput };
      if (editIndex === -1) {
        setProduct.setCombination([...product.combination, newItem]);
      } else {
        const newItems = product.combination.map((item, i) =>
          i === editIndex ? newItem : item
        );
        setProduct.setCombination(newItems);
      }
      clearInputs();
    }
  };

  const handleEditCombinationItem = (index) => {
    const item = product.combination[index];
    if (item) {
      setColorInput(item.color);
      setMaterialInput(item.material);
      setQuantityInput(item.quantity);
      setEditIndex(index);
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = product.combination.filter((_, i) => i !== index);
    setProduct.setCombination(newItems);
    clearInputs();
  };

  const loadCloudPictures = async () => {
    setLoading(true);
    const fetchedPictures = await getPictures();
    setLoadPictures(fetchedPictures);
    setLoading(false);
  };

  const openPictureSelect = () => {
    setIsSelecting(true);
    loadCloudPictures();
    setProduct.setCurrentPictures(loadPictures);
    setProduct.setModal(true);
  };

  const openPicturePreview = () => {
    setIsSelecting(false);
    setProduct.setCurrentPictures(product.productPictures);
    setProduct.setModal(true);
  };

  return (
    <div>
      <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={isEditing ? onEdit : onAdd}>
        <Input
          type="text"
          placeholder="Product Name"
          value={product.productName}
          onChange={(e) => setProduct.setProductName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Product Description"
          value={product.productDescription}
          onChange={(e) => setProduct.setProductDescription(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Product Price"
          value={product.productPrice}
          onChange={(e) => setProduct.setProductPrice(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Profit"
          value={product.profit}
          onChange={(e) => setProduct.setProfit(e.target.value)}
          required
        />

        <div>
          <h3>Pictures</h3>
          <Button type="button" onClick={openPictureSelect}>
            Select Pictures
          </Button>
          <Button type="button" onClick={openPicturePreview}>
            Preview Pictures
          </Button>
        </div>

        <div>
          <h3>Combinations</h3>
          <Input id="colorInput" type="text" placeholder="Color" value={colorInput} onChange={(e) => setColorInput(e.target.value)} />
          <Input id="materialInput" type="text" placeholder="Material" value={materialInput} onChange={(e) => setMaterialInput(e.target.value)} />
          <Input id="quantityInput" type="number" placeholder="Quantity" value={quantityInput} onChange={(e) => setQuantityInput(e.target.value)} />
          <Button type="button" onClick={handleAddOrUpdateItem}>
            {editIndex === -1 ? 'Add Combination' : 'Update Combination'}
          </Button>
        </div>
        {product.combination.map((item, index) => (
          <Tag
            key={index}
            item={item}
            object={`${item.color}, ${item.material}, ${item.quantity}`}
            update={() => handleEditCombinationItem(index)}
            remove={() => handleRemoveItem(index)}
          />
        ))}
        {isEditing ? (
          <Button type="submit">Update Product</Button>
        ) : (
          <Button type="submit">Add Product</Button>
        )}
        <Button onClick={resetForm}>Cancel</Button>
      </form>
    </div>
  );
}

export default ProductForm;