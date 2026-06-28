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
        <button className="text-black">
            <select className="rounded-lg
        border border-[#3c3c3c]
        bg-gradient-to-b from-[#2b2b2b] to-[#1f1f1f]
        px-2 py-2
        text-sm font-medium text-[#e5e5e5]
        shadow-md
        outline-none
        cursor-pointer
        transition
        " value={selected} onChange={(e) => onSelect(e.target.value)}>
            {option.map((option) => 
            
                <option className="bg-black text-white" key={option.value} value={option.value}>{option.label}</option>
            )}
            </select>
        </button>
    )
}
export default SelectableButton;