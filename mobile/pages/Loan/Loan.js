import { Image, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native"
import styleLoan from "./LoanStyle"
import imageLoan from '../../assets/loan.png'
import FieldLoan from "../../components/FieldLoan/FieldLoan"
import TopPages from "../../components/TopTransaction/TopTransaction"
import { useEffect, useState } from "react"
import axios from "axios"
import CampoInput from "../../components/campoInput/campoInput"
import ButtonArrow from "../../components/buttonArrow/ButtonArrow"
import imagePadlock from '../../assets/padlock.png'

function Loan({ navigation, route }) {
    const { value } = route.params
    const [qtdParcela, setQtdParcela] = useState(0)
    const [header, setHeader] = useState(0)

    const [valorParcela, setParcela] = useState(0)
    const [once, setOnce] = useState(0)
    const [twice, setTwice] = useState(0)
    const [thrice, setThrice] = useState(0)
    const [fourTimes, setFourTimes] = useState(0)
    const [fiveTimes, setFiveTimes] = useState(0)
    const [sixTimes, setSixTimes] = useState(0)
    const value_int = parseInt(value)

    const value_to_fixed = (teste) => {
        const teste2 = teste.toFixed(2)
        const teste_retorno = parseFloat(teste2)
        return teste_retorno
    }

    useEffect(() => {
        const fees = 4 / 100
        const percentage_value = value_int * fees

        const oncet = value_to_fixed(value_int + percentage_value)
        const twicet = value_to_fixed((value_int + percentage_value) / 2)
        const thricet = value_to_fixed((value_int + percentage_value) / 3)
        const fourt = value_to_fixed((value_int + percentage_value) / 4)
        const fivet = value_to_fixed((value_int + percentage_value) / 5)
        const sixt = value_to_fixed((value_int + percentage_value) / 6)

        setOnce(oncet)
        setTwice(twicet)
        setThrice(thricet)
        setFourTimes(fourt)
        setFiveTimes(fivet)
        setSixTimes(sixt)

        let dados = localStorage.getItem('token')
        let token = ''
        if (dados != undefined) {
            token = JSON.parse(dados)
        }
        let tokenAccess = token.access
        const testeToken = {
            headers: {
                Authorization: `JWT ${tokenAccess}`
            },
        }

        setHeader(testeToken)

        axios.get('http://127.0.0.1:8000/auth/users/me/', // DESCOBRIR QUEM TA LOGADO
            testeToken)
            .then((res) => {
                console.log(res)

            })
            .catch((erro) => {
                if (erro.response.status === 401) {
                    axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', { refresh: token.refresh }) // DAR O REFRESH
                        .then((res) => {
                            tokenAccess = res.data.access
                            const testeToken = {
                                headers: {
                                    Authorization: `JWT ${tokenAccess}`
                                },
                            }

                            setHeader(testeToken)
                            console.log('oi')
                            axios.get('http://127.0.0.1:8000/auth/users/me/', testeToken)
                                .then((res) => {
                                    console.log(res.data)
                                })
                                .catch((err) => {
                                    console.log('deu ruim2', err);
                                    console.log(header)
                                })
                        }
                        ).catch((erro) => {
                            console.log('entrou4');
                            console.log('errooioioioio', erro)
                        })
                } else {
                    console, log('oi', erro)
                }
            })

        console.log(qtdParcela)

    }, [])

    const transaction = () => {
        console.log('aqui')
        axios.post('http://127.0.0.1:8000/bank/loan/', {
            valor: value,
            qtd_parcela: qtdParcela,
            valor_parcelas: valorParcela,
            juros: 4,
            fk_conta: 1
        }, header)
            .then((res) => {
                console.log('deu certo', res)
            })
            .catch((erro) => {
                console.log('deu bem errado', erro)
            })
    }

    const [teste, setTeste] = useState(false)

    // navigation.navigate('ConfirmT', { image: imageLoan, text: 'Loan', transaction: console.log('aqui') })

    console.log('fora', teste)
    return (
        <>
            {teste == false ?
                <View style={styleLoan.screen}>
                    <TopPages image={imageLoan} text='Loan' />
                    <View style={styleLoan.boxAll}>
                        <Text style={styleLoan.textTitle}>Installments</Text>
                        <FieldLoan onPress={() => { setQtdParcela(1), setParcela(once), setTeste(true) }} text={`1x ${once}`} navigation={navigation} image={imageLoan} textTitle='Loan' />
                        <FieldLoan onPress={() => { setQtdParcela(2), setParcela(twice), setTeste(true) }} text={`2x ${twice}`} navigation={navigation} image={imageLoan} textTitle='Loan' />
                        <FieldLoan onPress={() => { setQtdParcela(3), setParcela(thrice), setTeste(true) }} text={`3x ${thrice}`} navigation={navigation} image={imageLoan} textTitle='Loan' />
                        <FieldLoan onPress={() => { setQtdParcela(4), setParcela(fourTimes), setTeste(true) }} text={`4x ${fourTimes}`} navigation={navigation} image={imageLoan} textTitle='Loan' />
                        <FieldLoan onPress={() => { setQtdParcela(5), setParcela(fiveTimes), setTeste(true) }} text={`5x ${fiveTimes}`} navigation={navigation} image={imageLoan} textTitle='Loan' />
                        <FieldLoan onPress={() => { setQtdParcela(6), setParcela(sixTimes), setTeste(true) }} text={`6x ${sixTimes}`} navigation={navigation} image={imageLoan} textTitle='Loan' />
                    </View>
                </View>
                :
                <View style={styleLoan.screen}>
                    <View>
                        <TopPages image={imageLoan} text='Loan' />

                        <View style={styleLoan.top}>
                            <Text style={styleLoan.title} >Security password</Text>
                            <Image source={imagePadlock} style={styleLoan.image} />
                        </View>

                        <CampoInput />

                        <View style={styleLoan.placeButton}>
                            <ButtonArrow onPress={() => transaction()} />
                        </View>

                    </View>

                    <TouchableOpacity style={styleLoan.buttonPassword}>
                        <Text style={styleLoan.textButtonPassword}>Enter with the password of cellphone</Text>
                    </TouchableOpacity>
                </View>
            }
        </>
    )
}

export default Loan
