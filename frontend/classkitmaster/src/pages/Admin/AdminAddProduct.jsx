import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import toast from "react-hot-toast";
const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    if (image) fd.append("image", image);

    try {
      await API.post("/products", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-purple-700 text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="Name"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
