import React from 'react';
import ImageCarousel from "../images/ImageCarousel.jsx";
import ExtraCard from "../cards/ExtraCard.jsx";
import '../styles/spot-card.css';

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
        <div className={`spot-card ${isMeal ? 'meal-plan-card' : ''}`}>
            {/* 標題與時間 */}
            <div className="spot-time">{time}</div>
            <div className="spot-title">{name}</div>

            {/* 圖片 */}
            <ImageCarousel images={images} />

            {/* 地圖連結 */}
            {displayMap && (
                <div className="map-link-container">
                    <a
                        href={displayMap}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                    >
                        <img
                            src="/icons/icons8-map-48.png" // 請根據你的 icon 檔案路徑修改
                            alt="Map Icon"
                            className="spot-icon"
                        />
                        Google Map
                    </a>
                </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="spot-tags">
                    {tags.map((tag, i) => (
                        <span key={i} className="spot-tag">{tag}</span>
                    ))}
                </div>
            )}

            {/* 交通方式 */}
            {transportation && (
                <div className="transportation-info">
                    <h4 className="transportation-title">🚄 交通方式</h4>
                    <p className="transportation-content">{transportation}</p>
                </div>
            )}

            <ExtraCard
                title={extra.title}
                items={extra.items}
            />

            {/* 說明 */}
            <div className="spot-description">{description}</div>

            {/* 必吃 */}
            {mustEat.length > 0 && (
                <div className="spot-mustEat">
                    <div>
                        <img
                            src="/icons/icons8-sushi-64.png" // 請根據你的 icon 檔案路徑修改
                            alt="Map Icon"
                            className="spot-icon"
                        /> 必買
                        必吃
                    </div>
                    <ul>
                        {mustEat.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 必買 */}
            {mustBuy.length > 0 && (
                <div className="spot-mustBuy">
                    <div>
                        <img
                            src="/icons/icons8-money-48.png" // 請根據你的 icon 檔案路徑修改
                            alt="Map Icon"
                            className="spot-icon"
                        /> 必買
                    </div>
                    <ul>
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
            <hr className="spot-hr" />
        </div>
    );
}