import React, { useState, useEffect } from 'react';
import tripData from '../data/schedule.json';
import '../styles/editor.css';


function EditPage() {
    const [data, setData] = useState(tripData);
    const [activeTab, setActiveTab] = useState('basic');
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('edited_schedule');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setData(parsed);
            } catch (err) {
                console.error('Failed to parse saved data', err);
            }
        }
    }, []);

    // 更新函數
    const updateData = (path, value) => {
        setData(prev => {
            const newData = { ...prev };
            const keys = path.split('.');
            let current = newData;
            
            for (let i = 0; i < keys.length - 1; i++) {
                if (!(keys[i] in current)) {
                    current[keys[i]] = {};
                }
                current = current[keys[i]];
            }
            
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const updateArrayItem = (arrayPath, index, field, value) => {
        setData(prev => {
            const newData = { ...prev };
            const keys = arrayPath.split('.');
            let current = newData;
            
            for (const key of keys) {
                current = current[key];
            }
            
            current[index][field] = value;
            return newData;
        });
    };

    const addArrayItem = (arrayPath, newItem) => {
        setData(prev => {
            const newData = { ...prev };
            const keys = arrayPath.split('.');
            let current = newData;
            
            for (const key of keys) {
                current = current[key];
            }
            
            current.push(newItem);
            return newData;
        });
    };

    const removeArrayItem = (arrayPath, index) => {
        setData(prev => {
            const newData = { ...prev };
            const keys = arrayPath.split('.');
            let current = newData;
            
            for (const key of keys) {
                current = current[key];
            }
            
            current.splice(index, 1);
            return newData;
        });
    };

    const handleSave = () => {
        const jsonString = JSON.stringify(data, null, 2);
        localStorage.setItem('edited_schedule', jsonString);
        setSaveStatus('✓ 已保存');
        setTimeout(() => setSaveStatus(''), 2000);
    };

    const handleDownload = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'schedule.json';
        link.click();
        URL.revokeObjectURL(url);
        setSaveStatus('✓ 已下載');
        setTimeout(() => setSaveStatus(''), 2000);
    };

    const handleReset = () => {
        if (window.confirm('確定重置為原始數據？這將清除所有本地保存的更改。')) {
            localStorage.removeItem('edited_schedule');
            setData(tripData);
            setSaveStatus('✓ 已重置為最新數據');
            setTimeout(() => setSaveStatus(''), 2000);
        }
    };

    const handleReload = () => {
        // 重新載入頁面以讀取最新的 schedule.json
        window.location.reload();
    };

    const tabs = [
        { id: 'basic', name: '基本資訊' },
        { id: 'flights', name: '航班' },
        { id: 'contacts', name: '聯絡人' },
        { id: 'itinerary', name: '行程' }
    ];

    return (
        <div className="editor-page">
            <div className="editor-header-bar">
                <h1>行程編輯器</h1>
                <div className="header-actions">
                    <button onClick={handleSave} className="btn-primary">保存</button>
                    <button onClick={handleDownload} className="btn-success">下載 JSON</button>
                    <button onClick={handleReload} className="btn-info">重新載入</button>
                    <button onClick={handleReset} className="btn-warning">重置</button>
                    {saveStatus && <span className="status-text">{saveStatus}</span>}
                </div>
            </div>

            <div className="editor-layout">
                <div className="editor-panel">
                    <div className="editor-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    <div className="editor-content">
                        {activeTab === 'basic' && (
                            <BasicInfoEditor data={data} updateData={updateData} />
                        )}
                        {activeTab === 'flights' && (
                            <FlightsEditor 
                                data={data} 
                                updateArrayItem={updateArrayItem}
                                addArrayItem={addArrayItem}
                                removeArrayItem={removeArrayItem}
                            />
                        )}
                        {activeTab === 'contacts' && (
                            <ContactsEditor 
                                data={data} 
                                updateArrayItem={updateArrayItem}
                                addArrayItem={addArrayItem}
                                removeArrayItem={removeArrayItem}
                            />
                        )}
                        {activeTab === 'itinerary' && (
                            <ItineraryEditor 
                                data={data} 
                                updateData={updateData}
                                updateArrayItem={updateArrayItem}
                                addArrayItem={addArrayItem}
                                removeArrayItem={removeArrayItem}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// 基本資訊編輯
function BasicInfoEditor({ data, updateData }) {
    return (
        <div className="form-section">
            <h3>旅程資訊</h3>
            <div className="form-group">
                <label>旅程標題</label>
                <input 
                    type="text" 
                    value={data.tripTitle || ''} 
                    onChange={(e) => updateData('tripTitle', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>團號</label>
                <input 
                    type="text" 
                    value={data.tripNumber || ''} 
                    onChange={(e) => updateData('tripNumber', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>開始日期</label>
                <input 
                    type="date" 
                    value={data.tripStartDate || ''} 
                    onChange={(e) => updateData('tripStartDate', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>結束日期</label>
                <input 
                    type="date" 
                    value={data.tripEndDate || ''} 
                    onChange={(e) => updateData('tripEndDate', e.target.value)}
                />
            </div>
        </div>
    );
}

// 航班編輯
function FlightsEditor({ data, updateArrayItem, addArrayItem, removeArrayItem }) {
    const flights = data.flights || [];

    const addFlight = () => {
        addArrayItem('flights', {
            date: '',
            weekday: '',
            airline: '',
            flightNumber: '',
            route: '',
            departureTime: '',
            arrivalTime: ''
        });
    };

    return (
        <div className="form-section">
            <div className="section-header">
                <h3>航班資訊</h3>
                <button onClick={addFlight} className="btn-add">+ 新增航班</button>
            </div>
            {flights.map((flight, idx) => (
                <div key={idx} className="array-item">
                    <div className="array-item-header">
                        <h4>航班 {idx + 1}</h4>
                        <button onClick={() => removeArrayItem('flights', idx)} className="btn-remove">刪除</button>
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>日期</label>
                            <input 
                                type="date" 
                                value={flight.date || ''} 
                                onChange={(e) => updateArrayItem('flights', idx, 'date', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>星期</label>
                            <input 
                                type="text" 
                                value={flight.weekday || ''} 
                                onChange={(e) => updateArrayItem('flights', idx, 'weekday', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>航空公司</label>
                            <input 
                                type="text" 
                                value={flight.airline || ''} 
                                onChange={(e) => updateArrayItem('flights', idx, 'airline', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>班機號碼</label>
                            <input 
                                type="text" 
                                value={flight.flightNumber || ''} 
                                onChange={(e) => updateArrayItem('flights', idx, 'flightNumber', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>航線</label>
                            <input 
                                type="text" 
                                value={flight.route || ''} 
                                onChange={(e) => updateArrayItem('flights', idx, 'route', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>起飛時間</label>
                            <input 
                                type="text" 
                                value={flight.departureTime || ''} 
                                onChange={(e) => updateArrayItem('flights', idx, 'departureTime', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>抵達時間</label>
                            <input 
                                type="text" 
                                value={flight.arrivalTime || ''} 
                                onChange={(e) => updateArrayItem('flights', idx, 'arrivalTime', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// 聯絡人編輯
function ContactsEditor({ data, updateArrayItem, addArrayItem, removeArrayItem }) {
    const contacts = data.contacts || [];

    const addContact = () => {
        addArrayItem('contacts', {
            name: '',
            role: '',
            phone: '',
            email: ''
        });
    };

    return (
        <div className="form-section">
            <div className="section-header">
                <h3>聯絡人</h3>
                <button onClick={addContact} className="btn-add">+ 新增聯絡人</button>
            </div>
            {contacts.map((contact, idx) => (
                <div key={idx} className="array-item">
                    <div className="array-item-header">
                        <h4>聯絡人 {idx + 1}</h4>
                        <button onClick={() => removeArrayItem('contacts', idx)} className="btn-remove">刪除</button>
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>姓名</label>
                            <input 
                                type="text" 
                                value={contact.name || ''} 
                                onChange={(e) => updateArrayItem('contacts', idx, 'name', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>職務</label>
                            <input 
                                type="text" 
                                value={contact.role || ''} 
                                onChange={(e) => updateArrayItem('contacts', idx, 'role', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>電話</label>
                            <input 
                                type="text" 
                                value={contact.phone || ''} 
                                onChange={(e) => updateArrayItem('contacts', idx, 'phone', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                value={contact.email || ''} 
                                onChange={(e) => updateArrayItem('contacts', idx, 'email', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// 行程編輯
function ItineraryEditor({ data, updateData, updateArrayItem, addArrayItem, removeArrayItem }) {
    const [selectedDay, setSelectedDay] = useState(0);
    const [expandedSpots, setExpandedSpots] = useState({});
    const itinerary = data.itinerary || [];

    const addDay = () => {
        addArrayItem('itinerary', {
            date: '',
            day: itinerary.length + 1, // This will auto-increment correctly
            spots: []
        });
    };

    const toggleSpot = (spotIdx) => {
        setExpandedSpots(prev => ({
            ...prev,
            [spotIdx]: !prev[spotIdx]
        }));
    };

    const currentDay = itinerary[selectedDay];

    if (!currentDay) return null;

    return (
        <div className="itinerary-editor">
            <div className="section-header">
                <h3>行程編輯</h3>
                <button onClick={addDay} className="btn-add">+ 新增天數</button>
            </div>

            <div className="day-selector">
                {itinerary.map((day, idx) => (
                    <button 
                        key={idx}
                        className={`day-btn ${selectedDay === idx ? 'active' : ''}`}
                        onClick={() => setSelectedDay(idx)}
                    >
                        Day {idx + 1}
                    </button>
                ))}
            </div>

            {currentDay && (
                <div className="form-section">
                    <div className="form-group">
                        <label>日期</label>
                        <input 
                            type="date" 
                            value={currentDay.date || ''} 
                            onChange={(e) => updateArrayItem('itinerary', selectedDay, 'date', e.target.value)}
                        />
                    </div>

                    {/* Meals */}
                    <div className="nested-section">
                        <h4>餐食</h4>
                        <div className="form-group">
                            <label>早餐</label>
                            <input 
                                type="text" 
                                value={currentDay.meals?.breakfast || ''} 
                                onChange={(e) => {
                                    const meals = currentDay.meals || {};
                                    meals.breakfast = e.target.value;
                                    updateArrayItem('itinerary', selectedDay, 'meals', meals);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>中餐</label>
                            <input 
                                type="text" 
                                value={currentDay.meals?.lunch || ''} 
                                onChange={(e) => {
                                    const meals = currentDay.meals || {};
                                    meals.lunch = e.target.value;
                                    updateArrayItem('itinerary', selectedDay, 'meals', meals);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>晚餐</label>
                            <input 
                                type="text" 
                                value={currentDay.meals?.dinner || ''} 
                                onChange={(e) => {
                                    const meals = currentDay.meals || {};
                                    meals.dinner = e.target.value;
                                    updateArrayItem('itinerary', selectedDay, 'meals', meals);
                                }}
                            />
                        </div>
                    </div>

                    {/* Accommodation */}
                    <div className="nested-section">
                        <h4>住宿</h4>
                        <div className="form-group">
                            <label>名稱</label>
                            <input 
                                type="text" 
                                value={currentDay.accommodation?.name || ''} 
                                onChange={(e) => {
                                    const acc = currentDay.accommodation || {};
                                    acc.name = e.target.value;
                                    updateArrayItem('itinerary', selectedDay, 'accommodation', acc);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>地址</label>
                            <input 
                                type="text" 
                                value={currentDay.accommodation?.address || ''} 
                                onChange={(e) => {
                                    const acc = currentDay.accommodation || {};
                                    acc.address = e.target.value;
                                    updateArrayItem('itinerary', selectedDay, 'accommodation', acc);
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label>電話</label>
                            <input 
                                type="text" 
                                value={currentDay.accommodation?.phone || ''} 
                                onChange={(e) => {
                                    const acc = currentDay.accommodation || {};
                                    acc.phone = e.target.value;
                                    updateArrayItem('itinerary', selectedDay, 'accommodation', acc);
                                }}
                            />
                        </div>
                    </div>

                    {/* Spots */}
                    <div className="nested-section">
                        <div className="section-header">
                            <h4>景點</h4>
                            <button onClick={() => {
                                const spots = currentDay.spots || [];
                                const newSpot = {
                                    name: '',
                                    time: '',
                                    description: '',
                                    tags: [],
                                    images: [],
                                    mustEat: [],
                                    mustBuy: [],
                                    map: '',
                                    transportation: '',
                                    reference: [],
                                    isMeal: false
                                };
                                spots.push(newSpot);
                                updateArrayItem('itinerary', selectedDay, 'spots', spots);
                            }} className="btn-add">+ 新增景點</button>
                        </div>
                        {currentDay.spots?.map((spot, spotIdx) => {
                            const isExpanded = expandedSpots[spotIdx];
                            return (
                            <div key={spotIdx} className="array-item">
                                <div className="array-item-header">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <button 
                                            onClick={() => toggleSpot(spotIdx)}
                                            className="toggle-btn"
                                            style={{ 
                                                background: 'none', 
                                                border: 'none', 
                                                cursor: 'pointer',
                                                fontSize: '1.2rem',
                                                padding: '0.25rem'
                                            }}
                                        >
                                            {isExpanded ? '▼' : '▶'}
                                        </button>
                                        <h5>景點 {spotIdx + 1}</h5>
                                    </div>
                                    <button onClick={() => {
                                        const spots = [...currentDay.spots];
                                        spots.splice(spotIdx, 1);
                                        updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                    }} className="btn-remove">刪除</button>
                                </div>
                                {isExpanded && (
                                <div className="spot-content">
                                <div className="form-group">
                                    <label>名稱</label>
                                    <input 
                                        type="text" 
                                        value={spot.name || ''} 
                                        onChange={(e) => {
                                            const spots = [...currentDay.spots];
                                            spots[spotIdx].name = e.target.value;
                                            updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>時間</label>
                                    <input 
                                        type="text" 
                                        value={spot.time || ''} 
                                        onChange={(e) => {
                                            const spots = [...currentDay.spots];
                                            spots[spotIdx].time = e.target.value;
                                            updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>描述</label>
                                    <textarea 
                                        value={spot.description || ''} 
                                        onChange={(e) => {
                                            const spots = [...currentDay.spots];
                                            spots[spotIdx].description = e.target.value;
                                            updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                        }}
                                        rows={4}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>地圖連結 (Google Maps URL)</label>
                                    <textarea 
                                        value={spot.map || ''} 
                                        onChange={(e) => {
                                            const spots = [...currentDay.spots];
                                            spots[spotIdx].map = e.target.value;
                                            updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                        }}
                                        rows={2}
                                        placeholder="https://maps.google.com/..."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>交通方式</label>
                                    <textarea 
                                        value={spot.transportation || ''} 
                                        onChange={(e) => {
                                            const spots = [...currentDay.spots];
                                            spots[spotIdx].transportation = e.target.value;
                                            updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                        }}
                                        rows={3}
                                        placeholder="搭乘方式、路線、時間等"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>參考文章網址（每行一個）</label>
                                    <textarea 
                                        value={spot.reference?.join('\n') || ''} 
                                        onChange={(e) => {
                                            const spots = [...currentDay.spots];
                                            spots[spotIdx].reference = e.target.value.split('\n').filter(url => url.trim());
                                            updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                        }}
                                        rows={3}
                                        placeholder="https://example.com/article1&#10;https://example.com/article2"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>圖片網址（每行一個）</label>
                                    <textarea 
                                        value={spot.images?.join('\n') || ''} 
                                        onChange={(e) => {
                                            const spots = [...currentDay.spots];
                                            spots[spotIdx].images = e.target.value.split('\n').filter(url => url.trim());
                                            updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                        }}
                                        rows={3}
                                        placeholder="/image1.jpg&#10;https://example.com/image2.jpg"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            checked={spot.isMeal || false}
                                            onChange={(e) => {
                                                const spots = [...currentDay.spots];
                                                spots[spotIdx].isMeal = e.target.checked;
                                                updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                            }}
                                        />
                                        吃吃吃行程？
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Tags（每行一個）</label>
                                    <textarea 
                                        value={spot.tags?.join('\n') || ''} 
                                        onChange={(e) => {
                                            const spots = [...currentDay.spots];
                                            spots[spotIdx].tags = e.target.value.split('\n').filter(tag => tag.trim());
                                            updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                        }}
                                        rows={3}
                                        placeholder="歷史建築&#10;文化遺產&#10;拍照景點"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>必吃項目（每行一個）</label>
                                    <textarea 
                                        value={spot.mustEat?.join('\n') || ''} 
                                        onChange={(e) => {
                                            const spots = [...currentDay.spots];
                                            spots[spotIdx].mustEat = e.target.value.split('\n').filter(item => item.trim());
                                            updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                        }}
                                        rows={3}
                                        placeholder="當地特色小吃&#10;必吃美食&#10;推薦料理"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>必買項目（每行一個）</label>
                                    <textarea 
                                        value={spot.mustBuy?.join('\n') || ''} 
                                        onChange={(e) => {
                                            const spots = [...currentDay.spots];
                                            spots[spotIdx].mustBuy = e.target.value.split('\n').filter(item => item.trim());
                                            updateArrayItem('itinerary', selectedDay, 'spots', spots);
                                        }}
                                        rows={3}
                                        placeholder="紀念品&#10;特產&#10;伴手禮"
                                    />
                                </div>
                                {/* 圖片預覽 */}
                                {spot.images && spot.images.length > 0 && spot.images[0] && (
                                    <div className="image-preview-grid">
                                        <label className="preview-label">圖片預覽：</label>
                                        {spot.images.filter(img => img).map((imgUrl, imgIdx) => (
                                            <div key={imgIdx} className="image-preview-item">
                                                <img 
                                                    src={imgUrl} 
                                                    alt={`${spot.name} ${imgIdx + 1}`}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.innerHTML = '<span style="color: #ef4444;">圖片載入失敗</span>';
                                                    }}
                                                />
                                                <div className="image-url">{imgUrl}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                </div>
                                )}
                            </div>
                        );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditPage;
