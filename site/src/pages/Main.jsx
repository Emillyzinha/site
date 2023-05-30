import logoTopo from '../assets/logo-topo.png'
import Botao from "../components/Botao/botao";
import Nav from '../components/Nav/nav';
import Footer from '../components/footer/footer';
import WeAre from '../components/weAre/weAre';
import WeAreRight from '../components/weAre/weAreRight';
import aviao from '../../src/assets/aviao.png'
import college from '../../src/assets/college.png'
import finances from '../../src/assets/financas.png'
import cartao from '../../src/assets/cartaoGold.png'
import bancoMobile from '../../src/assets/bancoMobile.png'
import playStore from '../../src/assets/playstore.png'
import appStore from '../../src/assets/appstore.png'

function Main() {
    return (
        <div className="h-screen w-full">
            <Nav />
            <div className="md:flex flex-col max-sm:hidden">
                <div className="flex justify-center">
                    <img className="w-[50rem]" src={logoTopo} />
                </div>
                <h1 className="text-tema font-dm mt-10 text-8xl text-dm-sans text-center" >EVERYTHING YOU NEED FROM A BANK IN ONE PLACE</h1>

                <WeAre ml={'ml-[53%]'} mt={'mt-[10rem]'} />
                <WeAreRight />
                <WeAre ml={'ml-[53%]'} mt={'mt-[8.6rem]'} />

                <div className='flex justify-around mt-32'>
                    <h1 className='text-[7rem] leading-[110.67px] w-2/5 text-center flex items-center'>Ask for your card without annuity</h1>
                    <img className='w-96' src={cartao} />
                </div>

                <div className='w-full flex justify-around mt-32'>
                    <img  src={bancoMobile} />
                    <div className='w-1/2 flex flex-col justify-center'>
                        <h1 className='text-8xl text-center flex items-center'>Download our app and get access to our services</h1>
                        <div className='mt-32 flex h-32 justify-between'>
                            <img className='w-80' src={appStore} />
                            <img className='w-80' src={playStore} />
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <div className="bg-temaCinza h-[30rem] w-[90%] flex mt-32 items-center">
                        <h1 className='w-1/2 text-6xl flex items-center text-center p-14'>We are a bank focused on helping you, so we have a series of benefits for you!</h1>
                        <div className="h-full flex items-center">
                            <div className="border h-5/6" />
                        </div>
                        <div className="w-1/2 flex flex-col items-center justify-center">
                            <h1 className='text-5xl'>To know more contact us</h1>
                            <div className="w-[32em] flex mt-12">
                                <input type='text' value='Your email' className='outline-none bg-temaCinza border-[#000] border-[3px] h-16 w-3/4 text-2xl p-7' />
                                <button className='w-1/4 h-16 bg-[#000] text-[#fff] text-2xl'>Send</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default Main;