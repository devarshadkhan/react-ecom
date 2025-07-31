// store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // each item: { id, title, price, quantity, image }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  incrementQuantity: (state, action) => {
  const id = action.payload;
  const item = state.items.find((item) => item.id === id);
  if (item) {
    item.quantity += 1;
  }
},
decrementQuantity: (state, action) => {
  const id = action.payload;
  const item = state.items.find((item) => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    state.items = state.items.filter((item) => item.id !== id);
  }
},

  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
