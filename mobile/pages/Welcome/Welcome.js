import { Image, Text, TouchableOpacity, View } from "react-native";
import logo from "../../assets/logo-full.png"
import stylesWelcome from "./WelcomeStyle";
import Button from "../../components/Button/Button";

const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

function Welcome({ navigation }) {
    return (
        <View style={stylesWelcome.screen}>
            <Image source={logo} style={stylesWelcome.image} />
            <View>
                <Text style={stylesWelcome.text}>Welcome to <B>yourbank!</B></Text>
                <View style={stylesWelcome.viewButton}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={stylesWelcome.buttonRegister}>
                        <Text style={stylesWelcome.textButtonRegister}>Register</Text>
                    </TouchableOpacity>
                    <Button navigation={navigation} navigateTo='Login'>Login</Button>
                </View>
            </View>

        </View>
    )
}

export default Welcome
