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
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/options`)
      .then((response) => {
        const sortedOptions = response.data.data.sort((a, b) => a.id - b.id);
        setOptions(sortedOptions);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  };

  const toggleDisable = (id, value) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/options/${id}/disable`, {
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
        <h1 className="title-principal">Manage Options</h1>

        <p className="txt-desc-2">
          "Change state a disable if you want hidden option on menu, but if you
          want restore change state on enable"
        </p>
        <div className="container-option">
          {options.length === 0 ? (
            <p>No options available.</p>
          ) : (
            <ul className="list-option">
              {options
                .filter((option) => option.name !== "Manage option")
                .map((option) => (
                  <li key={option.id}>
                    {option.name}{" "}
                    <select
                      value={option.disable}
                      onChange={(e) =>
                        toggleDisable(option.id, e.target.value === "true")
                      }
                      className="state-select"
                    >
                      <option value="false">Enabled</option>
                      <option value="true">Disabled</option>
                    </select>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageOption;
