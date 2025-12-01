import React from "react";
import FlightCard from "../cards/FlightCard.jsx";

export default function HomePage({tripData}) {
    return (
        <>
            <FlightCard flights={tripData.flights} flightNotices={tripData.flightNotices}/>
        </>
    );
}
