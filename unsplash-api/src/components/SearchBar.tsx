import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchProps {
    onChange: (value: string) => void;
    placeholder: string;
    value: string;
}

const SearchBar: React.FC<SearchProps> = ({ onChange, placeholder, value }) => {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (onChange) {
            onChange(e.target.value);
        }
    }
    return (
        <div className="flex justify-center mt-4">
            <div className="relative flex items-center w-full max-w-md">
                <FaMagnifyingGlass className="absolute left-3 text-sky-400" />
                <input
                    className="w-full pl-10 border-sky-200 border-2 ring-2 rounded-lg px-4 py-2"
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default SearchBar;