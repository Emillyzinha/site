const TitleField = ({ situacao, value, title, type, children, onChange }) => {
    // readOnly = vai pro banco com o valor preenchido
    return (
        <div className="m-10">
            <h3 className="text-5xl text-tema mb-4">{title}</h3>
            <input readOnly={situacao} value={value} type={type} placeholder={children} onChange={onChange} className={`outline-none w-full h-24 p-5 shadow-lg drop-shadow-md text-4xl rounded-lg`} />
        </div>
    );

}

export default TitleField;
