import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getStates } from "../Helper/HelperArrays";

const AddProperty = () => {
  const token = localStorage.getItem("adminToken");
  const [photos, setPhotos] = useState([]);
  const [disable, setDisabled] = useState(false);
  const [isState, setIsState] = useState(true);
  const [property, setProperty] = useState({
    name: "",
    desc: "",
    location: "",
    state: "",
    district: "",
  });

  const states = getStates();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "state") {
      setIsState(false);
    }
  };

  const photoChange = (e) => {
    const files = e.target.files;
    setPhotos([...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", property?.name);
    data.append("desc", property?.desc);
    data.append("location", property?.location);
    data.append("state",property?.state);
    data.append("district",property?.district);
    photos.forEach((photo) => {
      data.append("photos", photo);
    });
    try {
      setDisabled(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/property/addproperty`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res?.data);
      toast.success(res?.data?.message);
      setPhotos([]);
      setProperty({
        name: "",
        desc: "",
        location: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          width: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#1e3a8a",
            fontSize: "26px",
            marginBottom: "25px",
          }}
        >
          Add New Property
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#374151",
                fontWeight: "500",
              }}
            >
              Property Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter property name"
              value={property.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          {/* State Dropdown */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="state"
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#374151",
                fontWeight: "500",
              }}
            >
              State
            </label>
            <select
              id="state"
              name="state"
              value={property.state}
              onChange={handleChange} // your existing handleChange works fine
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "white",
              }}
            >
              <option value="">Select State</option>
              {states.map((stateObj, index) => (
                <option key={index} value={stateObj.state}>
                  {stateObj.state}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="district"
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#374151",
                fontWeight: "500",
              }}
            >
              District
            </label>
            <select
              id="district"
              name="district"
              disabled={isState}
              value={property.district}
              onChange={handleChange} // you’ll later filter districts by selected state
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "white",
              }}
            >
              <option value="">Select District</option>
              {states
                .find((s) => s.state === property.state)
                ?.districts.map((district, index) => {
                 return <option key={index} value={district}>
                    {district}
                  </option>;
                })}
              {/* Map your districts dynamically here */}
            </select>
          </div>

          {/* Location */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="location"
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#374151",
                fontWeight: "500",
              }}
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter property location"
              value={property.location}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="description"
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#374151",
                fontWeight: "500",
              }}
            >
              Description
            </label>
            <textarea
              id="description"
              name="desc"
              rows="4"
              placeholder="Write something about the property..."
              value={property.desc}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                resize: "none",
              }}
            ></textarea>
          </div>

          {/* Photos Upload */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="photos"
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#374151",
                fontWeight: "500",
              }}
            >
              Upload Photos
            </label>
            <input
              type="file"
              id="photos"
              name="photos"
              accept="image/*"
              onChange={photoChange}
              multiple
              style={{
                display: "block",
                width: "100%",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                padding: "8px",
              }}
            />
          </div>

          {/* Preview Section */}
          <div
            style={{
              border: "1px dashed #93c5fd",
              borderRadius: "6px",
              padding: "10px",
              marginBottom: "25px",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Photo Preview Area
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={disable}
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(90deg, #2563eb, #1e3a8a)",
              border: "none",
              color: "white",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            {disable == true ? "Please wait.." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
