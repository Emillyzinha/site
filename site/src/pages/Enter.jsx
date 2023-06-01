import { useState } from "react";
import Botao from "../components/Botao/botao";
import Nav from "../components/Nav/nav";
import TextField from "../components/TextField/TextField";
import Footer from "../components/footer/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Enter() {

    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const navigate =  useNavigate()

    const enter = async() => {
        try{
            await axios.post('http://127.0.0.1:8000/auth/jwt/create', {
                cpf: cpf,
                password: password,
            }).then((resposta) => {
                console.log(resposta)
                setToken(resposta.data.access)
                localStorage.setItem('token', JSON.stringify(resposta.data))
                navigate('/')
                
            })
                .catch((erro) => {
                    if (erro?.response?.data?.message) {
                        alert(erro.response.data.message)
                        console.log('console', erro.response.data.message)
                    } else if(erro.response.data.detail == 'No active account found with the given credentials') {
                        alert('As per your information!')
                    }
                })
        }catch{
            alert('An unexpected error occurred, please try again later.')
        }
    }

    return (
        <div className="h-full bg-temaCinza">
            <Nav />
            <div className="flex flex-col w-full justify-center items-center">
                <div className="w-11/12 h-[40rem] flex justify-center flex-col items-center xl:bg-[#FFF] xl:w-2/4 mt-32">
                    <h1 className="text-6xl font-bold text-center p-10">Enter</h1>
                    <div className="flex flex-col w-full items-center">
                        <TextField type={"text"} children={"SSN"} onChange={((e) => setCpf(e.target.value))} />
                        <TextField type={"password"} children={"Password"} onChange={((e) => setPassword(e.target.value))} />
                    </div>
                    <Botao width={'w-1/3'} height={'h-16'} onClick={enter}>
                        Enter
                    </Botao>
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Enter
