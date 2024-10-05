import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/Components/UI/Table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from '@inertiajs/react';

export default function Dashboard({subject_attendances}) {
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Subject</TableHead>
                                <TableHead>Name</TableHead>
                                {/*<TableHead>Method</TableHead>*/}
                                <TableHead className="text-right">Percent</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subject_attendances.map((sub_attendance) => (
                                <TableRow key={sub_attendance.id}>
                                    <TableCell className="font-medium">{sub_attendance.id}</TableCell>
                                    <TableCell>{sub_attendance.subject.name}</TableCell>
                                    <TableCell>{sub_attendance.percent}</TableCell>
                                    {/*<TableCell>{invoice.paymentStatus}</TableCell>*/}
                                    {/*<TableCell>{invoice.paymentMethod}</TableCell>*/}
                                    {/*<TableCell className="text-right">{invoice.totalAmount}</TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Authenticated>
    )
}
