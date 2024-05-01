

export const InputBox = ({label, placeholder, onChange}) => {
    return (
        <div className="text-lg font-medium text-left py-3">
            <div>
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
        </div>
    )
}