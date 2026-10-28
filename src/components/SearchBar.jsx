import { useSearchParams } from "react-router-dom";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  function handleChange(e){
    const next = e.target.value;
    setSearchParams(next ? {q:next} : {}, {replace:true});
  }
    return (
    <input
      type="text"
      placeholder="Пошук серіалу"
      value={q}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
