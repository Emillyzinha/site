import TopPages from '../../components/TopTransaction/TopTransaction';
import addressImage from '../../assets/address.png'
import stylesAddress from "./AddressStyle.js";
import CampoInput from '../../components/campoInput/campoInput';
import Button from '../../components/Button/Button';

import { Text, View } from "react-native";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Address({ navigation }) {
    const [CEP, setCEP] = useState(0)
    const [neighborhood, setNeighborhood] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [state, setState] = useState('')
    const [number, setNumber] = useState('')
    const [header, setHeader] = useState({})
    const [renderiza, setRenderiza] = useState(false)
    let fk_cliente = 1

    let dados = localStorage.getItem('token')
    console.log(dados)

    useEffect(() => {
        if (CEP.length == 8) {
            console.log('entrou')
            axios.get(`https://viacep.com.br/ws/${CEP}/json`)
                .then((res) => {
                    if (res.data.erro) {
                        setNeighborhood('')
                        setCity('')
                        setStreet('')
                        setState('')
                    } else {
                        console.log('deu certo', res)
                        console.log('deu certo', res.data)
                        setNeighborhood(res.data.bairro)
                        setCity(res.data.localidade)
                        setStreet(res.data.logradouro)
                        setState(res.data.uf)
                    }
                })
                .catch((err) => {
                    setNeighborhood('')
                    setCity('')
                    setStreet('')
                    setState('')
                    console.log('deu errado', err)
                })
        } else {
            setNeighborhood('')
            setCity('')
            setStreet('')
            setState('')
        }

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

                            axios.get('http://127.0.0.1:8000/auth/users/me/',
                                testeToken).then((res) => {
                                    console.log('HERE', res)
                                })
                        }
                        ).catch((erro) => {
                            console.log('token heeeeeeeeere', token.refresh)
                            console.log('errooioioioio', erro)
                        })
                } else {
                    console, log('oi', erro)
                }
            })


    }, [renderiza, CEP])

    const createAddress = () => {
        if (CEP == null || neighborhood == null || country == null || city == null || street == null || state == null || number == null) {
            alert('Preencha todos os campos')
            console.log(neighborhood)
        } else {
            axios.post('http://127.0.0.1:8000/bank/endereco/', {
                cep: CEP,
                pais: country,
                estado: state,
                cidade: city,
                bairro: neighborhood,
                logradouro: street,
                numero: number,
                fk_cliente: fk_cliente
            }, header)
                .then((res) => {
                    if (res.data == "Account already has a card.") {
                        alert('Account already has a card')
                    }
                    else{
                        alert("Account created successfully!")
                        console.log('deu bom', res)
                    }
                })
                .catch((err) => {
                    if (res.data == "Account already has a card.") {
                        alert('"Account already has a card."')
                    }
                    else {
                        console.log('deu bem mal', err)
                    }
                })
        }
    }

    const teste = () => {
        axios.get('http://127.0.0.1:8000/bank/endereco/', header)
            .then((res) => {
                console.log(res)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

        axios.get('http://127.0.0.1:8000/bank/cartao/', header)
            .then((resC) => {
                console.log('cartao', resC)
                console.log('cartao1', resC.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <View style={stylesAddress.screen}>
            <TopPages image={addressImage} text='Address' />
            <View style={stylesAddress.fieldInputS}>
                <CampoInput maxLength={8} onChange={(e) => setCEP(e.target.value)} >CEP</CampoInput>
                <CampoInput onChange={(e) => setCountry(e.target.value)}>Country</CampoInput>
                <CampoInput value={state}>State</CampoInput>
                <CampoInput value={city}>City</CampoInput>
                <CampoInput value={neighborhood}>Neighborhood</CampoInput>
                <CampoInput value={street}>Street</CampoInput>
                <CampoInput onChange={(e) => setNumber(e.target.value)}>Number</CampoInput>
            </View>
            <Button onPress={() => createAddress()}>Send</Button>
            <Button onPress={() => teste()}>teste</Button>
        </View>
    )
}

export default Address
