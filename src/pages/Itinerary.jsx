import React, { useMemo } from "react";
import ActivityItem from "../components/ActivityItem";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import TripSummary from "../components/TripSummary";
import { useTrips } from "../context/TripContext";
import { resolveItems } from "../utils/budget";
import { card, colors, h1, h2, input, page, row, subtle } from "../styles";

const dayLabel = (startDate, n) => {
  if (!startDate) return `Day ${n}`;
  const d = new Date(startDate);
  d.setDate(d.getDate() + n - 1);
  return `Day ${n} · ${d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}`;
};

export default function Itinerary() {
  const { activeTrip, removeDestination, removeActivity, moveItem, clearItinerary, updateTrip } = useTrips();
  const rows = useMemo(() => resolveItems(activeTrip), [activeTrip]);
  const days = Array.from({ length: activeTrip.days }, (_, i) => i + 1);

  const remove = (r) => (r.kind === "stay" ? removeDestination(r.destId) : removeActivity(r.activityId));

  return (
    <div style={page}>
      <div style={{ ...row, justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h1 style={h1}>Itinerary – {activeTrip.name}</h1>
          <p style={subtle}>Move items between days or remove them – the budget updates instantly.</p>
        </div>
        <div style={row}>
          <label style={{ fontSize: 14, color: colors.muted, display: "flex", alignItems: "center", gap: 6 }}>
            Days
            <input
              style={{ ...input, width: 70 }}
              type="number"
              min="1"
              max="30"
              value={activeTrip.days}
              onChange={(e) => updateTrip(activeTrip.id, { days: Math.max(1, Number(e.target.value) || 1) })}
            />
          </label>
          {rows.length > 0 && (
            <Button variant="danger" size="sm" onClick={clearItinerary}>
              Clear all
            </Button>
          )}
        </div>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          icon="🗓️"
          title="Your itinerary is empty"
          message="Add destinations and activities from the Explore page."
          actionLabel="Explore destinations"
          actionTo="/explore"
        />
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "flex-start" }}>
          <div style={{ flex: "3 1 420px", display: "flex", flexDirection: "column", gap: 14 }}>
            {days.map((day) => {
              const dayRows = rows
                .filter((r) => r.day === day)
                .sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "stay" ? -1 : 1));
              return (
                <section key={day} style={card}>
                  <h2 style={h2}>{dayLabel(activeTrip.startDate, day)}</h2>
                  {dayRows.length === 0 ? (
                    <p style={subtle}>Free day – nothing planned yet.</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {dayRows.map((r) => (
                        <ActivityItem
                          key={r.uid}
                          icon={r.kind === "stay" ? "🏨" : "🎟️"}
                          title={r.title}
                          subtitle={r.kind === "stay" ? "Travel & accommodation" : r.destName}
                          cost={r.cost}
                          highlighted={r.kind === "stay"}
                        >
                          <select
                            aria-label="Move to day"
                            value={r.day}
                            onChange={(e) => moveItem(r.uid, e.target.value)}
                            style={{ ...input, width: "auto", padding: "5px 8px" }}
                          >
                            {days.map((d) => (
                              <option key={d} value={d}>Day {d}</option>
                            ))}
                          </select>
                          <Button size="sm" variant="danger" onClick={() => remove(r)} title="Remove">
                            ✕
                          </Button>
                        </ActivityItem>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
          <div style={{ flex: "1 1 260px" }}>
            <TripSummary trip={activeTrip} />
          </div>
        </div>
      )}
    </div>
  );
}
