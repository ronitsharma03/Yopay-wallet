export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="font-bold text-xl">
            Your balance
        </div>
        <div className="font-semibold ml-2 text-xl">
            {
                "Rs "+value
            }
        </div>
    </div>
}