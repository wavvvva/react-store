import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";

import React from "react";
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    axios
      .get("https://6915c5a4465a9144626d7fab.mockapi.io/items")
      .then((res) => setItems(res.data));
    axios
      .get("https://6915c5a4465a9144626d7fab.mockapi.io/cart")
      .then((res) => setCartItems(res.data));
    axios
      .get("https://69160e16465a9144626eba53.mockapi.io/favorites")
      .then((res) => setFavorites(res.data));
  }, []);

  const onAddToCart = (addedItem) => {
    setCartItems((prev) => [...prev, addedItem]);
    axios.post("https://6915c5a4465a9144626d7fab.mockapi.io/cart", addedItem);
  };

  const onFavorite = async (obj) => {
    if (favorites.find((newFavItem) => newFavItem.id === obj.id)) {

      axios.delete(
        `https://69160e16465a9144626eba53.mockapi.io/favorites/${obj.id}`
      );
     
    } else {
      
      const {data} = await axios.post(
        "https://69160e16465a9144626eba53.mockapi.io/favorites",
        obj
      );
      setFavorites((prev) => [...prev, data]);
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

  return (
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
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onFavorite={onFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
        <Route
          path="/favorites"
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
  );
}

export default App;
