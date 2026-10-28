import "./App.css";
import { Routes, Route} from "react-router-dom";
import Homepage from "./pages/HomePage";
import SeriesPage from "./pages/SeriesPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layouts/MainLayout";
import DetailLayout from "./layouts/DetailLayout";

function App() {

  return (
    <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
        </Route>
        <Route element={<DetailLayout />}>
          <Route path="series/:id" element={<SeriesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
  );
}

export default App;
