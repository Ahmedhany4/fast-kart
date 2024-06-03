import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product'
import Placeholder from '../../Components/Placeholder';
function ProductDetails() {
  let { productID } = useParams(0);
    const api_url = "https://x8ki-letl-twmt.n7.xano.io/api:CcyG8c7s/product_list";
  const [product, setProduct] = useState({});
  
  useEffect(() => {
    // Fetch data only if productId is a number
    if (true) {
      fetch(`${api_url}/${productID}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
        
    }
  }, [productID]); // useEffect depends on productId
  return (
    <div className='container'>
      {console.log(product)}
      <h1 className='mb-5'> Product Details # {productID} </h1>
      {console.log(product.price)}
      { product.id ?<Product product={product}  /> : <><Placeholder /> {console.log(product.price)}</> }
    </div>
  );
}

export default ProductDetails;
