import { db } from '../store/firebase'; // Import Firestore
import { collection, getDocs, addDoc, getDoc, doc } from 'firebase/firestore';

// Function to check if a customer exists
export const checkCustomerExists = async (email) => {
  const customersCollection = collection(db, 'customers');
  const customerSnapshot = await getDocs(customersCollection);
  const existingCustomer = customerSnapshot.docs.find(doc => doc.data().email === email);
  return existingCustomer ? existingCustomer.id : null; // Return customer ID if exists
};

// Function to create a new customer
export const createCustomer = async (customerData) => {
  const customersCollection = collection(db, 'customers');
  await addDoc(customersCollection, {
    firstName: customerData.firstName,
    lastName: customerData.lastName,
    email: customerData.email,
    phone: customerData.phone,
    address: customerData.address,
  });
};
