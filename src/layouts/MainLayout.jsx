import SearchBar from "../components/SearchBar";

function MainLayout({ value, onChange, children }) {
  return (
    <>
      <div className="header-container">
        <img
          src="https://static.tvmaze.com/images/tvm-header-logo.png"
          alt="Logo"
        />
        <SearchBar value={value} onChange={onChange} />
      </div>

      {children}
    </>
  );
}

export default MainLayout;
