import {Modal, ModalBody, ModalHeader} from "flowbite-react"
import { useState } from "react";


function CreateTagPopUp({showCreateTagPopUp, setShowCreateTagPopUp}){

    const [name, setName] = useState("");
    const [goal, setGoal] = useState(false);
    const [currentAmount, setCurrentAmount] = useState(0);


    return(
        <div>
            <Modal dismissible show={showCreateTagPopUp} onClose={() => setShowCreateTagPopUp(false)}>
                <ModalHeader>
                    Create a new tag
                </ModalHeader>
                <ModalBody>

                    <div className="m-4">
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                    </div>

                    <div className="m-4">
                        <label className="m-4">Goal</label>
                        <input type="checkbox" placeholder="Goal" value={true} onChange={(e) => setGoal(e.target.checked)}/>
                        <label className="m-4">Yes</label>
                        <input type="checkbox" placeholder="Goal" value={false} onChange={(e) => setGoal(e.target.checked)}/>
                        <label className="m-4">No</label>
                    </div>

                    <div className="m-4">
                        <input type="number" placeholder="Amount" onChange={(e) => setCurrentAmount(e.target.value)}></input>
                    </div>


                    <div className="m-4">
                        <button className="hover:bg-orange-400 p-px px-2 rounded m-2 bg-orange-500 text-violet-950 text-4xl" onClick={(e) => e.preventDefault() || setShowCreateTagPopUp(false)}>Save</button>
                    </div>

                </ModalBody>
            </Modal>
        </div>
    )
}
export default CreateTagPopUp;      
