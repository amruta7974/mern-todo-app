import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import API from "./api";

function App() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    API
      .get("/user/me", { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setAuth={setIsAuth} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
