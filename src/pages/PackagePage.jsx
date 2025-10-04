import Package from '../packages/Package';

// 行前與行李清單
export default function PackagePage({preTripChecklist, luggageList}) {
    return (
        <Package
            preTripChecklist={preTripChecklist}
            luggageList={luggageList}
        />
    );
}