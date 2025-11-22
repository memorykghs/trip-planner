import React, { useState, useEffect, useRef } from 'react';
import '../styles/itinerary-overview-page.css';

export default function ItineraryOverviewPage({ itinerary = [] }) {
    if (!itinerary || itinerary.length === 0) return null;

    const [activeDay, setActiveDay] = useState(null);
    const scrollContainerRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return;
            const middleY = window.innerHeight / 2;

            let closestIndex = null;
            let closestDistance = Infinity;

            itemRefs.current.forEach((el, idx) => {
                if (!el) return;
                const box = el.getBoundingClientRect();
                const boxCenterY = (box.top + box.bottom) / 2;
                const distance = Math.abs(boxCenterY - middleY);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = idx;
                }
            });

            if (closestIndex !== null) {
                setActiveDay(closestIndex);
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            // 初始调用一次以设置初始高亮
            handleScroll();
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [itinerary]);

    return (
        <div>
            <div className="head-title">行程一覽</div>
            <hr className="head-hr" />
            <div className="itinerary-wrapper">
                <div className="vertical-line"></div>
                <div className="timeline-scroll-container" ref={scrollContainerRef}>
                    {itinerary.map((item, index) => (
                        <div
                            key={index}
                            className={`timeline-item ${activeDay === index ? 'active' : ''}`}
                            ref={ele => (itemRefs.current[index] = ele)}
                        >
                            <div className="timeline-content">
                                <div className="day-title">
                                    <div className="timeline-dot"></div>
                                    <p>DAY {item.day}</p>
                                    <p>{item.title}</p>
                                </div>
                                <div className="day-date">{item.date.slice(5)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}