import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header d-flex justify-between align-center">
      <Link to='/react-store'>
        <div className="d-flex align-center">

          <img
            className="logo align-center mr-10"
            src={`${process.env.PUBLIC_URL}/logo512.png`}
          />

          <div className="headerInfo">
            <h3>React Store</h3>
            <p>Лучшие гаджеты по реактивным ценам</p>
          </div>
        </div>
      </Link>

      <ul className="headerRight d-flex justify-around">

        <li className="d-flex align-center mr-30 cu-p" onClick={props.onClickCart}>
          <img
            className="cart-img mr-10"
            src={`${process.env.PUBLIC_URL}/img/cart.svg`}
          />
          <span>1111 руб.</span>
        </li>

        <Link to="/react-store/favorites">
          <li className="d-flex align-center mr-30">
            <img
              className="mr-10"
              src={`${process.env.PUBLIC_URL}/img/favorites.svg`}
            />
            <p>Избранное</p>
          </li>
        </Link>

        <Link to="/react-store/profile">
          <li className="user d-flex align-center">
            <img
              className="mr-10"
              src={`${process.env.PUBLIC_URL}/img/user.svg`}
            />
            <p>Профиль</p>
          </li>
        </Link>

      </ul>
    </header>
  );
}

export default Header;
