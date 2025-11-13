function Cart({ onClickCart, items = [], onRemove }) {
  return (
    <div style={{ display: "" }} className="overlay">
      <div className="cart d-flex flex-column align-between">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <button className="cartButtonClose" onClick={onClickCart}>
            <img src="img/buttonClose.svg" alt="1"></img>
          </button>
        </h2>

        {!(items.length > 0) ? (
          <div className="cartEmpty d-flex align-center justify-center flex-column">
            <img className="mb-20" src="/img/empty-cart.jpg" alt="1" />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы одну позицию, чтобы сделать заказ
            </p>
            <button onClick={onClickCart} className="GreenButton">
              <img src="/img/arrow.svg" alt="1" />
              Вернуться назад
            </button>
          </div>
        ) : (
          <div className="cartItems d-flex flex-column">
            {items.map((obj) => (
              <div className="cartItem d-flex justify-between align-center">
                <div className="d-flex align-end">
                  <img src={obj.imgUrl} alt="1"></img>
                  <div className="cartItemInfo d-flex flex-column">
                    <p>{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                </div>
                <button className="cartItemButtonClose">
                  <img
                    src="img/buttonClose.svg"
                    onClick={() => onRemove(obj.id)}
                    alt="1"
                  ></img>
                </button>
              </div>
            ))}
          <div className="cartTotal">
            <ul className="cartTotalBlock">
              <li>
                <span>Итого:</span>
                <div></div>
                <b>1 000 000 руб.</b>
              </li>

              <li>
                <span>НДС 45%</span>
                <div></div>
                <b>500 000 руб.</b>
              </li>
            </ul>
            <div>
              <button className="GreenButton d-flex justify-center align-center">
                Оформить заказ
                <img src="img/arrow.svg" alt="arrow" />
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
