import { useEffect, useState } from "react"
import Botao from "../components/Botao/botao"
import Nav from "../components/Nav/nav"
import TextField from "../components/TextField/TextField"
import TitleField from "../components/TitleField/TileField"
import Footer from "../components/footer/footer"
import axios from "axios";

function Edit() {
    const [readonly, setreadonly] = useState(true)
    const [nome, setNome] = useState('')
    const [date, setDate] = useState('')
    const [ssn, setSSN] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [textInput, setTextInput] = useState('Change')
    const [idCliente, setIdCliente] = useState('')
    const [headerCustom, setHeader] = useState({})
    const [cor, setCor] = useState()


    let dados = localStorage.getItem('token')

    useEffect(() => {
        let token = ''
        if (dados != undefined) {
            token = JSON.parse(dados)
        }

        let tokenAccess = dados.access
        const testeToken = {
            headers: {
                Authorization: `JWT ${tokenAccess}`
            },
        }

        setHeader(testeToken)

        axios.get('http://127.0.0.1:8000/auth/users/me/',
            testeToken).then((res) => {
                setNome(res.data.username)
                setDate(res.data.data_nascimento)
                setSSN(res.data.cpf)
                setNome(res.data.username)
                setPhone(res.data.numero_telefone)
                setEmail(res.data.email)
                setIdCliente(res.data.id)
                console.log('oir3', idCliente)

            })
            .catch((erro) => {
                if (erro.response.status === 401) {
                    axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', { refresh: token.refresh })
                        .then((res) => {
                            tokenAccess = res.data.access
                            const testeToken = {
                                headers: {
                                    Authorization: `JWT ${tokenAccess}`
                                },
                            }

                            setHeader(testeToken)

                            axios.get('http://127.0.0.1:8000/auth/users/me/',
                                testeToken).then((res) => {
                                    setNome(res.data.username)
                                    setDate(res.data.data_nascimento)
                                    setSSN(res.data.cpf)
                                    setNome(res.data.username)
                                    setPhone(res.data.numero_telefone)
                                    setEmail(res.data.email)
                                    setIdCliente(res.data.id)
                                })
                        }
                        ).catch((erro) => {
                            console.log('errooioioioio', erro)
                        })
                } else {
                    console, log('oi', erro)
                }
            })
    }, [])



    function handleSubmit(event) {
        event.preventDefault();
    }


    const habilitarInput = () => {
        if (readonly == true) {
            setreadonly(false)
            setTextInput('Save')
        } else {
            setreadonly(true)
            setTextInput('Change')
        }
    }

    const changeColor = () => {
        if (readonly == true) {
            setCor('bg-[#e7e7e7')
        }else {
            setCor('bg-[#ffffff')
        }
    }

    const logica = () => {
        if (textInput == 'Save') {
            editClient()
        } else {
            habilitarInput()
        }
    }

    const editClient = () => {
        axios.patch(`http://127.0.0.1:8000/auth/users/${idCliente}/`,
            {
                username: nome,
                numero_telefone: phone,
                email: email,
                password: password,
            }, headerCustom
        ).then((res) => {
            console.log('deu certo', res)
        }).catch((error) => {
            console.log('deu errado', error)
        })
    }

    return (
        <div className="h-screen w-full" onSubmit={handleSubmit}>
            <Nav />
            <div className="flex flex-col w-full items-center p-10">
                <div className="w-9/12 flex flex-col ">
                    <p className="text-8xl text-tema text-center">ACCOUNT</p>
                    <TitleField situacao={readonly} title={'Name'} type={"text"} value={nome} onChange={(event) => setNome(event.target.value)} />
                    <TitleField situacao={true} title={'Date of birth'} type={"text"} value={date} />
                    <TitleField situacao={true} title={'SSN'} type={"text"} value={ssn} />
                    <TitleField situacao={readonly} title={'Cell phone'} type={"text"} value={phone} onChange={(event) => setPhone(event.target.value)} />
                    <TitleField situacao={readonly} title={'E-mail'} type={"text"} value={email} onChange={(event) => setEmail(event.target.value)} />
                    <TitleField situacao={readonly} title={'Password'} type={"password"} onChange={(event) => setPassword(event.target.value)} />
                    <div className="w-full flex justify-center">
                        <button className="bg-temaCinza h-24 w-72 m-10 rounded-md text-4xl text-[#8B8B8B]" onClick={logica}> {textInput} </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Edit
