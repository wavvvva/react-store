import React from "react";
import Card from "../components/Card";
import axios from "axios";
import { AppContext } from "../App";

function Orders({ onAddToCart, onFavorite }) {
  const [orders, setOrders] = React.useState([]);
  const {isLoading} = React.useContext(AppContext);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://69160e16465a9144626eba53.mockapi.io/orders"
      );

      setOrders(data.map(obj => obj.items));
    })();
  }, []);

  return (
    <div className="orders content clear">
      <div className="content-header d-flex justify-between align-center">
        <h1 className="mb-5">{orders.length > 0 ? 'Покупки' : 'Заказов нет'}</h1>
      </div>

      {orders.map((orderItems, orderIndex) => (
        <div key={orderIndex} style={{ marginBottom: 40 }}>
          <h3>Заказ #{orderIndex + 1}</h3>

          <div className="orderItems d-flex flex-wrap">
            {orderItems.map((item, index) => (
              <Card
                key={index}
                imgUrl={item.imgUrl}
                title={item.name}
                price={item.price}
                onAdd={() => onAddToCart(item)}
                onFav={() => onFavorite(item)}
                isFavorite={false}
                loading={isLoading}
                {...item}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
