import { removePictureReferences } from "../product/products";

const IMAGEKIT_URL = "https://api.imagekit.io/v1/files/upload"; // ImageKit.io upload URL
const IMAGEKIT_GET_URL = "https://api.imagekit.io/v1/files"; // ImageKit.io get URL
const IMAGEKIT_DELETE_URL = "https://api.imagekit.io/v1/files"; // ImageKit.io delete URL
const IMAGEKIT_PRIVATE_KEY = "private_N4Olg4LMV8rQmwMsX5pmhjrxMCw="; // Accessing the private key from environment variables

export const uploadPicture = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name); // Set a file name

  const response = await fetch(IMAGEKIT_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(IMAGEKIT_PRIVATE_KEY + ":")}`, // Basic Auth with only private key
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to upload picture: ${errorData.message}`);
  }

  return await response.json(); // Return the response data
};

export const getPictures = async () => {
  try {
    const response = await fetch(IMAGEKIT_GET_URL, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(IMAGEKIT_PRIVATE_KEY + ":")}`, // Basic Auth with only private key
      },
    });
    const data = await response.json();
    return data.map((file) => ({ url: file.url, id: file.fileId })); // Return an array of objects with 'url' and 'fileId'
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const uploadThumbnail = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", `thumbnail_${file.name}`);
  formData.append("tags", "thumbnail");

  const response = await fetch(IMAGEKIT_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(IMAGEKIT_PRIVATE_KEY + ":")}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to upload thumbnail: ${errorData.message}`);
  }

  return await response.json();
};

export const getThumbnails = async () => {
  try {
    const response = await fetch(`${IMAGEKIT_GET_URL}?tags=thumbnail`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(IMAGEKIT_PRIVATE_KEY + ":")}`,
      },
    });
    const data = await response.json();
    return data.map((file) => ({ url: file.url, id: file.fileId }));
  } catch (error) {
    throw error;
  }
};

export const deleteThumbnail = async (fileId, fileUrl) => {
  await removePictureReferences(fileUrl);

  const response = await fetch(`${IMAGEKIT_DELETE_URL}/${fileId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${btoa(IMAGEKIT_PRIVATE_KEY + ":")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to delete thumbnail: ${errorData.message}`);
  }

  if (response.status === 204) {
    return { message: "Thumbnail deleted successfully" };
  }

  return await response.json();
};

export const deletePicture = async (fileId, fileUrl) => {
  // First remove all references to this picture in products
  await removePictureReferences(fileUrl);

  // Then delete the picture from ImageKit
  const response = await fetch(`${IMAGEKIT_DELETE_URL}/${fileId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${btoa(IMAGEKIT_PRIVATE_KEY + ":")}`, // Basic Auth with only private key
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to delete picture: ${errorData.message}`);
  }

  // Check if the response has a body before parsing
  if (response.status === 204) {
    return { message: "Picture deleted successfully" }; // Handle successful deletion with no content
  }

  return await response.json(); // Return the response data
};

export const uploadTexturePicture = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name); // Set a file name
  formData.append("folder", "/Texture");
  formData.append("tags", "texture");

  const response = await fetch(IMAGEKIT_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(IMAGEKIT_PRIVATE_KEY + ":")}`, // Basic Auth with only private key
    },
    body: formData,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to upload picture: ${errorData.message}`);
  }
  return await response.json(); // Return the response data
};

export const getTexturePicture = async () => {
  try {
    const response = await fetch(`${IMAGEKIT_GET_URL}?tags=texture`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(IMAGEKIT_PRIVATE_KEY + ":")}`, // Basic Auth with only private key
      },
    });
    const data = await response.json();
    console.log(data);
    
    return data.map((file) => ({ url: file.url, id: file.fileId })); // Return an array of objects with 'url' and 'fileId'
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling function
  }
};
