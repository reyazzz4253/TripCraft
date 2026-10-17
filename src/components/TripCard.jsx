import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { formatINR } from "../utils/budget";
import { badge, card, colors, subtle } from "../styles";

export default function TripCard({ trip, isActive, total, placeCount, onSelect, onDelete }) {
  return (
    <article style={{ ...card, border: `2px solid ${isActive ? colors.primary : colors.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start" }}>
        <h3 style={{ margin: 0 }}>{trip.name}</h3>
        {isActive && <span style={badge()}>Active</span>}
      </div>
      <p style={{ ...subtle, margin: "6px 0 10px" }}>
        {trip.startDate ? `Starts ${new Date(trip.startDate).toLocaleDateString("en-IN")}` : "No start date"} ·{" "}
        {trip.days} days · {trip.travellers} traveller{trip.travellers > 1 ? "s" : ""}
      </p>
      <div style={{ fontSize: 14, marginBottom: 12 }}>
        📍 {placeCount} destination{placeCount !== 1 ? "s" : ""} · Estimated <b>{formatINR(total)}</b> of{" "}
        {formatINR(trip.budgetLimit)}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button variant={isActive ? "success" : "outline"} size="sm" onClick={() => onSelect(trip.id)} disabled={isActive}>
          {isActive ? "✓ Selected" : "Set as active"}
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(trip.id)}>
          Delete
        </Button>
      </div>
    </article>
  );
}

TripCard.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    days: PropTypes.number.isRequired,
    travellers: PropTypes.number.isRequired,
    budgetLimit: PropTypes.number.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  placeCount: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
