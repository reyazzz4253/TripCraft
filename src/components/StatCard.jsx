import React from "react";
import PropTypes from "prop-types";
import { card, colors } from "../styles";

export default function StatCard({ label, value, hint = "", accent = colors.primary }) {
  return (
    <div style={{ ...card, borderTop: `4px solid ${accent}` }}>
      <div style={{ fontSize: 13, color: colors.muted }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, margin: "4px 0", color: accent }}>{value}</div>
      {hint && <div style={{ fontSize: 12, color: colors.muted }}>{hint}</div>}
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  hint: PropTypes.string,
  accent: PropTypes.string,
};

