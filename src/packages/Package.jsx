import '../styles/package.css';
import tripData from '../data/schedule.json';

export default function Package() {
    const { preTripChecklist = [], luggageList = [] } = tripData;

    return (
        <div className="p-4 space-y-8">
            <section>
                <h2 className="package-section-title">行前檢查清單</h2>
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
    );
}