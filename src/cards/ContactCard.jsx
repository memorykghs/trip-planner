import React from 'react';
import '../styles/contact-card.css'

export default function ContactCard({ name, role, phone }) {
    return (
        <div className="contact-card">
            <div className="name">{name}</div>
            <div className="role">{role}</div>
            <div className="phone">{phone}</div>
        </div>
    );
}