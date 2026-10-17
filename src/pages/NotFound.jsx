import React from "react";
import EmptyState from "../components/EmptyState";
import { page } from "../styles";

export default function NotFound() {
  return (
    <div style={page}>
      <EmptyState icon="🧭" title="Page not found" message="This route doesn't exist." actionLabel="Go to Explore" actionTo="/explore" />
    </div>
  );
}
