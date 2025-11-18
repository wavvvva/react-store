import React from "react";
import Card from "../components/Card";
import {AppContext} from "../App"

function Favorites({onAddToCart, onFavorite}) {
  const {isLoading} = React.useContext(AppContext);
  const {favorites} = React.useContext(AppContext);
  const { IsItemAdded } = React.useContext(AppContext);
  return (
    <div className="content clear">
      <div className="content-header d-flex justify-between align-center">
        <h1>Избранное</h1>
      </div>

      <div className="d-flex flex-wrap">
        
        <div className="items-container d-flex">
        {Array.isArray(favorites) &&
          favorites
            .map((item, index) => (
              <Card
                key={index}
                imgUrl={`${item.imgUrl}`}
                title={item.name}
                price={item.price}
                onAdd={(obj) => onAddToCart(obj)}
                onFav={(obj) => onFavorite(obj)}
                loading = {isLoading}
                isFavorite={true}
                {...item}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
