import '../styles/package.css';
import tripData from '../data/schedule.json';
import React from "react";

export default function Package() {
    const { preTripChecklist = [], luggageList = [] } = tripData;

    return (
        <div className="p-4">
            <div className="head-title">行李清單</div>
            <hr className="head-hr"></hr>
            <div className="package-scroll-container">
                <div className="package-columns">
                    <section>
                        <h2 className="package-section-title">必備物品</h2>
                        <div className="space-y-2">
                            {preTripChecklist.map((item, idx) => (
                                <label key={idx} className="package-item-label">
                                    <input type="checkbox" className="package-checkbox" />
                                    <span>{item}</span><br/>
                                </label>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="package-section-title">行李清單</h2>
                        <div className="space-y-2">
                            {luggageList.map((item, idx) => (
                                <label key={idx} className="package-item-label">
                                    <input type="checkbox" className="package-checkbox" />
                                    <span>{item}</span><br/>
                                </label>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}