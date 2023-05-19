import { Image, Text, TouchableOpacity, View } from "react-native"
import styleConfirmTransaction from "./ConfirmTransactionStyle"
import TopTransaction from "../../components/TopTransaction/TopTransaction"
import imagePadlock from '../../assets/padlock.png'
import CampoInput from "../../components/campoInput/campoInput"
import ButtonArrow from "../../components/buttonArrow/ButtonArrow"

function ConfirmTransaction({ route, navigation }) {
    const { image, text } = route.params
    return (
        <View style={styleConfirmTransaction.screen}>
            <View>
                <TopTransaction image={image} text={text} />

                <View style={styleConfirmTransaction.top}>
                    <Text style={styleConfirmTransaction.title} >Security password</Text>
                    <Image source={imagePadlock} style={styleConfirmTransaction.image} />
                </View>

                <CampoInput />

                <View style={styleConfirmTransaction.placeButton}>
                    <ButtonArrow />
                </View>

            </View>


            <TouchableOpacity style={styleConfirmTransaction.buttonPassword}>
                <Text style={styleConfirmTransaction.textButtonPassword}>Enter with the password of cellphone</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ConfirmTransaction