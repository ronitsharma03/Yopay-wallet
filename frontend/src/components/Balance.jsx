export const Balance = ({ value, refresh }) => {
    return <div className="flex">
        <div className="font-bold text-xl">
            Your balance
        </div>
        <div className="font-semibold ml-2 text-xl flex justify-center items-center">
            {
                "Rs " + value
            }
        </div>
        <div className="flex justify-center items-center ml-2">
            <button onClick={refresh}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </button>
        </div>
    </div>
}