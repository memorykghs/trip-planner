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
        map = '',
        mapLink = '',
        reference = [],
        isMeal = false,
        transportation = ''
    } = spot;

    // Use map if available, fallback to mapLink
    const displayMap = map || mapLink;

    return (

        <div className={`schedule-card ${isMeal ? 'meal-plan-card' : ''}`}>
            {/* 標題與時間 */}
            <div className="schedule-time">{time}</div>
            <div className="schedule-title">{name}</div>

            {/* 地圖連結 */}
            {displayMap && (
                <div className="map-link-container">
                    <a
                        href={displayMap}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                    >
                        📍 地圖
                    </a>
                </div>
            )}

            {/* 交通方式 */}
            {transportation && (
                <div className="transportation-info">
                    <h4 className="transportation-title">🚇 交通方式</h4>
                    <p className="transportation-content">{transportation}</p>
                </div>
            )}

            {/* 圖片 */}
            <ImageCarousel images={images} />

            <ExtraCard
                title={extra.title}
                items={extra.items}
            />

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

            {/* 參考文章 */}
            {reference && reference.length > 0 && (
                <div className="spot-references">
                    <h4 className="font-semibold text-sm text-primary">參考資料</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {reference.map((url, idx) => (
                            <li key={idx}>
                                <a 
                                    href={url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    {url}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}