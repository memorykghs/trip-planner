import React from "react";
import '../styles/head-card.css';

export default function HeadCard({tripData}) {
    return (
        <div>
            <div className="head-card">
                <p><strong>團號：</strong>{tripData.tripNumber}</p>
                <p><strong>日期：</strong>{tripData.tripStartDate} ~ {tripData.tripEndDate}</p>
            </div>
        </div>
    );
}