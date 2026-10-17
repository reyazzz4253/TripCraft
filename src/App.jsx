import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import DestinationDetail from "./pages/DestinationDetail";
import MyTrips from "./pages/MyTrips";
import Itinerary from "./pages/Itinerary";
import Budget from "./pages/Budget";
import NotFound from "./pages/NotFound";
import { colors } from "./styles";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/explore" replace />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:id" element={<DestinationDetail />} />
          <Route path="/trips" element={<MyTrips />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer style={{ textAlign: "center", padding: 16, fontSize: 13, color: colors.muted }}>
        TripCraft · Weather by Open-Meteo · Maps © OpenStreetMap contributors
      </footer>
    </div>
  );
}
