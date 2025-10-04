import React from 'react';
import '../styles/notice-card.css'

export default function NoticeCard({ title, content }) {
    return (
        <div className="notice-card">
            <div className="notice-content">
                <div className="notice-title">{title}</div>
                <span className="notice-text">{content}</span>
            </div>
        </div>
    );
}