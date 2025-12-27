import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import NavIcon from './NavIcon';

const navItems = [
    { to: '/', icon: '../public/icons/icons8-flight-30-gray.png', label: '航班' },
    { to: '/packages', icon: '../public/icons/icons8-luggage-30-gray.png', label: '行李' },
    { to: '/itinerary', icon: '../public/icons/icons8-itinerary-48-gray.png', label: '行程'},
    { to: '/notice', icon: '../public/icons/icons8-notice-48-gray.png', label: '注意事項' },
    { to: '/tourism', icon: '../public/icons/icons8-camera-30-gray.png', label: '靈感' },
    { to: '/edit', icon: '../public/icons/icons8-edit-48-gray.png', label: '編輯' },
];

export default function Navbar() {
    return (
        <nav className="nav">
            <div className="nav-scroll">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <NavIcon icon={item.icon} isActive={isActive} alt={item.label} />
                                <span>{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}