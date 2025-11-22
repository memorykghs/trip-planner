import React from 'react';
import '../styles/flight-card.css'

export default function FlightCard({flights, flightNotices}) {
    if (!flights) return null;

    return (
        <div>
            <div className="head-title">航班資訊</div>
            <hr className="head-hr"></hr>
            <div className="flight-card">
                {flights.map((flight, idx) => (
                    <div className="flight-block" key={idx}>
                        <div className="flight-date">{flight.date}｜{flight.airline} {flight.flightNumber}</div>
                        <div className="flight-route">
                            <span className="airport">{flight.departure}</span>
                            <span className="dash"> — </span>
                            <span className="airport">{flight.arrival}</span>
                        </div>
                        <div className="flight-times">
                            <span className="time">{flight.departureTime}</span>
                            <span className="time">{flight.arrivalTime}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="notice-section">
                {flightNotices.map((item, idx) => (
                    <p key={idx}>{item}</p>
                ))}
            </div>
        </div>
    );
}