import Label from "./Label";
import { GENRES } from "../config/genres";
import clsx from "clsx";
import { Link } from "react-router-dom";

function SeriesCard({ serials }) {
  return (
    <>
      <div className="serials-container">
        {serials.map((serial) => (
          <Link key={serial.id} to={"/series/" + serial.id}>
            <div className="series-cards">
              {serial.premiered.slice(0, 4) >= 2014 && (
                <Label text="НОВИНКА" className="label--new" />
              )}
              {serial.image && (
                <img
                  src={serial.image.medium}
                  alt={serial.name}
                  height="350px"
                />
              )}
              <h3>{serial.name}</h3>
              <div>
                {serial.genres.map((genre) => {
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
          </Link>
        ))}
      </div>
    </>
  );
}

export default SeriesCard;
