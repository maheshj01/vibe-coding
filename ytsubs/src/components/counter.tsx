"use client"

import { useEffect, useState } from "react"
import { Badge, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChannelInfo } from "../hooks/useYTSubscribers"
import { Skeleton } from "./ui/skeleton"

interface SubscriberCounterProps {
    subscriberCount: number | null
    loading: boolean
    channelInfo: ChannelInfo | null
}

export default function SubscriberCounter({ subscriberCount, loading, channelInfo }: SubscriberCounterProps) {
    const [prevCount, setPrevCount] = useState<number | null>(null)
    const [isIncreasing, setIsIncreasing] = useState<boolean | null>(null)

    useEffect(() => {
        if (subscriberCount !== null && prevCount !== null) {
            setIsIncreasing(subscriberCount > prevCount)
        }
        if (subscriberCount !== null) {
            setPrevCount(subscriberCount)
        }
    }, [subscriberCount, prevCount])

    // Format subscriber count with commas
    const formattedCount = subscriberCount?.toLocaleString() || "0"

    // Split the count into individual digits for animation
    const digits = formattedCount.split("")

    return (
        <div className="flex flex-col items-center">
            {loading ? (
                <div className="w-full flex flex-col items-center">
                    <Skeleton className="h-24 w-24 rounded-full mb-4" />
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-16 w-48 mb-4" />
                </div>
            ) : (
                <>
                    <div className="flex items-center mb-6">
                        {channelInfo?.thumbnailUrl ? (
                            <img
                                src={channelInfo.thumbnailUrl || "/placeholder.svg"}
                                alt={channelInfo.title || "Channel thumbnail"}
                                width={80}
                                height={80}
                                className="rounded-full border-4 border-gray-700"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                                <Users className="w-10 h-10 text-gray-400" />
                            </div>
                        )}
                        <div className="ml-4">
                            <h2 className="text-xl font-bold">{channelInfo?.title || "YouTube Channel"}</h2>
                            <div className="flex gap-2 mt-1">
                                <Badge className="bg-gray-700 text-gray-300">
                                    {channelInfo?.customUrl || "Unknown"}
                                </Badge>
                                {isIncreasing !== null && (
                                    <Badge className={isIncreasing ? "bg-green-600" : "bg-red-600"}>
                                        {isIncreasing ? "Growing" : "Declining"}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <h3 className="text-lg text-gray-400 mb-2">Subscribers</h3>
                        <div className="flex justify-center items-center text-6xl font-bold tracking-wider">
                            {digits.map((digit, index) => (
                                <AnimatePresence mode="popLayout" key={index}>
                                    {digit === "," ? (
                                        <span className="mx-1">,</span>
                                    ) : (
                                        <motion.span
                                            key={`${index}-${digit}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-12 h-16 flex items-center justify-center"
                                        >
                                            {digit}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            ))}
                        </div>

                        {isIncreasing !== null && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`mt-2 text-lg font-medium ${isIncreasing ? "text-green-500" : "text-red-500"}`}
                            >
                                {isIncreasing ? "↑ Growing" : "↓ Declining"}
                            </motion.div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

