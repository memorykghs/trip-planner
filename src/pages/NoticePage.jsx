import React from "react";
import NoticeCard from "../cards/NoticeCard.jsx";

// 注意事項
export default function NoticePage({noticeItems}) {
    return (
        <div>
            {noticeItems.map((item, index) => (
                <NoticeCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    content={item.content}
                />
            ))}
        </div>
    );
}
