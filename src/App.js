import './App.css';
import {Route, Routes } from 'react-router-dom';
import DashBoard from './Pages/dashboard/DashBoard';
import Index from './Pages/Index';
import Products from './Pages/Products' ;
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';
import Wishlist from './Pages/Wishlist';



function App() {
  return (
    <div className="App">


      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/dashboard/*' element={<DashBoard />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:productID' element={<ProductDetails />} />
      </Routes>

    </div>
  );
}

export default App;


