import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

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

    // Calculate min and max for better visualization
    const minValue = data.length > 0 ? Math.min(...data.map((d) => d.count)) - 5 : 0

    const maxValue = data.length > 0 ? Math.max(...data.map((d) => d.count)) + 5 : 100

    return (
        <div className="h-[300px]">
            <h3 className="text-lg font-medium mb-4 text-white">Subscriber Trend</h3>

            {loading && data.length === 0 ? (
                <Skeleton className="w-full h-[250px]" />
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 20,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ff0000" stopOpacity={0.2} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.3} />
                        <XAxis
                            dataKey="time"
                            stroke="#aaa"
                            tick={{ fill: "#aaa" }}
                            axisLine={{ stroke: "#555" }}
                            tickLine={{ stroke: "#555" }}
                        />
                        <YAxis
                            stroke="#aaa"
                            tick={{ fill: "#aaa" }}
                            domain={[minValue, maxValue]}
                            axisLine={{ stroke: "#555" }}
                            tickLine={{ stroke: "#555" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#222",
                                border: "1px solid #444",
                                color: "#fff",
                                borderRadius: "4px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                            }}
                            itemStyle={{ color: "#fff" }}
                            labelStyle={{ color: "#aaa", marginBottom: "4px" }}
                        />
                        {data.length > 1 && (
                            <ReferenceLine
                                y={data[0].count}
                                stroke="#666"
                                strokeDasharray="3 3"
                                label={{
                                    value: "Start",
                                    position: "insideBottomRight",
                                    fill: "#aaa",
                                    fontSize: 12,
                                }}
                            />
                        )}
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#ff0000"
                            strokeWidth={3}
                            dot={{ fill: "#ff0000", r: 4, strokeWidth: 2, stroke: "#fff" }}
                            activeDot={{
                                r: 8,
                                fill: "#ff0000",
                                stroke: "#fff",
                                strokeWidth: 2,
                            }}
                            isAnimationActive={true}
                            animationDuration={500}
                            fill="url(#colorCount)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

