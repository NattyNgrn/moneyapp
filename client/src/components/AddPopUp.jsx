import {Modal, ModalBody, ModalHeader} from "flowbite-react"
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";


// eslint-disable-next-line react/prop-types
function AddPopUp({showAddPopUp, setShowAddPopUp}){

    const { user, isLoaded } = useUser();

    const [date, setDate] = useState(new Date().toDateString());
    const [category, setCategory] = useState("Income");
    const [amount, setAmount] = useState("");
    const [tag, setTag] = useState("");
    const [name, setName] = useState("");

    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        if (user && isLoaded) {
            fetch(`http://localhost:1287/tags/${user.id}`)
                .then((res) => res.json())
                .then((data) => setAllTags(data))
                .catch((error) => console.log(error));
        }
    }, [user, isLoaded, setAllTags]);
    

    const addTransaction = () => {
        if (!isLoaded) return;
        fetch(`http://localhost:1287/addtransaction`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clerkid: user.id,
                category: category,
                tagname: tag,
                amount: amount,
                name: name,
                date: date,
            })
        });
        setShowAddPopUp(false);
        window.location.reload();
    };

    return(
        <div>
            <Modal className="bg-pink-500" dismissible show={showAddPopUp} onClose={() => setShowAddPopUp(false)}>
                <ModalHeader className="bg-violet-200">
                    Add Income, Expense or Saving
                </ModalHeader>
                <ModalBody className="bg-violet-200">

                    <div className="m-4 text-black">
                            <label className="m-4">Date: </label>
                            <input type="date" onChange={(e) => setDate(e.target.value)}></input>
                    </div>

                    <div className="m-4 flex items-center justify-center text-black">
                        <label className="m-4">Name: </label>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
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
                            <option key="" value=""></option>
                            {allTags.filter((tag) => tag.category === category).map((tag) => (
                                <option key={tag.tagname} value={tag.tagname}>{tag.tagname}</option>
                            ))}
                        </select>
                    </div>

                    <div className="m-4 flex items-center justify-center text-black">
                        <label className="m-4">Amount: </label>
                        <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)}></input>
                    </div>

                    <div className="m-4 flex items-center justify-center">
                        <button
                            className="hover:bg-pink-400 hover:text-violet-900 p-px px-2 rounded m-2 bg-pink-500 text-violet-100 text-4xl"
                            onClick={addTransaction}>
                                Save
                        </button>
                    </div>

                </ModalBody>
            </Modal>
        </div>
    )
}
export default AddPopUp;      
