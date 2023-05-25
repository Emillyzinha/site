import { Image, Text, TouchableOpacity, View } from "react-native"
import styleEditing from "./editingStyle"
import user from '../../assets/fotoUser.png'
import FieldWithTitle from "../../components/FieldWithTitle/FieldWithTitle"

function Editing({ navigation }) {
    return (
        <View style={styleEditing.screen}>
            <View style={styleEditing.top}>
                <Image source={user} style={styleEditing.image} />
                <Text style={styleEditing.textTop}>Editing</Text>
            </View>

            <FieldWithTitle>Cell phone</FieldWithTitle>
            <FieldWithTitle>E-mail</FieldWithTitle>
            <FieldWithTitle>Password</FieldWithTitle>
            <FieldWithTitle>Confirm the password</FieldWithTitle>

            <TouchableOpacity style={styleEditing.button} onPress={() => navigation.navigate('Information')}>
                <Text style={styleEditing.textButton}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Editing