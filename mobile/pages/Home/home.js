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

function Home({ navigation }) {
    return (
        <View style={estilosHome.pagina}>

            <View style={estilosHome.topo}>
                <View style={estilosHome.conteudoTopo}>
                    <Image source={fotoUser} style={estilosHome.user} />
                    <Text style={estilosHome.hello}>Hello, Ana</Text>
                </View>
                <View style={estilosHome.imagensTopo}>
                    <ParaImagensTopo img={olhoAberto} width={40} heigth={26} />
                    <ParaImagensTopo img={configuracao} width={40} heigth={40} />
                </View>
            </View>

            <View style={estilosHome.balance}>
                <Text style={estilosHome.textBalance}>Balance</Text>
                <Text style={estilosHome.valeuBalance}>$ 2.999,03</Text>
            </View>

            <View style={estilosHome.opcoesTransacoes}>
                <OpcoesTransacoes img={imagePix} fontSize={25} width={55} height={55}>Pix</OpcoesTransacoes>
                <OpcoesTransacoes img={imageBarras} fontSize={25} width={60} height={60}>Ticket</OpcoesTransacoes>
                <OpcoesTransacoes img={imageRecharge} fontSize={20} width={60} height={60}>Recharge</OpcoesTransacoes>
                <OpcoesTransacoes img={imageTransfer} fontSize={20} width={40} height={70}>Transfer</OpcoesTransacoes>
            </View>

            <View style={estilosHome.movement}>
                <Text style={estilosHome.textMovement}>Account movement</Text>
                <ButtonMovement>Your Cards</ButtonMovement>
                <ButtonMovement onPress={() => {navigation.navigate('Loan')}}>Loan</ButtonMovement>
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
