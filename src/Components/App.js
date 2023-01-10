import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "../Pages/GamePage";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <h1>Hello world</h1>
      <Routes>
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
