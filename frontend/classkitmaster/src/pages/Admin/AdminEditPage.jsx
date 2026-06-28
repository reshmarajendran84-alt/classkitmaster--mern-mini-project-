import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import toast from "react-hot-toast";

const AdminEditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setForm(res.data.product));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    if (image) fd.append("image", image);

    try {
      await API.put(`/products/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product updated!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-purple-700 text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          value={form.name}
          placeholder="Name"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          value={form.price}
          placeholder="Price"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="category"
          value={form.category}
          placeholder="Category"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
