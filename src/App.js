import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Exchange from "./pages/Exchange";
import CoinContextProvider from "./context/CoinContextProvider";

const App = () => {
  return (
    <CoinContextProvider>
      <div>
        <Header></Header>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contact />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </Router>
        <Footer></Footer>
      </div>
    </CoinContextProvider>
  );
};

export default App;
