import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const wishlistUrl = "https://x8ki-letl-twmt.n7.xano.io/api:-KEOAAw6/wishlist"; // Replace with your backend API URL

// Utility function to generate star icons
function Stars({ count }) {
  const countStarSolid = Math.min(count, 5); // Ensure count does not exceed 5
  const countStarEmpty = 5 - countStarSolid;

  return (
    <>
      {[...Array(countStarSolid)].map((_, i) => (
        <FontAwesomeIcon key={`solid-${i}`} icon={solidIcons.faStar} />
      ))}
      {[...Array(countStarEmpty)].map((_, i) => (
        <FontAwesomeIcon key={`regular-${i}`} icon={regularIcons.faStar} />
      ))}
    </>
  );
}

// Utility function for exponential backoff
const fetchWithExponentialBackoff = async (url, options, retries = 5) => {
  let response, error;
  let delay = 1000;

  for (let i = 0; i < retries; i++) {
    try {
      response = await fetch(url, options);
      if (response.ok) {
        return response.json();
      } else if (response.status === 429) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (err) {
      error = err;
    }
  }
  throw error;
};

// Product component to display product information
function Product({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1); // Initial quantity is set to 1
  const [isInWishlist, setIsInWishlist] = useState(false); // State to track if product is in wishlist

  useEffect(() => {
    fetch(wishlistUrl)
      .then((response) => response.json())
      .then((data) => {
        const inWishlist = data.some((item) => item.id === product.id);
        setIsInWishlist(inWishlist);
      })
      .catch((error) => console.error("Error fetching wishlist items:", error));
  }, [product.id]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); // Include quantity when adding to cart
  };

  const toggleWishlist = async () => {
    try {
      if (isInWishlist) {
        await fetchWithExponentialBackoff(`${wishlistUrl}/${product.id}`, {
          method: "DELETE",
        });
        setIsInWishlist(false);
      } else {
        const wishlistItem = {
          title: product.title,
          image: product.image,
          price: product.price,
        };

        await fetchWithExponentialBackoff(wishlistUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(wishlistItem),
        });
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error("Error toggling wishlist item:", error);
    }
  };

  return (
    <div className="product">
      <div className="image">
        <FontAwesomeIcon
          icon={isInWishlist ? solidIcons.faHeart : regularIcons.faHeart}
          className="wishlist"
          onClick={toggleWishlist}
        />
        <img src={product.image} alt={product.title} />
      </div>
      <div className="stars">
        <Stars count={product.rate} />
      </div>
      <div className="content">
        <div className="title">
          <h2 className="product-name">{product.title}</h2>
          <p className="price">
            <span>${product.price}</span> <del>${(product.price * 1.2).toFixed(2)}</del>
          </p>
        </div>
        <div className="quantity">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button className="btn" onClick={handleAddToCart}>
          {" "}
          +{" "}
        </button>
        <Link to={`/products/${product.id}`} className="btn eye-btn-outline">
          <FontAwesomeIcon icon={regularIcons.faEye} />
        </Link>
      </div>
    </div>
  );
}

export default Product;
