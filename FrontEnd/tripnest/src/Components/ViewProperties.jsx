import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import AddRoomModal from "../Modals/AddRoomModal";
import { optimizeImage} from '../Helper/optimizeImage';

const ViewProperties = () => {
  const [properties, setProperties] = useState([]);
  const token = localStorage.getItem("adminToken");
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [roomPhotos, setRoomPhotos] = useState([]);
  const [room, setRoom] = useState({
    name: "",
    desc: "",
    price: "",
    capacity: "",
    totalRooms : 1,
  });

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleShowModal = (key) => {
    setPropertyId(key);
    setShowModal(true);
  };
  const photoChange = (e) => {
    const files = e.target.files;
    setRoomPhotos([...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    {
      payload.append("name", room?.name);
      payload.append("desc", room?.desc);
      payload.append("capacity", room?.capacity);
      payload.append("price", room?.price);
      payload.append("propertyId", propertyId);
      roomPhotos.forEach((photo) => {
        payload.append("photos", photo);
      });
    }

    try {
      setDisable(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/property/addroom`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      handleClose();
      setRoom({
        name: "",
        desc: "",
        price: "",
        capacity: "",
      });
      setRoomPhotos([]);
      setDisable(false);
    }
  };

  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/property/getallproperties`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res?.data);
      setProperties(res?.data?.allproperties);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleClose = () => {
    setPropertyId(null);
    setRoom({
      name: "",
      desc: "",
      price: "",
      capacity: "",
    });

    setRoomPhotos([]);
    setShowModal(false);
  };

  useEffect(() => {
    fetchProperties();
    console.log(properties);
  }, []);

  return (
    <>
      <AddRoomModal
        show={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        room={room}
        handleChange={handleChange}
        photoChange={photoChange}
        disable={disable}
      />
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
          padding: "40px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "30px",
            // fontWeight: "600",
            marginBottom: "30px",
          }}
        >
          All Properties
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "25px",
            width: "90%",
            maxWidth: "1200px",
          }}
        >
          {/* Property Card */}
          {properties.map((property) => {
            return (
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                }}
                key={property._id}
              >
                <img
                  src={optimizeImage(property?.images[0])}
                  alt="Property"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "15px 18px" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#1e3a8a",
                      marginBottom: "6px",
                    }}
                  >
                    {property ? property?.name : "Property Name"}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#374151",
                      marginBottom: "5px",
                    }}
                  >
                    📍 {property ? property?.location : "Property Location"}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginBottom: "15px",
                      textAlign: "justify",
                    }}
                  >
                    {" "}
                    {property
                      ? property?.description.slice(0, 130) + "..."
                      : "Property Description"}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => handleShowModal(property._id)}
                      style={{
                        flex: 1,
                        padding: "8px 10px",
                        background: "#3b82f6",
                        border: "none",
                        color: "white",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      ➕ Add Room
                    </button>

                    <button
                      style={{
                        flex: 1,
                        padding: "8px 10px",
                        background: "#10b981",
                        border: "none",
                        color: "white",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      ✏️ Edit Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ViewProperties;
