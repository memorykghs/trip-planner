// javascript
import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/itinerary-overview-page.css';

export default function ItineraryOverviewPage({itinerary = []}) {
    // Hooks 必須無條件呼叫
    const [activeDay, setActiveDay] = useState(null);
    const scrollContainerRef = useRef(null);
    const itemRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
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
            handleScroll();
            container.addEventListener('scroll', handleScroll, {passive: true});
        }
        window.addEventListener('scroll', handleScroll, {passive: true});
        window.addEventListener('resize', handleScroll);

        return () => {
            if (container) container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [itinerary]);

    const goToItinerary = (item, index) => {
        const id = item.id ?? (index + 1);
        navigate(`/itinerary/${id}`);
    };

    if (!itinerary || itinerary.length === 0) return null;

    return (
        <div>
            <div className="head-title">行程一覽</div>
            <hr className="head-hr"/>
            <div className="itinerary-wrapper">
                <div className="vertical-line"></div>
                <div className="timeline-scroll-container" ref={scrollContainerRef}>
                    {itinerary.map((item, index) => (
                        <div
                            key={index}
                            className={`timeline-item ${activeDay === index ? 'active' : ''}`}
                            ref={ele => (itemRefs.current[index] = ele)}
                            onClick={() => goToItinerary(item, index)} // 綁在整個 item 上
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') goToItinerary(item, index);
                            }}
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