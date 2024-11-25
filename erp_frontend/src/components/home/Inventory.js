// src/components/home/Inventory.js
import React, { useState } from 'react';
import Sidebar from "../sidebar/Sidebar";
import Products from "../inventory/Products";
import Stock from "../inventory/Stock";
import Warehouse from "../inventory/Warehouse";
import InventoryTransaction from "../inventory/InventoryTransaction";
import './Finance.css';

function Inventory() {
    const [selectedSection, setSelectedSection] = useState('Products');
    const inventorySections = ['Products', 'Stock', 'Categories', 'Suppliers'];

    const renderSection = () => {
        switch (selectedSection) {
            case 'Products':
                return <Products />;
            case 'Stock':
                return <Stock />;
            case 'Warehouse':
                return <Warehouse />;
            case 'Transaction':
                return <InventoryTransaction />;
            default:
                return <Products />;
        }
    };

    return (
        <div className="inventory-container">
            <Sidebar
                title="Inventory"
                sections={inventorySections}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
            />
            <div className="section-content">
                {renderSection()}
            </div>
        </div>
    );
}

export default Inventory;
