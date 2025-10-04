import React from 'react';
import ExtraCard from "./ExtraCard.jsx";
import '../styles/accommodation-card.css'

export default function AccommodationCard({accommodation}) {
    if (!accommodation) return null;

    const {
        name,
        address,
        phone,
        checkIn,
        checkOut,
        description,
        extra
    } = accommodation;

    return (
        <div className="accommodation-card">
            <div className="accommodation-header">
                <div className="accommodation-title">住宿</div>
                <h3 className="accommodation-name">{name}</h3>
                {description && <span className="accommodation-description">{description}</span>}
                {phone && <p className="accommodation-phone">TEL：{phone}</p>}
            </div>

            <div className="accommodation-body">
                {address && <p className="accommodation-address">📍 {address}</p>}
                {checkIn && <p>入住時間：{checkIn}</p>}
                {checkOut && <p>退房時間：{checkOut}</p>}
            </div>
            {extra && (
                <ExtraCard
                    title={extra.title}
                    items={extra.items}
                />
            )}
        </div>
    );
}