import { useState, useEffect } from "react"

export interface ChannelInfo {
  title: string
  description: string
  thumbnailUrl: string
  customUrl: string
  publishedAt: string
  viewCount: string
  videoCount: string
}

export const useYTSubscribers = (channelId: string) => {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null)
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true)
        setError(null)

        const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY

        if (!API_KEY) {
          throw new Error("YouTube API key is missing")
        }

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet,brandingSettings&id=${channelId}&key=${API_KEY}`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch channel data")
        }

        const data = await response.json()

        if (!data.items || data.items.length === 0) {
          throw new Error("Channel not found")
        }

        const channelData = data.items[0]
        const count = channelData.statistics.subscriberCount

        setSubscriberCount(Number.parseInt(count, 10))
        setChannelInfo({
          title: channelData.snippet.title,
          description: channelData.snippet.description,
          thumbnailUrl: channelData.snippet.thumbnails.high.url,
          customUrl: channelData.snippet.customUrl || channelData.id,
          publishedAt: channelData.snippet.publishedAt,
          viewCount: channelData.statistics.viewCount,
          videoCount: channelData.statistics.videoCount,
        })

        setLoading(false)
      } catch (err) {
        console.error("Error fetching subscriber count:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch subscriber count")
        setLoading(false)
      }
    }

    fetchSubscribers() // Initial fetch

    // Set up interval for real-time updates (every 300 seconds)
    const intervalId = setInterval(fetchSubscribers, 300000)

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId)
  }, [channelId])

  return { subscriberCount, loading, error, channelInfo }
}

