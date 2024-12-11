// src/components/stores/StoresManagement.js
import React, {useState} from 'react';
import Sidebar from "../sidebar/Sidebar";
import st

import Reports from "./Reports";
import './StoresManagement.css';

function StoresManagement() {
    const [selectedSection, setSelectedSection] = useState('Dashbaord');
    const storeManagementSections = ['', 'Marker Research', 'Keyword Suggestion', 'Link Building',
        'Content Optimization', 'Reports'];

    const renderSection = () => {
        switch (selectedSection) {
            case 'Google Trends':
                return <GoogleTrends/>;
            case 'Marker Research':
                return <MarketResearch/>;
            case 'Keyword Suggestion':
                return <KeywordSuggestions/>;
            case 'Link Building':
                return <LinkBuilding/>;
            case 'Content Optimization':
                return <ContentOptimization/>;
            case 'Reports':
                return <Reports/>;
            default:
                return <MarketResearch/>;
        }
    };

    return (
        <div className="store-container">
            <Sidebar
                title="Store Management"
                sections={storeManagementSections}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
            />
            <div className="section-content">
                {renderSection()}
            </div>
        </div>
    );
}

export default StoresManagement;

