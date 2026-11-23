import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type FavoritesContextValue = {
  favoriteIds: string[];
  isFavorite: (itemId: string) => boolean;
  toggleFavorite: (itemId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const isFavorite = (itemId: string) => favoriteIds.includes(itemId);

  const toggleFavorite = (itemId: string) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(itemId)
        ? currentIds.filter((id) => id !== itemId)
        : [...currentIds, itemId],
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}
