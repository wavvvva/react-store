import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";

import React from "react";
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get(
        "https://6915c5a4465a9144626d7fab.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://69160e16465a9144626eba53.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://6915c5a4465a9144626d7fab.mockapi.io/items"
      );

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://6915c5a4465a9144626d7fab.mockapi.io/cart${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://6915c5a4465a9144626d7fab.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Не удалось добавить в корзину");
    }
  };
    React.useEffect(() => {
      const newTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
      setTotal(newTotal);    
    }, [cartItems]);
  const onFavorite = async (obj) => {
    try {
      if (
        favorites.find((newFavItem) => Number(newFavItem.id) === Number(obj.id))
      ) {
        axios.delete(
          `https://69160e16465a9144626eba53.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://69160e16465a9144626eba53.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  const removeItem = (id) => {
    axios.delete(`https://6915c5a4465a9144626d7fab.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClickCart = () => {
    setCartOpened(!cartOpened);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const IsItemAdded = (title) => {
    return cartItems.some((obj) => obj.title === title);
  };
  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        total,
        IsItemAdded,
        setCartOpened,
        setCartItems,
        setTotal
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Cart
            items={cartItems}
            onClickCart={handleClickCart}
            onRemove={removeItem}
          />
        )}
        <Header onClickCart={handleClickCart} />

        <Routes>
          <Route
            basename="/react-store"
            path="/react-store"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onFavorite={onFavorite}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/react-store/favorites"
            element={
              <Favorites
                items={favorites}
                onFavorite={onFavorite}
                onAddToCart={onAddToCart}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
