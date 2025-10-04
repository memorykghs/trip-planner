import React, {useState} from 'react';
import '../styles/itinerary-tabs.css';
import schedule from '../data/schedule.json';
import SpotCard from "../cards/SpotCard.jsx";
import AccommodationCard from "../cards/AccommodationCard.jsx";
import MealPlanCard from "../cards/MealPlanCard.jsx";

export default function ItineraryTabs() {
    const [activeDay, setActiveDay] = useState(1);
    const activeItinerary = schedule.itinerary.find(i => i.day === activeDay);

    return (
        <div>
            {/* Tabs */}
            <div className="tabs">
                {schedule.itinerary.map(({day}) => (
                    <button
                        key={day}
                        className={`tab-button ${activeDay === day ? 'active' : ''}`}
                        onClick={() => setActiveDay(day)}
                    >
                        Day {day}
                    </button>
                ))}
            </div>

            {activeItinerary?.meals && (
                <MealPlanCard meals={activeItinerary.meals} />
            )}

            {activeItinerary?.accommodation && (
                <AccommodationCard accommodation={activeItinerary.accommodation} />
            )}

            {/* Spots under active tab */}
            {activeItinerary?.spots.map((spot) => (
                <SpotCard spot={spot}/>
            ))}
        </div>
    );
}