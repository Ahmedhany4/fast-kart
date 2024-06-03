import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ImageUplode from "../../Components/ImageUplode"; // Ensure you have this component or remove this line if not needed

function AddCategories() {
  const api_url = "https://x8ki-letl-twmt.n7.xano.io/api:BQXL3Zco/category";
  let navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryP, setCategoryP] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  
  const handleChnage = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setUploadImage(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("title", categoryTitle);
    formData.append("p", categoryP);
    formData.append("image", uploadImage);

    fetch(api_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add category");
        }
        return res.json();
      })
      .then((data) => {
        Swal.fire("Success", "Category added successfully", "success");
        navigate(`/dashboard/categories`);
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h2 className="mt-3 mb-4">Add New Category</h2>
      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputTitle"
            aria-describedby="Category Name"
            placeholder="Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">
            Category Title
          </label>
          <input
            type="text"
            className="form-control"
            id="Title"
            aria-describedby="Category Title"
            placeholder="Category Title"
            onChange={(e) => setCategoryTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Category Description
          </label>
          <input
            type="text"
            className="form-control"
            id="Description"
            aria-describedby="Category Description"
            placeholder="Category Description"
            onChange={(e) => setCategoryP(e.target.value)}
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
            onChange={handleChnage}
            id="formFile"
            required
          />
          <br />
          {uploadImage ? (
            <img src={uploadImage} height="200px" width="200px" alt="Uploaded" />
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
          Add Category
        </button>
      </form>
    </>
  );
}

export default AddCategories;
