import { db } from '../../../store/firebase'; // Import Firestore
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'; // Import Firestore functions


// Function to create a new invoice
export const createInvoice = async (customerData, cartItems, cost) => {
  const invoicesCollection = collection(db, 'invoices');
  
  // Prepare order summary with product details
  const orderSummary = cartItems.map(item => ({
    productId: item.id,
    name: item.name,
    description: item.description, // Assuming description is available in cartItems
    finalPrice: item.finalPrice,
    combination: {
      color: item.combination.find(combo => combo.color === item.selectedColor).color, // Select color from combination
      material: item.combination.find(combo => combo.color === item.selectedColor).material // Select material from combination
    }, // Select combination based on selectedColor without quantity

    quantity: item.quantity,
  }));

  const shippingCost = cost[0];
  const subtotal = cost[1];
  const total = cost[2];

    // Update product quantities in the inventory
    for (const item of cartItems) {
      const productRef = doc(db, 'products', item.id);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data();
        const updatedCombination = productData.combination.map(combo => {
          if (combo.color === item.selectedColor) {
            return {
              ...combo,
              quantity: combo.quantity - item.quantity // Decrease quantity based on selected color
            };
          }
          return combo;
        });
        await updateDoc(productRef, { combination: updatedCombination });
      }
    }

    await addDoc(invoicesCollection, {

    customer: {
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      phone: customerData.phone,
      address: customerData.address,
    },
    orderSummary: orderSummary,
    subtotal: subtotal,
    shipping: shippingCost,
    total: total,
    createdAt: new Date(),
  });
};

export const getInvoiceByID = async (id) => {
  const invoiceRef = doc(db, 'invoices', id);
  const invoiceSnapshot = await getDoc(invoiceRef);
  return invoiceSnapshot.exists() ? { id: invoiceSnapshot.id, ...invoiceSnapshot.data()} : null;
}
