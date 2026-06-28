interface SelectableButtonProps {
    option: option[],
    selected: string,
    onSelect: (value: string) => void,
}

interface option  {
    label: string,
    value: string,
}

function SelectableButton({ option, selected, onSelect }: SelectableButtonProps) {
    return (
        <button>
            <select className="rounded-lg
        bg-gray-900
        border-2 border-gray-900
        px-2 py-2
        text-sm font-medium text-[#e5e5e5]
        shadow-lg
        outline-none
        cursor-pointer
        transition
        " value={selected} onChange={(e) => onSelect(e.target.value)}>
            {option.map((option) => 
            
                <option className="bg-gray-900 text-white rounded-lg" key={option.value} value={option.value}>{option.label}</option>
            )}
            </select>
        </button>
    )
}
export default SelectableButton;