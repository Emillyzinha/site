import { Text, TextInput, View } from "react-native"
import styleFieldWithTitle from "./FieldWithTitleStyle"

const FieldWithTitle = ({children}) => {
    return (
        <View>
            <Text style={styleFieldWithTitle.textTitle}>
                {children}
            </Text>
            <TextInput
                style={styleFieldWithTitle.input}
            />
        </View>
    )
}

export default FieldWithTitle
