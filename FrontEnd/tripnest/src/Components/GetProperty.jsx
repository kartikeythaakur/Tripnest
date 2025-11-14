import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { optimizeImage } from "../Helper/optimizeImage";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BookRoomModal from "../Modals/BookRoomModal";

const GetProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/property/getproperty/${id}`
      );
      setProperty(res?.data?.property);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = (room) => {
    setRoom(room);
    setShow(true);
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          padding: "40px 8%",
          textAlign: "center",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", color: "#1e3a8a" }}>
          Loading Property Details...
        </h2>
      </div>
    );
  }

  if (!property) {
    return (
      <div
        style={{
          padding: "40px 8%",
          textAlign: "center",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", color: "#1e3a8a" }}>
          Property Not Found
        </h2>
      </div>
    );
  }

  console.log(property);

  return (
    <>
      <BookRoomModal
        room={room}
        show={show}
        propertyId={id}
        handleClose={() => setShow(false)}
      />
      <div
        style={{
          padding: "40px 8%",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          backgroundColor: "#f9fafb",
          color: "#1e293b",
        }}
      >
        {/* Property Name */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#1e3a8a",
          }}
        >
          {property.name}
        </h2>

        {/* Property Images */}

        {/* Property Images — Horizontal Scroll */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            paddingBottom: "10px",
          }}
        >
          {/* Hide scrollbar (Chrome, Safari, Firefox) */}
          <style>
            {`
      div::-webkit-scrollbar {
        display: none;
      }
      div {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;    /* Firefox */
      }
    `}
          </style>

          {property.images &&
            property.images.map((img, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 auto",
                  width: "400px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={optimizeImage(img, 900)}
                  alt={`Property ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
        </div>

        {/* Property Details */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#1e3a8a" }}>About this property</h3>
          <p style={{ color: "#475569", lineHeight: "1.6" }}>
            {property?.description}
          </p>
        </div>

        {/* Room Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "25px",
            justifyContent: "center",
          }}
        >
          {property.rooms &&
            property.rooms.map((room) => (
              <div
                key={room.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "75%",
                  }}
                >
                  <img
                    src={room?.images && optimizeImage(room?.images[0], 600)}
                    alt={room.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                </div>

                <div style={{ padding: "15px" }}>
                  <h5 style={{ margin: "0 0 6px", color: "#1e3a8a" }}>
                    {room?.name}
                  </h5>
                  <p style={{ color: "#475569", marginBottom: "10px" }}>
                    ${room?.price} /night
                  </p>
                  <button
                    style={{
                      backgroundColor: "#1e3a8a",
                      color: "white",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      width: "100%",
                      fontWeight: "500",
                    }}
                    onClick={() => {
                      !token ? navigate("/login") : handleBookRoom(room);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default GetProperty;
