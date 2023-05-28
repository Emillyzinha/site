import { Image, Text, View } from "react-native"
import styleValue from "./ValueStyle"
import TopPages from "../TopTransaction/TopTransaction"

import CampoInput from "../campoInput/campoInput"
import ButtonArrow from "../buttonArrow/ButtonArrow"
import { useState } from "react"

const Value = ({ navigation, route }) => {
    const { img, textImage, title, navigateTo } = route.params
    const [value, setValue ] = useState(0)
    return (
        <View style={styleValue.screen}>
            <TopPages image={img} text={textImage} />
            <Text style={styleValue.title}>{title}</Text>
            <CampoInput onChange={(e) => setValue(e.target.value)} />
            <View style={styleValue.spaceButton}>
                <ButtonArrow onPress={() => navigation.navigate(navigateTo, { value: value })} />
            </View>
        </View>
    )
}

export default Value
