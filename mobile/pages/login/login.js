import { Text, View } from "react-native";
import CampoInput from "../../components/campoInput/campoInput";
import TopoInicio from "../../components/topoInicio/topoInicio";
import styleLogin from "./loginStyle";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useState } from "react";

function Login({ navigation }) {
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')

    const enter = async () => {
        console.log("passou aqui")
        await axios.post('http://127.0.0.1:8000/auth/jwt/create', {
            cpf: cpf,
            password: password,
        }).then((resposta) => {
            console.log(resposta)
            setToken(resposta.data.access)
            localStorage.setItem('token', JSON.stringify(resposta.data))
            // navigate('/edit')
            navigation.navigate('Home')

        })
            .catch((erro) => {
                if (erro?.response?.data?.message) {
                    alert(erro.response.data.message)
                    console.log('console', erro.response.data.message)
                } else {
                    console.log(erro)
                    alert('Aconteceu um erro inesperado ao afetuar o seu login! Entre em contato com o suporte!')
                }
            })
    }

    console.log('poioioi', cpf)

    return (
        <View style={styleLogin.screen}>
            <TopoInicio>Login</TopoInicio>
            <View style={styleLogin.space} />
            <CampoInput onChange={(event) => setCpf(event.target.value)} >SSN</CampoInput>
            <CampoInput onChange={(event) => setPassword(event.target.value)}>Password</CampoInput>
            <Button onPress={() => enter()}>Enter</Button>
        </View>
    )
}

export default Login
