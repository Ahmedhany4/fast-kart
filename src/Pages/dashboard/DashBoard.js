import { Route, Routes } from 'react-router-dom';
import Home from '../Home';
import Products from './Products';
import AddProduct from './AddProduct';
import ProductDetails from './ProductDetails';
import Sidebar from '../../Components/Sidebar';
import Navbar from './Navbar';
import '../css/dashboard.css'
import Categories from './Categories';
import AddCategories from './AddCategories';
import UpdateProduct from './UpdateProduct';
import UpdateCategory from './UpdateCategory';
function DashBoard() {
  return (
    <>
      <div className='container-fluid dashboard'>
        <div className='row'>
          <div className='col-2 sidebar'>
            <Sidebar />
          </div>
          <div className='col-10'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/categories/add' element={<AddCategories />} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/add' element={<AddProduct />} />
              <Route path='/products/:productID' element={<ProductDetails />} />  
              <Route path="/products/:id/edit" element={<UpdateProduct />} />
              <Route path="/categories/:id/edit" element={<UpdateCategory />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
