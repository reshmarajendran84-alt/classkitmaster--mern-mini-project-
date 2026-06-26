import React from "react";
import { useCart } from "../components/context/CartContext";
import toast from "react-hot-toast";
const Cart = () => {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) return <h2 className="p-6">Cart is Empty</h2>;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-purple-700 font-bold mb-4">Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item._id}
          className="  border-purple-700 text-purple-700 border p-3 mb-4 flex items-center rounded"
        >
          <img
src={item.image ? `${import.meta.env.VITE_API_URL}${item.image}` : "https://placehold.co/300x300"}            className="w-20 h-20 rounded  border-purple-700 text-purple-700"
          />

          <div className="ml-4">
            <h3>{item.name}</h3>
            <p>
              ₹ {item.price} × {item.qty}
            </p>
          </div>

          <button
            className="ml-auto bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => {
              removeFromCart(item._id);
              toast("Item removed from cart");
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
