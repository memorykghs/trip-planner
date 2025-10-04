import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';

import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import PackagePage from './pages/PackagePage';
import ItineraryPage from './pages/ItineraryPage';
import NoticePage from './pages/NoticePage';
import tripData from "./data/schedule.json";
import PasswordPage from "./pages/PasswordPage.jsx";

const PASSWORD_KEY = 'trip_password_verified';
const PASSWORD_TTL = 1000 * 60 * 60 * 24 * 5; // 密碼 localStorage 5 天

function App() {
    const {
        contacts = [],
        preTripChecklist = [],
        luggageList = [],
        itinerary = [],
        noticeItems = []
    } = tripData;

    const [setSelectedDayIndex] = useState(0);
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('trip-unlock');
        if (stored) {
            const { unlocked: savedUnlocked, expires } = JSON.parse(stored);
            if (savedUnlocked && new Date().getTime() < expires) {
                setUnlocked(true);
            }
        }
    }, []);

    const handleUnlock = () => {
        setUnlocked(true);
        localStorage.setItem(
            PASSWORD_KEY,
            JSON.stringify({
                unlocked: true,
                expires: new Date().getTime() + PASSWORD_TTL,
            })
        );
    };

    if (!unlocked) {
        return <PasswordPage onUnlock={handleUnlock} />;
    }

    /* 真正回傳行程內容 */
    return (
        <div>
            <div className="trip-title">
                {tripData.tripTitle || "未命名旅程"}
            </div>
            <Router>
                <div className="app-container">
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<HomePage tripData={tripData}/>}/>
                        <Route path="/contacts" element={<ContactPage contacts={contacts}/>}/>
                        <Route path="/package"
                               element={<PackagePage preTripChecklist={preTripChecklist} luggageList={luggageList}/>}/>
                        <Route path="/itinerary" element={<ItineraryPage itinerary={itinerary}
                                                                         setSelectedDayIndex={setSelectedDayIndex}/>}/>
                        <Route path="/notice" element={<NoticePage noticeItems={noticeItems}
                                                                   setSelectedDayIndex={setSelectedDayIndex}/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;