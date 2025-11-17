
import Card from "../components/Card";

function Home({
  items = [],
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onFavorite,
  onAddToCart,
  cartItems,
  isLoading,
}) {
 

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const itemsToRender = isLoading ? Array.from({ length: 8 }) : filteredItems;

    return itemsToRender.map((item, index) => (
      <Card
        // key={index}
        id={index} 
        imgUrl={
          !isLoading ? `${process.env.PUBLIC_URL + item.imgUrl}` : undefined
        }
        title={!isLoading ? item.title : undefined}
        price={!isLoading ? item.price : undefined}
        onAdd={!isLoading ? (obj) => onAddToCart(obj) : undefined}
        onFav={!isLoading ? (obj) => onFavorite(obj) : undefined}
        

        loading={isLoading}
      />
    ));
  };

  return (
    <div className="content clear">
      <div className="content-header d-flex justify-between align-center">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Каталог"}
        </h1>

        <div className="search-block d-flex align-center">
          <img
            className=""
            src={`${process.env.PUBLIC_URL}/img/search.svg`}
            alt="Поиск"
          />
          <input
            onChange={onChangeSearchInput}
            className="search"
            placeholder="Поиск..."
            value={searchValue}
          />
        </div>
      </div>

      <div className="items-container d-flex">{renderItems()}</div>
    </div>
  );
}

export default Home;
