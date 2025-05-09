import React, { useEffect, useState } from 'react';
import Loader from './ui/Loader/Loader';
import ColorList from './ColorList';
import { addTexture, deleteTexture, getTextures, updateTexture } from '../pages/api/pictures/textures';
import Modal from './ui/Modals/Modal';
import ColorForm from './ColorForm';
import Picture from './Picture';
import Button from './ui/Button/Button';

const ColorManager = () => {
  const [colors, setColors] = useState([]);
  const [colorId, setColorId] = useState("");
  const [colorName, setColorName] = useState("");
  const [colorMaterial, setColorMaterial] = useState("");
  const [colorTexture, setColorTextures] = useState([]);
  const [currentTexture, setCurrentTextures] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [modal, setModal] = useState(false);
  const [colorModal, setColorModal] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading

  const loadColors = async () => {
    setLoading(true);
    const colorList = await getTextures();
    setColors(colorList);
    setLoading(false);
  }

  useEffect(() => {
    loadColors();
  }, []);

  const handelAddColor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTexture({
        colorName: colorName,
        materialName: colorMaterial,
        colorUrl: colorTexture
      });
      resetForm();
      loadColors();
    } catch (error) {
      console.error("Error adding product: ", error);
    } finally {
      setLoading(false);
    }
  };
  const handelUpdateColor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTexture(colorId, {
        colorName: colorName,
        materialName: colorMaterial,
        colorUrl: colorTexture
      });
      resetForm();
      loadColors();
    } catch (error) {
      console.error("Error updating product: ", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  }

  const handelDeleteColor = async (id) => {
    setLoading(true);
    try {
      await deleteTexture(id);
      resetForm();
      loadColors();
    } catch (error) {
      console.error("Error deleting color: ", error);
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setColorName("");
    setColorMaterial("");
    setColorId("");
    setColorTextures([]);
    setIsEditing(false);
    setColorModal(false);
  }
  
  return (
    <div>
      <div style={{display: 'flex'}}>
        <h2>Color List</h2>
        <Button onClick={() => { setColorModal(true) }} location="element">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"
            style={{ fill: '#FFFFFF' }}>
            <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"></path>
          </svg>
        </Button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ColorList
          colors={colors}
          onEdit={(color) => {
            setColorId(color.id)
            setColorName(color.colorName);
            setColorMaterial(color.materialName);
            setColorTextures(color.url);
            setIsEditing(true);
            setColorModal(true);
          }}
          onDelete={handelDeleteColor}
        />
      )}

      {colorModal && (
        <Modal visible={colorModal} setVisible={setColorModal} type="productForm">
          <ColorForm
            color={{
              colorName,
              colorMaterial,
              colorTexture,
              currentTexture,
            }}
            setColor={{
              setColorName,
              setColorMaterial,
              setColorTextures,
              setCurrentTextures,
              setModal,
            }}
            onAdd={handelAddColor}
            onEdit={handelUpdateColor}
            isEditing={isEditing}
            setIsSelecting={setIsSelecting}
            resetForm={resetForm}
          />
        </Modal>
      )}
      {modal && (
        <Modal visible={modal} setVisible={setModal} type="picture">
          <Picture
            pictures={currentTexture}
            setVisible={setModal}
            itemId={colorId}
            setPicture={setColorTextures}
            modes={{
              isEditing,
              isSelecting
            }}
            cloudLoader={null}
          />
        </Modal>
      )}
    </div>
  );
}

export default ColorManager;
