import { View } from "react-native"
import estilos from './RegisterStyle.js'
import CampoInput from "../../components/campoInput/campoInput.js"
import TopoInicio from "../../components/topoInicio/topoInicio.js"
import Button from "../../components/Button/Button.js"

function Register({navigation}) {
    return (
        <View style={estilos.screen}>
            <TopoInicio >Register</TopoInicio>
            <View style={estilos.space} />
            <CampoInput>Name</CampoInput>
            <CampoInput>Date of birth</CampoInput>
            <CampoInput>Social security number (SSN)</CampoInput>
            <CampoInput>Cell phone</CampoInput>
            <Button navigation={navigation} navigateTo={'Register2'}>Next</Button>
        </View>
    )
}

export default Register
