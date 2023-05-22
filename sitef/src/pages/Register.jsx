import { useState } from "react";
import Botao from "../components/Botao/botao";
import Nav from "../components/Nav/nav";
import TextField from "../components/TextField/TextField";
import Footer from "../components/footer/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const [ssn, setSsn] = useState('')
    const [numberCell, setNumberCell] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [token, setToken] = useState('')
    const [confirmaPassword, setConfirmPassowrd] = useState('')
    const navigate = useNavigate()

    const cadastrar = () => {
        console.log("entrou")
        axios.post('http://127.0.0.1:8000/auth/users/', {
            nomeCompleto: name,
            username: nickname,
            data_nascimento: birth,
            cpf: ssn,
            numero_telefone: numberCell,
            email: email,
            password: confirmaPassword
        })
            .then((response) => {
                console.log('cadastrou', response)
                axios.post('http://127.0.0.1:8000/auth/jwt/create', {
                    cpf: ssn,
                    password: password,
                })
                    .then((resposta) => {
                        console.log('criou token', resposta)
                        console.log(resposta)
                        setToken(resposta.data.access)
                        localStorage.setItem('token', JSON.stringify(resposta.data))
                        navigate('/')
                    })
                    .catch((erro) => {
                        console.log('não criou token', response)
                        if (erro?.response?.data?.message) {
                            alert(erro.response.data.message)
                            console.log('console', erro.response.data.message)
                        } else {
                            alert('Aconteceu um erro inesperado ao afetuar o seu login! Entre em contato com o suporte!')
                        }
                    })
            })
            .catch((erro) => {
                if (erro.response.data.username == 'Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters') {
                    alert("Your nickname cannot have a space.")
                } if (erro.response.data.email == 'Enter a valid email address.') {
                    alert('Write the email correctly')
                } else if (erro?.response?.data) {
                    console.log('aqui', erro.response.data)
                    console.log('erro aqui', erro)
                    alert('Fill in all fields')
                }
                else {
                    alert('Aconteceu um erro inesperado ao afetuar o seu login! Entre em contato com o suporte!')
                }
            })
    }
    return (
        <div className="h-full bg-temaCinza">
            <Nav />
            <div className="flex flex-col w-full justify-center items-center">
                <div className="w-2/4 h-[70rem] bg-[#FFF] flex justify-center flex-col items-center mt-32">
                    <h1 className="text-6xl font-bold text-center p-10">Register</h1>
                    <div className="flex flex-col w-full items-center">
                        <TextField type={"text"} children={"Full name"} onChange={(e) => setName(e.target.value)} />
                        <TextField type={"text"} children={"Nickname"} onChange={(e) => setNickname(e.target.value)} />
                        <TextField type={"date"} children={"Date of Bitrth"} onChange={(e) => setBirth(e.target.value)} />
                        <TextField type={"text"} children={"Social security number (SSN)"} onChange={(e) => setSsn(e.target.value)} />
                        <TextField type={"text"} children={"Cell phone"} onChange={(e) => setNumberCell(e.target.value)} />
                        <TextField type={"text"} children={"E-mail"} onChange={(e) => setEmail(e.target.value)} />
                        <TextField children={"Password"} onChange={(e) => setPassword(e.target.value)} />
                        <TextField type={"password"} children={"Confirm Password"} onChange={(e) => setConfirmPassowrd(e.target.value)} />
                    </div>
                    <Botao width={'w-1/5'} height={'h-16'} onClick={cadastrar}>
                        Register
                    </Botao>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default Register
