import { Link } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert

import Navbar from "../Components/Navbar";
import Product from "../Components/Product";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import "./css/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0); // State to store cart count

  const productUrl = "https://x8ki-letl-twmt.n7.xano.io/api:CcyG8c7s/product_list";
  const categoryUrl = "https://x8ki-letl-twmt.n7.xano.io/api:CcyG8c7s/category";
  const cartUrl = "https://x8ki-letl-twmt.n7.xano.io/api:-KEOAAw6/cart"; // Adjust this URL based on your backend API

  useEffect(() => {
    fetch(productUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
      
    fetch(categoryUrl)
      .then((response) => response.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addToCart = (product) => {
    const cartItem = {
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: product.quantity,
      // user_id: 1  // Include this if your app supports user authentication
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

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <Navbar cartCount={cartCount} /> {/* Pass cartCount as prop */}
      <h1 className="text-center mt-4 mb-5">Product Page</h1>
      
      <div className="container">
        <div className="filter-container">
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select id="categoryFilter" onChange={handleCategoryChange} value={selectedCategory}>
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="all-products mt-4">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            <div className="container">
              {filteredProducts.map((product) => (
                <div className="product-container" key={product.id}>
                  {/* Product component */}
                  <Product product={product} addToCart={addToCart} />
                </div>
              ))}
            </div>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Products;
