import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg }) => {
  const [{ user }] = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        replace: true,
        state: {
          msg: msg || "Please sign in to continue",
          redirect: location.pathname,
        },
      });
    }
  }, [user, navigate, location, msg]);

  // Prevent rendering protected page if not logged in
  if (!user) return null;

  return children;
};

export default ProtectedRoute;
