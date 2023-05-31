import { View } from "react-native"
import TopPages from "../../components/TopTransaction/TopTransaction"
import imageExtract from '../../assets/extract.png'
import styleFieldsExtract from "./FieldExtractStyle"

const FieldExtract = () => {
    return (
        <View style={styleFieldsExtract.screen}>
            <TopPages image={imageExtract} text='Extract' />
        </View>
    )
}

export default FieldExtract
