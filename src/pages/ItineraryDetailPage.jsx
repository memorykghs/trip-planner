import { useParams } from "react-router-dom";
import AccommodationCard from "../cards/AccommodationCard";
import SpotCard from "../cards/SpotCard";

export default function ItineraryDetailPage({ itinerary = [] }) {
    const { day } = useParams();

    // 從 itinerary 找出對應 day 的項目
    const item = itinerary.find(it => String(it.day) === day || String(itinerary.indexOf(it)) === day);

    if (!item) return <div>找不到該行程</div>;

    return (
        <div className="detail-wrapper">
            <div className="head-title">DAY {item.day}</div>
            <hr className="head-hr" />
            <div>📅 日期：{item.date}</div>

            {/* 住宿資訊 */}
            {item.accommodation && (
                <AccommodationCard accommodation={item.accommodation} />
            )}

            {/* 景點列表 */}
            {item.spots?.map((spot, spotIdx) => (
                <SpotCard key={spotIdx} spot={spot} />
            ))}
        </div>
    );
}