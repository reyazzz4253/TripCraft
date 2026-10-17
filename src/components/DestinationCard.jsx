import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";
import { CATEGORY_META } from "../data/destinations";
import { formatINR } from "../utils/budget";
import { badge, card, colors, subtle } from "../styles";

export default function DestinationCard({ destination, isAdded, onToggle }) {
  const meta = CATEGORY_META[destination.category] || { emoji: "📍", color: colors.primary };

  return (
    <article style={{ ...card, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: 110,
          background: `linear-gradient(135deg, ${meta.color}, ${colors.primaryDark})`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54,
        }}
      >
        {meta.emoji}
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18 }}>{destination.name}</h3>
            <p style={subtle}>{destination.country}</p>
          </div>
          <span style={badge(`${meta.color}22`, meta.color)}>{destination.category}</span>
        </div>

        <p style={{ ...subtle, flex: 1 }}>{destination.description}</p>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: colors.muted }}>
          <span>⭐ {destination.rating}</span>
          <span>🗓️ {destination.bestTime}</span>
        </div>

        <div style={{ fontSize: 15 }}>
          From <b style={{ color: colors.primary }}>{formatINR(destination.baseCost)}</b> / person
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            to={`/explore/${destination.id}`}
            style={{
              flex: 1, textAlign: "center", padding: "9px 12px", borderRadius: 8, fontWeight: 600, fontSize: 14,
              border: `1px solid ${colors.border}`, color: colors.text, textDecoration: "none",
            }}
          >
            Details & activities
          </Link>
          <Button variant={isAdded ? "danger" : "primary"} onClick={() => onToggle(destination.id)}>
            {isAdded ? "✕ Remove" : "+ Add to trip"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export const destinationShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  baseCost: PropTypes.number.isRequired,
  rating: PropTypes.number,
  bestTime: PropTypes.string,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired, cost: PropTypes.number.isRequired })
  ).isRequired,
});

DestinationCard.propTypes = {
  destination: destinationShape.isRequired,
  isAdded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
