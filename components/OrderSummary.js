import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  const cartItems = useSelector(state => state.cart);

  const shippingCost = 5.00; // Fixed shipping cost
  const subtotal = cartItems.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
  const total = subtotal + shippingCost;

  return (
      <div style={{ marginBottom: '20px' }}>
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.finalPrice} x {item.quantity} (Color: {item.selectedColor}) {/* Display selected color */}

            </li>
          ))}
        </ul>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Shipping: ${shippingCost.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
  );
}

export default OrderSummary;
