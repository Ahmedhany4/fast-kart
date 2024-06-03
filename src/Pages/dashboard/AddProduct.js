import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const api_url = "https://x8ki-letl-twmt.n7.xano.io/api:CcyG8c7s/product_list";
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [rate, setRate] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageBase64, setImageBase64] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const url = "https://x8ki-letl-twmt.n7.xano.io/api:BQXL3Zco/category";
  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  const formSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      price,
      rate,
      image: imageBase64, // Send Base64 string
      description,
      category,
      top: 0,
    };

    fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add product");
        }
        return res.json();
      })
      .then((data) => {
        navigate(`/dashboard/products/${data.id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h2 className="mt-4 mb-5 text-center">Add New Product</h2>
      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputTitle"
            aria-describedby="Product title"
            placeholder="Product title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="Description"
            aria-describedby="Product Description"
            placeholder="Product Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPrice"
            aria-describedby="Product Price"
            placeholder="Product Price"
            onChange={(e) => setPrice(e.target.value)}
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
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputRate" className="form-label">
            Rate
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputRate"
            aria-describedby="Product Rate"
            placeholder="Product Rate"
            onChange={(e) => setRate(e.target.value)}
            required
          />
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
            required
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
          Add Product
        </button>
      </form>
    </>
  );
}

export default AddProduct;
