import React from "react";
import { useParams } from "react-router-dom";

const ShopView = () => {
    const { id } = useParams();

    return (
        <div className="shop-view">
            <div className="left-nav">
                <ul>
                    <li>Shop Dashboard</li>
                    <li>Products</li>
                    <li>Customers</li>
                    <li>Orders</li>
                </ul>
            </div>
            <div className="shop-content">
                <h2>Shop View: {id}</h2>
                <p>Details and actions for this shop will go here.</p>
            </div>
        </div>
    );
};

export default ShopView;
