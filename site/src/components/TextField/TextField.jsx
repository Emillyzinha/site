const TextField = ({ type, children, onChange }) => {
    return (
        <input type={type} placeholder={children} onChange={onChange} className="w-2/3 h-20 m-3 p-5 shadow-lg drop-shadow-md text-2xl rounded-lg" />
    );

}

export default TextField;