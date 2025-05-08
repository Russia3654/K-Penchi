import { createStore } from 'redux';

const initialState = {
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.cart.findIndex(
        item => item.id === action.payload.id && item.selectedColor === action.payload.selectedColor
      );
      
      if (existingItemIndex >= 0) {
        // If item exists, increase by specified quantity
        return {
          ...state,
          cart: state.cart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      
      // If new item, add with specified quantity
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    }
    case 'REMOVE_FROM_CART': {
      const { id, selectedColor, quantity = 1 } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.id === id && item.selectedColor === selectedColor);
      
      if (existingItemIndex >= 0) {
        const existingItem = state.cart[existingItemIndex];
        const newQuantity = existingItem.quantity - quantity;
        
        if (newQuantity <= 0) {
          // Remove item completely if quantity reaches 0
          return {
            ...state,
            cart: state.cart.filter(item => !(item.id === id && item.selectedColor === selectedColor))
          };
        }
        
        // Reduce quantity
        return {
          ...state,
          cart: state.cart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: newQuantity }
              : item
          )
        };
      }
      return state;
    }
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
