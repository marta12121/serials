function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Пошук серіалу"
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchBar;
