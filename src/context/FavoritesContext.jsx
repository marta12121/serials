import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [likeSerials, setLikeSerials] = useLocalStorage('favorites', []);

  function addSerials(serial) {
    const { id, name, image } = serial;
    setLikeSerials((prev) =>
      prev.some((favorite) => favorite.id === serial.id)
        ? prev
        : [...prev, { id: id, name: name, image: image?.medium }],
    );
  }
  function deleteSerials(serialId) {
    setLikeSerials((prev) => prev.filter((serial) => serial.id !== serialId));
  }
  function checkFavourSerials(serialId) {
    return likeSerials.some((serial) => serial.id === serialId);
  }
  function saveReview(serial, review) {
    setLikeSerials((prev) => {
      const isFavorite = prev.some((favorite) => favorite.id === serial.id);
      if (isFavorite) {
        return prev.map((favorite) =>
          favorite.id === serial.id
            ? { ...favorite, review: review }
            : favorite,
        );
      }
      return [
        ...prev,
        {
          id: serial.id,
          name: serial.name,
          image: serial?.image?.medium,
          review: review,
        },
      ];
    });
  }
  return (
    <FavoritesContext
      value={{
        likeSerials,
        addSerials,
        deleteSerials,
        checkFavourSerials,
        saveReview,
      }}
    >
      {children}
    </FavoritesContext>
  );
}
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === null) {
    throw new Error('useFavorites має викликатися всередині FavoritesProvider');
  }
  return context;
}
