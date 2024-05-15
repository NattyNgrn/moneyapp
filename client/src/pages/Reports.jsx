import CreateTagPopUp from "../components/CreateTagPopUp";
import DonutChartCard from "../components/DonutChartCard";
import { useState } from "react";

function ReportsPage() {

    const [showCreateTagPopUp, setShowCreateTagPopUp] = useState(false);


    return (
        <div>
            <h1 className='text-6xl m-8 text-violet-200'>Reports</h1>
            <button className="hover:bg-orange-400 p-px px-2 rounded m-2 bg-orange-500 text-violet-950 text-4xl" onClick={(e) => e.preventDefault() || setShowCreateTagPopUp(true)}>Create New Tag</button>

            <CreateTagPopUp showCreateTagPopUp={showCreateTagPopUp} setShowCreateTagPopUp={setShowCreateTagPopUp}/>
            <DonutChartCard/>
            
        </div>
    );
}

export default ReportsPage;
