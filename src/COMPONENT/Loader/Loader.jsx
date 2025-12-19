import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Loader = ({ color = "#FFA41C", size = 15, loading = true }) => {
  const loaderStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  return (
    <div style={loaderStyle}>
      <ClimbingBoxLoader color={color} size={size} loading={loading} />
    </div>
  );
};

export default Loader;
