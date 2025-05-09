import React, { useEffect, useState } from 'react';
import { deletePictureFromProduct } from '../pages/api/product/products';
import Loader from './ui/Loader/Loader';

const Picture = ({ pictures, setVisible, productId, setPicture, cloudLoader, deletePicture, modes }) => {
  const [currentPictures, setCurrentPictures] = useState(pictures);
  const [selectedPictures, setSelectedPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pictureToDelete, setPictureToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (pictures.length > 0) {
      setLoading(true);
      setCurrentPictures(pictures);
      setLoading(false);
    }
  }, [pictures]);

  useEffect(() => {
    const fetchPictures = async () => {
      setLoading(true);
      try {
        await cloudLoader();
      } catch (error) {
        console.error('Error loading pictures:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPictures();
  }, []);

  const filteredPictures = currentPictures.filter(picture => {
    if (!searchQuery.trim()) return true;
    
    const terms = searchQuery.toLowerCase().split(',').map(t => t.trim());
    const url = picture?.url || '';
    
    // Extract filename from URL (part after last / and before ? or #)
    const filename = url.split('/').pop().split(/[?#]/)[0].toLowerCase();
    
    return terms.some(term => 
      term && filename.includes(term)
    );
  });

  const handleRemovePicture = async (picture) => {
    await deletePictureFromProduct(productId, picture);
    setCurrentPictures(currentPictures.filter(p => p !== picture));
    setPicture(currentPictures.filter(p => p !== picture));
  };

  const handleSelectPicture = (picture) => {
    if (modes.isSelecting) {
      setSelectedPictures((prev) => {
        if (prev.includes(picture)) {
          return prev.filter((p) => p !== picture);
        }
        return [...prev, picture];
      });
    }
  };

  const handleSubmitSelectedPictures = () => {
    setPicture(selectedPictures);
    setVisible(false);
  };

  return (
    <div>
      <h2>{modes.isSelecting ? "Select Pictures" : "Picture Preview"}</h2>
      <input 
        type='text'
        placeholder='Search picture...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="picture-container">
          {filteredPictures.map((picture, index) => (
              <div
                key={index}
                onClick={() => handleSelectPicture(picture)}
                className={`picture-item ${modes.isSelecting && selectedPictures.includes(picture) ? 'selected' : ''}`}
              >
                <img
                  src={picture.url}
                  alt={`Product Preview ${index}`}
                  loading="lazy"
                  style={{ width: '100px', height: '100px' }}
                />

                {modes.isUploading ? (
                  <button 
                    onClick={() => {
                      setPictureToDelete(picture);
                      setShowConfirm(true);
                    }}
                    disabled={deletingId === picture.id}
                  >
                    X
                  </button>
                ) : (modes.isEditing && !modes.isSelecting) && (
                  <button onClick={() => handleRemovePicture(picture)}>X</button>
                )}
              </div>
            ))}
        </div>
      )}
      {modes.isSelecting && (
        <div>
          <button onClick={handleSubmitSelectedPictures}>Submit Selected Pictures</button>
        </div>
      )}
      {modes.isUploading && showConfirm && (
        <div>
          <p>Are you sure you want to delete this picture?</p>
          <button 
            onClick={async () => {
              setShowConfirm(false);
              setDeletingId(pictureToDelete.id);
              try {
                await deletePicture(pictureToDelete.id, pictureToDelete.url);
                setCurrentPictures(prev => prev.filter(p => p.id !== pictureToDelete.id));
              } catch (error) {
                console.error('Delete error:', error);
                alert('Failed to delete picture');
              } finally {
                setDeletingId(null);
                setPictureToDelete(null);
              }
            }}
            style={{marginRight: '10px'}}
          >
            Yes, Delete
          </button>
          <button onClick={() => {
            setShowConfirm(false);
            setPictureToDelete(null);
          }}>
            Cancel
          </button>
        </div>
      )}
      <button onClick={() => setVisible(false)}>Close</button>
    </div>
  );
};

export default Picture;