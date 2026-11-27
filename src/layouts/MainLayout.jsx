import SearchBar from '../components/SearchBar';
import { Link, Outlet } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

function MainLayout() {
  const { likeSerials } = useFavorites();
  return (
    <>
      <div className="header-container">
        <img
          src="https://static.tvmaze.com/images/tvm-header-logo.png"
          alt="Logo"
        />
        <div className="btns-container">
          <Link className="favourite" to="/favourites">
            ♥ {likeSerials.length > 0 ? likeSerials.length : null}
          </Link>
          <SearchBar />
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default MainLayout;
