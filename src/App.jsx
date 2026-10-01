import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import SeriesPage from "./pages/SeriesPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layouts/MainLayout";
import DetailLayout from "./layouts/DetailLayout";
import { useFetch } from "./hooks/useFetch";
import { useDebounce } from "./hooks/useDebounce";
import StatusMessage from "./components/StatusMessage";
function App() {
  const [query, setQuery] = useState("");
  const debonusedQuery = useDebounce(query, 500);
  const url =
    debonusedQuery === ""
      ? "https://api.tvmaze.com/shows"
      : `https://api.tvmaze.com/search/shows?q=${debonusedQuery}`;

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
      {serials && !isLoading && !isError && (
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                children={<Homepage serials={serials} />}
              ></MainLayout>
            }
          />
          <Route
            path="/series/:id"
            element={<DetailLayout children={<SeriesPage />}></DetailLayout>}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
      {nothingFound && <StatusMessage message="нічого не знайдено" />}
    </>
  );
}

export default App;
