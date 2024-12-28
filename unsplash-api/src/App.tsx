import React, { useCallback, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import ImagesGrid from "./components/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setImages, setLoading, addImages, setEndOfList } from "./redux/images/imageSlice";
import useDebounce from "./hooks/useDebounce";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const clientId = process.env.REACT_APP_ACCESS_KEY;
  const path = '/photos'
  const per_page = 20;
  const page_number = useRef<number>(0);
  const dispatch = useDispatch();
  const debouncedValue = useDebounce(value, 15000);
  const loading = useSelector((state: RootState) => state.loading);
  const endOfList = useSelector((state: RootState) => state.endOfList);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  const fetchImages = async (query: string, append?: boolean) => {
    try {
      if (endOfList) return;
      dispatch(setLoading(true));
      page_number.current += 1;
      const response = await fetch(`${process.env.REACT_APP_UNSPLASH_BASE_URL}${path}?client_id=${clientId}&query=${query}&per_page=${per_page}&page=${page_number.current}`);
      const data = await response.json();
      if (!data) {
        observerRef.current?.disconnect();
        dispatch(setEndOfList(true));
        dispatch(setLoading(false));
        return;
      }
      if (append) {
        dispatch(addImages(data));
      } else {
        dispatch(setImages(data));
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
    };
  };

  const LoadingComponent = () => {
    return (<div className="flex justify-center items-center h-96">
      <div className="loader">Loading...</div>
    </div>)
  }

  React.useEffect(() => {
    page_number.current = 0
    fetchImages(debouncedValue, false);
  }, [debouncedValue]);

  const lastImage = useCallback((element: HTMLDivElement | null) => {
    if (!element || loading) return;
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    // check if the last element is intersecting then set new observerRef.current
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchImages(debouncedValue, true);
      }
    }, { threshold: 0.1 });
    observerRef.current.observe(element);
  }, [loading, debouncedValue]);

  return (
    <>
      <SearchBar
        onChange={(query) => setValue(query)}
        placeholder="Search for Images"
        value={value}
        onSubmit={() => fetchImages(debouncedValue, false)}
      />
      <div className="h-4" />
      <ImagesGrid imageRef={lastImage} className="px-4" />
      {loading && (
        <LoadingComponent />
      )}
    </>
  );
}

export default App;

