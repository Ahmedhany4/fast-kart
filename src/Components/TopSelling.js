import React, { useEffect, useState } from "react";
import Product from "./Product";
import Swal from 'sweetalert2'; // Import SweetAlert
import "./css/TopSelling.css";

function TopSelling() {
  const cartUrl = "https://x8ki-letl-twmt.n7.xano.io/api:-KEOAAw6/cart"; // Adjust this URL based on your backend API
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0); // State to store cart count

  const addToCart = (product) => {
    const cartItem = {
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: product.quantity,
      
    };

    fetch(cartUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Product added to cart:", data);
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added to cart!',
        confirmButtonText: 'OK'
      });
      // Update cart count
      setCartCount(prevCount => prevCount + 1);
    })
    .catch(error => {
      console.error("Error adding product to cart:", error);
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonText: 'OK'
      });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:CcyG8c7s/product_list");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Show error alert
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch products!',
          confirmButtonText: 'OK'
        });
      }
    };
    fetchData();
  }, []);

  return (
    <section className="top-selling">
      <h1>Top Selling Items</h1>
      <div className="container">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}

export default TopSelling;
