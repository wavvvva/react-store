import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';
import { AppContext } from '../../App';


function Card({
  id,
  imgUrl = '',
  title = '',
  price = '',
  onAdd,
  onFav,
  isFavorite = false,
  
  loading = false
}) {
  
  const [isFav, setIsFav] = React.useState(isFavorite);
  const { IsItemAdded } = React.useContext(AppContext);

  
  const handleClickAdd = () => {
    onAdd({ id, title, price, imgUrl });
    
  };

  const handleClickFav = () => {
    onFav({ id, title, price, imgUrl });
    setIsFav(!isFav);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader 
          speed={2}
          width={168}
          height={230}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
          <rect x="0" y="107" rx="3" ry="3" width="150" height="15" /> 
          <rect x="0" y="126" rx="4" ry="4" width="93" height="15" /> 
          <rect x="0" y="163" rx="8" ry="8" width="80" height="24" /> 
          <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <button className={styles.cardFavButton} onClick={handleClickFav}>
            <img
              src={
                isFav
                  ? `${process.env.PUBLIC_URL}/img/favButtonActive.svg`
                  : `${process.env.PUBLIC_URL}/img/favButton.svg`
              }
              alt="favorite button"
            />
          </button>

          <img className={styles.cardImage} src={imgUrl} alt={title} />

          <h5 className="mb-10">{title}</h5>

          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <p>Цена:</p>
              <b>{price.toLocaleString('ru-RU')} руб.</b>
            </div>

            <button className={styles.cardAddButton} onClick={handleClickAdd}>
              <img
                src={
                  IsItemAdded(title)
                    ? `${process.env.PUBLIC_URL}/img/addButtonActive.svg`
                    : `${process.env.PUBLIC_URL}/img/addButton.svg`
                }
                alt="add button"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;