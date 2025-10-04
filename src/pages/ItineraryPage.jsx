import React from "react";
import ItineraryTabs from "../components/ItineraryTabs.jsx";

// 行程 Tabs
export default function ItineraryPage({itinerary, setSelectedDayIndex}) {
    return (
        <ItineraryTabs
            days={itinerary}
            onSelect={setSelectedDayIndex}
        />
    );
}