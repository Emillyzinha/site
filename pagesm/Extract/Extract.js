import { View, Text, Image, TouchableOpacity } from "react-native"
import TopPages from "../../components/TopTransaction/TopTransaction"
import imageExtract from '../../assets/extract.png'
import { useEffect, useState } from "react"
import axios from "axios"
import styleExtract from "./ExtractStyle"
import ExtractField from "../../components/ExtractField/ExtractField"
import moneyOut from '../../assets/moneyComingOut.png'
import moneyIn from '../../assets/moneyComingIn.png'

function Extract({ route }) {
    const [header, setHeader] = useState(0)
    const [pegarMovimentacao, setPegarMovimentacao] = useState([])
    const [image, setImage] = useState()
    const [idCliente, setIdCliente] = useState()

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

        axios.get('http://127.0.0.1:8000/auth/users/me',
            testeToken)
            .then((res) => {
                console.log('deu certo', res)
                setPegarMovimentacao(res.data)

            })
            .catch((err) => {
                console.log('errado', err);
            })

        axios.get('http://127.0.0.1:8000/bank/movimentacao/',
            testeToken)
            .then((res) => {
                setPegarMovimentacao(res.data)

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

                            axios.get('http://127.0.0.1:8000/auth/users/me/',
                                testeToken)
                                .then((res) => {
                                    setIdCliente(res.data.id)
                                    console.log('deu certo2', res)

                                })
                                .catch((err) => {
                                    console.log('errado2', err);
                                })

                            axios.get('http://127.0.0.1:8000/bank/movimentacao/', testeToken)
                                .then((res) => {
                                    console.log('oi', res)
                                    setPegarMovimentacao(res.data)
                                })
                                .catch((err) => {
                                    console.log('deu ruim2', err);
                                    console.log(header)
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

    return (
        <View style={styleExtract.screen}>
            <TopPages image={imageExtract} text='Extract' />
            {pegarMovimentacao.map((movimentacao, index) => {

                var data = new Date(movimentacao.fields.data);
                var dia = String(data.getDate()).padStart(2, '0')
                var mesFormatado = { month: 'short' }
                var mes = data.toLocaleString('default', mesFormatado).toUpperCase()


                return <>
                    <ExtractField key={index} image={movimentacao.fields.fk_conta == idCliente ? moneyOut : moneyIn} name={movimentacao.fields.nomeCompleto} value={'$ ' + movimentacao.fields.valor + ' - ' + movimentacao.fields.transacao} date={dia + ' ' + mes.replace('.', '')} />
                </>
            })}
        </View>
    )
}

export default Extract
