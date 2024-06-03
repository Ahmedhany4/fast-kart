import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import swal from "sweetalert";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://x8ki-letl-twmt.n7.xano.io/api:CcyG8c7s/product_list";

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  const deleteProduct = (product) => {
    swal({
      title: "Are you sure?",
      text: `${product.title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`${url}/${product.id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then(() => {
            swal(`Poof! Your ${product.title} has been deleted!`, {
              icon: "success",
            });
            getAllProducts();
          });
      } else {
        swal(`Your ${product.title} is safe!`);
      }
    });
  };

  return (
    <>
      <h1 className="mt-5 text-center">Products Page</h1>

      <Link to="/dashboard/products/add" className="btn btn-success mt-3">
        Add New Product
      </Link>

      {loading ? (
        <div className="text-center mt-5">
          <div className="placeholder w-100 mb-3"></div>
          <div className="placeholder w-100 mb-3"></div>
          <div className="placeholder w-100 mb-3"></div>
        </div>
      ) : products.length ? (
        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th>ID</th>
              <th className="w-25 text-center">Image</th>
              <th>Title</th>
              <th>description</th>
              <th>Price</th>
              <th className="text-center">Operation</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ verticalAlign: "middle" }}>
                <td>{product.id}</td>
                <td
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                >
                  <img
                    style={{ objectFit: "contain", borderRadius: "10px" }}
                    src={product.image}
                    alt={product.title}
                    className="h-100 w-100"
                  />
                </td>
                <td>{product.title}</td>
                <td>
                  {product.description.length > 50
                    ? product.description.slice(0, 50) + "...."
                    : product.description}
                </td>
                <td>$ {product.price}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => deleteProduct(product)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`${product.id}`}
                    className="btn btn-info btn-sm ms-3"
                  >
                    View
                  </Link>
                  <Link
                    to={`/dashboard/products/${product.id}/edit`}
                    className="btn btn-primary btn-sm ms-3"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4 className="mt-5 text-center">No Products Available</h4>
      )}
    </>
  );
}

export default Products;
