import React from 'react';
import '../styles/contact-card.css'

export default function ContactCard({ name, role, phone }) {
    if(name || role || phone) return null;

    return (
        <div className="contact-card">
            <div className="name">{name}</div>
            <div className="role">{role}</div>
            <div class Name="phone">{phone}</div>
        </div>
    );
}