import { useEffect, useState } from "react"
import { Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChannelInfo } from "../hooks/useYTSubscribers"
import { Skeleton } from "./ui/skeleton"
import { Badge } from "./ui/badge"

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
                    <div className="flex flex-col md:flex-row items-center mb-6 w-full">
                        <div className="flex-shrink-0 mb-4 md:mb-0">
                            {channelInfo?.thumbnailUrl ? (
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-700 blur-md opacity-50"></div>
                                    <img
                                        src={channelInfo.thumbnailUrl || "/placeholder.svg"}
                                        alt={channelInfo.title || "Channel thumbnail"}
                                        width={80}
                                        height={80}
                                        className="rounded-full border-4 border-gray-700 relative z-10"
                                    />
                                </div>
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center relative">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 blur-sm opacity-50"></div>
                                    <Users className="w-10 h-10 text-gray-300 relative z-10" />
                                </div>
                            )}
                        </div>
                        <div className="md:ml-4 text-center md:text-left">
                            <h2 className="text-xl font-bold text-white">{channelInfo?.title || "YouTube Channel"}</h2>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-1 text-white">
                                <Badge
                                    variant="outline"
                                    aria-label={channelInfo?.customUrl}
                                    className="bg-gray-700/70 text-gray-200 border-gray-600">
                                    {channelInfo?.customUrl || "No custom URL"}
                                </Badge>
                                {isIncreasing !== null && (
                                    <Badge className={isIncreasing ? "bg-green-600/80 text-white" : "bg-red-600/80 text-white"}>
                                        {isIncreasing ? "Growing" : "Declining"}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <h3 className="text-lg text-gray-300 mb-2 font-medium">Subscribers</h3>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-700/20 blur-xl rounded-full"></div>
                            <div className="flex justify-center items-center text-6xl font-bold tracking-wider text-white relative z-10">
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
                        </div>

                        {isIncreasing !== null && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`mt-4 text-lg font-medium ${isIncreasing ? "text-green-400" : "text-red-400"}`}
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

