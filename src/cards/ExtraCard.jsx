import React from "react";
import "../styles/extra-card.css";

export default function ExtraCard({ title, items }) {
    if (!title || !items || items.length === 0) return null;

    return (
        <div className="extra-card">
            <h3 className="extra-title">{title}</h3>
            {items.length > 0 && (
                <ul className="extra-subtitle">
                    {items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}