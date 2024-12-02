// src/components/seo/SEOManagement.js
import React, {useState} from 'react';
import Sidebar from "../sidebar/Sidebar";
import KeywordSuggestions from "./KeywordSuggestions";
import MarketResearch from "./MarketResearch";
import GoogleTrends from "./GoogleTrends";
import LinkBuilding from "./LinkBuilding";
import ContentOptimization from "./ContentOptimization";
import Reports from "./Reports";
import './SEOManagement.css';

function SEOManagement() {
    const [selectedSection, setSelectedSection] = useState('MarketResearch');
    const seoSections = ['Google Trends', 'Marker Research', 'Keyword Suggestion', 'Link Building',
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
        <div className="seo-container">
            <Sidebar
                title="SEO"
                sections={seoSections}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
            />
            <div className="section-content">
                {renderSection()}
            </div>
        </div>
    );
}

export default SEOManagement;
