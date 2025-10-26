import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-header">
                <button className="hamburger" onClick={() => setOpen(!open)}>
                    <img
                        src="/menu-icon-48.png"
                        alt="Menu"
                        style={{ width: '30px', height: '30px' }}
                    />
                </button>
            </div>

            {open && (
                <div className="navbar-overlay" onClick={() => setOpen(false)}>
                    <ul className="navbar-menu" onClick={(e) => e.stopPropagation()}>
                        <li>
                            <button className="navbar-close" onClick={() => setOpen(false)}>
                                <img
                                    src="/icons8-back-48.png"
                                    alt="Menu"
                                    style={{ width: '30px', height: '30px' }}
                                />
                            </button>
                        </li>
                        <li><Link to="/" onClick={() => setOpen(false)}>首頁</Link></li>
                        <li><Link to="/contacts" onClick={() => setOpen(false)}>聯絡人</Link></li>
                        <li><Link to="/packages" onClick={() => setOpen(false)}>行李清單</Link></li>
                        <li><Link to="/itinerary" onClick={() => setOpen(false)}>行程</Link></li>
                        <li><Link to="/notice" onClick={() => setOpen(false)}>注意事項</Link></li>
                        <li><Link to="/edit" onClick={() => setOpen(false)}>編輯器</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
}