import { Link } from "react-router-dom";

function Navbar() {
  return (

    <>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
      </ul>
    </>);
}
export default Navbar;