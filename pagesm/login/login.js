import { Text, View } from "react-native";
import TopStart from "../../components/TopStart/TopStart";
import styleLogin from "./LoginStyle";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useState } from "react";
import InputField from "../../components/InputField/InputField";

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
            <TopStart>Login</TopStart>
            <View style={styleLogin.space} />
            <InputField onChange={(event) => setCpf(event.target.value)} >SSN</InputField>
            <InputField onChange={(event) => setPassword(event.target.value)}>Password</InputField>
            <Button onPress={() => enter()}>Enter</Button>
        </View>
    )
}

export default Login
