import { Link } from "react-router-dom";
import Logo from './Logo'
import './css/sidebar.css'
function Sidebar(){
  return (
    <div className="side-bar">
    <Logo />
      <ul className="list-unstyled">
        <li><Link className="nav-link active" to="/dashboard/products">Get All Products</Link></li>
        <li><Link className="nav-link active" to="/dashboard/categories">Get All Categories</Link></li>
      </ul>
    
    </div>
  );
}
export default Sidebar ;