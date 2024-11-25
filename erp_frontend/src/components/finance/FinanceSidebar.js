// src/components/FinanceSidebar.js
import React from 'react';
import './FinanceSidebar.css';

function FinanceSidebar({ selectedSection, setSelectedSection }) {
    const sections = ['Accounts', 'Transactions', 'Projections', 'Budget', 'Reports'];

    return (
        <div className="finance-sidebar">
            <h3>Finance</h3>
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

export default FinanceSidebar;
