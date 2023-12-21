import { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { api } from "../utilities";

export const CreateItem = () => {
  const { user, setUser } = useOutletContext();
  const { id } = useParams();
  const [status, setStatus] = useState("auto");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  //Value declaration for item fields
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(1.0);
  const [serial_num, setSerial_Num] = useState("SN12345");

  const manualCreateItem = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      category: category,
      quantity: quantity,
      price: price,
      serial_num: serial_num,
    };
    try {
      const response = await api.post(`/inventories/all_items/add/`, data);
      //navigate to item page using id returned response.data.id
      navigate(`/inventory/${response.data.id}/`);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const autoCreate = async (e) => {
    e.preventDefault();
    if (file !== null) {
      setStatus("loading");
      const formData = new FormData();
      formData.append("file", file);

      try {
        const fileUploadResponse = await api.post(`/files/upload/`, formData);
        console.log(fileUploadResponse);
        //then navigate to item page response.data.inventory_item
        navigate(`/inventory/${fileUploadResponse.data.data.inventory_item}/`);
      } catch (error) {
        console.error(error);
        alert("File upload failed");
      }
    } else {
      alert("Please select a file to upload");
    }
  };

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
  }, [status]);

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-4 mt-20 w-96">
        {status === "manual" && (
          // Manual entry for item
          <form onSubmit={(e) => manualCreateItem(e)}>
            <h3>
              Name:{" "}
              <input type="text" onChange={(e) => setName(e.target.value)} />
            </h3>
            <p>
              Category:{" "}
              <input
                type="text"
                onChange={(e) => setCategory(e.target.value)}
              />
            </p>
            <p>
              Quantity:{" "}
              <input
                type="text"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </p>
            <p>
              Price:{" "}
              <input type="text" onChange={(e) => setPrice(e.target.value)} />
            </p>
            <p>
              Serial Number:{" "}
              <input
                type="text"
                onChange={(e) => setSerial_Num(e.target.value)}
              />
            </p>
            <input type="submit" value="Save" />
            <button onClick={() => setStatus("auto")}>Cancel</button>
          </form>
        )}
        {status === "auto" && (
        //Upload Receipt and scan
          <>
          <h3 className="text-lg font-semibold mb-2 text-center">Automatically scan your proof of purchase document to create an item in your inventory</h3>

          <form onSubmit={(e) => autoCreate(e)}>
            <input type="file" onChange={(e) => uploadFile(e)} className=" mb-3"/>
            <input type="submit" value="Scan" className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700"/>
            <button onClick={() => setStatus("manual")} className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700 ml-auto ml-2">Manual Entry</button>
          </form>
          </>
        )}
        {status === "loading" && (
          //Show spinner while API call executes
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
