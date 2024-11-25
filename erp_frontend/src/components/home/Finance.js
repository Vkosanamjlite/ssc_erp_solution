// src/components/home/Finance.js
import React, { useState } from 'react';
import Sidebar from "../sidebar/Sidebar";
import Accounts from "../finance/Accounts";
import Transactions from "../finance/Transactions";
import Report from "../finance/Report";
import Projection from "../finance/Projection";
import './Finance.css';

function Finance() {
    const [selectedSection, setSelectedSection] = useState('Accounts');
    const financeSections = ['Accounts', 'Transactions', 'Projections', 'Budget', 'Reports'];

    const renderSection = () => {
        switch (selectedSection) {
            case 'Accounts':
                return <Accounts />;
            case 'Transactions':
                return <Transactions />;
            case 'Reports':
                return <Report />;
            case 'Projections':
                return <Projection />;
            default:
                return <Accounts />;
        }
    };

    return (
        <div className="finance-container">
            <Sidebar
                title="Finance"
                sections={financeSections}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
            />
            <div className="section-content">
                {renderSection()}
            </div>
        </div>
    );
}

export default Finance;
