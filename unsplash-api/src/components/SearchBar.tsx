import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchProps {
    onChange: (value: string) => void;
    placeholder: string;
    value: string;
    onSubmit?: (value: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onChange, placeholder, value, onSubmit }) => {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (onChange) {
            onChange(e.target.value);
        }
    }
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && onSubmit) {
            onSubmit(value);
        }
    }

    return (
        <div className="flex justify-center mt-4">
            <div className="relative flex items-center w-full max-w-md">
                <FaMagnifyingGlass className="absolute left-3 text-black-400" />
                <input
                    className="w-full pl-10 ring-black ring-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-white-400"
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

export default SearchBar;