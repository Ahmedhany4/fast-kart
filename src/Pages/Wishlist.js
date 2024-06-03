import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const wishlistUrl = "https://x8ki-letl-twmt.n7.xano.io/api:-KEOAAw6/wishlist"; // Replace with your backend API URL

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetch(wishlistUrl)
      .then((response) => response.json())
      .then((data) => setWishlistItems(data))
      .catch((error) => console.error("Error fetching wishlist items:", error));
  }, []);

  const deleteWishlistItem = (item) => {
    fetch(`${wishlistUrl}/${item.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setWishlistItems((prevItems) =>
            prevItems.filter((wishlistItem) => wishlistItem.id !== item.id)
          );
        } else {
          console.error("Error deleting wishlist item:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting wishlist item:", error));
  };

  return (
    <div className="wishlist">
      <h1 className="text-center mt-4 mb-5">Wishlist</h1>
      <div className="container">
        {wishlistItems.length > 0 ? (
          <table className="table table-striped mt-5">
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Price</th>
                <th className="text-center">Operation</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item, index) => (
                <tr key={index} style={{ verticalAlign: "middle" }}>
                  <td>{item.title}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>${item.price}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger btn-sm ms-3"
                      onClick={() => deleteWishlistItem(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items in the wishlist.</p>
        )}
        <Link className="btn btn-outline-warning ms-4" to="/products">
          Back to Buy
        </Link>
      </div>
    </div>
  );
}

export default Wishlist;
