import React, {useState} from 'react';
import '../styles/spot-card.css';
import schedule from '../data/schedule.json';
import SpotCard from "../cards/SpotCard.jsx";
import AccommodationCard from "../cards/AccommodationCard.jsx";
import MealPlanCard from "../cards/MealPlanCard.jsx";

export default function ItineraryTabs() {
    const [activeDayIndex, setActiveDayIndex] = useState(0);
    const activeItinerary = schedule.itinerary[activeDayIndex];

    return (
        <div>
            {/* Tabs */}
            <div className="tabs">
                {schedule.itinerary.map((item, index) => (
                    <button
                        key={index}
                        className={`tab-button ${activeDayIndex === index ? 'active' : ''}`}
                        onClick={() => setActiveDayIndex(index)}
                    >
                        Day {index + 1}
                    </button>
                ))}
            </div>

            {/*{activeItinerary?.meals && (*/}
            {/*    <MealPlanCard meals={activeItinerary.meals} />*/}
            {/*)}*/}

            {activeItinerary?.accommodation && (
                <AccommodationCard accommodation={activeItinerary.accommodation} />
            )}

            {/* Spots under active tab */}
            {activeItinerary?.spots.map((spot, spotIdx) => (
                <SpotCard key={spotIdx} spot={spot}/>
            ))}
        </div>
    );
}