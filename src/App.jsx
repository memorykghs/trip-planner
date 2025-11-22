import React, {useEffect, useState} from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

import HomePage from './pages/HomePage';
import PackagePage from './pages/PackagePage';
import ItineraryOverviewPage from './pages/ItineraryOverviewPage.jsx';
import NoticePage from './pages/NoticePage';
import EditPage from './pages/EditPage';
import tripData from "./data/schedule.json";
import PasswordPage from "./pages/PasswordPage.jsx";

const PASSWORD_KEY = 'trip_password_verified';
const PASSWORD_TTL = 1000 * 60 * 60 * 4; // 密碼 localStorage 4 小時

function App() {
    const {
        itinerary = [],
        preTripChecklist = [],
        luggageList = [],
        noticeItems = []
    } = tripData;

    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(PASSWORD_KEY);
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
            {tripData.tripTitle && (
                <div className="head-title">{tripData.tripTitle}</div>
            )}

            <Router>
                <div className="app-container">
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<HomePage tripData={tripData}/>}/>
                        {/*<Route path="/contacts" element={<ContactPage contacts={contacts}/>}/>*/}
                        <Route path="/packages"
                               element={<PackagePage preTripChecklist={preTripChecklist} luggageList={luggageList}/>}/>
                        <Route path="/itinerary" element={<ItineraryOverviewPage itinerary={itinerary}/>}/>
                        <Route path="/notice" element={<NoticePage noticeItems={noticeItems}/>}/>
                        <Route path="/edit" element={<EditPage/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;