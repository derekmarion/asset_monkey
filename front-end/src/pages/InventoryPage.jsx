import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "react-bootstrap/Button";
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
    <Row>
    {items.map((item) => (
      <div key={item.id}>
        {/* Render each item's details */}
        <h3>{item.name}</h3>
        <p>Category: {item.category}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.price}</p>
        <Button onClick={()=>handleButtonClick(item.id)}>More Details</Button>
        {/* Add more details as needed */}
      </div>
    ))}
  </Row>
  );
};
