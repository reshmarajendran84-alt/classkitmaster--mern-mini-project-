import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import toast from "react-hot-toast";
const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data.items || res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-5">All Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="card">
            <img
              src={p.image ? `${import.meta.env.VITE_API_URL}${p.image}` : "https://placehold.co/300x300"}

              className="h-48 w-full object-cover rounded-xl"
            />

            <h3 className="font-bold text-lg mt-3">{p.name}</h3>
            <p className="text-purple-600 font-semibold">₹{p.price}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => navigate(`edit-product/${p._id}`)}
                className="btn-yellow flex-1"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white rounded-lg px-4 py-2 flex-1 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
