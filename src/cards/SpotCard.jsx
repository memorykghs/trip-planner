import React from 'react';
import ImageCarousel from "../images/ImageCarousel.jsx";
import ExtraCard from "../cards/ExtraCard.jsx";

export default function SpotCard({ spot }) {
    const {
        name,
        time,
        description,
        tags = [],
        images = [],
        extra = { title: '', items: [] },
        mustEat = [],
        mustBuy = [],
        mapLink
    } = spot;

    return (

        <div className="schedule-card">
            {/* 標題與時間 */}
            <div className="schedule-time">{time}</div>
            <div className="schedule-title">{name}</div>

            {/* 說明 */}
            <div className="schedule-subtitle">{description}</div>

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="spot-tags">
                    {tags.map((tag, i) => (
                        <span key={i} className="spot-tag">
                                    {tag}
                                </span>
                    ))}
                </div>
            )}

            {/* 圖片 */}
            <ImageCarousel images={images} />

            <ExtraCard
                title={extra.title}
                items={extra.items}
            />

            {/* 必吃 */}
            {mustEat.length > 0 && (
                <div>
                    <h4 className="font-semibold text-sm text-primary">必吃</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {mustEat.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 必買 */}
            {mustBuy.length > 0 && (
                <div>
                    <h4 className="font-semibold text-sm text-primary">必買</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {mustBuy.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 地圖連結 */}
            {mapLink && (
                <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 underline"
                >
                    查看地圖
                </a>
            )}
        </div>
    );
}