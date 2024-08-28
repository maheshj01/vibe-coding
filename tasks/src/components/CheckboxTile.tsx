import { MdDelete } from "react-icons/md";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onCheckboxChange: () => void; // Changed to take no arguments
    onRemove: () => void;
}

const CheckBoxTile: React.FC<CheckboxProps> = ({ label, checked, onCheckboxChange, onRemove }) => {
    return (
        <div className="shadow-md p-2 flex items-center min-w-96">
            <div className="flex grow items-center">
                <input
                    type="checkbox"
                    name={label}
                    checked={checked}
                    onChange={onCheckboxChange} // No need to pass the event
                />
                <div className="ml-2" />
                <p className={`${checked ? 'line-through' : ''}`}>{label}</p>
            </div>
            <div>
                <MdDelete className="cursor-pointer" onClick={onRemove} />
            </div>
        </div>
    );
};

export default CheckBoxTile;
