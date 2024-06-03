import { Link } from "react-router-dom";
import "./css/logo.css"
function Logo (){
  return (
    <div className="logo w-25 me-5">
    <Link className="navbar-brand" to="/">
      <span>fast</span>
      <span>kart</span>
      <span>.</span>
    </Link>
  </div>
  );
}
export default Logo ;