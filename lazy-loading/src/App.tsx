import React from "react";
import SearchBar from "./components/SearchBar";
import ImagesGrid from "./components/Grid";
import { useDispatch } from "react-redux";
import { setImages } from "./redux/images/imageSlice";
const App: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const clientId = process.env.REACT_APP_ACCESS_KEY;
  const baseUrl = "https://api.unsplash.com";
  const path = '/photos'
  const per_page = 12;
  const page_number = 1;
  const dispatch = useDispatch();

  const fetchImages = async (query: string) => {
    try {
      const response = await fetch(`${baseUrl}${path}?client_id=${clientId}&query=${query}&per_page=${per_page}&page=${page_number}`);
      const data = await response.json();
      dispatch(setImages(data));
    } catch (error) {
      console.error(error);
    };
  };

  React.useEffect(() => {
    fetchImages(value);
  }, [value]);

  return (
    <>
      <SearchBar
        onChange={(query) => setValue(query)}
        placeholder="Search for Images"
        value=""
      />
      <div className="h-4" />
      <ImagesGrid className=" px-4" />
    </>
  );
}

export default App;

