import React, { useState } from 'react';
import { useSortedListProduct } from '../hooks/useProducts';
import Picture from './Picture';
import Modal from './ui/Modals/Modal';
import Button from './ui/Button/Button';

const ProductList = ({ products, onEdit, onDelete, productId }) => {
  const [modal, setModal] = useState(false);
  const [currentPictures, setCurrentPictures] = useState([]);
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const openPreview = (product) => {
    const productPictures = product.pictures; // Assuming pictures is an array of URLs
    setCurrentPictures(productPictures); // Set the state with all product pictures
    setModal(true);
  };

  const sortedProducts = useSortedListProduct(products, sort);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th onClick={() => setSort(sort === 'name_acs' ? 'name_des' : 'name_acs')}>
              <div>
                Name {
                  sort === 'name_acs'
                    ? <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/sort-up.png" alt="sort-up" />
                    : sort === 'name_des'
                      ? <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/sort-down.png" alt="sort-down" />
                      : ''}
              </div>
            </th>
            <th onClick={() => setSort(sort === 'price_low' ? 'price_high' : 'price_low')}>
              <div>
                Price {
                  sort === 'price_low'
                    ? <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/sort-up.png" alt="sort-up" />
                    : sort === 'price_high'
                      ? <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/26/FFFFFF/sort-down.png" alt="sort-down" />
                      : ''}
              </div>
            </th>
            <th>Description</th>
            <th>Colors</th>
            <th>Material</th>
            <th onClick={() => setSort(sort === 'quantity_low' ? 'quantity_high' : 'quantity_low')}>
              <div>
                Quantity {
                  sort === 'quantity_low'
                    ? <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/sort-up.png" alt="sort-up" />
                    : sort === 'quantity_high'
                      ? <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/FFFFFF/26/sort-down.png" alt="sort-down" />
                      : ''}
              </div>
            </th>
            <th>Pictures</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.finalPrice}</td>
              <td>{product.description}</td>
              <td>{Array.isArray(product.combination) ? product.combination.map((item, index) => <div key={`${item.color}-${index}`}>{item.color}</div>) : ''}</td>
              <td>{Array.isArray(product.combination) ? product.combination.map((item, index) => <div key={`${item.material}-${index}`}>{item.material}</div>) : ''}</td>
              <td>{Array.isArray(product.combination) ? product.combination.map((item, index) => <div key={`${item.quantity}-${index}`}>{item.quantity}</div>) : ''}</td>
              <td>
                <button onClick={() => openPreview(product)}>Preview</button>
              </td>
              <td className='btn-div'>
                <Button onClick={() => onEdit(product)} location="element">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"
                    style={{ fill: '#FFFFFF' }}>
                    <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"></path>
                  </svg>
                </Button>
                <Button onClick={() => onDelete(product.id)} location="element">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"
                    style={{ fill: '#FFFFFF' }}>
                    <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"></path>
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Button onClick={handlePrevious} disabled={currentPage === 1} location="element">
          Previous
        </Button>
        <div style={{ alignSelf: 'center', color: 'white' }}>
          Page {currentPage} of {totalPages}
        </div>
        <Button onClick={handleNext} disabled={currentPage === totalPages} location="element">
          Next
        </Button>
      </div>
      {modal && (
        <Modal visible={modal} setVisible={setModal} type="picture">
          <Picture
            pictures={currentPictures}
            visible={modal}
            setVisible={setModal}
            productId={productId}
            modes={{
              isEditing: false
            }}
            cloudLoader={null}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
