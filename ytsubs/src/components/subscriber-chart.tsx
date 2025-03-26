import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Skeleton } from "./ui/skeleton"

interface SubscriberChartProps {
    subscriberCount: number | null
    loading: boolean
}

interface DataPoint {
    time: string
    count: number
}

export default function SubscriberChart({ subscriberCount, loading }: SubscriberChartProps) {
    const [data, setData] = useState<DataPoint[]>([])

    useEffect(() => {
        if (subscriberCount !== null) {
            // Add a small random variation to simulate real-time changes
            const variation = Math.floor(Math.random() * 5) - 2
            const newCount = subscriberCount + variation

            const now = new Date()
            const timeString = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })

            setData((prevData) => {
                const newData = [...prevData, { time: timeString, count: newCount }]
                // Keep only the last 20 data points
                return newData.slice(-20)
            })
        }
    }, [subscriberCount])

    return (
        <div className="h-[300px]">
            <h3 className="text-lg font-medium mb-4">Subscriber Trend</h3>

            {loading && data.length === 0 ? (
                <Skeleton className="w-full h-[250px]" />
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="time" stroke="#888" tick={{ fill: "#888" }} />
                        <YAxis stroke="#888" tick={{ fill: "#888" }} domain={["auto", "auto"]} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#333",
                                border: "1px solid #555",
                                color: "#fff",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#ff0000"
                            strokeWidth={2}
                            dot={{ fill: "#ff0000", r: 4 }}
                            activeDot={{ r: 6, fill: "#ff0000" }}
                            isAnimationActive={true}
                            animationDuration={500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

