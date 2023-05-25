import { Text, View } from "react-native";
import estilos from "./UnlockStyle";
import TopoInicio from "../../components/topoInicio/topoInicio";
import CampoInput from "../../components/campoInput/campoInput";
import Button from "../../components/Button/Button";

function Unlock({navigation}) {
    return (
        <View style={estilos.screen}>
            <TopoInicio/>
            <CampoInput>Password</CampoInput>
            <Button navigation={navigation} navigateTo={'Opcao'} >Enter</Button>
        </View>
    )
}

export default Unlock
