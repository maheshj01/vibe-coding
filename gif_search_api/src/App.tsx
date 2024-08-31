import React, { useEffect, useState, useCallback } from "react";
import Input from "./components/ui/Input";
import GifGrid from "./components/GifGrid";
import { useDispatch } from "react-redux";
import { setGifs, addGifs } from "./features/gifSlice";

const App: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setOffset(0);
    if (value.length === 0) {
      fetchTrendingGifs();
    } else {
      searchGifs();
    }
  }, [value]);

  const searchGifs = useCallback(async (isLoadMore: boolean = false) => {
    const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${value}&limit=10&offset=${offset}&rating=g&lang=en`);

    const data = await response.json();
    if (isLoadMore) {
      dispatch(addGifs(data.data));
    } else {
      dispatch(setGifs(data.data));
    }
    setOffset(prevOffset => prevOffset + 10);
  }, [value, offset, dispatch]);

  const fetchTrendingGifs = useCallback(async (isLoadMore: boolean = false) => {
    const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=10&offset=${offset}&rating=g`);

    const data = await response.json();
    if (isLoadMore) {
      dispatch(addGifs(data.data));
    } else {
      dispatch(setGifs(data.data));
    }
    setOffset(prevOffset => prevOffset + 10);
  }, [offset, dispatch]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    if (value.length === 0) {
      fetchTrendingGifs(true);
    } else {
      searchGifs(true);
    }
  }, [value, searchGifs, fetchTrendingGifs]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center">
        <Input
          className="w-full max-w-md my-10"
          type="text" placeholder="Search for Gifs" value={value} onChange={(e) => setValue(e.target.value)} />
        <GifGrid />
      </div>
    </div>
  );
}

export default App;

