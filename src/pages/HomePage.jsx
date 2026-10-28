import SeriesCard from "../components/SeriesCard";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import StatusMessage from "../components/StatusMessage";
import { useSearchParams } from "react-router-dom";

function Homepage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const debonucedQuery = useDebounce(query, 500);
  const url =
    debonucedQuery === ""
      ? "https://api.tvmaze.com/shows"
      : `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(debonucedQuery)}`;

  const { serials, isLoading, isError, fetchSerials } = useFetch(url);
  const nothingFound =
  serials?.length === 0 &&
    !isLoading &&
    !isError &&
    debonucedQuery !== "";
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
