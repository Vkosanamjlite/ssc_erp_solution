import React, { useState } from 'react';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import FinanceSidebar from './components/finance/FinanceSidebar';
import Accounts from './components/finance/Accounts';
import AccountForm from "./components/finance/AccountForm";
import AccountList from "./components/finance/AccountList";
import Transactions from './components/finance/Transactions'; // Similar to Accounts, you can add search and results sections
import Report from "./components/finance/Report";
import Projection from "./components/finance/Projection";
import './App.css';

function App() {
    const [selectedSection, setSelectedSection] = useState('Accounts');

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
            // Add other cases for Projections, Budget, Reports
            default:
                return <Accounts />;
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="main-content">
                <FinanceSidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
                <div className="section-content">
                    {renderSection()}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
