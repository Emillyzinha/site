import { Link } from "react-router-dom"
import logo from '../../assets/logo-only.png'

const Nav = () => {
    let dados = localStorage.getItem('token')
    const teste = () => {
        <div className="w-96 h-96 bg-tema">
            <h3 className="text-3xl">OIIIIII</h3>
        </div>
    }
    return (
        <nav className="w-full border-b border-black">
            <ul className="w-full flex justify-center font-dm-sans text-2xl md:p-1">
                {dados == null ?
                    <>
                        <div className="w-1/2 flex justify-between max-sm:hidden">
                            <Link to={'/'}> <li className="text-[13px]">HOME</li> </Link>
                            <Link to={'/register'}> <li className="text-[13px]">REGISTER</li> </Link>
                            <Link to={'/enter'}> <li className="text-[13px]">ENTER</li> </Link>
                            <Link to={'/aboutus'}> <li className="text-[13px]">ABOUT US</li> </Link>
                        </div>
                        <div className="w-full md:hidden">
                            <div className="flex justify-between w-full p-5" >
                                <Link to={'/'}> <li className="text-[16px]">HOME</li> </Link>
                                <Link to={'/register'}> <li className="text-[16px]">REGISTER</li> </Link>
                                <Link to={'/enter'}> <li className="text-[16px]">ENTER</li> </Link>
                                <Link to={'/aboutus'}> <li className="text-[16px]">ABOUT US</li> </Link>
                            </div>
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
