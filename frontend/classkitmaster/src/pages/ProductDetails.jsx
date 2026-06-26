import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../components/context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
src={product.image ? `${import.meta.env.VITE_API_URL}${product.image}` : "https://placehold.co/300x300"}        className="w-full max-w-md h-80 object-cover mx-auto rounded-xl"
      />

      <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
      <p className="text-lg text-gray-700 mt-2">₹{product.price}</p>

      <p className="mt-3">{product.description}</p>

      <button
        className="bg-purple-700 text-white px-6 py-2 rounded mt-5"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
