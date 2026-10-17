import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { computeBudget, formatINR } from "../utils/budget";
import { card, colors, h2 } from "../styles";

// Summary derived from the same trip state used by the itinerary.
export default function TripSummary({ trip }) {
  const b = useMemo(() => computeBudget(trip), [trip]);
  const over = b.remaining < 0;

  const line = (k, v) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px dashed ${colors.border}` }}>
      <span style={{ color: colors.muted }}>{k}</span>
      <b>{v}</b>
    </div>
  );

  return (
    <aside style={card}>
      <h2 style={h2}>📋 Trip summary</h2>
      {line("Destinations", b.destinationCount)}
      {line("Activities", b.activityCount)}
      {line("Duration", `${trip.days} days`)}
      {line("Travellers", trip.travellers)}
      {line("Cost per person", formatINR(b.perPerson))}
      {line("Estimated total", formatINR(b.total))}
      <div style={{ marginTop: 10, fontWeight: 700, color: over ? colors.danger : colors.success }}>
        {over ? `Over budget by ${formatINR(-b.remaining)}` : `${formatINR(b.remaining)} left in budget`}
      </div>
      <Link to="/budget" style={{ display: "inline-block", marginTop: 10, color: colors.primary, fontSize: 14 }}>
        View full budget →
      </Link>
    </aside>
  );
}

TripSummary.propTypes = {
  trip: PropTypes.shape({
    days: PropTypes.number.isRequired,
    travellers: PropTypes.number.isRequired,
    budgetLimit: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
