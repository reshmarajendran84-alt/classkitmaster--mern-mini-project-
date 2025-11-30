import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Pagination from "../components/Layout/Pagination";
import { useCart } from "../components/context/CartContext";
import { useParams } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCart();
  const perPage = 6;
const { category: urlCategory } = useParams();

  // Load products from API
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Reset page if search/category/sort changes
  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  useEffect(() => {
  if (urlCategory) {
    setCategory(urlCategory);
  }
}, [urlCategory]);

  // Filter & Search
  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category
      ? p.category?.toLowerCase() === category.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  // Sort
  const sorted = [...filtered];
  if (sort === "low") sorted.sort((a, b) => a.price - b.price);
  if (sort === "high") sorted.sort((a, b) => b.price - a.price);

  // Pagination
  const totalPages = Math.ceil(sorted.length / perPage);
  const safePage = Math.min(page, totalPages) || 1;
  const displayed = sorted.slice((safePage - 1) * perPage, safePage * perPage);

  // Get unique categories for dropdown
  const categories = [
    ...new Set(products.map((p) => p.category?.toLowerCase()).filter(Boolean)),
  ];

  return (
    <div className="p-4">
      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input
          type="text"
          className="border p-2 rounded flex-1 border-purple-700 text-purple-700"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded border-purple-700 text-purple-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded border-purple-700 text-purple-700"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* Product Cards */}
      {loading ? (
        <p className="text-center text-purple-700 font-semibold">Loading products...</p>
      ) : displayed.length === 0 ? (
        <p className="text-center text-purple-700 font-semibold">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayed.map((p) => (
            <div
              key={p._id}
              className="border p-3 rounded shadow border-purple-700 text-purple-700"
            >
              <img
                src={p.image ? `http://localhost:5000${p.image}` : "https://via.placeholder.com/300"}
                className="w-full max-w-md h-80 object-cover mx-auto rounded-xl"
                alt={p.name}
              />
              <h3 className="font-bold mt-2">{p.name}</h3>
              <p>₹ {p.price}</p>
              <div className="flex gap-3 mt-3">
                <Link
                  to={`/product/${p._id}`}
                  className="bg-purple-700 text-white px-3 py-1 rounded"
                >
                  View
                </Link>
                <button
                  onClick={() => addToCart(p)}
                  className="bg-purple-700 text-white px-3 py-1 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center mt-6">
          <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
