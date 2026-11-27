import Label from './Label';
import { GENRES } from '../config/genres';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

function SeriesCard({ serials }) {
  const { checkFavourSerials, addSerials, deleteSerials } = useFavorites();
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="serials-container">
        {serials.map((serial) => {
          const isFavorite = checkFavourSerials(serial.id);
          return (
            <div key={serial.id} className="series-cards">
              <button
                type="button"
                className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
                aria-label={
                  isFavorite ? 'Видалити з обраного' : 'Додати в обране'
                }
                aria-pressed={isFavorite}
                onClick={() => {
                  if (isFavorite) {
                    deleteSerials(serial.id);
                  } else {
                    addSerials(serial);
                  }
                }}
              >
                {isFavorite ? '♥' : '♡'}
              </button>
              {serial?.premiered &&
                Number(serial.premiered.slice(0, 4)) >= currentYear && (
                  <Label text="НОВИНКА" className="label--new" />
                )}
              {serial?.image?.medium ? (
                <img
                  src={serial.image.medium}
                  alt={serial.name}
                  height="350px"
                  width="280px"
                />
              ) : (
                <div className="poster-placeholder">Постер відсутній</div>
              )}
              <Link to={'/series/' + serial.id}>
                <h3>{serial.name}</h3>
              </Link>
              <div>
                {(serial.genres || []).map((genre) => {
                  const genreConfig = GENRES[genre];

                  if (!genreConfig) {
                    return null;
                  }

                  return (
                    <Label
                      key={genre}
                      className={clsx('label', genreConfig.className)}
                      text={genreConfig.label}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SeriesCard;
