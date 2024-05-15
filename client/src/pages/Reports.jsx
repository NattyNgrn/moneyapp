import CreateTagPopUp from "../components/CreateTagPopUp";
import DonutChartCard from "../components/DonutChartCard";
import { useState } from "react";

function ReportsPage() {

    const [showCreateTagPopUp, setShowCreateTagPopUp] = useState(false);


    return (
        <div>
            <h1 className='text-6xl m-8 text-violet-100'>Reports</h1>
            <CreateTagPopUp showCreateTagPopUp={showCreateTagPopUp} setShowCreateTagPopUp={setShowCreateTagPopUp}/>
            <DonutChartCard/>
            
        </div>
    );
}

export default ReportsPage;
