import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { api } from "../utilities";

export const SingleItem = () => {
  const { user, setUser } = useOutletContext();
  const [item, setItem] = useState([]);
  const { id } = useParams();
  const [editing, setEditing] = useState(false);

  //Value declaration for item fields
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(1.00);
  const [serial_num, setSerial_Num] = useState("SN12345");
  const [file, setFile] = useState(null);

  const getSingleItem = async () => {
    try {
      const response = await api.get(`inventories/all_items/${id}/`, {
        email: user,
      });
      //update stateful fields with item's current data
      setItem(response.data);
      setCategory(item.category);
      setName(item.name);
      setQuantity(item.quantity);
      setPrice(item.price);
      setSerial_Num(item.serial_num);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();
    let data = {
        "name": name,
        "category": category,
        "quantity": quantity,
        "price": price,
        "serial_num": serial_num,
    };
    try {
        const response = await api.put(`/inventories/all_items/${id}/`, data);
        if (file !== null) {
          const formData = new FormData();
          formData.append('file', file);
          const fileUploadResponse = await api.post(`/files/upload/${id}/`, formData);
        }
        setItem(response.data);
        setEditing(false);
        } catch (error){
    alert("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleItem();
  }, []);

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    editing ? (
      <div key={item.id}>
        {/*Editing item*/}
        <form onSubmit={(e) => updateItem(e)}>
        <h3>Name: <input type="text" placeholder={item.name} onChange={(e) => setName(e.target.value)} /></h3>
        <p>Category: <input type="text" placeholder={item.category} onChange={(e) => setCategory(e.target.value)} /></p>
        <p>Quantity: <input type="text" placeholder={item.quantity} onChange={(e) => setQuantity(e.target.value)} /></p>
        <p>Price: <input type="text" placeholder={item.price} onChange={(e) => setPrice(e.target.value)} /></p>
        <p>Serial Number: <input type="text" placeholder={item.serial_num} onChange={(e) => setSerial_Num(e.target.value)} /></p>
        <input type="file" onChange={(e) => uploadFile(e)} />
        <input type="submit" value="Save" />
        <button onClick={()=>setEditing(false)}>Cancel</button>
        </form>
      </div>
    ) : (
      <div key={item.id}>
         {/*Viewing item*/}
        <h3>{item.name}</h3>
        <p>Category: {item.category}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.price}</p>
        <p>Serial Number: {item.serial_num}</p>
        <button onClick={()=>setEditing(true)}>Edit</button>
      </div>
    )
  );
};
