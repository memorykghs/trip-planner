import React from 'react';
import '../styles/flight-card.css'
import NoticeCard from "./NoticeCard.jsx";

export default function FlightCard({flights, flightNotices}) {
    if (!flights) return null;

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">航班資訊</h3>
            <div className="flight-table-wrapper">
                <table className="flight-table">
                    <thead>
                    <tr>
                        <th>日期</th>
                        <th>星期</th>
                        <th>航空公司</th>
                        <th>班機</th>
                        <th>起飛-抵達</th>
                        <th>出發</th>
                        <th>抵達</th>
                    </tr>
                    </thead>
                    <tbody>
                    {flights.map((flight, idx) => (
                        <tr key={idx}>
                            <td>{flight.date}</td>
                            <td>{flight.weekday}</td>
                            <td>{flight.airline}</td>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.route}</td>
                            <td>{flight.departureTime}</td>
                            <td>{flight.arrivalTime}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="">
                <ul className="">
                    {flightNotices.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}