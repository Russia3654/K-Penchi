import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Button from './ui/Button/Button';


const Cart = ({ onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const handleCheckout = () => {
    router.push('/checkout');
    if (onClose) {
      onClose();
    }
  };

  const closeCart = () => {
    if (onClose) {
      onClose();
    }
  }


  return (
    <div>
      <div className='cartTitle'>
        <h2>Your Cart</h2>
        <Button onClick={closeCart}>X</Button>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Color: {item.selectedColor}</span> {/* Display selected color */}
                  <span>{item.name}</span>
                  <span>${item.finalPrice}</span>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span>Qty: {item.quantity}</span>
                    <button
                      onClick={() => dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: { id: item.id, selectedColor: item.selectedColor, quantity: 1 }
                      })}
                      style={{ padding: '2px 6px' }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: { id: item.id, selectedColor: item.selectedColor, quantity: item.quantity }
                      })}
                      style={{ padding: '2px 6px' }}
                    >
                      Remove All
                    </button>
                  </div>

                </div>
              </li>
            ))}
          </ul>
          <p>Total: ${cartItems.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0)}</p>

          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
