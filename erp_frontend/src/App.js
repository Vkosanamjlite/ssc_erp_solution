// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import Dashboard from './components/home/Dashboard';
import Inventory from './components/home/Inventory';
import Sales from './components/home/Sales';
import HumanResources from './components/home/HumanResources';
import Finance from './components/home/Finance';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/hr" element={<HumanResources />} />
                    <Route path="/finance" element={<Finance />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;