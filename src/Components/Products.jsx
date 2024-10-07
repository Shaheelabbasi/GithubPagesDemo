import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  // State to hold product data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/mart/getallcategories');
        const { data } = response;
        // setCategories(data.data);
        // setCategories(...categories)
        setCategories([{id:"345678",name:"All Categories"},...data.data])
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("All the cateegories are jpp",categories)
      console.log("The selected category is ",selectedCategory)
      try {
        let response=null
        if(selectedCategory !="All Categories")
        {
         response = await axios.get(`http://localhost:8000/mart/getproductsbycategory?categoryname=${selectedCategory}`);
        }
        else{
          response=await axios.get(`http://localhost:8000/mart/getallproducts`);
        }
        const { data } = response;
        setProducts(data.data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (

    
    <div className="container mx-auto p-4">
    {/* Dropdown for categories */}
    <div className="mb-4">
      <label htmlFor="category" className="block text-lg font-medium mb-2">
        Filter by Category:
      </label>
      <select
        id="category"
        className="p-2 border rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category._id || category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>

    {/* Flexbox layout for product cards */}
    <div className="flex flex-wrap justify-center gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Wrapper for Image to center it */}
              <div className="flex justify-center w-full h-48">
                <img
                  className="object-cover"
                  src={`http://localhost:10000/Public${product.Image}`}
                  alt={product.title}
                />
              </div>

              {/* Product Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                {/* Product Title */}
                <h2 className="font-bold text-lg text-center">{product.name}</h2>

                {/* Product Description */}
                <p className="text-gray-600 text-center mt-2">{product.description}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  </div>
  );
};

export default Products;
