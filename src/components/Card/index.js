import React from 'react';
import styles from './Card.module.scss'

function Card({id, imgUrl, title, price, onAdd, onFav, isFavorite = false}) {
    const [isAdd, setIsAdd] = React.useState(false);
    const [isFav, setIsFav] = React.useState(isFavorite);

    const handleClickAdd = function(){
        onAdd({title, price, imgUrl});
        setIsAdd(!isAdd);  
    };
    const handleClickFav = function(){
        onFav({id, title, price, imgUrl});
        setIsFav(!isFav);
    }

    React.useEffect(() => {
        
    }, [isAdd]);
    return (
    <div className={styles.card}>
                <button className={styles.cardFavButton} onClick={handleClickFav}>
                <img src={isFav ? '/img/favButtonActive.svg':'/img/favButton.svg'} alt="item favoirite button" />
                </button>
                <img className={styles.cardImage} src={imgUrl} alt="item" />
                <h5 className="mb-10">{title}</h5>
                <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <p>Цена:</p>
                    <b>{price} руб.</b>
                </div>
                <button className={styles.cardAddButton} onClick={handleClickAdd}>
                    <img src={isAdd ? '/img/addButtonActive.svg' : "/img/addButton.svg"} alt="item add button" />
                </button>
                </div>
            </div>
    )
}
export default Card;