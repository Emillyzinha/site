import { Image, Text, View } from "react-native"
import styleValue from "./ValueStyle"
import TopPages from "../TopTransaction/TopTransaction"

import imageLoan from '../../assets/loan.png'
import CampoInput from "../campoInput/campoInput"
import ButtonArrow from "../buttonArrow/ButtonArrow"

const Value = ({ image, text }) => {
    return (
        <View style={styleValue.screen}>
            <TopPages image={imageLoan} text='Loan' />
            <Text style={styleValue.title}>Value</Text>
            <CampoInput />
            <View style={styleValue.spaceButton}>
                <ButtonArrow />
            </View>
        </View>
    )
}

export default Value
