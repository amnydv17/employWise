// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Orgview from "./components/Orgview";
import { AuthProvider } from "./context/AuthContext";
import EditUser from "./components/EditUser";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/org/:id" element={<Orgview />} />
          <Route path="/edituser" element={<EditUser />} />
        </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;