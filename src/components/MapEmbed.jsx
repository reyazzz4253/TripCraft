import React from "react";
import PropTypes from "prop-types";
import { card, colors, h2 } from "../styles";

// External service: OpenStreetMap embed (no API key needed).
export default function MapEmbed({ lat, lon, name, zoomSpan = 0.12, height = 280 }) {
  const bbox = [lon - zoomSpan, lat - zoomSpan, lon + zoomSpan, lat + zoomSpan].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <section style={card}>
      <h2 style={h2}>🗺️ Map – {name}</h2>
      <iframe
        title={`Map of ${name}`}
        src={src}
        width="100%"
        height={height}
        loading="lazy"
        style={{ border: 0, borderRadius: 10 }}
      />
      <a
        href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=11/${lat}/${lon}`}
        target="_blank"
        rel="noreferrer"
        style={{ fontSize: 13, color: colors.primary }}
      >
        Open larger map ↗
      </a>
    </section>
  );
}

MapEmbed.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  zoomSpan: PropTypes.number,
  height: PropTypes.number,
};

