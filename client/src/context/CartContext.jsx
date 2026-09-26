import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('rethread_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('rethread_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize) => {
    const existing = cartItems.find((item) => item.product === product._id);
    if (existing) {
      toast('Item is already in your eco-bag!', { icon: '🛍️' });
      return false;
    }

    const newItem = {
      product: product._id,
      title: product.title,
      image: product.images[0],
      price: product.price,
      originalPrice: product.originalPrice,
      size: selectedSize || product.size,
      condition: product.condition,
      brand: product.brand,
      waterSavedLitres: product.waterSavedLitres || 2500,
      co2OffsetKg: product.co2OffsetKg || 3.5,
      seller: product.seller?._id || product.seller,
      sellerName: product.seller?.name || 'Thrift Curator',
    };

    setCartItems((prev) => [...prev, newItem]);
    toast.success(`Added "${product.title}" to bag! 🌿`);
    return true;
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product !== productId));
    toast('Item removed from bag', { icon: '🗑️' });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('rethread_cart');
  };

  // Calculations
  const itemsCount = cartItems.length;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const originalTotal = cartItems.reduce((acc, item) => acc + (item.originalPrice || item.price * 1.5), 0);
  const totalSavings = originalTotal - subtotal;
  const shippingPrice = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const totalPrice = subtotal + shippingPrice;

  const waterSavedTotal = cartItems.reduce((acc, item) => acc + (item.waterSavedLitres || 2500), 0);
  const co2SavedTotal = Math.round(cartItems.reduce((acc, item) => acc + (item.co2OffsetKg || 3.5), 0) * 10) / 10;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        itemsCount,
        subtotal,
        originalTotal,
        totalSavings,
        shippingPrice,
        totalPrice,
        waterSavedTotal,
        co2SavedTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
