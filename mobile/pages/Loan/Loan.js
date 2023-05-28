import { Image, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native"
import styleLoan from "./LoanStyle"
import imageLoan from '../../assets/loan.png'
import FieldLoan from "../../components/FieldLoan/FieldLoan"
import TopPages from "../../components/TopTransaction/TopTransaction"
import { useEffect, useState } from "react"
import axios from "axios"

function Loan({ navigation, route }) {
    const { value } = route.params
    const [qtdParcela, setQtdParcela] = useState(0)
    const [header, setHeader] = useState(0)

    useEffect(() => {

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
    if (qtdParcela != 0 && qtdParcela <= 6) {
        axios.post('http://127.0.0.1:8000/bank/emprestimo/', {
            valor: value,
            qtd_parcela: qtdParcela,
            valor_parcelas: 0,
            juros: 0,
            fk_conta: 1
        }, header)
            .then((res) => {
                console.log('deu certo', res)
            })
            .catch((erro) => {
                console.log('deu bem errado', erro)
            })
    }

    console.log('fora', qtdParcela)
    return (
        <View style={styleLoan.screen}>
            <TopPages image={imageLoan} text='Loan' />
            <View style={styleLoan.boxAll}>
                <Text style={styleLoan.textTitle}>Installments</Text>
                <FieldLoan onPress={() => setQtdParcela(1)} text="1x 2020,00" navigation={navigation} image={imageLoan} textTitle='Loan' />
                <FieldLoan onPress={() => setQtdParcela(2)} text="2x 1020,00" navigation={navigation} image={imageLoan} textTitle='Loan' />
                <FieldLoan onPress={() => setQtdParcela(3)} text="3x 686,67" navigation={navigation} image={imageLoan} textTitle='Loan' />
                <FieldLoan onPress={() => setQtdParcela(4)} text="4x 520,00" navigation={navigation} image={imageLoan} textTitle='Loan' />
                <FieldLoan onPress={() => setQtdParcela(5)} text="5x 420,00" navigation={navigation} image={imageLoan} textTitle='Loan' />
                <FieldLoan onPress={() => setQtdParcela(6)} text="6x 353,33" navigation={navigation} image={imageLoan} textTitle='Loan' />
            </View>
        </View>
    )
}

export default Loan
