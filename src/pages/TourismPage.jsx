import React from 'react';
import '../styles/tourism.css';

// 示例數據，之後可以從 schedule.json 導入或從編輯器編輯
const tourismData = {
    videoScripts: [
        {
            id: 1,
            title: "美食/機票/門票",
            description: "依序將機票/門票/食物相疊",
            images: ["/shorts-1.jpg"],
            script: "紀錄食物與景點",
            duration: "60秒"
        },
        {
            id: 2,
            title: "景點",
            description: "拍攝距離2~3公尺遠，人物固定在正中間格子",
            images: ["/shorts-2.jpg"],
            script: "",
            duration: ""
        },
        {
            id: 3,
            title: "轉場",
            description: "乘船遊覽馬六甲海峽，欣賞海上清真寺與城市天際線的美景。",
            images: ["/shorts-3.jpg"],
            script: "",
            duration: "45秒"
        },
        {
            id: 4,
            title: "美食",
            description: "乘船遊覽馬六甲海峽，欣賞海上清真寺與城市天際線的美景。",
            images: ["/shorts-4.jpg"],
            script: "",
            duration: "45秒"
        }
    ],
    photoInspirations: [
        {
            id: 1,
            title: "粉紅清真寺倒影",
            description: "拍攝布特拉清真寺在水中的完美倒影",
            image: "/putra-mosque-1.jpg",
            link: "https://example.com/mosque-photo",
            tips: [
                "最佳時間：早上 8-10 點",
                "位置：湖畔廣場",
                "技巧：使用廣角鏡頭捕捉全景"
            ]
        },
        {
            id: 2,
            title: "彩虹階梯黑風洞",
            description: "272層階梯上的色彩與光影",
            image: "/batu-caves-1.jpeg",
            link: "https://example.com/caves-photo",
            tips: [
                "最佳時間：下午 2-4 點",
                "注意：避開朝拜時間",
                "穿著：需穿及膝褲或裙子"
            ]
        }
    ]
};

export default function TourismPage() {
    return (
        <div className="tourism-page">
            <h1 className="tourism-title">旅遊特輯</h1>
            
            {/* 短影片腳本區塊 */}
            <section className="tourism-section">
                <div className="section-header">
                    <h2 className="section-title">🎬 短影片腳本</h2>
                    <p className="section-subtitle">為你的旅程創作精彩短片</p>
                </div>
                
                <div className="cards-grid">
                    {tourismData.videoScripts.map((script) => (
                        <div key={script.id} className="script-card">
                            <div className="card-images">
                                {script.images.map((img, idx) => (
                                    <img 
                                        key={idx} 
                                        src={img} 
                                        alt={script.title}
                                        className="script-image"
                                    />
                                ))}
                            </div>
                            <div className="card-content">
                                <div className="card-header">
                                    <h3 className="card-title">{script.title}</h3>
                                    <span className="card-badge">{script.duration}</span>
                                </div>
                                <p className="card-description">{script.description}</p>
                                <div className="script-content">
                                    <span className="script-label">腳本：</span>
                                    <p className="script-text">{script.script}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 拍照靈感區塊 */}
            <section className="tourism-section">
                <div className="section-header">
                    <h2 className="section-title">📸 拍照靈感</h2>
                    <p className="section-subtitle">捕捉最美的旅行瞬間</p>
                </div>
                
                <div className="cards-grid">
                    {tourismData.photoInspirations.map((photo) => (
                        <div key={photo.id} className="photo-card">
                            <div className="photo-image-wrapper">
                                <img 
                                    src={photo.image} 
                                    alt={photo.title}
                                    className="photo-image"
                                />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{photo.title}</h3>
                                <p className="card-description">{photo.description}</p>
                                {photo.tips && photo.tips.length > 0 && (
                                    <ul className="photo-tips">
                                        {photo.tips.map((tip, idx) => (
                                            <li key={idx}>{tip}</li>
                                        ))}
                                    </ul>
                                )}
                                {photo.link && (
                                    <a 
                                        href={photo.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="photo-link"
                                    >
                                        查看參考 →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

