import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TripCard from "../components/TripCard";
import { useTrips } from "../context/TripContext";
import { computeBudget } from "../utils/budget";
import { card, grid, h1, h2, input, label, page, subtle } from "../styles";

const EMPTY_FORM = { name: "", startDate: "", days: 3, travellers: 2, budgetLimit: 50000 };

export default function MyTrips() {
  const { trips, activeTrip, createTrip, deleteTrip, setActiveTrip } = useTrips();
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please give your trip a name.");
    if (form.days < 1 || form.travellers < 1) return setError("Days and travellers must be at least 1.");
    setError("");
    createTrip({ ...form, name: form.name.trim() });
    setForm(EMPTY_FORM);
    navigate("/explore");
    return undefined;
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this trip and its itinerary?")) deleteTrip(id);
  };

  return (
    <div style={page}>
      <h1 style={h1}>My trips</h1>
      <p style={{ ...subtle, marginBottom: 16 }}>Create trips and choose which one you are currently planning.</p>

      <form onSubmit={handleSubmit} style={{ ...card, marginBottom: 20 }}>
        <h2 style={h2}>➕ Plan a new trip</h2>
        <div style={grid(170, 12)}>
          <label style={label}>
            Trip name
            <input style={input} name="name" value={form.name} onChange={handleChange} placeholder="e.g. Winter in the hills" />
          </label>
          <label style={label}>
            Start date
            <input style={input} type="date" name="startDate" value={form.startDate} onChange={handleChange} />
          </label>
          <label style={label}>
            Days
            <input style={input} type="number" min="1" max="30" name="days" value={form.days} onChange={handleChange} />
          </label>
          <label style={label}>
            Travellers
            <input style={input} type="number" min="1" max="20" name="travellers" value={form.travellers} onChange={handleChange} />
          </label>
          <label style={label}>
            Budget limit (₹)
            <input style={input} type="number" min="0" step="1000" name="budgetLimit" value={form.budgetLimit} onChange={handleChange} />
          </label>
        </div>
        {error && <p style={{ color: "#dc2626", fontSize: 14 }}>{error}</p>}
        <div style={{ marginTop: 14 }}>
          <Button type="submit">Create trip & start exploring</Button>
        </div>
      </form>

      <div style={grid(280)}>
        {trips.map((t) => {
          const b = computeBudget(t);
          return (
            <TripCard
              key={t.id}
              trip={t}
              isActive={t.id === activeTrip.id}
              total={b.total}
              placeCount={b.destinationCount}
              onSelect={setActiveTrip}
              onDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}
