
import CreateTagPopUp from '../components/CreateTagPopUp';
import DonutChartCard from '../components/DonutChartCard';
import { useState, useEffect } from "react";
import { useUser } from '@clerk/clerk-react';

function GoalsPage() {

    const [showCreateTagPopUp, setShowCreateTagPopUp] = useState(false);
    const {user, isLoaded} = useUser();
    const [goalsInfo, setGoalsInfo] = useState([]);

    useEffect(() => {
        if (isLoaded && user)
        fetch(`http://localhost:1287/getgoalsinfo/${user.id}`)
        .then((response) => response.json())
        .then((data) => setGoalsInfo(data))
        .catch((error) => console.error('Error:', error));
    }, [setGoalsInfo, isLoaded, user]);

    return (
        <div>
            <h1 className='text-6xl m-8 text-violet-100'>Goals</h1>
            <CreateTagPopUp showCreateTagPopUp={showCreateTagPopUp} setShowCreateTagPopUp={setShowCreateTagPopUp}/>
            <span>{goalsInfo.map((goalInfo) =>
                <DonutChartCard key={goalInfo.tagname} title={goalInfo.tagname} current={goalInfo.current} goal={goalInfo.total} />
            )}</span>
        </div>
    )
}

export default GoalsPage;