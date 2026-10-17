import React, { useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import { computeBudget, formatINR } from "../utils/budget";
import { colors } from "../styles";

const LINKS = [
  { to: "/explore", label: "🧭 Explore" },
  { to: "/trips", label: "🧳 My Trips" },
  { to: "/itinerary", label: "🗓️ Itinerary" },
  { to: "/budget", label: "💰 Budget" },
];

export default function Navbar() {
  const { activeTrip } = useTrips();
  const budget = useMemo(() => computeBudget(activeTrip), [activeTrip]);

  return (
    <header style={{ background: colors.primaryDark, color: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
      <div
        style={{
          maxWidth: 1150, margin: "0 auto", padding: "10px 16px", boxSizing: "border-box",
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10,
        }}
      >
        <Link to="/explore" style={{ color: "#fff", textDecoration: "none", fontSize: 22, fontWeight: 800 }}>
          ✈️ TripCraft
        </Link>

        <nav style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              style={({ isActive }) => ({
                color: isActive ? colors.primaryDark : "#fff",
                background: isActive ? "#fff" : "transparent",
                padding: "7px 12px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/budget"
          title="Active trip"
          style={{
            color: "#fff", textDecoration: "none", fontSize: 13, background: "rgba(255,255,255,0.15)",
            padding: "6px 12px", borderRadius: 999,
          }}
        >
          {activeTrip.name} · {budget.destinationCount} places · <b>{formatINR(budget.total)}</b>
        </Link>
      </div>
    </header>
  );
}
