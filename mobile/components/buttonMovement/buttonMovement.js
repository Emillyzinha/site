import { Text, View } from "react-native"
import StyleBoxMovement from './buttonMovementStyle.js'
import { TouchableOpacity } from "react-native-web"

const ButtonMovement = ({ children, onPress }) => {
    return (
        <TouchableOpacity style={StyleBoxMovement.box} onPress={onPress}>
            <Text style={StyleBoxMovement.textBox}>{children}</Text>
        </TouchableOpacity>

    )
}

export default ButtonMovement
