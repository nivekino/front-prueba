import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOption = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = () => {
    // Fetch all options from the API
    axios
      .get("http://localhost:3010/api/options")
      .then((response) => {
        setOptions(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  };

  const toggleDisable = (id, value) => {
    axios
      .put(`http://localhost:3010/api/options/${id}/disable`, {
        disable: value,
      })
      .then((response) => {
        setOptions((prevOptions) =>
          prevOptions.map((opt) =>
            opt.id === id ? { ...opt, disable: value } : opt
          )
        );
        toast.success("Option updated successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating option:", error);
        toast.error("Failed to update option.");
      });
  };

  return (
    <>
      <div className="pages">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          progress={undefined}
          theme="dark"
        />
        <h1 className="title-principal">Manage Option</h1>
        {options.length === 0 ? (
          <p>No options available.</p>
        ) : (
          <ul>
            {options
              .filter((option) => option.name !== "Manage option")
              .map((option) => (
                <li key={option.id}>
                  {option.name} -{" "}
                  <select
                    value={option.disable}
                    onChange={(e) =>
                      toggleDisable(option.id, e.target.value === "true")
                    }
                  >
                    <option value="false">Enabled</option>
                    <option value="true">Disabled</option>
                  </select>
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ManageOption;





