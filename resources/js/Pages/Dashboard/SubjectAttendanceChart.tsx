import {Legend, Line, LineChart, XAxis} from "recharts"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/UI/Card"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/Components/UI/Chart"

export default function SubjectAttendanceChart({subject_filters, subject_attendances}) {
    // Every row -> Every subject attendance group by date
    const chartData = subject_attendances.map((sub_attendance, i) => {
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
                color: `hsl(var(--chart-${i % 5 + 1}))`
            }
        }
    ), {}) satisfies ChartConfig;

    console.log(chartData, chartConfig)

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Subject Wise Attendance</CardTitle>
                <CardDescription>Past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent/>}
                        />
                        <Legend formatter={(value) =>
                            chartConfig[value as keyof typeof chartConfig]?.label
                        }
                        />
                        {subject_filters.map((subject) => (
                            <Line
                                key={subject.subject.id}
                                dataKey={subject.subject.subject_code}
                                type="linear"
                                stroke={`var(--color-${subject.subject.subject_code})`}
                                strokeWidth={2}
                                dot={true}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
