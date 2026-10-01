import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <>
      <h1>Not Found 404</h1>
      <Link className="backButton" to="/">
        ← На головну
      </Link>
    </>
  );
}
export default NotFoundPage;
