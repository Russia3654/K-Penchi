import React, { useEffect, useState } from 'react';
import Input from './ui/Input/Input';
import { getTexturePicture } from '../pages/api/pictures/pictures';

const ColorForm = ({color, setColor, onAdd, onEdit, isEditing, setIsSelecting, resetForm}) => {
    const [loadTextures, setLoadTextures] = useState([]); // New state for product pictures
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCloudTextures()
    }, [])

    const loadCloudTextures = async () => {
        setLoading(true);
        const fetchedTextures = await getTexturePicture();
        setLoadTextures(fetchedTextures);
        setLoading(false);
    };

    const openPictureSelect = () => {
        setIsSelecting(true);
        loadCloudTextures();
        setColor.setCurrentTextures(loadTextures);
        setColor.setModal(true);
    }

    const openPicturePreview = () => {
        setIsSelecting(false);
        setColor.setCurrentTextures(color.colorTexture);
        setColor.setModal(true); // Open the modal for previewing pictures
    };

    return (
        <div>
            <h2>{isEditing ? "Edit Texture" : "Add Texture"}</h2>
            <form onSubmit={isEditing ? onEdit : onAdd}>
                <Input
                    type="text"
                    placeholder="Color Name"
                    value={color.colorName}
                    onChange={(e) => setColor.setColorName(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Material Name"
                    value={color.colorMaterial}
                    onChange={(e) => setColor.setColorMaterial(e.target.value)}
                    required
                />
                <div>
                    <h3>Pictures</h3>
                    <button type="button" onClick={openPictureSelect}>
                        Select Pictures
                    </button>
                    <button type="button" onClick={openPicturePreview}>
                        Preview Pictures
                    </button>
                </div>
                {isEditing ? (
                    <button type='submit'>Update Texture</button>
                ) : (
                    <button type='submit'>Add Texture</button>
                )}
                <button onClick={resetForm}>Cancel</button>
            </form>
        </div>
    );
}

export default ColorForm;
