import React, { useEffect, useState, useCallback } from "react";

const App: React.FC = () => {
  const totalItemCount = 100000000000;
  const chunkSize = 1000; // Number of items to load per chunk
  const [items, setItems] = useState<string[]>([]);
  const [loadMore, setLoadMore] = useState<boolean>(true); // Flag to load more items

  // load a chunk of items
  const loadItems = useCallback((start: number) => {
    const newItems = Array.from({ length: chunkSize }, (_, index) => `Item ${start + index + 1}`);
    setItems((prevItems) => [...prevItems, ...newItems]);
  }, []);

  // Initial load
  useEffect(() => {
    loadItems(0);
  }, [loadItems]);

  // Handle scrolling to load more items
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && loadMore) {
        const currentItemCount = items.length;
        if (currentItemCount < totalItemCount) {
          loadItems(currentItemCount);
        } else {
          setLoadMore(false); // Stop loading when all items are loaded
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, loadItems, loadMore]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {items.map((item, index) => (
        <div key={index} className="text-lg text-gray-700">
          {item}
        </div>
      ))}
      {!loadMore && <p className="text-center text-gray-500">All items loaded</p>}
    </div>
  );
};

export default App;
