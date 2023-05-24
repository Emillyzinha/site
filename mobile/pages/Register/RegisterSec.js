import { View } from "react-native";
import CampoInput from "../../components/campoInput/campoInput";
import estilos from "./RegisterStyle";
import TopoInicio from "../../components/topoInicio/topoInicio";
import Button from "../../components/Button/Button";
import { useState } from "react";
import axios from "axios";

function RegisterSec({ route, navigation }) {
    const { name, nickname, birth, ssn } = route.params
    const [numberCell, setNumberCell] = useState('(19)1234-56789')
    const [email, setEmail] = useState('emy@teste.com')
    const [password, setPassword] = useState('R3@ctNative')
    const [confirmPassword, setConfirmPassword] = useState('R3@ctNative')
    const [token, setToken] = useState('')

    console.log(name)

    const cadastrar = () => {
        console.log("entrou")
        axios.post('http://127.0.0.1:8000/auth/users/', {
            nomeCompleto: name,
            username: nickname,
            data_nascimento: birth,
            cpf: ssn,
            numero_telefone: numberCell,
            email: email,
            password: confirmPassword
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
                        navigation.navigate('Desbloquear')
                    })
                    .catch((erro) => {
                        console.log('não criou token', erro)
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

    const validacaoBotao = () => {
        if (password != confirmPassword) {
            alert('The different password')
        }
        else {
            cadastrar()
            // navigation.navigate('Desbloquear')

        }
    }

    return (
        <View style={estilos.screen}>
            <TopoInicio>Register</TopoInicio>
            <View style={estilos.space} />
            <CampoInput onChange={(e) => setNumberCell(e.target.value)}>Cell phone</CampoInput>
            <CampoInput onChange={(e) => setEmail(e.target.value)}>Email</CampoInput>
            <CampoInput onChange={(e) => setPassword(e.target.value)}>Password</CampoInput>
            <CampoInput onChange={(e) => setConfirmPassword(e.target.value)}>Confirm the password</CampoInput>
            {/* {confirmPassword != password ? console.log()} */}
            <Button onPress={() => validacaoBotao()}> Register </Button>
        </View>
    )
}

export default RegisterSec