import { useState } from 'react';
import {Modal, ModalBody, ModalHeader} from "flowbite-react"
import { useUser} from '@clerk/clerk-react';

// eslint-disable-next-line react/prop-types
function EditPopUp({showEditPopUp, setShowEditPopUp}){

    const { user, isLoaded } = useUser();

    const [date, setDate] = useState(new Date().toDateString());
    const [category, setCategory] = useState("Income");
    const [amount, setAmount] = useState("");
    const [tag, setTag] = useState("");
    const [name, setName] = useState("");

    return (
        <div>
            <Modal className="bg-pink-500" dismissible show={showEditPopUp} onClose={() => setShowEditPopUp(false)}>

                <ModalHeader className="bg-violet-200">
                    Edit Transaction
                </ModalHeader>

                <ModalBody className="bg-violet-200">
                    <div className="m-4 text-black">
                            <label className="m-4">Date: </label>
                            <input type="date" placeholder={date} onChange={(e) => setDate(e.target.value)}></input>
                    </div>

                    <div className="m-4 flex items-center justify-center text-black">
                        <label className="m-4">Name: </label>
                        <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                    </div>

                    <div className="m-4 text-black">
                        <label className="m-4">Category: </label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                            <option value="Saving">Saving</option>
                        </select>
                    </div>

                    <div className="m-4 flex items-center justify-center text-black">
                        <label className="m-4 ">Tag: </label>
                        <select onChange={(e) => setTag(e.target.value)}>
                            <option value="Tag">Tag</option>
                        </select>
                    </div>

                    <div className="m-4 flex items-center justify-center text-black">
                        <label className="m-4">Amount: </label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                    </div>

                    <div className="m-4 flex items-center justify-center">
                        <button
                            className="hover:bg-pink-400 hover:text-violet-900 p-px px-2 rounded m-2 bg-pink-500 text-violet-100 text-4xl"
                            onClick={() => setShowEditPopUp(false)}
                            >
                                Save
                        </button>

                        <button className="hover:bg-pink-400 hover:text-violet-900 p-px px-2 rounded m-2 bg-pink-500 text-violet-100 text-4xl"
                            onClick={() => setShowEditPopUp(false)}
                        >
                            Delete Transaction
                        </button>
                    </div>

                </ModalBody>
            </Modal>
        </div>
    )
}

export default EditPopUp;