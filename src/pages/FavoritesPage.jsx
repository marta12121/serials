import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

function FavoritesPage(serial) {
  const { likeSerials, deleteSerials } = useFavorites();
  return likeSerials.length > 0 ? (
    <div className="favorites-list">
      {likeSerials.map((likeSerial) => {
        return (
          <div key={likeSerial.id} className="favorite-card">
            {likeSerial?.image ? (
              <img
                src={likeSerial.image}
                alt={likeSerial.name}
                className="favorite-card__poster"
              />
            ) : (
              <div className="poster-placeholder">Постер відсутній</div>
            )}
            <div className="favorite-card__info">
              <Link to={'/series/' + likeSerial.id}>
                <h3 className="favorite-card__title">{likeSerial.name}</h3>
              </Link>
              {likeSerial?.review?.rating ? (
                <div className="review favorite-card__rating">
                  ⭐{likeSerial.review?.rating}/10
                </div>
              ) : (
                <div className="review">Оцінка не виставлена</div>
              )}
              {likeSerial?.review?.reviewed === true ? (
                <div className="review favorite-card__status">Переглянуто</div>
              ) : (
                <div className="review">Ще не переглянуто</div>
              )}
              {likeSerial?.review?.note ? (
                <div className="review favorite-card__comment">
                  {likeSerial.review?.note}
                </div>
              ) : (
                <div className="review">Поки без коментаря</div>
              )}
            </div>
            <button
              type="button"
              className="remove-button"
              aria-label="Видалити з обраного"
              onClick={() => deleteSerials(likeSerial.id)}
            >
              Прибрати
            </button>
          </div>
        );
      })}
    </div>
  ) : (
    <>
      <h4>Ще нічого не додано</h4>
      <Link className="backButton" to="/">
        Перейти до пошуку
      </Link>
    </>
  );
}
export default FavoritesPage;
