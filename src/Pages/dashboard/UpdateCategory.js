import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    title: "",
    p: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [imageBase64, setImageBase64] = useState("");
  const api_url = `https://x8ki-letl-twmt.n7.xano.io/api:BQXL3Zco/category/${id}`;

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
        setImageBase64(data.image);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire("Error", "Failed to fetch category details", "error");
        setLoading(false);
      });
  }, [id, api_url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setCategory((prevCategory) => ({ ...prevCategory, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(api_url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update category");
        }
        return res.json();
      })
      .then(() => {
        Swal.fire("Success", "Category updated successfully", "success");
        navigate("/dashboard/categories");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={category.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            name="p"
            value={category.p}
            onChange={handleChange}
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
          />
          <br />
          {imageBase64 ? (
            <img
              src={imageBase64}
              height="200px"
              width="200px"
              alt="Category Preview"
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
          Update Category
        </button>
      </form>
    </div>
  );
}

export default UpdateCategory;
