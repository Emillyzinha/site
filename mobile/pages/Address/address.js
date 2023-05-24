import TopPages from '../../components/TopTransaction/TopTransaction';

import { Image } from "react-native";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

import addressImage from '../../assets/address.png'
import card from '../../assets/card.png'
import stylesAddress from "./AddressStyle.js";
import CampoInput from '../../components/campoInput/campoInput';

function Address({ navigation }) {
    return (
        <View style={stylesAddress.screen}>
            <TopPages image={addressImage} text='Address' />
            <CampoInput>CEP</CampoInput>
        </View>
    )
}

export default Address

