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
    const [counter, setCounter] = useState(0)
    const navigate = useNavigate()
    const date = new Date();
    const hour = date.getMinutes()
    var counterT

    let dados = localStorage.getItem('token')

    // bloquear a tentativa depois de tres vezes 
    // desbloquear depois do horario definido
    // voltar a bloquear caso o usuario erre
    // infinitamente assim

    const enter = () => {
        if (counter >= 2) {
            console.log('aqui oh', hour);
            const timeBack = 56
            if (hour != timeBack) {
                alert('Your access was blocked for 4 hours by login error 3 times')
            } else {
                setCounter(0)
                counterT = 0
                console.log('oi');
                axios.post('http://127.0.0.1:8000/auth/jwt/create', {
                    cpf: cpf,
                    password: password,
                }).then((resposta) => {
                    console.log(resposta)
                    setToken(resposta.data.access)
                    localStorage.setItem('token', JSON.stringify(resposta.data))
                    navigate('/')

                })
                    .catch((erro) => {
                        if (cpf == '' || password == '') {
                            alert('Fill the fields')
                        }
                        else if (erro?.response?.data?.message) {
                            alert(erro.response.data.message)
                        } else if (erro.response.data.detail == 'No active account found with the given credentials') {
                            alert('Check your password and SSN')
                            counterT = counter
                            setCounter(counterT += 1)
                            console.log(erro);
                        } else {
                            console.log(erro);
                            alert('An unexpected error occurred while logging in! Please contact support!')
                        }
                    })
            }
        } else {
            axios.post('http://127.0.0.1:8000/auth/jwt/create', {
                cpf: cpf,
                password: password,
            }).then((resposta) => {
                console.log(resposta)
                setToken(resposta.data.access)
                localStorage.setItem('token', JSON.stringify(resposta.data))
                navigate('/')

            })
                .catch((erro) => {
                    if (cpf == '' || password == '') {
                        alert('Fill the fields')
                    }
                    else if (erro?.response?.data?.message) {
                        alert(erro.response.data.message)
                    } else if (erro.response.data.detail == 'No active account found with the given credentials') {
                        alert('Check your password and SSN')
                        counterT = counter
                        setCounter(counterT += 1)
                        console.log(erro);
                    } else {
                        console.log(erro);
                        alert('An unexpected error occurred while logging in! Please contact support!')
                    }
                })
        }
    }

    console.log('oq', counter);

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
                    <Botao width={'w-1/3'} height={'h-16'} onClick={() => enter()}>
                        Enter
                    </Botao>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Enter
