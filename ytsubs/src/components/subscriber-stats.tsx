"use client"

import { Users, Eye, Video, Calendar } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import { ChannelInfo } from "../hooks/useYTSubscribers"

interface SubscriberStatsProps {
    subscriberCount: number | null
    loading: boolean
    channelInfo: ChannelInfo | null
}

export default function SubscriberStats({ subscriberCount, loading, channelInfo }: SubscriberStatsProps) {
    const formatNumber = (num: number | string | undefined) => {
        if (num === undefined) return "0"
        const n = typeof num === "string" ? Number.parseInt(num) : num

        if (n >= 1000000) {
            return (n / 1000000).toFixed(1) + "M"
        } else if (n >= 1000) {
            return (n / 1000).toFixed(1) + "K"
        }
        return n.toString()
    }

    const formatDate = (date: string | undefined) => {
        if (!date) return "Unknown"
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium">Channel Statistics</h3>

            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3">
                            <Users className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Subscribers</p>
                            <p className="text-lg font-medium">{formatNumber(subscriberCount!)}</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">
                            <Eye className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Total Views</p>
                            <p className="text-lg font-medium">{formatNumber(channelInfo?.viewCount)}</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                            <Video className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Video Count</p>
                            <p className="text-lg font-medium">{formatNumber(channelInfo?.videoCount)}</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-orange-900/30 flex items-center justify-center mr-3">
                            <Calendar className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Created On</p>
                            <p className="text-lg font-medium">{formatDate(channelInfo?.publishedAt)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

