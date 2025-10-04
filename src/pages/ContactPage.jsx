import React from "react";
import ContactCard from '../cards/ContactCard';

// 聯絡人清單
export default function ContactPage({contacts}) {
    return (
        <div className="App">
            {contacts.map((contact, index) => (
                <ContactCard
                    key={index}
                    name={contact.name}
                    role={contact.role}
                    phone={contact.phone}
                />
            ))}
        </div>
    );
}

