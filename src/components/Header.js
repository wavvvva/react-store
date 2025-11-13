import { Link } from "react-router-dom";

function Header(props){
  return  (<header className="header d-flex justify-between align-center">
        <Link to='/'>
        <div className="d-flex align-center">
           
          <img className="logo align-center mr-10" src="/logo512.png" />

          <div className="headerInfo">
            <h3>React Store</h3>
            <p>Лучшие гаджеты по реактивным ценам</p>
          </div>
        </div>
        </Link>
        <ul className="headerRight d-flex justify-around">
          <li className="d-flex align-center mr-30 cu-p" onClick={props.onClickCart}>
            <img className="cart-img mr-10 " src="img/cart.svg" />
            <span>1111 руб.</span>
          </li>
          <Link to='/favorites'>
          <li className="d-flex align-center mr-30">
            
            <img className="mr-10" src="img/favorites.svg" />
            
            <p>Избранное</p>
          </li>
          </Link>
          <Link to='/profile'>
          <li className="user d-flex align-center">
            <img className="mr-10" src="img/user.svg" />
            <p>Профиль</p>
          </li>
          </Link>
        </ul>
      </header>)
}

export default Header;