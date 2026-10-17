import React, { useMemo, useState } from "react";
import SearchFilterBar from "../components/SearchFilterBar";
import DestinationCard from "../components/DestinationCard";
import EmptyState from "../components/EmptyState";
import { CATEGORIES, destinations } from "../data/destinations";
import { useTrips } from "../context/TripContext";
import { grid, h1, page, subtle } from "../styles";

const BUDGET_CEILING = Math.ceil(Math.max(...destinations.map((d) => d.baseCost)) / 1000) * 1000;

export default function Explore() {
  const { activeTrip, isDestinationAdded, addDestination, removeDestination } = useTrips();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxBudget, setMaxBudget] = useState(BUDGET_CEILING);
  const [sortBy, setSortBy] = useState("rating");

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = destinations.filter((d) => {
      const matchesText =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.activities.some((a) => a.name.toLowerCase().includes(q));
      const matchesCategory = category === "All" || d.category === category;
      return matchesText && matchesCategory && d.baseCost <= maxBudget;
    });
    const sorters = {
      rating: (a, b) => b.rating - a.rating,
      costAsc: (a, b) => a.baseCost - b.baseCost,
      costDesc: (a, b) => b.baseCost - a.baseCost,
      name: (a, b) => a.name.localeCompare(b.name),
    };
    return [...filtered].sort(sorters[sortBy]);
  }, [search, category, maxBudget, sortBy]);

  const toggle = (id) => (isDestinationAdded(id) ? removeDestination(id) : addDestination(id));

  return (
    <div style={page}>
      <h1 style={h1}>Explore destinations</h1>
      <p style={{ ...subtle, marginBottom: 16 }}>
        Adding to: <b>{activeTrip.name}</b> · {results.length} destination{results.length !== 1 ? "s" : ""} found
      </p>

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={CATEGORIES}
        maxBudget={maxBudget}
        onMaxBudgetChange={setMaxBudget}
        budgetCeiling={BUDGET_CEILING}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {results.length === 0 ? (
        <EmptyState icon="🔍" title="No destinations match" message="Try a different search, category or a higher budget." />
      ) : (
        <div style={grid(270)}>
          {results.map((d) => (
            <DestinationCard key={d.id} destination={d} isAdded={isDestinationAdded(d.id)} onToggle={toggle} />
          ))}
        </div>
      )}
    </div>
  );
}
