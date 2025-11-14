import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { optimizeImage } from "../Helper/optimizeImage";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  // const [roomId,setRoomId] = useState(null);

  const fetchDestinations = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/property/getallproperties`
      );
      setDestinations(res?.data?.allproperties || []);
    } catch (error) {
      toast.error("Failed to fetch destinations");
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleDestination = (id) => {
    navigate(`/destination/${id}`);
  };

  if (destinations.length === 0) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "30px" }}>
        Loading Destinations...
      </h3>
    );
  }

  return (
    <>
    <div style={{ marginTop: "30px", padding: "15px 20px" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "30px", textAlign:"center" ,fontWeight:"500"}}>
        Popular Destinations
      </h2>

      {/* Responsive grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))", // Responsive grid magic
          gap: "20px",
        }}
      >
        {destinations.map((property) => (
          <div
            onClick={()=> navigate(`/propertydetails/${property._id}`)}
            key={property._id}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow =
                "0 6px 18px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.15)";
            }}
          >
            <img
              src={optimizeImage(property?.images?.[0], 600)}
              alt={property?.name}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h4
                style={{
                  margin: "0 0 8px",
                  color: "#1e3a8a",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                }}
              >
                {property?.name}
              </h4>
              <p
                style={{
                  margin: 0,
                  color: "#475569",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                📍 {property?.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default Destinations;
