import {Modal, ModalBody, ModalHeader} from "flowbite-react"
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

// eslint-disable-next-line react/prop-types
function CreateTagPopUp({showCreateTagPopUp, setShowCreateTagPopUp}){

    const { user, isLoaded } = useUser();

    const [name, setName] = useState("");
    const [goal, setGoal] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [category, setCategory] = useState("Income");

    const addTag = () => {
        if (!isLoaded) return;
        fetch(`http://localhost:1287/addtag`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clerkid: user.id,
                category: category,
                tagname: name,
                isGoal: goal,
                total: totalAmount
            })
        });
        setShowCreateTagPopUp(false);
        window.location.reload();
    };

    return (
        <div>
            <Modal className="bg-pink-500" dismissible show={showCreateTagPopUp} onClose={() => setShowCreateTagPopUp(false)}>
                <ModalHeader className="bg-violet-300">
                    Create a new tag
                </ModalHeader>
                <ModalBody className="bg-violet-300">

                    <div className="m-4">
                        <label className="m-4 text-black">Tag Name</label>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                    </div>

                    <div className="m-4 text-black">
                        <label className="m-4">Category: </label>
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                            <option value="Saving">Saving</option>
                        </select>
                    </div>

                    {
                        category === "Saving" ? 
                        <div className="m-4 flex items-center justify-center">
                        
                        <label className="m-4 text-black">Goal</label>

                        <input type="radio" id="Yes" checked={goal} onChange={(e) => setGoal(e.target.checked)}/>
                        <label className="m-4 text-black">Yes</label>

                        <input type="radio" id="No" checked={!goal} onChange={(e) => setGoal(!e.target.checked)}/>
                        <label className="m-4 text-black">No</label>
                    </div> : <span></span>
                    }

                    {
                    goal ? 
                        <div className="m-4">
                            <label className="m-4 text-black">Goal Amount</label>
                            <input type="number" placeholder="Goal Amount" onChange={(e) => setTotalAmount(e.target.value)}></input>
                        </div> : <span></span>
                    }


                    <div className="m-4">
                        <button className="hover:bg-pink-400 hover:text-violet-900 p-px px-2 rounded m-2 bg-pink-500 text-violet-100 text-4xl" onClick={addTag}>Save</button>
                    </div>

                </ModalBody>
            </Modal>
        </div>
    )
}
export default CreateTagPopUp;      
