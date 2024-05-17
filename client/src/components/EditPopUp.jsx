/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {Modal, ModalBody, ModalHeader} from "flowbite-react"
import { useUser } from '@clerk/clerk-react';

function EditPopUp({showEditPopUp, setShowEditPopUp, transaction}){

    const { user, isLoaded } = useUser();

    const [date, setDate] = useState(new Date().toDateString());
    const [category, setCategory] = useState(transaction.category);
    const [amount, setAmount] = useState(transaction.amount);
    const [tag, setTag] = useState(transaction.tagname);

    useEffect(() => {
        if (transaction) {
            setDate(transaction.date?.substring(0,10));
            setCategory(transaction.category);
            setAmount(transaction.amount);
            setTag(transaction.tagname);
        }
    }, [transaction]);

    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        if (user && isLoaded) {
            fetch(`http://localhost:1287/tags/${user.id}`)
                .then((res) => res.json())
                .then((data) => setAllTags(data))
                .catch((error) => console.log(error));
        }
    }, [user, isLoaded, setAllTags]);

    const deleteTransaction = () => {
        if (!isLoaded) return;
        fetch(`http://localhost:1287/deletetransaction`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clerkid: user.id,
                name: transaction.name,
            })
        });
        setShowEditPopUp(false);
        window.location.reload();
    };

    const updateTransaction = () => {
        if (!isLoaded) return;
        fetch(`http://localhost:1287/updatetransaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clerkid: user.id,
                category: category,
                tagname: tag,
                amount: amount,
                name: transaction.name,
                date: date,
            })
        });
        setShowEditPopUp(false);
        window.location.reload();
    };
    //console.log(transaction.date.substring(0,10));
    return (
        <div>
            <Modal className="bg-pink-500" dismissible show={showEditPopUp} onClose={() => setShowEditPopUp(false)}>

                <ModalHeader className="bg-violet-200">
                    Edit Transaction
                </ModalHeader>

                <ModalBody className="bg-violet-200">
                    <div className="m-4 flex items-center justify-center text-black">
                        <label className="m-4">Name: </label>
                        <label className="m-4">{transaction.name}</label>
                    </div>

                    <div className="m-4 text-black">
                        <label className="m-4">Date: </label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
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
                        <select value={tag} onChange={(e) => setTag(e.target.value)}>
                            <option key="" value=""></option>
                            {allTags.filter((tag) => tag.category === category).map((tag) => (
                                <option key={tag.tagname} value={tag.tagname}>{tag.tagname}</option>
                            ))}
                        </select>
                    </div>

                    <div className="m-4 flex items-center justify-center text-black">
                        <label className="m-4">Amount: </label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                    </div>

                    <div className="m-4 flex items-center justify-center">
                        <button
                            className="hover:bg-pink-400 hover:text-violet-900 p-px px-2 rounded m-2 bg-pink-500 text-violet-100 text-4xl"
                            onClick={updateTransaction}
                            >
                                Save
                        </button>

                        <button className="hover:bg-pink-400 hover:text-violet-900 p-px px-2 rounded m-2 bg-pink-500 text-violet-100 text-4xl"
                            onClick={deleteTransaction}
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