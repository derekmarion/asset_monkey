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
}

  return (
    <>
    {items.map((item) => (
      <div key={item.id}>
        {/* Render each item's details */}
        <h3>Name: {item.name}</h3>
        <p>Category: {item.category}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.price}</p>
        <button onClick={()=>handleButtonClick(item.id)}>More Details</button>
        {/* Add more details as needed */}
      </div>
    ))}
    </>
  );
};
