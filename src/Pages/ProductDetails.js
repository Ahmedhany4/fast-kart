import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from './Product';
import Placeholder from '../Components/Placeholder';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2'; // Import SweetAlert for notifications

const api_url = "https://x8ki-letl-twmt.n7.xano.io/api:CcyG8c7s/product_list";
const cartUrl = "https://x8ki-letl-twmt.n7.xano.io/api:-KEOAAw6/cart"; // Cart API endpoint

function ProductDetails() {
  let { productID } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (productID) {
      fetch(`${api_url}/${productID}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productID]);

  const addToCart = (product) => {
    const cartItem = {
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1, // Default quantity set to 1
    };

    fetch(cartUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product added to cart!',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <h1 className='mb-5'> Product Details # {productID} </h1>
        {product.id ? (
          <>
            <Product product={product} />
            <button className='btn btn-primary mt-3 mb-5' onClick={() => addToCart(product)}>Add to Cart</button>
          </>
        ) : (
          <Placeholder />
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
