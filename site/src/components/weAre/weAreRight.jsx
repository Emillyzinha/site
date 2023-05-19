const WeAreRight = ({img}) => {
    return (
        <div className='flex flex-row-reverse mt-32'>
            <div className="w-6/12 h-[24rem] rounded-l-[1rem] bg-temaCinza flex pt-16 justify-center pl-7">
                <div className='flex flex-col'>
                    <div className="flex items-end">
                        <h3 className="text-7xl">WE ARE</h3>
                        <h3 className="text-9xl text-[#fff]">FLEXIBLE</h3>
                    </div>
                    <div className="flex">
                        <h3 className="text-8xl text-[#fff]">VACATION</h3>
                        <h3 className="text-5xl">FOR YOU</h3>
                    </div>
                </div>
            </div>
            <div className='w-64 h-64 mr-[45%] mt-[8.7rem] absolute'>
                <img src={img} />
            </div>
        </div>
    );
}

export default WeAreRight;