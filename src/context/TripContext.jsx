import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

const STORAGE_KEY = "tripcraft-state-v1";
const uid = () => Math.random().toString(36).slice(2, 9);

const newTrip = ({ name = "My First Trip", startDate = "", days = 3, travellers = 1, budgetLimit = 50000 } = {}) => ({
  id: uid(),
  name,
  startDate,
  days: Number(days),
  travellers: Number(travellers),
  budgetLimit: Number(budgetLimit),
  items: [], // { uid, kind: 'stay' | 'activity', destId, activityId?, day }
});

function init() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.trips) && saved.trips.length) return saved;
  } catch (e) {
    /* ignore corrupt storage */
  }
  const t = newTrip();
  return { trips: [t], activeTripId: t.id };
}

// Apply a change only to the currently selected trip.
const updateActive = (state, fn) => ({
  ...state,
  trips: state.trips.map((t) => (t.id === state.activeTripId ? fn(t) : t)),
});

const nextDay = (trip) => Math.min(Math.max(0, ...trip.items.map((i) => i.day)) + 1, trip.days);

export function tripReducer(state, action) {
  switch (action.type) {
    case "CREATE_TRIP": {
      const t = newTrip(action.payload);
      return { trips: [...state.trips, t], activeTripId: t.id };
    }
    case "DELETE_TRIP": {
      const trips = state.trips.filter((t) => t.id !== action.id);
      if (!trips.length) {
        const t = newTrip();
        return { trips: [t], activeTripId: t.id };
      }
      return { trips, activeTripId: state.activeTripId === action.id ? trips[0].id : state.activeTripId };
    }
    case "SET_ACTIVE":
      return { ...state, activeTripId: action.id };
    case "UPDATE_TRIP":
      return {
        ...state,
        trips: state.trips.map((t) => {
          if (t.id !== action.id) return t;
          const updated = { ...t, ...action.changes };
          // Keep items inside the trip length if days were reduced.
          return { ...updated, items: updated.items.map((i) => ({ ...i, day: Math.min(i.day, updated.days) })) };
        }),
      };
    case "ADD_DESTINATION":
      return updateActive(state, (t) => {
        if (t.items.some((i) => i.kind === "stay" && i.destId === action.destId)) return t;
        return { ...t, items: [...t.items, { uid: uid(), kind: "stay", destId: action.destId, day: nextDay(t) }] };
      });
    case "REMOVE_DESTINATION":
      // Cascade: removing a destination also removes all of its activities.
      return updateActive(state, (t) => ({ ...t, items: t.items.filter((i) => i.destId !== action.destId) }));
    case "ADD_ACTIVITY":
      return updateActive(state, (t) => {
        if (t.items.some((i) => i.activityId === action.activityId)) return t;
        let items = t.items;
        let stay = items.find((i) => i.kind === "stay" && i.destId === action.destId);
        if (!stay) {
          // An activity cannot exist without its destination – add it automatically.
          stay = { uid: uid(), kind: "stay", destId: action.destId, day: nextDay(t) };
          items = [...items, stay];
        }
        const activity = { uid: uid(), kind: "activity", destId: action.destId, activityId: action.activityId, day: stay.day };
        return { ...t, items: [...items, activity] };
      });
    case "REMOVE_ACTIVITY":
      return updateActive(state, (t) => ({ ...t, items: t.items.filter((i) => i.activityId !== action.activityId) }));
    case "MOVE_ITEM":
      return updateActive(state, (t) => ({
        ...t,
        items: t.items.map((i) => (i.uid === action.uid ? { ...i, day: Number(action.day) } : i)),
      }));
    case "CLEAR_ITINERARY":
      return updateActive(state, (t) => ({ ...t, items: [] }));
    default:
      return state;
  }
}

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(tripReducer, undefined, init);

  // Persist every change so trips survive a page refresh.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage unavailable */
    }
  }, [state]);

  const activeTrip = useMemo(
    () => state.trips.find((t) => t.id === state.activeTripId) || state.trips[0],
    [state]
  );

  const value = useMemo(
    () => ({
      trips: state.trips,
      activeTrip,
      isDestinationAdded: (destId) => activeTrip.items.some((i) => i.kind === "stay" && i.destId === destId),
      isActivityAdded: (activityId) => activeTrip.items.some((i) => i.activityId === activityId),
      createTrip: (payload) => dispatch({ type: "CREATE_TRIP", payload }),
      deleteTrip: (id) => dispatch({ type: "DELETE_TRIP", id }),
      setActiveTrip: (id) => dispatch({ type: "SET_ACTIVE", id }),
      updateTrip: (id, changes) => dispatch({ type: "UPDATE_TRIP", id, changes }),
      addDestination: (destId) => dispatch({ type: "ADD_DESTINATION", destId }),
      removeDestination: (destId) => dispatch({ type: "REMOVE_DESTINATION", destId }),
      addActivity: (destId, activityId) => dispatch({ type: "ADD_ACTIVITY", destId, activityId }),
      removeActivity: (activityId) => dispatch({ type: "REMOVE_ACTIVITY", activityId }),
      moveItem: (itemUid, day) => dispatch({ type: "MOVE_ITEM", uid: itemUid, day }),
      clearItinerary: () => dispatch({ type: "CLEAR_ITINERARY" }),
    }),
    [state.trips, activeTrip]
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

TripProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTrips() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrips must be used inside <TripProvider>");
  return ctx;
}
