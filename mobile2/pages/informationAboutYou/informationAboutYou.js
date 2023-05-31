import { Image, Text, TouchableOpacity, View } from "react-native"
import styleInformationAboutYou from "./informationAboutYouStyle"
import user from '../../assets/fotoUser.png'
import UnchangingField from "../../components/UnchangingField/UnchangingField"


function InformationAboutYou({navigation}) {
    return (
        <View style={styleInformationAboutYou.screen}>
            <View style={styleInformationAboutYou.top}>
                <Image source={user} style={styleInformationAboutYou.image} />
                <Text style={styleInformationAboutYou.textTop}>Information About You</Text>
            </View>

            <UnchangingField title={"Name"} sizeTitle={26} text={"Ana Letícia Silva Pereira"} width={"100%"} />
            <View style={styleInformationAboutYou.place}>
                <UnchangingField title={"Date of birth"} sizeTitle={26} text={"23/02/2003"} width={"49%"} />
                <UnchangingField title={"Name"} sizeTitle={25} text={"123.456.789.10"} width={"49%"} />
            </View>
            <UnchangingField title={"Cell phone"} sizeTitle={26} text={"(19) 12345-6789"} width={"100%"} />
            <UnchangingField title={"Email"} sizeTitle={26} text={"ana_le@gmail.com"} width={"100%"} />
            <UnchangingField title={"Password"} sizeTitle={26} text={"********"} width={"100%"} />

            <View style={styleInformationAboutYou.placeButton}>
                <TouchableOpacity style={styleInformationAboutYou.button} onPress={() => navigation.navigate('Editing')}>
                    <Text style={styleInformationAboutYou.textButon}>Change</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styleInformationAboutYou.buttonHelp}>
                <Text style={styleInformationAboutYou.textHelp}>Help for you</Text>
            </TouchableOpacity>

        </View>
    )
}

export default InformationAboutYou
