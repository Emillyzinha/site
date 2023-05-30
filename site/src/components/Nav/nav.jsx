import { Link } from "react-router-dom"
import logo from '../../assets/logo-only.png'

const Nav = () => {
    let dados = localStorage.getItem('token')
    return (
        <nav className="w-full border-b-2 border-black">
            <ul className="w-full flex justify-center font-dm-sans text-2xl md:p-6">
                {dados == null ?
                    <>
                        <div className="w-1/2 flex justify-between max-sm:hidden">
                            <Link to={'/'}> <li>HOME</li> </Link>
                            <Link to={'/register'}> <li>REGISTER</li> </Link>
                            <Link to={'/enter'}> <li>ENTER</li> </Link>
                            <Link to={'/aboutus'}> <li>ABOUT US</li> </Link>
                        </div>
                        <div className="flex justify-between w-full p-6 md:hidden">
                            <div className="flex flex-col justify-center">
                                <div className="h-[0.2rem] w-14 mb-2 bg-[#000]"></div>
                                <div className="h-[0.2rem] w-14 mb-2 bg-[#000]"></div>
                                <div className="h-[0.2rem] w-14 bg-[#000]"></div>
                            </div>
                            <img src={logo} alt="Logo do banco" className='w-16 h-14' />
                        </div>
                    </>
                    :
                    <>
                        <div className="w-1/2 flex justify-between max-sm:hidden">
                            <Link to={'/'}> <li>HOME</li> </Link>
                            <Link to={'/aboutus'}> <li>ABOUT US</li> </Link>
                            <Link to={'/edit'}> <li>EDIT</li> </Link>
                            <Link onClick={() => localStorage.removeItem('token')} to={'/'}> <li>GO OUT</li> </Link>
                        </div>
                        <div className="flex justify-between w-full p-6 md:hidden">
                            <div className="flex flex-col justify-center">
                                <div className="h-[0.2rem] w-14 mb-2 bg-[#000]"></div>
                                <div className="h-[0.2rem] w-14 mb-2 bg-[#000]"></div>
                                <div className="h-[0.2rem] w-14 bg-[#000]"></div>
                            </div>
                            <img src={logo} alt="Logo do banco" className='w-16 h-14' />
                        </div>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Nav
