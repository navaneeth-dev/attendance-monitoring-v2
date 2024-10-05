import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from '@inertiajs/react';

export default function Dashboard({subject_attendances}) {
    console.log(subject_attendances);

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
                {/*<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">*/}
                {/*    {subject_attendances.map((sub_attendance) => (*/}
                {/*        <Table className="border">*/}
                {/*            <TableHeader>*/}
                {/*                <TableRow key={sub_attendance.id}>*/}
                {/*                    <TableHead className="w-[100px]">{sub_attendance.subject.name}</TableHead>*/}
                {/*                    /!*<TableHead>Name</TableHead>*!/*/}
                {/*                    /!*<TableHead>Method</TableHead>*!/*/}
                {/*                    <TableHead className="text-right">Percent</TableHead>*/}
                {/*                </TableRow>*/}
                {/*            </TableHeader>*/}
                {/*            <TableBody>*/}
                {/*                <TableRow key={sub_attendance.id}>*/}
                {/*                    <TableCell className="font-medium">Hello</TableCell>*/}
                {/*                    /!*<TableCell>{sub_attendance.subject.name}</TableCell>*!/*/}
                {/*                    <TableCell>{sub_attendance.subject.subject_attendances.percent}</TableCell>*/}
                {/*                    /!*<TableCell>{invoice.paymentStatus}</TableCell>*!/*/}
                {/*                    /!*<TableCell>{invoice.paymentMethod}</TableCell>*!/*/}
                {/*                    /!*<TableCell className="text-right">{invoice.totalAmount}</TableCell>*!/*/}
                {/*                </TableRow>*/}
                {/*            </TableBody>*/}
                {/*        </Table>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>
        </Authenticated>
    )
}
