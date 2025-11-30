import React from "react";
import Banner from "./Banner";
import ProductsPage from "../../pages/ProductsPage";
import { useNavigate } from "react-router-dom";

const categories = ["Bottle", "Bag", "Toy", "Cryons", "Lunch Box"];

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    navigate(`/products/${cat}`);
  };

  return (
    <div className="relative">

      {/* BANNER */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl shadow-xl">
        <Banner />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-700 mb-4">
            Welcome to ClassKit Master
          </h1>

          <p className="text-lg md:text-xl text-purple-200 mb-6">
            Your child's first steps start with us
          </p>

          {/* CATEGORY BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(cat)}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600 hover:scale-110 transition duration-300"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS LIST */}
      <ProductsPage />
    </div>
  );
};

export default Home;
