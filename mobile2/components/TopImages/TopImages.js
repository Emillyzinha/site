import { Image, Text, View } from "react-native"
import stylesTopImages from "./TopImagesStyle.js"

const TopImages = ({ img, width, heigth }) => {
    return (
        <View style={stylesTopImages.lugarCinza}>
            <Image source={img} style={{ width: width, height: heigth}} />
        </View>
    )
}

export default TopImages
