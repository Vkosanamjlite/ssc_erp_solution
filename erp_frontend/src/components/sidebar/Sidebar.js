// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

function Sidebar({ title, sections, selectedSection, setSelectedSection }) {
    return (
        <div className="sidebar">
            <h3>{title}</h3>
            <ul>
                {sections.map((section) => (
                    <li
                        key={section}
                        className={selectedSection === section ? 'active' : ''}
                        onClick={() => setSelectedSection(section)}
                    >
                        {section}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
