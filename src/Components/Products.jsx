import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  // State to hold product data
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/mart/getallproducts');
        const { data } = response;
        setProducts(data.data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
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
                    src={`http://localhost:8000/Public${product.Image}`}
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
