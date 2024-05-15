import { Table, TableHead, TableHeadCell } from "flowbite-react";

function MoneyTable(){

    return (
        <div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableHeadCell>Date</TableHeadCell>
                        <TableHeadCell>Category</TableHeadCell>
                        <TableHeadCell>Amount</TableHeadCell>
                        <TableHeadCell>Tag</TableHeadCell>
                        <TableHeadCell>Notes</TableHeadCell>
                        <TableHeadCell>Edit</TableHeadCell>
                    </TableHead>
                </Table>
            </div>

        </div>
    )
}

export default MoneyTable;