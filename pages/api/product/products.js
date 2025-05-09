import { db } from '../../../store/firebase'; // Import Firestore
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export const getProducts = async () => {
  const productsCollection = collection(db, 'products');
  const productSnapshot = await getDocs(productsCollection);
  return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductsCount = async () => {
  const productsCollection = collection(db, 'products');
  const productSnapshot = await getDocs(productsCollection);
  return productSnapshot.size; // Return the count of products
};

export const getProductById = async (id) => {
  const productRef = doc(db, 'products', id);
  const productSnapshot = await getDoc(productRef);
  return productSnapshot.exists() ? { id: productSnapshot.id, ...productSnapshot.data() } : null;
};

export const addProduct = async (product) => {
  const productsCollection = collection(db, 'products');
  await addDoc(productsCollection, {
    name: product.name,
    finalPrice: parseFloat(product.finalPrice),
    price: parseFloat(product.price),
    profit: parseFloat(product.profit),
    description: product.description,
    combination: product.combination,
    pictures: product.pictures,
  });
};

export const updateProduct = async (id, updatedData) => {
  const productRef = doc(db, 'products', id);
  await updateDoc(productRef, {
    name: updatedData.name,
    finalPrice: parseFloat(updatedData.finalPrice),
    price: parseFloat(updatedData.price),
    profit: parseFloat(updatedData.profit), // Corrected reference
    description: updatedData.description,
    combination: updatedData.combination,
    pictures: updatedData.pictures,
  });
};

export const deleteProduct = async (id) => {
  const productRef = doc(db, 'products', id);
  await deleteDoc(productRef); // Delete the product from Firestore
};

export const deletePictureFromProduct = async (id, pictureUrl) => {
  const productRef = doc(db, 'products', id);
  const productSnapshot = await getDoc(productRef);
  if (productSnapshot.exists()) {
    const productData = productSnapshot.data();
    const updatedPictures = productData.pictures.filter(picture => picture !== pictureUrl); // Remove the specified picture
    await updateDoc(productRef, { pictures: updatedPictures }); // Update the product with the new pictures array
  }
};

export const removePictureReferences = async (pictureUrl) => {
  try {
    const productsCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productsCollection);
    
    const updatePromises = [];
    let foundReferences = false;
    
    productSnapshot.forEach((doc) => {
      const productData = doc.data();
      if (productData.pictures) {
        // Check if any picture object's url contains the target URL
        const matchingPictures = productData.pictures.filter(picture => 
          picture.url && (picture.url.includes(pictureUrl) || pictureUrl.includes(picture.url))
        );
        
        if (matchingPictures.length > 0) {
          foundReferences = true;
          const updatedPictures = productData.pictures.filter(picture => 
            !picture.url || (!picture.url.includes(pictureUrl) && !pictureUrl.includes(picture.url))
          );

          updatePromises.push(updateDoc(doc.ref, { pictures: updatedPictures }));
        }
      }
    });
    await Promise.all(updatePromises);
  } catch (error) {
    throw new Error('Failed to remove picture references');
  }
};
