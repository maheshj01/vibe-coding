interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: () => void;
    className?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, className }) => {
    return <input
        className={`${className} p-2 border border-gray-300 rounded-md`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />;
};

export default Input;