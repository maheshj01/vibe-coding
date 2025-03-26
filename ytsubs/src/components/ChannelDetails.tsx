import React from 'react';
import { useYTSubscribers } from '../hooks/useYTSubscribers';

const ChannelDetails: React.FC<{ username: string }> = ({ username }) => {
  const { channelInfo, loading, error } = useYTSubscribers(username);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      {channelInfo && (
        <>
          <h2 className="text-xl font-bold">{channelInfo.title}</h2>
          <p className="text-gray-700">{channelInfo.description}</p>
          <p className="text-sm text-gray-500">Subscribers: {channelInfo.videoCount}</p>
          <p className="text-sm text-gray-500">Videos: {channelInfo.videoCount}</p>
          <p className="text-sm text-gray-500">Views: {channelInfo.viewCount}</p>
          <p className="text-sm text-gray-500">Channel Created: {new Date(channelInfo.publishedAt).toLocaleDateString()}</p>
        </>
      )}
    </div>
  );
};

export default ChannelDetails;
