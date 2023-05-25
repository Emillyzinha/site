import { Image, Text, TouchableOpacity, View } from "react-native"
import styleInformationAboutYou from "./informationAboutYouStyle"
import user from '../../assets/fotoUser.png'
import CampoImutavel from "../../components/campoImutavel/campoImutavel"


function InformationAboutYou({navigation}) {
    return (
        <View style={styleInformationAboutYou.screen}>
            <View style={styleInformationAboutYou.top}>
                <Image source={user} style={styleInformationAboutYou.image} />
                <Text style={styleInformationAboutYou.textTop}>Information About You</Text>
            </View>

            <CampoImutavel title={"Name"} sizeTitle={26} text={"Ana Letícia Silva Pereira"} width={"100%"} />
            <View style={styleInformationAboutYou.place}>
                <CampoImutavel title={"Date of birth"} sizeTitle={26} text={"23/02/2003"} width={"49%"} />
                <CampoImutavel title={"Name"} sizeTitle={25} text={"123.456.789.10"} width={"49%"} />
            </View>
            <CampoImutavel title={"Cell phone"} sizeTitle={26} text={"(19) 12345-6789"} width={"100%"} />
            <CampoImutavel title={"Email"} sizeTitle={26} text={"ana_le@gmail.com"} width={"100%"} />
            <CampoImutavel title={"Password"} sizeTitle={26} text={"********"} width={"100%"} />

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
