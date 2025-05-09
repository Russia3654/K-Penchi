import { db } from '../../../store/firebase';
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc }  from 'firebase/firestore';

export const getTextures = async () => {
  const texturesCollection = collection(db, 'textures');
  const textureSnapshot = await getDocs(texturesCollection);
  return textureSnapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
}

export const addTexture = async (texture) => {
  const texturesCollection = collection(db, 'textures');
  await addDoc (texturesCollection, {
    colorName: texture.colorName,
    materialName: texture.materialName,
    colorUrl: texture.colorUrl,
  });
}

export const updateTexture = async (id, updatedData) =>{
  const textureRef = doc(db, 'textures', id);
  await updateDoc(textureRef, {
    colorName: updatedData.colorName,
    materialName: updatedData.materialName,
    colorUrl: updatedData.colorUrl,
  })
}

export const deleteTexture = async (id) => {
  const textureRef = doc(db, 'textures', id);
  await deleteDoc(textureRef);
}
