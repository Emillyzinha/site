import stylesCard from "./CardStyle.js";
import TopPages from '../../components/TopTransaction/TopTransaction';

import { Image } from "react-native";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

import cardTitle from '../../assets/cardTitle.png'
import card from '../../assets/card.png'

function Card({ navigation }) {
    return (
        <View style={stylesCard.screen}>
            <TopPages image={cardTitle} text='Your cards' />
            <TouchableOpacity style={stylesCard.input} onPress={() => navigation.navigate('Address')}>
                <Text style={stylesCard.text}>Request your cards</Text>
            </TouchableOpacity>
            <View style={stylesCard.cardView}>
                <Image source={card} style={stylesCard.image} />
            </View>

        </View>
    )
}

export default Card

