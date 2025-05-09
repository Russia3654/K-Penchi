import React, { useState } from 'react';
import Input from './ui/Input/Input';
import { uploadTexturePicture } from '../pages/api/pictures/pictures';

const TextureManagement = () => {
  const [loading, setLoading] = useState(false);
  const [upLoading, setUpLoading] = useState(false);

  const handleColorChange = async (files) => {
    console.log('Color files selected:', files); // Log the selected files
    const uploadedColors = [];
    setUpLoading(true);
    try {
      for (const file of files) {
        const fileData = await uploadTexturePicture(file);
        uploadedColors.push({ url: fileData.url, id: fileData.fileId });
        console.log(fileData);
      }
    } catch (error) {
      console.error('Error uploading pictures: ', error);
    } finally {
      setUpLoading(false);
    }
  }

  return (
    <div>
      <h2>Color Picture Management</h2>
      <Input
        type="file"
        text="Select Color Pictures"
        componentName="TextureManagement"
        multiple
        onChange={(e) => handleColorChange(e.target.files)}
      />
    </div>
  );
}

export default TextureManagement;
