import React from "react";
import PropTypes from "prop-types";
import { card, grid, input, label } from "../styles";
import { formatINR } from "../utils/budget";

export default function SearchFilterBar({
  search, onSearchChange, category, onCategoryChange, categories,
  maxBudget, onMaxBudgetChange, budgetCeiling, sortBy, onSortChange,
}) {
  return (
    <div style={{ ...card, ...grid(200, 12), marginBottom: 18 }}>
      <label style={label}>
        Search
        <input
          style={input}
          type="text"
          placeholder="Destination, country or activity…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>

      <label style={label}>
        Category
        <select style={input} value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label style={label}>
        Max base cost: <b>{formatINR(maxBudget)}</b>
        <input
          type="range"
          min={5000}
          max={budgetCeiling}
          step={1000}
          value={maxBudget}
          onChange={(e) => onMaxBudgetChange(Number(e.target.value))}
        />
      </label>

      <label style={label}>
        Sort by
        <select style={input} value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="rating">Top rated</option>
          <option value="costAsc">Cost: low to high</option>
          <option value="costDesc">Cost: high to low</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </label>
    </div>
  );
}

SearchFilterBar.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  maxBudget: PropTypes.number.isRequired,
  onMaxBudgetChange: PropTypes.func.isRequired,
  budgetCeiling: PropTypes.number.isRequired,
  sortBy: PropTypes.oneOf(["rating", "costAsc", "costDesc", "name"]).isRequired,
  onSortChange: PropTypes.func.isRequired,
};
