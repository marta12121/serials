import SearchBar from "../components/SearchBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <div className="header-container">
        <img
          src="https://static.tvmaze.com/images/tvm-header-logo.png"
          alt="Logo"
        />
        <SearchBar />
      </div>

      <Outlet />
    </>
  );
}

export default MainLayout;
