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
            <h3 className="text-lg font-medium text-white">Channel Statistics</h3>

            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-900/20 to-blue-800/10 border border-blue-900/30">
                        <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mr-3">
                            <Users className="w-5 h-5 text-blue-300" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-300">Subscribers</p>
                            <p className="text-lg font-medium text-white">{formatNumber(subscriberCount!)}</p>
                        </div>
                    </div>

                    <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-900/20 to-purple-800/10 border border-purple-900/30">
                        <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center mr-3">
                            <Eye className="w-5 h-5 text-purple-300" />
                        </div>
                        <div>
                            <p className="text-sm text-purple-300">Total Views</p>
                            <p className="text-lg font-medium text-white">{formatNumber(channelInfo?.viewCount)}</p>
                        </div>
                    </div>

                    <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-green-900/20 to-green-800/10 border border-green-900/30">
                        <div className="w-10 h-10 rounded-full bg-green-900/50 flex items-center justify-center mr-3">
                            <Video className="w-5 h-5 text-green-300" />
                        </div>
                        <div>
                            <p className="text-sm text-green-300">Video Count</p>
                            <p className="text-lg font-medium text-white">{formatNumber(channelInfo?.videoCount)}</p>
                        </div>
                    </div>

                    <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-orange-900/20 to-orange-800/10 border border-orange-900/30">
                        <div className="w-10 h-10 rounded-full bg-orange-900/50 flex items-center justify-center mr-3">
                            <Calendar className="w-5 h-5 text-orange-300" />
                        </div>
                        <div>
                            <p className="text-sm text-orange-300">Created On</p>
                            <p className="text-lg font-medium text-white">{formatDate(channelInfo?.publishedAt)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

