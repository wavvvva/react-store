import React from "react";
import Info from "./Card/Info";
import { AppContext } from "../App";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


function Cart({ onClickCart, items = [], onRemove }) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const {cartItems, setCartItems} = React.useContext(AppContext);
  const {total} = React.useContext(AppContext);
  
  
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post("https://69160e16465a9144626eba53.mockapi.io/orders", {items: cartItems});
      
      

      //костыль для mockapi
      for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        await axios.delete('https://6915c5a4465a9144626d7fab.mockapi.io/cart/' + item.id);
        await delay(500);
      }

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      
    } catch (error) {
      console.log("Не удалось создать заказ")
    }
    setIsLoading(false);
    
  };



  return (
    <div style={{ display: "" }} className="overlay">
      <div className="cart d-flex flex-column align-between">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <button className="cartButtonClose" onClick={onClickCart}>
            <img
              src={`${process.env.PUBLIC_URL}/img/buttonClose.svg`}
              alt="close"
            />
          </button>
        </h2>

        {!(items.length > 0) ? (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан в доставку` :"Для заказа добавьте хотя бы одну позицию в корзину"}
            image={isOrderComplete ? "/img/order-complete.svg" :"/img/empty-cart.jpg"}
          />
        ) : (
          <div className="cartItems d-flex flex-column">
            {items.map((obj) => (
              <div
                key={obj.id} //
                className="cartItem d-flex justify-between align-center"
              >
                <div className="d-flex align-end">
                  <img src={`${obj.imgUrl}`} alt="product" />
                  <div className="cartItemInfo d-flex flex-column">
                    <p>{obj.title}</p>
                    <b>{obj.price.toLocaleString("ru-RU")} руб.</b>
                  </div>
                </div>

                <button className="cartItemButtonClose">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/buttonClose.svg`}
                    onClick={() => onRemove(obj.id)}
                    alt="remove"
                  />
                </button>
              </div>
            ))}

            <div className="cartTotal">
              <ul className="cartTotalBlock">
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{total.toLocaleString("ru-RU")} руб.</b>
                </li>

                <li>
                  <span>НДС 45%</span>
                  <div></div>
                  <b>{(total * 0.5).toLocaleString("ru-RU")} руб.</b>
                </li>
              </ul>

              <div>
                <button
                  disabled={isLoading}
                  onClick={onClickOrder}
                  className="GreenButton d-flex justify-center align-center"
                >
                  Оформить заказ
                  <img
                    src={`${process.env.PUBLIC_URL}/img/arrow.svg`}
                    alt="arrow"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
