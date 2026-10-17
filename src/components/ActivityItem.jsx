import React from "react";
import PropTypes from "prop-types";
import { formatINR } from "../utils/budget";
import { colors } from "../styles";

// Reusable row used on the Destination, Itinerary and Budget views.
export default function ActivityItem({ icon = "🎟️", title, subtitle = "", cost, highlighted = false, children = null }) {
  return (
    <div
      style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, padding: "10px 12px",
        borderRadius: 10, border: `1px solid ${highlighted ? colors.primary : colors.border}`,
        background: highlighted ? "#ecfdf5" : "#fff",
      }}
    >
      <span style={{ fontSize: 22 }}>{icon}</span>
      <div style={{ flex: "1 1 180px", minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, color: colors.muted }}>{subtitle}</div>}
      </div>
      <b style={{ color: colors.primary, minWidth: 70, textAlign: "right" }}>{cost === 0 ? "Free" : formatINR(cost)}</b>
      {children && <div style={{ display: "flex", gap: 6, alignItems: "center" }}>{children}</div>}
    </div>
  );
}

ActivityItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  cost: PropTypes.number.isRequired,
  highlighted: PropTypes.bool,
  children: PropTypes.node,
};

