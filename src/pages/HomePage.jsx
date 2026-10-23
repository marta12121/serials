import SeriesCard from "../components/SeriesCard";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import StatusMessage from "../components/StatusMessage";

function Homepage({ query }) {
  const debonusedQuery = useDebounce(query, 500);
  const url =
    debonusedQuery === ""
      ? "https://api.tvmaze.com/shows"
      : `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(debonusedQuery)}`;

  const { serials, isLoading, isError, fetchSerials } = useFetch(url);
  const nothingFound =
    serials &&
    serials.length === 0 &&
    !isLoading &&
    !isError &&
    debonusedQuery !== "";
  return (
    <>
      {isLoading && <StatusMessage message="Завантаження..." />}
      {isError && <StatusMessage message={isError} retry={fetchSerials} />}
      {nothingFound && <StatusMessage message="нічого не знайдено" />}
      {serials && !isLoading && !isError && <SeriesCard serials={serials} />}
    </>
  );
}

export default Homepage;
