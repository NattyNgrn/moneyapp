import {TableCell, TableRow } from "flowbite-react";

function MoneyTableRow(){
    return(
        <div >
            <TableRow>
                <TableCell className="bg-pink-300 text-pink-100 text-xl">Date</TableCell>
                <TableCell className="bg-pink-300 text-pink-100 text-xl">Category</TableCell>
                <TableCell className="bg-pink-300 text-pink-100 text-xl">Amount</TableCell>
                <TableCell className="bg-pink-300 text-pink-100 text-xl">Tag</TableCell>
                <TableCell className="bg-pink-300 text-pink-100 text-xl">Notes</TableCell>
                <TableCell className="bg-pink-300 text-pink-100 text-xl"><button className="hover:bg-pink-400 p-px px-2 rounded bg-pink-500 text-pink-100" >Edit</button></TableCell>
            </TableRow>
        </div>
    )
}

export default MoneyTableRow;