import '../styles/navbar.css';

export default function NavIcon({ icon, isActive, alt }) {
    // 當 active 時，將 -gray 替換為 -white
    const iconSrc = isActive 
        ? icon.replace('-gray.png', '-white.png')
        : icon;

    return (
        <div className="icon-wrapper">
            <img src={iconSrc} alt={alt} />
        </div>
    );
}

