import stylesCard from "./CardStyle.js";
import TopPages from '../../components/TopTransaction/TopTransaction';

import { Image } from "react-native";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

import cardTitle from '../../assets/cardTitle.png'
import card from '../../assets/card.png'
import { useEffect, useState } from "react";
import axios from "axios";
import CampoImutavel from "../../components/campoImutavel/campoImutavel.js";
import { Button } from "react-native-web";

function Card({ navigation }) {
    const [renderiza, setRenderiza] = useState(false)
    const [header, setHeader] = useState({})
    const [testee, setTeste] = useState({})

    let dados = localStorage.getItem('token')

    useEffect(() => {
        let token = ''
        if (dados != undefined) {
            token = JSON.parse(dados)
        }

        console.log('oioioioioioioioioioi', token)


        let tokenAccess = token.access
        const testeToken = {
            headers: {
                Authorization: `JWT ${tokenAccess}`
            },
        }
        console.log('ACCESS', tokenAccess)

        setHeader(testeToken)

        axios.get('http://127.0.0.1:8000/auth/users/me/', // DESCOBRIR QUEM TA LOGADO
            testeToken)
            .then((res) => {
                setRenderiza(false)
                console.log('oir3', res)

            })
            .catch((erro) => {
                console.log('oizinho', tokenAccess);
                if (erro.response.status === 401) {
                    setRenderiza(true)
                    axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', { refresh: token.refresh }) // DAR O REFRESH
                        .then((res) => {
                            tokenAccess = res.data.access
                            const testeToken = {
                                headers: {
                                    Authorization: `JWT ${tokenAccess}`
                                },
                            }
                            console.log('NO REFRESH', res)

                            setHeader(testeToken)


                        }
                        ).catch((erro) => {
                            console.log('errooioioioio', erro)
                        })
                } else {
                    console, log('oi', erro)
                }
            })
    }, [])

    const teste = () => {
        axios.get('http://127.0.0.1:8000/bank/cartao/', header)
            .then((res) => {
                console.log(res)
                console.log(res.data)
                console.log(res.data[30])
                setTeste(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <View style={stylesCard.screen}>
            <TopPages image={cardTitle} text='Your cards' />
            <View style={stylesCard.fields}>
                <CampoImutavel title='Name' text='teste' width={'100%'} sizeTitle={30} />
                <CampoImutavel title='Number Card' text='teste' width={'100%'} sizeTitle={30} />
                <View style={stylesCard.numbers}>
                    <CampoImutavel title='CVV' text='teste' width={'48%'} sizeTitle={30} />
                    <CampoImutavel title='Validity' text='teste' width={'48%'} sizeTitle={30} />
                </View>
            </View>
            <View style={stylesCard.cardView}>
                <Image source={card} style={stylesCard.image} />
            </View>

            <Button onPress={() => teste()}>Enter</Button>

        </View>
    )
}

export default Card

