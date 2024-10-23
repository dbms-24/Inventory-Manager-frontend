export default function Input({key, type, placeholder, value="", onChange, name}) {
    return(
        <>
        <div className="flex justify-center font-normal">
            <div className="m-2">
                <div className="ml-1 mb-1">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </div>
                <input  type={type} placeholder={placeholder} value={value} onChange={onChange}
                className="border-2 border-secondary-500 focus:outline-none focus:border-secondary-600 min-w-60 w-full rounded-lg p-2 "
                />
            </div>
        </div>
        </>
    )
}
