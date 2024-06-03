import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    rate: 0,
    top: 0,
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [imageBase64, setImageBase64] = useState("");
  const [categories, setCategories] = useState([]);
  const url = "https://x8ki-letl-twmt.n7.xano.io/api:CcyG8c7s/product_list";
  const categoriesUrl = "https://x8ki-letl-twmt.n7.xano.io/api:BQXL3Zco/category"; // Assuming this is the URL for categories

  useEffect(() => {
    fetch(`${url}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setImageBase64(data.image);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to fetch product details", "error");
        setLoading(false);
      });

    fetch(categoriesUrl)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => Swal.fire("Error", "Failed to fetch categories", "error"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setProduct((prevProduct) => ({ ...prevProduct, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update product");
        }
        return res.json();
      })
      .then(() => {
        Swal.fire("Success", "Product updated successfully", "success");
        navigate("/dashboard/products");
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rate</label>
          <input
            type="number"
            className="form-control"
            name="rate"
            value={product.rate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Top</label>
          <input
            type="number"
            className="form-control"
            name="top"
            value={product.top}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputCategory" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            id="formFile"
          />
          <br />
          {imageBase64 ? (
            <img
              src={imageBase64}
              height="200px"
              width="200px"
              alt="Product Preview"
            />
          ) : (
            <img
              src="https://placehold.co/200x200/0DA487/FFF"
              height="200px"
              width="200px"
              alt="Placeholder"
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
