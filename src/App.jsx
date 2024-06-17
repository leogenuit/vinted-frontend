import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route path="/signup" element={<SignUp setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
