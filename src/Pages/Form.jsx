import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";
import { validationSchema } from "../utils/validation";
import { Link } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Form = () => {
  const [files, setFiles] = useState([]);
  const [initialFiles, setInitialFiles] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    duration: "",
    category: "",
    description: "",
    date: "",
  });

  const { id } = useParams();

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("budget", values.budget);
        formData.append("duration", values.duration);
        formData.append("category", values.category);
        formData.append("description", values.description);
        formData.append("date", values.date);
        formData.append("image", files[0].file);

        if (id) {
          await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/movies/${id}`,
            formData
          );
          toast.success("Movie updated successfully!");
        } else {
          await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/movies`,
            formData
          );
          toast.success("Movie created successfully!");
          formik.resetForm();
          setFiles([]);
        }
        console.log("Form submitted successfully!");
      } catch (error) {
        toast.error("Error submitting the form. Please try again later.");
        console.error("Error submitting the form:", error);
      }
    },
  });

  const fetchImageAsFile = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, {
        "response-type": "blob",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      });
      const file = new File([response.data], "movie-image.jpg", {
        type: response.headers["content-type"],
      });
      return file;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const getFormData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/movies/${id}`
      );
      const { data } = response.data;
      setFormData(data);

      const file = await fetchImageAsFile(data.img);
      if (file) {
        setInitialFiles([
          {
            source: file,
            options: {
              type: "local",
            },
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getFormData();
    }
  }, [id]);

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

        <div className="back-container">
          <Link to={"/ManagmentMovies"} className="btn-back">
            Go back to managment
          </Link>
        </div>

        <h1 className="title-principal-2">Field from Movie</h1>

        <div className="form-group">
          <form onSubmit={formik.handleSubmit}>
            <div className="container-input">
              <h3 className="title-form">Title Movie</h3>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? (
                <p className="error">{formik.errors.name}</p>
              ) : null}
            </div>

            <div className="container-input">
              <h3 className="title-form">Budget Movie</h3>
              <input
                type="number"
                className="form-control"
                placeholder="Budget"
                name="budget"
                value={formik.values.budget}
                onChange={formik.handleChange}
              />
              {formik.errors.budget && formik.touched.budget ? (
                <p className="error">{formik.errors.budget}</p>
              ) : null}
            </div>

            <div className="container-input">
              <h3 className="title-form">Duration Movie (min) </h3>
              <input
                type="number"
                className="form-control"
                placeholder="Duration"
                name="duration"
                value={formik.values.duration}
                onChange={formik.handleChange}
              />
              {formik.errors.duration && formik.touched.duration ? (
                <p className="error">{formik.errors.duration}</p>
              ) : null}
            </div>

            <div className="container-input">
              <h3 className="title-form">Category Movie</h3>
              <input
                type="text"
                className="form-control"
                placeholder="Category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
              />
              {formik.errors.category && formik.touched.category ? (
                <p className="error">{formik.errors.category}</p>
              ) : null}
            </div>

            <div className="container-input">
              <h3 className="title-form">Description Movie</h3>
              <textarea
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description && formik.touched.description ? (
                <p className="error">{formik.errors.description}</p>
              ) : null}
            </div>

            <div className="container-input">
              <h3 className="title-form">Date Movie</h3>
              <input
                type="date"
                className="form-control"
                placeholder="Date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
              />
              {formik.errors.date && formik.touched.date ? (
                <p className="error">{formik.errors.date}</p>
              ) : null}
            </div>

            <div className="container-input">
              <h3 className="title-form">Upload Image</h3>
              <FilePond
                allowMultiple={false}
                files={id ? initialFiles : files}
                maxFiles={1}
                allowReorder={true}
                onupdatefiles={setFiles}
              />
            </div>

            <button type="submit" className="btn-send">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
