import { Text, View } from "react-native"
import { Image } from "react-native"

import estilosHome from "./homeStyle"

import ParaImagensTopo from "../../components/paraImagensTopo/paraImagensTopo"
import OpcoesTransacoes from "../../components/opcoesTransacoes/opcoesTransacoes"
import ButtonMovement from "../../components/buttonMovement/buttonMovement"
import Board from "../../components/board/board"

import fotoUser from '../../assets/fotoUser.png'
import olhoAberto from '../../assets/olhoAberto.png'
import configuracao from '../../assets/configuracao.png'
import imagePix from '../../assets/imgPix.png'
import imageTransfer from '../../assets/imgTransfer.png'
import imageBarras from '../../assets/codigoBarras.png'
import imageRecharge from '../../assets/imgRecharge.png'
import grafico from '../../assets/grafico.png'
import { useEffect, useState } from "react"
import axios from "axios"

function Home({ navigation }) {
    const [header, setHeader] = useState({})
    const [name, setName] = useState('')
    const [balance, setBalance] = useState('')
    const [haveCard, sethaveCard] = useState(false)

    let dados = localStorage.getItem('token')

    useEffect(() => {
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
                setName(res.data.username)

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
                                    setName(res.data.username)
                                })
                                .catch((err) => {
                                    console.log('deu ruim2', err);
                                    console.log(header)
                                })
                            axios.get('http://127.0.0.1:8000/bank/conta/', testeToken)
                                .then((res) => {
                                    console.log('conta', res.data[0].fields.saldo)
                                    setBalance(res.data[0].fields.saldo)
                                })
                                .catch((err) => {
                                    console.log('deu ruim2', err);
                                    console.log(header)
                                })
                            axios.get('http://127.0.0.1:8000/bank/cartao/', testeToken)
                                .then((res) => {
                                    res.data.length == 0 ? sethaveCard(false) : sethaveCard(true)
                                })
                                .catch((err) => {
                                    console.log('deu ruim cartao', err);
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

    console.log('teste', haveCard)

    return (
        <View style={estilosHome.pagina}>

            <View style={estilosHome.topo}>
                <View style={estilosHome.conteudoTopo}>
                    <Image source={fotoUser} style={estilosHome.user} />
                    <Text style={estilosHome.hello}>Hello, {name}</Text>
                </View>
                <View style={estilosHome.imagensTopo}>
                    <ParaImagensTopo img={olhoAberto} width={40} heigth={26} />
                    <ParaImagensTopo img={configuracao} width={40} heigth={40} />
                </View>
            </View>

            <View style={estilosHome.balance}>
                <Text style={estilosHome.textBalance}>Balance</Text>
                <Text style={estilosHome.valeuBalance}>$ {balance},00</Text>
            </View>

            <View style={estilosHome.opcoesTransacoes}>
                <OpcoesTransacoes img={imagePix} fontSize={25} width={55} height={55}>Pix</OpcoesTransacoes>
                <OpcoesTransacoes img={imageBarras} fontSize={25} width={60} height={60}>Ticket</OpcoesTransacoes>
                <OpcoesTransacoes img={imageRecharge} fontSize={20} width={60} height={60}>Recharge</OpcoesTransacoes>
                <OpcoesTransacoes img={imageTransfer} fontSize={20} width={40} height={70}>Transfer</OpcoesTransacoes>
            </View>

            <View style={estilosHome.movement}>
                <Text style={estilosHome.textMovement}>Account movement</Text>
                {haveCard ? 
                <ButtonMovement onPress={() => { navigation.navigate('Card') }}>Your Cards</ButtonMovement>
                :
                <ButtonMovement onPress={() => { navigation.navigate('Address') }}>Ask for card</ButtonMovement>
            }
                <ButtonMovement onPress={() => { navigation.navigate('Value') }}>Loan</ButtonMovement>
                <ButtonMovement>Extract</ButtonMovement>
            </View>

            <View style={estilosHome.movement}>
                <Text style={estilosHome.textMovement}>Financial organization</Text>
                <Board image={grafico} width={350} height={200} />
            </View>
        </View>

    )
}

export default Home
