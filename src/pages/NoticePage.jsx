import React from "react";
import NoticeCard from "../cards/NoticeCard.jsx";
import '../styles/notice-card.css';

// 注意事項
export default function NoticePage({noticeItems}) {
    return (
        <div>
            <div className="head-title">注意事項</div>
            <hr className="head-hr"></hr>
            <div className="notice-scroll-container">
                {noticeItems.map((item, index) => (
                    <NoticeCard
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        content={item.content}
                    />
                ))}
            </div>
        </div>
    );
}
