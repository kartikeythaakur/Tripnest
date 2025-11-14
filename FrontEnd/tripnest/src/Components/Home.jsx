import React, { useEffect, useState } from "react";
import { optimizeImage } from "../Helper/optimizeImage";
import BookingDatePicker from "../Components/BookingDatePicker";
import Footer from "../Components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const url = optimizeImage(
    "https://res.cloudinary.com/duytzkqng/image/upload/v1762077188/Tripnest/Properties/jtalwthusdyf4vv4667f.jpg",
    1800
  );

  const navigate = useNavigate();

  const [pid, setPid] = useState(""); // Selected location _id
  const [locationList, setLocationList] = useState([]); // List of locations
  const [locationName, setLocationName] = useState(""); // Selected location name
  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/property/getallproperties`
      );
      setDestinations(res?.data?.allproperties);
    } catch (error) {
      toast.error("Failed to fetch destinations");
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/property/get-locations`
      );
      setLocationList(res?.data?.locations);
    } catch (error) {
      console.error("Failed to fetch locations");
    }
  };

  const handleLocationChange = (e) => {
    const selectedName = e.target.value;
    setLocationName(selectedName);

    const selectedLoc = locationList.find((loc) => loc.name === selectedName);
    setPid(selectedLoc?._id || "");
  };

  const handleDestination = (id) => {
    navigate(`/propertydetails/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pid) {
      toast.error("Please select a location first!");
      return;
    }
    navigate(`/propertydetails/${pid}`);
  };

  useEffect(() => {
    fetchDestinations();
    fetchLocations();
  }, []);

  return (
    <>
      {/* Banner Section */}
      <div
        className="banner"
        style={{
          position: "relative",
          minHeight: "90vh",
          backgroundImage: `url(${url})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        ></div>

        <p
          className="banner-text"
          style={{
            fontSize: "65px",
            fontWeight: "600",
            color: "white",
            zIndex: 1,
          }}
        >
          Welcome to TripNest
        </p>

        {/* Form Container */}
        <div
          className="banner-container"
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.2rem",
            width: "80%",
            maxWidth: "700px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "56px",
            padding: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          {/* Search and Date Picker */}
          <form
            className="banner-form"
            style={{
              display: "flex",
              width: "100%",
              gap: "10px",
            }}
            onSubmit={handleSearch}
          >
            {/* Select Location */}
            <select
              value={locationName}
              onChange={handleLocationChange}
              style={{
                padding: "13px",
                fontSize: "1rem",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                outline: "none",
                width: "100%",
                background: "white",
                color: "#111827",
                cursor: "pointer",
              }}
            >
              <option value="" style={{ color: "#6b7280" }}>
                Select Location
              </option>

              {locationList?.map((loc) => (
                <option
                  key={loc._id}
                  value={loc.name}
                  style={{
                    padding: "10px",
                    fontSize: "1rem",
                    backgroundColor: "white",
                    color: "#111827",
                  }}
                >
                  {loc.name}
                </option>
              ))}
            </select>

            {/* Date Picker */}
            <BookingDatePicker />

            {/* Search Button */}
            <button
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: "#2563eb",
                color: "white",
                fontWeight: "600",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* DESTINATIONS */}
      <div style={{ marginTop: "30px", padding: "15px 20px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
          Destinations
        </h2>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            padding: "20px 10px",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
          }}
        >
          <style>
            {`
              div::-webkit-scrollbar { display: none; }
            `}
          </style>

          {destinations.map((property) => (
            <div
              key={property._id}
              style={{
                flex: "0 0 auto",
                width: "280px",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onClick={() => handleDestination(property._id)}
            >
              <img
                src={optimizeImage(property.images[0], 600)}
                alt={property.name}
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
                  {property.name}
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
                  📍 {property.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Locations */}
      <div style={{ marginTop: "30px", padding: "15px 20px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
          Trending Locations
        </h2>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            padding: "20px 10px",
            scrollBehavior: "smooth",
            scrollbarWidth: "none", // Firefox hides scrollbar
          }}
        >
          {/* Hide scrollbar for Chrome, Safari, Edge */}
          <style>
            {`
              div::-webkit-scrollbar {
              display: none;
            }
          `}
          </style>

          {destinations.map((property) => (
            <div
              key={property.id}
              style={{
                flex: "0 0 auto",
                width: "280px",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
            >
              <img
                src={optimizeImage(property.images[0], 600)}
                alt={property.name}
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
                  {property.name}
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
                  📍 {property.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore with Tripnest */}
      <div style={{ marginTop: "30px", padding: "15px 20px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
          Explore India with Tripnest
        </h2>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            padding: "20px 10px",
            scrollBehavior: "smooth",
            scrollbarWidth: "none", // Firefox hides scrollbar
          }}
        >
          {/* Hide scrollbar for Chrome, Safari, Edge */}
          <style>
            {`
              div::-webkit-scrollbar {
              display: none;
            }
          `}
          </style>

          {destinations.map((property) => (
            <div
              key={property.id}
              style={{
                flex: "0 0 auto",
                width: "280px",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
            >
              <img
                src={optimizeImage(property.images[0], 600)}
                alt={property.name}
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
                  {property.name}
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
                  📍 {property.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
