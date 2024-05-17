import CreateTagPopUp from '../components/CreateTagPopUp';
import AddPopUp from '../components/AddPopUp';
import MoneyTable from '../components/MoneyTable/';
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

function TrackerPage() {

    const { user, isLoaded } = useUser();
    const [ transactions, setTransactions ] = useState([]);
    useEffect(() => {
        if (isLoaded && user) {
            fetch(`http://localhost:1287/transactions/${user.id}`)
                .then((res) => res.json())
                .then((data) => setTransactions(data))
                .catch((error) => console.log(error));
        }
    }, [isLoaded, user, setTransactions]);

    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [showCreateTagPopUp, setShowCreateTagPopUp] = useState(false);
    
    return(
        <div>
            <h1 className='text-6xl m-8 text-violet-100'>Tracker</h1>
            <div className='flex items-center justify-center'>
                <button className="hover:bg-violet-200 p-px px-2 rounded m-2 mb-8 bg-violet-300 text-violet-900 text-4xl" onClick={(e) => e.preventDefault() || setShowAddPopUp(true)}>Add New</button>
                <button className="hover:bg-violet-200 p-px px-2 rounded m-2 mb-8 bg-violet-300 text-violet-900 text-4xl" onClick={(e) => e.preventDefault() || setShowCreateTagPopUp(true)}>Create New Tag</button>
            </div>
            <AddPopUp showAddPopUp={showAddPopUp} setShowAddPopUp={setShowAddPopUp}/>
            <CreateTagPopUp showCreateTagPopUp={showCreateTagPopUp} setShowCreateTagPopUp={setShowCreateTagPopUp}/>
            <MoneyTable transactions={transactions} />
        </div>
    )
}

export default TrackerPage;