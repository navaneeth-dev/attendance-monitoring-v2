import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/UI/Card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/Components/UI/Chart"
import {Scrape, SubjectFilter} from "@/Pages/Dashboard";

export default function SubjectAttendanceChart({subject_filters, scrapes}: {
    subject_filters: SubjectFilter[],
    scrapes: Scrape[]
}) {
    // Every row -> Every subject attendance group by date
    const chartData = scrapes.map((sub_attendance, i) => {
        const subject_percents = sub_attendance.subject_attendances.reduce((acc, a, i) => ({
            ...acc,
            [subject_filters[i].subject.subject_code]: a.percent
        }), {});

        return {
            "date": sub_attendance.date,
            ...subject_percents,
        };
    });

    const chartConfig = subject_filters.reduce((acc, subject, i) => (
        {
            ...acc,
            [subject.subject.subject_code]: {
                label: subject.subject.name,
                color: `hsl(${i * 36}, 70%, 50%)`
            }
        }
    ), {}) satisfies ChartConfig;

    console.log(JSON.stringify(chartData, null, 4))

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Subject Wise Attendance</CardTitle>
                <CardDescription>Past week subject wise attendance.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 60,
                            right: 60,
                            top: 30,
                            bottom: 30,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3}/>
                        <XAxis
                            dataKey="date"
                        />
                        <YAxis/>
                        <ChartTooltip
                            content={<ChartTooltipContent/>}
                        />
                        <ChartLegend content={<ChartLegendContent/>}/>
                        {subject_filters.map((subject) => (
                            <Line
                                key={subject.subject.id}
                                dataKey={subject.subject.subject_code}
                                type="linear"
                                stroke={`var(--color-${subject.subject.subject_code})`}
                                strokeWidth={2}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
