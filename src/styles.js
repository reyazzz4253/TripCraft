// Shared inline style objects (no CSS files / <style> tags).
export const colors = {
  primary: "#0f766e",
  primaryDark: "#134e4a",
  accent: "#f59e0b",
  bg: "#f4f6fb",
  card: "#ffffff",
  text: "#1f2937",
  muted: "#6b7280",
  border: "#e5e7eb",
  danger: "#dc2626",
  success: "#16a34a",
};

export const page = { maxWidth: 1150, margin: "0 auto", padding: "20px 16px", boxSizing: "border-box" };

export const card = {
  background: colors.card,
  borderRadius: 14,
  border: `1px solid ${colors.border}`,
  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)",
  padding: 16,
  boxSizing: "border-box",
};

// Responsive grid without media queries: columns wrap automatically.
export const grid = (min = 260, gap = 16) => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(min(${min}px, 100%), 1fr))`,
  gap,
});

export const row = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 };

export const input = {
  padding: "9px 12px",
  borderRadius: 8,
  border: `1px solid ${colors.border}`,
  fontSize: 14,
  background: "#fff",
  boxSizing: "border-box",
  width: "100%",
};

export const label = { fontSize: 13, color: colors.muted, display: "flex", flexDirection: "column", gap: 4 };

export const h1 = { fontSize: "clamp(1.4rem, 3vw, 2rem)", margin: "0 0 4px" };
export const h2 = { fontSize: "1.15rem", margin: "0 0 12px" };
export const subtle = { color: colors.muted, margin: 0, fontSize: 14 };

export const badge = (bg = "#e0f2f1", fg = colors.primaryDark) => ({
  display: "inline-block",
  padding: "3px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  background: bg,
  color: fg,
});
