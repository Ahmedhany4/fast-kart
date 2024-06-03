import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const cartUrl = "https://x8ki-letl-twmt.n7.xano.io/api:-KEOAAw6/cart"; // Adjust this URL based on your backend API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(cartUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchData();
  }, [cartUrl]);

  const deleteCartItem = (item) => {
    try {
      fetch(`${cartUrl}/${item.id}`, {
        method: "DELETE",
      });
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const mergeAndCombineQuantity = (items) => {
    const mergedItems = {};
    items.forEach((item) => {
      if (mergedItems[item.title]) {
        mergedItems[item.title].quantity += item.quantity;
      } else {
        mergedItems[item.title] = { ...item };
      }
    });
    return Object.values(mergedItems);
  };

  return (
    <div className="cart">
      <h1 className="text-center mt-4 mb-5">Cart Page</h1>
      <div className="container">
        {cartItems.length > 0 ? (
          <>
            <table className="table table-striped mt-5">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th className="text-center">Operation</th>
                </tr>
              </thead>
              <tbody>
                {mergeAndCombineQuantity(cartItems).map((item, index) => (
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
                    <td>{item.quantity}</td>
                    <td>${item.price * item.quantity}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger btn-sm ms-3"
                        onClick={() => deleteCartItem(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="text-end fs-4 text-danger">
                    Total:
                  </td>
                  <td  className="fs-4 text-danger">${calculateTotal()}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <Link to="/checkout" className="btn btn-danger text-end">
              checkout
            </Link>
          </>
        ) : (
          <>
            <p>No items in the cart.</p>
          </>
        )}
        <Link className="btn btn-outline-warning ms-4" to="/products">
          Back to Buy
        </Link>
      </div>
    </div>
  );
}

export default Cart;
