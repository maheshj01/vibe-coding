"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "./ui/input"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import SubscriberCounter from "./counter"
import SubscriberStats from "./subscriber-stats"
import { useYTSubscribers } from "../hooks/useYTSubscribers"
import SubscriberChart from "./subscriber-chart"
import { Youtube } from "lucide-react"

export default function SubscriberDashboard() {
    const [channelId, setChannelId] = useState("UCX24LefLR5Bd1rtzHYEUmPg")
    const [inputChannelId, setInputChannelId] = useState(channelId)
    const { subscriberCount, loading, error, channelInfo } = useYTSubscribers(channelId)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setChannelId(inputChannelId)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Youtube className="h-8 w-8 text-red-500" />
                    <h1 className="text-3xl font-bold">YouTube Subscriber Tracker</h1>
                </div>
                <p className="text-gray-400">Track your favorite YouTube channels in real-time</p>
            </header>

            <Card className="mb-8 bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            type="text"
                            value={inputChannelId}
                            onChange={(e) => setInputChannelId(e.target.value)}
                            placeholder="Enter YouTube Channel ID"
                            className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Button type="submit" variant="default" className="bg-red-600 hover:bg-red-700">
                            Track
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {error ? (
                <Card className="bg-red-900 border-red-800 mb-8">
                    <CardContent className="pt-6">
                        <p className="text-center">{error}</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
                        <CardContent className="pt-6">
                            <SubscriberCounter subscriberCount={subscriberCount} loading={loading} channelInfo={channelInfo} />
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="pt-6">
                            <SubscriberStats subscriberCount={subscriberCount} loading={loading} channelInfo={channelInfo} />
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700 lg:col-span-3">
                        <CardContent className="pt-6">
                            <SubscriberChart subscriberCount={subscriberCount} loading={loading} />
                        </CardContent>
                    </Card>
                </div>
            )}

            <footer className="mt-12 text-center text-gray-500 text-sm">
                <p>Data provided by YouTube Data API • Refreshes every 30 seconds</p>
            </footer>
        </div>
    )
}

