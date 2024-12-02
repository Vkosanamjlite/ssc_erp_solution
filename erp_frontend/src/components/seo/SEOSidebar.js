import React from 'react';
import './SEOManagement.css';

function SEOSidebar({ selectedSection, setSelectedSection }) {
    const sections = ['Google Trends', 'Marker Research', 'Keyword Suggestion', 'Reports'];

    return (
        <div className="seo-sidebar">
            <h3>SEO</h3>
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

export default SEOSidebar;
