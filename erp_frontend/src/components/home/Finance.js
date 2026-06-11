// src/components/home/Finance.js
import React, { useState } from 'react';
import Sidebar from "../../shared/Sidebar";
import Accounts from "../finance/Accounts";
import Transactions from "../finance/Transactions";
import Report from "../finance/Report";
import Projection from "../finance/Projection";
import './Finance.css';

function Finance() {
    const [selectedSection, setSelectedSection] = useState('Accounts');
    const financeSections = ['Accounts', 'Transactions', 'Projections', 'Budget', 'Reports'];

    const handleAccountSubmit = (formData) => {
        console.log('Form Data Submitted:', formData);

        fetch('/api/finance/accounts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create account');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Account created successfully:', data);
            })
            .catch((error) => {
                console.error('Error creating account:', error);
            });
    };

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
                return <Accounts onSubmit={handleAccountSubmit} />;
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
