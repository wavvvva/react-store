import React from "react";
import { AppContext } from "../../App";

export const Info = ({title, description, image}) => {
    const {setCartOpened} = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column">
      <img
        className="mb-20"
        src={`${process.env.PUBLIC_URL}${image}`}
        alt="empty"
      />
      <h2>{title}</h2>
      <p className="opacity-6">{description}
      </p>
      <button onClick={() => setCartOpened(false)} className="GreenButton">
        <img src={`${process.env.PUBLIC_URL}/img/arrow.svg`} alt="arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
