/* eslint-disable react/prop-types */
import { Table, TableBody, TableHead, TableHeadCell, TableRow,  TableCell } from "flowbite-react";
import { useState } from "react";
import EditPopUp from "./EditPopUp";
import { formatDate, sortDates } from "../helpers";

function MoneyTable({transactions}){

    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState({});

    return (
        <div>
            <div className="overflow-x-auto m-4">
                <Table>
                    <TableHead>
                        <TableHeadCell className="bg-pink-400 text-pink-100 text-xl">Date</TableHeadCell>
                        <TableHeadCell className="bg-pink-400 text-pink-100 text-xl">Name</TableHeadCell>
                        <TableHeadCell className="bg-pink-400 text-pink-100 text-xl">Category</TableHeadCell>
                        <TableHeadCell className="bg-pink-400 text-pink-100 text-xl">Tag</TableHeadCell>
                        <TableHeadCell className="bg-pink-400 text-pink-100 text-xl">Amount</TableHeadCell>
                        <TableHeadCell className="bg-pink-400 text-pink-100 text-xl">Edit</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {transactions.sort(sortDates).map((transaction) => (
                            <TableRow key={transaction.name}>
                                <TableCell className="bg-pink-300 text-pink-500 text-xl">{formatDate(transaction.date)}</TableCell>
                                <TableCell className="bg-pink-300 text-pink-500 text-xl">{transaction.name}</TableCell>
                                <TableCell className="bg-pink-300 text-pink-500 text-xl">{transaction.category}</TableCell>
                                <TableCell className="bg-pink-300 text-pink-500 text-xl">{transaction.tagname}</TableCell>
                                <TableCell className="bg-pink-300 text-pink-500 text-xl">{transaction.amount}</TableCell>
                                <TableCell className="bg-pink-300 text-pink-500 text-xl">
                                    <button
                                        className="hover:bg-pink-400 p-px px-2 rounded bg-pink-500 text-pink-100"
                                        onClick={(e) => e.preventDefault() || setTransactionToEdit(transaction) || setShowEditPopUp(true)}
                                        >
                                        Edit
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <EditPopUp showEditPopUp={showEditPopUp} setShowEditPopUp={setShowEditPopUp} transaction={transactionToEdit} />
        </div>
    )
}

export default MoneyTable;