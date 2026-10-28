import { Link, Outlet } from "react-router-dom";
function DetailLayout() {
  return (
    <>
      <div className="header-container">
        <img
          src="https://static.tvmaze.com/images/tvm-header-logo.png"
          alt="Logo"
        />
        <Link className="backButton" to="/">
          ← На головну
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default DetailLayout;
