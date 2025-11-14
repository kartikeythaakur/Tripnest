import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const Navbar2 = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div
        style={{
          backgroundColor: "rgb(30, 58, 138)",
          color: "white",
          minHeight: "70px",
          maxHeight: "70px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        {/* Logo  */}
        <div>
          <h3>Tripnest</h3>
        </div>

        {/* Desktop menu  */}
        {/* <div>
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              listStyleType: "none",
            }}
          >
            <li>Home</li>
            <li>Destinations</li>
            <li>Packages</li>
            <li>About</li>
            <li>Help</li>
          </ul>
        </div> */}

        {/* Menu icon  */}
        {!showMenu && (
          <MenuIcon
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            style={{
              position:"absolute",
              right:"30px",
            }}
          />
        )}

        {/* Menu Mobile  */}
          <div>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
                listStyleType: "none",
                position: "fixed",
                backgroundColor: "rgb(30, 58, 138)",
                top: 0,
                right: 0,
                height: "100vh",
                width: "250px",
                marginTop: "70px",
                padding: "20px",
                transform: showMenu ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <CloseIcon
                style={
                  {
                    position:"absolute",
                    top:"-43px",
                    right:"22px",
                  }
                }
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              />
              <li>Home</li>
              <li>Destinations</li>
              <li>Packages</li>
              <li>About</li>
              <li>Help</li>
            </ul>
          </div>
      
      </div>
    </>
  );
};

export default Navbar2;
