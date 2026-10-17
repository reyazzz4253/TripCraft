import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { card, colors, subtle } from "../styles";

export default function EmptyState({ icon = "🧳", title, message = "", actionLabel = "", actionTo = "" }) {
  return (
    <div style={{ ...card, textAlign: "center", padding: 36 }}>
      <div style={{ fontSize: 48 }}>{icon}</div>
      <h3 style={{ margin: "8px 0" }}>{title}</h3>
      <p style={subtle}>{message}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          style={{
            display: "inline-block", marginTop: 14, background: colors.primary, color: "#fff",
            padding: "9px 16px", borderRadius: 8, textDecoration: "none", fontWeight: 600,
          }}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  actionLabel: PropTypes.string,
  actionTo: PropTypes.string,
};

