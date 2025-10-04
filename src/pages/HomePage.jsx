import React from "react";
import HeadCard from "../cards/HeadCard.jsx";
import FlightCard from "../cards/FlightCard.jsx";

export default function HomePage({tripData}) {
    return (
        <>
            <HeadCard tripData={tripData}/>
            <FlightCard flights={tripData.flights} flightNotices={tripData.flightNotices} />
        </>
    );
}
