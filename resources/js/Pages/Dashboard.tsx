import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from '@inertiajs/react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/Components/UI/Table";

export default function Dashboard({subject_filters, subject_attendances}) {
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
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] text-center py-2">Date</TableHead>
                                {subject_filters.map(subject => (
                                    <TableHead className="w-[100px] text-sm text-center py-2"
                                               key={subject.subject.id}>{subject.subject.name}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subject_attendances.map(sub_attendance => (
                                <TableRow key={sub_attendance.id}>
                                    <TableCell className="text-center">{sub_attendance.date}</TableCell>
                                    {sub_attendance.subject_attendances.map(attendance => (
                                        <TableCell
                                            key={attendance.id} className="text-center">{attendance.percent}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Authenticated>
    )
}
