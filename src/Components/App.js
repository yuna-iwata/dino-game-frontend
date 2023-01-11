import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "../Pages/GamePage";
import React from "react";
import Header from "./header.jsx";
import LeaderboardPage from "../Pages/LeaderboardPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/game" element={<GamePage />} />
      </Routes>
      <Routes>
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
