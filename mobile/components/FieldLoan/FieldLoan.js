import { Text, View } from "react-native"
import styleFieldLoan from "./FieldLoanStyle"
import { TouchableOpacity } from "react-native"

const FieldLoan = ({ navigation, text, image, textTitle }) => {
    return (
        <TouchableOpacity style={styleFieldLoan.input} onPress={() => navigation.navigate('ConfirmT', {image: image, text: textTitle})}>
            <Text style={styleFieldLoan.text}> {text} </Text>
        </TouchableOpacity>
    )
}

export default FieldLoan
