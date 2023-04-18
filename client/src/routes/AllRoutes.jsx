import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Footer from "../components/Footer";
import User from "../pages/User";
import Navbar from "../components/Navbar";
import PrivateRoute from "./ProtectedRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignIn />
            <Footer />
          </>
        }
      />
      <Route
        path="/user"
        element={
          <>
            <PrivateRoute>
              <Navbar />
              <div className="pt-24 bg-[#d4d3d3] ">
                <User />
                <div>
                  <Footer />
                </div>
              </div>
            </PrivateRoute>
          </>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
