import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "../Pages/GamePage";
import React from "react";
import Header from "./header.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
