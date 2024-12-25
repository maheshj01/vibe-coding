import React from "react";
import SearchBar from "./components/SearchBar";
import ImagesGrid from "./components/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setImages, setLoading } from "./redux/images/imageSlice";
import useDebounce from "./hooks/useDebounce";
import { RootState } from "./redux/store";
const App: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const clientId = process.env.REACT_APP_ACCESS_KEY;
  const path = '/photos'
  const per_page = 12;
  const page_number = 1;
  const dispatch = useDispatch();
  const debouncedValue = useDebounce(value, 500);
  const loading = useSelector((state: RootState) => state.loading);

  const fetchImages = async (query: string) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`${process.env.REACT_APP_UNSPLASH_BASE_URL}${path}?client_id=${clientId}&query=${query}&per_page=${per_page}&page=${page_number}`);
      const data = await response.json();
      console.log("data", data);
      dispatch(setImages(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
    };
  };

  React.useEffect(() => {
    fetchImages(debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <SearchBar
        onChange={(query) => setValue(query)}
        placeholder="Search for Images"
        value={value}
      />
      <div className="h-4" />
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <ImagesGrid className="px-4" />
      )}
    </>
  );
}

export default App;

