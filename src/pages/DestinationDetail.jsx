import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import ActivityItem from "../components/ActivityItem";
import WeatherWidget from "../components/WeatherWidget";
import MapEmbed from "../components/MapEmbed";
import EmptyState from "../components/EmptyState";
import { getDestination, CATEGORY_META } from "../data/destinations";
import { useTrips } from "../context/TripContext";
import { formatINR } from "../utils/budget";
import { badge, card, colors, h1, h2, page, row, subtle } from "../styles";

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeTrip, isDestinationAdded, isActivityAdded, addDestination, removeDestination, addActivity, removeActivity } =
    useTrips();
  const dest = getDestination(id);

  if (!dest) {
    return (
      <div style={page}>
        <EmptyState icon="🗺️" title="Destination not found" actionLabel="Back to Explore" actionTo="/explore" />
      </div>
    );
  }

  const added = isDestinationAdded(dest.id);
  const meta = CATEGORY_META[dest.category];

  return (
    <div style={page}>
      <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <div style={{ ...row, justifyContent: "space-between", margin: "14px 0" }}>
        <div>
          <h1 style={h1}>
            {meta.emoji} {dest.name}
          </h1>
          <p style={subtle}>
            {dest.country} · ⭐ {dest.rating} · Best time: {dest.bestTime}
          </p>
        </div>
        <Button variant={added ? "danger" : "primary"} onClick={() => (added ? removeDestination(dest.id) : addDestination(dest.id))}>
          {added ? "✕ Remove from trip" : `+ Add to "${activeTrip.name}"`}
        </Button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "flex-start" }}>
        <section style={{ ...card, flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={badge(`${meta.color}22`, meta.color)}>{dest.category}</span>
          <p style={{ margin: 0 }}>{dest.description}</p>
          <p style={{ margin: 0 }}>
            Estimated travel + stay: <b style={{ color: colors.primary }}>{formatINR(dest.baseCost)}</b> per person
          </p>

          <h2 style={{ ...h2, marginTop: 8 }}>🎯 Activities</h2>
          {dest.activities.map((a) => {
            const on = isActivityAdded(a.id);
            return (
              <ActivityItem key={a.id} title={a.name} cost={a.cost} highlighted={on}>
                <Button
                  size="sm"
                  variant={on ? "danger" : "outline"}
                  onClick={() => (on ? removeActivity(a.id) : addActivity(dest.id, a.id))}
                >
                  {on ? "Remove" : "Add"}
                </Button>
              </ActivityItem>
            );
          })}
          <p style={{ ...subtle, fontSize: 12 }}>Adding an activity automatically adds {dest.name} to your trip.</p>
        </section>

        <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 18 }}>
          <WeatherWidget lat={dest.lat} lon={dest.lon} place={dest.name} />
          <MapEmbed lat={dest.lat} lon={dest.lon} name={dest.name} />
        </div>
      </div>
    </div>
  );
}
