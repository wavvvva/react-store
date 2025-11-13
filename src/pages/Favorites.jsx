import Card from "../components/Card";

function Favorites({items, onAddToCart, onFavorite}) {
  return (
    <div className="content clear">
      <div className="content-header d-flex justify-between align-center">
        <h1>Избранное</h1>
      </div>

      <div className="d-flex flex-wrap">
        
        <div className="items-container d-flex">
        {Array.isArray(items) &&
          items
            .map((item, index) => (
              <Card
                key={index}
                imgUrl={item.imgUrl}
                title={item.name}
                price={item.price}
                onAdd={() => onAddToCart(item)}
                onFav={() => onFavorite(item)}
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
