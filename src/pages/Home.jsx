import Card from "../components/Card";

function Home({
  items = [],
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onFavorite,
  onAddToCart,
}) {
  return (
    <div className="content clear">
      <div className="content-header d-flex justify-between align-center">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Каталог"}
        </h1>
        <div className="search-block d-flex align-center">
          <img className="" src="/img/search.svg" alt="Поиск" />
          <input
            onChange={onChangeSearchInput}
            className="search"
            placeholder="Поиск..."
            value={searchValue}
          />
        </div>
      </div>

      <div className="items-container d-flex">
        {Array.isArray(items) &&
          items
            .filter((item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                imgUrl={item.imgUrl}
                title={item.name}
                price={item.price}
                onAdd={() => onAddToCart(item)}
                onFav={() => onFavorite(item)}
              />
            ))}
      </div>
    </div>
  );
}

export default Home;
