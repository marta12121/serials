import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import SeriesPage from "./pages/SeriesPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layouts/MainLayout";
import DetailLayout from "./layouts/DetailLayout";

function App() {
  const [query, setQuery] = useState("");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              children={<Homepage query={query} />}
            ></MainLayout>
          }
        />
        <Route
          path="/series/:id"
          element={<DetailLayout children={<SeriesPage />}></DetailLayout>}
        />
        <Route
          path="*"
          element={<DetailLayout children={<NotFoundPage />}></DetailLayout>}
        />
      </Routes>
    </>
  );
}

export default App;
