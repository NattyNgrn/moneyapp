import { Table, TableBody, TableHead, TableHeadCell, TableRow,  TableCell } from "flowbite-react";

function MoneyTable(){

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

                        <TableRow>
                            <TableCell className="bg-pink-300 text-pink-500 text-xl">Date</TableCell>
                            <TableCell className="bg-pink-300 text-pink-500 text-xl">Name</TableCell>
                            <TableCell className="bg-pink-300 text-pink-500 text-xl">Category</TableCell>
                            <TableCell className="bg-pink-300 text-pink-500 text-xl">Tag</TableCell>
                            <TableCell className="bg-pink-300 text-pink-500 text-xl">Amount</TableCell>
                            <TableCell className="bg-pink-300 text-pink-500 text-xl"><button className="hover:bg-pink-400 p-px px-2 rounded bg-pink-500 text-pink-100" >Edit</button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}

export default MoneyTable;