import { Link } from "react-router-dom"

const Nav = () => {
    let dados = localStorage.getItem('token')
    return (
        <nav className="flex justify-center w-full border-b-2 border-black">
            <ul className="w-[50%] flex p-6 font-dm-sans justify-between text-2xl">
                {dados == null ?
                    <>
                        <Link to={'/'}> <li>HOME</li> </Link>
                        <Link to={'/register'}> <li>REGISTER</li> </Link>
                        <Link to={'/enter'}> <li>ENTER</li> </Link>
                        <Link to={'/aboutus'}> <li>ABOUT US</li> </Link>
                    </>
                    :
                    <>
                        <Link to={'/'}> <li>HOME</li> </Link>
                         <Link to={'/aboutus'}> <li>ABOUT US</li> </Link>
                        <Link to={'/edit'}> <li>EDIT</li> </Link>
                        <Link onClick={() => console.log('clicou')}> <li>SAIR</li> </Link>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Nav
