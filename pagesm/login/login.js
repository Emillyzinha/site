import { View } from "react-native";
import { useState } from "react";

import styleLogin from "./LoginStyle";

import TopStart from "../../components/TopStart/TopStart";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";

import axios from "axios";

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
            navigation.navigate('Home')

        })
            .catch((erro) => {
                if (cpf == '' || password == ''){
                    alert('Fill the fields')
                }
                else if (erro?.response?.data?.message) {
                    alert(erro.response.data.message)
                } else {
                    alert('An unexpected error occurred while logging in! Please contact support!')
                }
            })
    }

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
