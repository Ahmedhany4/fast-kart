import React, { useState, useEffect } from 'react';
import Category from './Category';
import './css/categorySection.css';

const categoriesUrl = "https://x8ki-letl-twmt.n7.xano.io/api:BQXL3Zco/category"; // Replace with your backend API URL

function CategorySection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    fetch(categoriesUrl)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <section className='category-section'>
      <h1>Category Section</h1>
      <div className='container'>
        {categories.length > 0 ? (
          categories.map((category) => (
            <Category key={category.id} category={category} />
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </section>
  );
}

export default CategorySection;
