// src/components/SubscriberCount.tsx

import React from 'react';
import { useYTSubscribers } from '../hooks/useYTSubscribers';

const SubscriberCount = ({ username }: { username: string }) => {
  const { subscriberCount, loading, error } = useYTSubscribers(username);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 bg-gray-200 rounded shadow-md">
      <h2 className="text-xl font-bold">YouTube Subscriber Count</h2>
      {subscriberCount !== null && (
        <p className="text-2xl mt-2">{subscriberCount.toLocaleString()}</p>
      )}
    </div>
  );
};

export default SubscriberCount;
