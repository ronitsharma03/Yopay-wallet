

export const Button = ({ label, onClick }) => {
    return (
        <button onClick={onClick} type="button" className="text-base w-full text-white bg-blue-500 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2">{label}</button>
    )
}