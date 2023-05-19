import { View } from "react-native";
import CampoInput from "../../components/campoInput/campoInput";
import estilos from "./RegisterStyle";
import TopoInicio from "../../components/topoInicio/topoInicio";
import Button from "../../components/Button/Button";

function RegisterSec({ navigation }) {
    return (
        <View style={estilos.screen}>
            <TopoInicio>Register</TopoInicio>
            <View style={estilos.space} />
            <CampoInput>Email</CampoInput>
            <CampoInput>Password</CampoInput>
            <CampoInput>Confirm the password</CampoInput>
            <Button navigation={navigation} navigateTo={'Desbloquear'}> Register </Button>
        </View>
    )
}

export default RegisterSec