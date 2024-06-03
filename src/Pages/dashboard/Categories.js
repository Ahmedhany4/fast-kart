import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from "sweetalert";
function Categories (){
  const [categories, setCategories] = useState([]);
  const url = "https://x8ki-letl-twmt.n7.xano.io/api:BQXL3Zco/category";
  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }

  const deleteCategory = (category) => {
    swal({
      title: "Are you sure?",
      text: `Category : ${category.name}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal(`Poof! Your Category : ${category.name}  has been deleted!`, {
            icon: "success",

          });
          fetch(`${url}/${category.id}`, { method: "DELETE" }).then((res) => res.json()).then(() => getAllCategories());
        } else {
          swal(`Your Category : ${category.name} is safe!`);
        }
      })
  }
  return (
    <>
      <h1 className="mt-5 text-center">Category Page</h1>

      <Link to={'/dashboard/categories/add'} className="btn btn-success mt-3">Add New Category</Link>

      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th className="w-25 text-center">Image</th>
            <th>Name</th>
            <th className="text-center">Operation</th>
          </tr>
        </thead>
        <tbody>
          {categories ? categories.map((category) => (
            <tr key={category.id} style={{ verticalAlign: "middle" }}>
              <td >{category.id}</td>
              <td style={{ width: "100px", height: "100px", objectFit: "cover" }}><img style={{ objectFit: "contain", borderRadius: "10px " }} src={category.image} alt={category.title} className="h-100 w-100" /></td>
              <td>{category.name }</td>
              <td className="text-center">
                <button className="btn btn-danger btn-sm ms-3" onClick={() => deleteCategory(category)}>Delete</button>
                <Link to={`/dashboard/categories/${category.id}/edit`} className="btn btn-primary btn-sm ms-3">Edit</Link>
              </td>
            </tr>
          )) : <tr >
            <td colSpan={5}>
              <div className="placeholder w-100"></div>
              <div className="placeholder w-100"></div>
              <div className="placeholder w-100" ></div>
            </td></tr>}
        </tbody>
      </table>
    </>
  );
}
export default Categories ;