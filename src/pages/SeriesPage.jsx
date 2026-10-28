import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import StatusMessage from "../components/StatusMessage";
import Label from "../components/Label";
import { GENRES } from "../config/genres";
import clsx from "clsx";

function SeriesPage() {
  const { id } = useParams();
  const { serials, isLoading, isError, errorType, fetchSerials } = useFetch(
    `https://api.tvmaze.com/shows/${id}`,
  );
  return (
    <>
      {isLoading && <StatusMessage message="Завантаження..." />}
      {isError && <StatusMessage message={errorType === "offline"? "Немає підключення до інтернету. Перевірте з'єднання та спробуйте ще раз."
        : isError} retry={errorType === "not-found" ? null : fetchSerials} />}
      {serials && !isLoading && !isError && (
        <div className="series-card">
          {serials?.image?.medium ? (
            <img src={serials.image.medium} alt={serials.name} height="350px" />):( <div className="poster-placeholder">Постер відсутній</div>
          )}
          <h3>{serials.name}</h3>
          {serials.premiered && (
            <Label
              text={serials.premiered.slice(0, 4)}
              className="series-year"
            />
          )}
          <p className="series-rating">
            {serials?.rating?.average != null
              ?  (<>⭐{serials.rating.average}</>)
              : "Рейтинг відсутній"}
          </p>
          <div
            className="series-description"
            dangerouslySetInnerHTML={{
              __html: serials.summary || "Опис відсутній",
            }}
          />
          <div className="genres-container">
            {(serials.genres || []).map((genre) => {
              const genreConfig = GENRES[genre];

              if (!genreConfig) {
                return null;
              }

              return (
                <Label
                  key={genre}
                  className={clsx("label", genreConfig.className)}
                  text={genreConfig.label}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default SeriesPage;
