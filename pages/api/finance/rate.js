import { addDoc, collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../../../store/firebase";

export const getRate = async () => {
  const rateCollection = collection(db, 'rate');
  const rateSnapshot = await getDocs(rateCollection);
  return rateSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
export const addRate = async (rate) => {
  const rateCollection = collection(db, 'rate');
  await addDoc(rateCollection, {
    curencyName: rate.curencyName,
    exchangeRate: rate.exchangeRate,
  });
}
export const updateRate = async (id, updatedData) => {
  const rateRef = doc(db, 'rate', id);
  await updateDoc(rateRef, {
    curencyName: updatedData.curencyName,
    exchangeRate: updatedData.exchangeRate,
  });
}
export const deleteRate = async (id) => {
  const rateRef = doc(db, 'rate', id);
  await deleteDoc(rateRef);
}