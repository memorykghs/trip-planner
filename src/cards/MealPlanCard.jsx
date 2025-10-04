import React from 'react';
import '../styles/meal-plan-card.css';

export default function MealPlan({ meals }) {
    const { breakfast, lunch, dinner } = meals;

    const renderMeal = (label, value) => {
        if (!value) return null;
        return (
            <div className="meal-plan-item">
                <span className="meal-plan-label">{label}</span>
                <span className="meal-plan-value">{value}</span>
            </div>
        );
    };

    return (
        <div className="meal-plan-card">
            <div className="meal-plan-title">餐食計畫</div>
            <div className="meal-plan-body">
                {renderMeal('早餐', breakfast)}
                {renderMeal('中餐', lunch)}
                {renderMeal('晚餐', dinner)}
            </div>
        </div>
    );
}