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
        setStatus("manual");
      }
    } else {
      alert("Please select a file to upload");
    }
  };

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {}, [status]);

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-4 mt-20 w-96">
        {status === "manual" && (
          // Manual entry for item
          <form onSubmit={(e) => manualCreateItem(e)}>
            <h3 className="text-lg font-semibold mb-2">
              Name:{" "}
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="border"
              />
            </h3>
            <p className="text-gray-600 mb-2">
              Category:{" "}
              <input
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                className="border"
              />
            </p>
            <p className="text-gray-600 mb-2">
              Quantity:{" "}
              <input
                type="text"
                onChange={(e) => setQuantity(e.target.value)}
                className="border"
              />
            </p>
            <p className="text-gray-600 mb-2">
              Price:{" "}
              <input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                className="border"
              />
            </p>
            <p className="text-gray-600 mb-2">
              Serial Number:{" "}
              <input
                type="text"
                onChange={(e) => setSerial_Num(e.target.value)}
                className="border"
              />
            </p>
            <input
              type="submit"
              value="Save"
              className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700"
            />
            <button
              onClick={() => setStatus("auto")}
              className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700 ml-2"
            >
              Cancel
            </button>
          </form>
        )}
        {status === "auto" && (
          //Upload Receipt and scan
          <>
            <h3 className="text-lg font-semibold mb-2 text-center">
              Automatically scan your proof of purchase document to create an
              item in your inventory
            </h3>

            <form onSubmit={(e) => autoCreate(e)}>
              <input
                type="file"
                onChange={(e) => uploadFile(e)}
                className=" mb-3"
              />
              <input
                type="submit"
                value="Scan"
                className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700"
              />
              <button
                onClick={() => setStatus("manual")}
                className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700 ml-auto ml-2"
              >
                Manual Entry
              </button>
            </form>
          </>
        )}
        {status === "loading" && (
          //Show spinner while API call executes
          <div role="status" className="flex items-center justify-center">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};
