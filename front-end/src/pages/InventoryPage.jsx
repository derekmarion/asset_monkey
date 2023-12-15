import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utilities.jsx";

export const Inventory = () => {
  const { user, setUser } = useOutletContext();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const getAllItems = async () => {
    try {
      const response = await api.get("inventories/all_items/", {
        email: user,
      });
      setItems(response.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const handleButtonClick = (id) => {
    navigate(`/inventory/${id}/`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Render each item as a card */}
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
          {/* Render each item's details */}
          <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
          <p className="text-gray-600 mb-2">Category: {item.category}</p>
          <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
          <p className="text-gray-600 mb-2">Price: ${item.price}</p>
          <button
            onClick={() => handleButtonClick(item.id)}
            className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700"
          >
            More Details
          </button>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};
