import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      const local = localStorage.getItem('rethread_wishlist');
      setWishlist(local ? JSON.parse(local) : []);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/users/wishlist');
      setWishlist(data || []);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    }
  };

  const toggleWishlist = async (product) => {
    const isAlreadySaved = wishlist.some((item) => (item._id || item) === product._id);

    if (user) {
      try {
        const { data } = await api.post(`/users/wishlist/${product._id}`);
        if (isAlreadySaved) {
          setWishlist((prev) => prev.filter((item) => (item._id || item) !== product._id));
          toast('Removed from saved items', { icon: '🤍' });
        } else {
          setWishlist((prev) => [...prev, product]);
          toast.success('Saved to your wishlist! ❤️');
        }
      } catch (err) {
        toast.error('Could not update wishlist');
      }
    } else {
      // Local fallback for guest
      let updated;
      if (isAlreadySaved) {
        updated = wishlist.filter((item) => (item._id || item) !== product._id);
        toast('Removed from wishlist', { icon: '🤍' });
      } else {
        updated = [...wishlist, product];
        toast.success('Saved to wishlist! ❤️');
      }
      setWishlist(updated);
      localStorage.setItem('rethread_wishlist', JSON.stringify(updated));
    }
  };

  const isSaved = (productId) => {
    return wishlist.some((item) => (item._id || item) === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isSaved,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
