import {Modal, ModalBody, ModalHeader} from "flowbite-react"
import { useState } from "react";


// eslint-disable-next-line react/prop-types
function AddPopUp({showAddPopUp, setShowAddPopUp}){

    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [tag, setTag] = useState("");
    const [notes, setNotes] = useState("");


    return(
        <div>
            <Modal className="bg-pink-500" dismissible show={showAddPopUp} onClose={() => setShowAddPopUp(false)}>
                <ModalHeader className="bg-violet-200">
                    Add Income, Expense or Saving
                </ModalHeader>
                <ModalBody className="bg-violet-200">

                    <div className="m-4 text-black">
                        <label className="m-4">Category: </label>
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                            <option value="Saving">Saving</option>
                        </select>
                    </div>

                    <div className="m-4 flex items-center justify-center text-black">
                        <label className="m-4">Amount: </label>
                        <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)}></input>
                    </div>

                    <div className="m-4 flex items-center justify-center text-black">
                        <label className="m-4 ">Tag: </label>
                        <select onChange={(e) => setTag(e.target.value)}>
                            <option value="Tag">Tag</option>
                        </select>
                    </div>

                    <div className="m-4 flex items-center justify-center">
                        <label className="m-4 text-black">Notes: </label>
                        <textarea type="textarea" placeholder="Notes" onChange={(e) => setNotes(e.target.value)}></textarea>
                    </div>

                    <div className="m-4 flex items-center justify-center">
                        <button className="hover:bg-pink-400 hover:text-violet-900 p-px px-2 rounded m-2 bg-pink-500 text-violet-100 text-4xl" onClick={(e) => e.preventDefault() || setShowAddPopUp(false)}>Save</button>
                    </div>

                </ModalBody>
            </Modal>
        </div>
    )
}
export default AddPopUp;      
