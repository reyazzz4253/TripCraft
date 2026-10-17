import { getDestination } from "../data/destinations";

export const formatINR = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

// Turns stored item references (ids only) into display rows with live costs.
// Costs are never copied into state, so they can never go out of sync.
export function resolveItems(trip) {
  return trip.items
    .map((item) => {
      const dest = getDestination(item.destId);
      if (!dest) return null;
      if (item.kind === "stay") {
        return { ...item, title: `Stay & travel – ${dest.name}`, destName: dest.name, cost: dest.baseCost };
      }
      const act = dest.activities.find((a) => a.id === item.activityId);
      if (!act) return null;
      return { ...item, title: act.name, destName: dest.name, cost: act.cost };
    })
    .filter(Boolean);
}

// Derived budget – recomputed from the itinerary every time it changes.
export function computeBudget(trip) {
  const rows = resolveItems(trip);
  const byDestination = {};
  let stayTotal = 0;
  let activityTotal = 0;

  rows.forEach((r) => {
    if (!byDestination[r.destId]) {
      byDestination[r.destId] = { destId: r.destId, name: r.destName, stay: null, activities: [], subtotal: 0 };
    }
    const group = byDestination[r.destId];
    if (r.kind === "stay") {
      group.stay = r;
      stayTotal += r.cost;
    } else {
      group.activities.push(r);
      activityTotal += r.cost;
    }
    group.subtotal += r.cost;
  });

  const perPerson = stayTotal + activityTotal;
  const total = perPerson * trip.travellers;
  const remaining = trip.budgetLimit - total;
  const usedPct = trip.budgetLimit > 0 ? Math.min(100, (total / trip.budgetLimit) * 100) : 0;

  return {
    rows,
    groups: Object.values(byDestination),
    stayTotal,
    activityTotal,
    perPerson,
    total,
    remaining,
    usedPct,
    destinationCount: rows.filter((r) => r.kind === "stay").length,
    activityCount: rows.filter((r) => r.kind === "activity").length,
  };
}
