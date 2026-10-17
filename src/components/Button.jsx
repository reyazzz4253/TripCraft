import React from "react";
import PropTypes from "prop-types";
import { colors } from "../styles";

const VARIANTS = {
  primary: { background: colors.primary, color: "#fff", border: `1px solid ${colors.primary}` },
  outline: { background: "#fff", color: colors.primary, border: `1px solid ${colors.primary}` },
  danger: { background: "#fff", color: colors.danger, border: `1px solid ${colors.danger}` },
  success: { background: colors.success, color: "#fff", border: `1px solid ${colors.success}` },
};

const SIZES = {
  sm: { padding: "5px 10px", fontSize: 13 },
  md: { padding: "9px 16px", fontSize: 14 },
};

export default function Button({ children, onClick, variant = "primary", size = "md", type = "button", disabled = false, title }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        ...VARIANTS[variant],
        ...SIZES[size],
        borderRadius: 8,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "outline", "danger", "success"]),
  size: PropTypes.oneOf(["sm", "md"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

