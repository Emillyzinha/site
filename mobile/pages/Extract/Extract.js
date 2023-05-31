import { View, Text, Image, TouchableOpacity } from "react-native"
import TopPages from "../../components/TopTransaction/TopTransaction"
import imageExtract from '../../assets/extract.png'
import { useEffect, useState } from "react"
import axios from "axios"
import styleExtract from "./ExtractStyle"
import FieldExtract from "../../components/FieldExtract/FieldExtract.JS"

function Extract({ route }) {
    const [name, setName] = useState('Ana Julia')
    const [SSN, setSSN] = useState(12345678911)
    const [header, setHeader] = useState(0)
    const [security, setSecurity] = useState(false)

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

        axios.get('http://127.0.0.1:8000/bank/movimentacao/', // DESCOBRIR QUEM TA LOGADO
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
                            axios.get('http://127.0.0.1:8000/bank/movimentacao/', testeToken)
                                .then((res) => {
                                    console.log('oi', res)
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
    }, [])

    return (
        <View style={styleExtract.screen}>
            <TopPages image={imageExtract} text='Extract' />
            <FieldExtract/>
        </View>
    )
}

export default Extract
