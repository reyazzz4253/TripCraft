import React, { useMemo } from "react";
import ActivityItem from "../components/ActivityItem";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import StatCard from "../components/StatCard";
import { useTrips } from "../context/TripContext";
import { computeBudget, formatINR } from "../utils/budget";
import { card, colors, grid, h1, h2, input, label, page, subtle } from "../styles";

export default function Budget() {
  const { activeTrip, updateTrip, removeDestination, removeActivity } = useTrips();
  // Derived state: recalculated whenever the itinerary (activeTrip) changes.
  const b = useMemo(() => computeBudget(activeTrip), [activeTrip]);
  const over = b.remaining < 0;
  const barColor = over ? colors.danger : b.usedPct > 80 ? colors.accent : colors.success;

  const setField = (field) => (e) => updateTrip(activeTrip.id, { [field]: Math.max(field === "travellers" ? 1 : 0, Number(e.target.value) || 0) });

  return (
    <div style={page}>
      <h1 style={h1}>Budget planner – {activeTrip.name}</h1>
      <p style={{ ...subtle, marginBottom: 16 }}>All figures are recalculated automatically from your itinerary.</p>

      <div style={{ ...card, ...grid(200, 12), marginBottom: 18 }}>
        <label style={label}>
          Travellers
          <input style={input} type="number" min="1" value={activeTrip.travellers} onChange={setField("travellers")} />
        </label>
        <label style={label}>
          Budget limit (₹)
          <input style={input} type="number" min="0" step="1000" value={activeTrip.budgetLimit} onChange={setField("budgetLimit")} />
        </label>
      </div>

      <div style={{ ...grid(190, 12), marginBottom: 18 }}>
        <StatCard label="Per person" value={formatINR(b.perPerson)} hint={`${b.destinationCount} places · ${b.activityCount} activities`} />
        <StatCard label="Travel & stay" value={formatINR(b.stayTotal * activeTrip.travellers)} accent="#6366f1" />
        <StatCard label="Activities" value={formatINR(b.activityTotal * activeTrip.travellers)} accent={colors.accent} />
        <StatCard label="Estimated total" value={formatINR(b.total)} hint={`for ${activeTrip.travellers} traveller(s)`} accent={colors.primaryDark} />
        <StatCard
          label={over ? "Over budget" : "Remaining"}
          value={formatINR(Math.abs(b.remaining))}
          hint={`Limit ${formatINR(activeTrip.budgetLimit)}`}
          accent={over ? colors.danger : colors.success}
        />
      </div>

      <div style={{ ...card, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
          <span>Budget used</span>
          <b>{Math.round(activeTrip.budgetLimit ? (b.total / activeTrip.budgetLimit) * 100 : 0)}%</b>
        </div>
        <div style={{ height: 14, background: colors.bg, borderRadius: 999, overflow: "hidden" }}>
          <div style={{ width: `${b.usedPct}%`, height: "100%", background: barColor, transition: "width 0.4s" }} />
        </div>
      </div>

      {b.groups.length === 0 ? (
        <EmptyState icon="💰" title="Nothing to budget yet" message="Add destinations to see the cost breakdown." actionLabel="Explore destinations" actionTo="/explore" />
      ) : (
        <div style={grid(320, 16)}>
          {b.groups.map((g) => (
            <section key={g.destId} style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <h2 style={{ ...h2, margin: 0 }}>📍 {g.name}</h2>
                <Button size="sm" variant="danger" onClick={() => removeDestination(g.destId)}>
                  Remove place
                </Button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {g.stay && <ActivityItem icon="🏨" title="Travel & stay" subtitle={`Day ${g.stay.day}`} cost={g.stay.cost} highlighted />}
                {g.activities.map((a) => (
                  <ActivityItem key={a.uid} title={a.title} subtitle={`Day ${a.day}`} cost={a.cost}>
                    <Button size="sm" variant="danger" onClick={() => removeActivity(a.activityId)} title="Remove activity">
                      ✕
                    </Button>
                  </ActivityItem>
                ))}
              </div>
              <div style={{ textAlign: "right", marginTop: 10, fontSize: 14 }}>
                Subtotal: <b>{formatINR(g.subtotal)}</b> × {activeTrip.travellers} = <b>{formatINR(g.subtotal * activeTrip.travellers)}</b>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
