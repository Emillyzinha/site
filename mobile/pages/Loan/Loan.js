import { Image, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native"
import styleLoan from "./LoanStyle"
import imageLoan from '../../assets/loan.png'
import FieldLoan from "../../components/FieldLoan/FieldLoan"
import TopPages from "../../components/TopTransaction/TopTransaction"
import styleConfirmTransaction from "../ConfirmTransaction/ConfirmTransactionStyle"
import TopTransaction from "../../components/TopTransaction/TopTransaction"
import CampoInput from "../../components/campoInput/campoInput"
import ButtonArrow from "../../components/buttonArrow/ButtonArrow"
import imagePadlock from '../../assets/padlock.png'

function Loan({ navigation }) {
    return (
        <View style={styleLoan.screen}>
            <TopPages image={imageLoan} text='Loan' />

            <View style={styleLoan.boxAll}>
                <Text style={styleLoan.textTitle}>Installments</Text>
                <FieldLoan text="1x 2020,00" navigation={navigation} image={imageLoan} textTitle='Loan'/>
                <FieldLoan text="2x 1020,00" navigation={navigation} image={imageLoan} textTitle='Loan' />
                <FieldLoan text="3x 686,67" navigation={navigation} image={imageLoan} textTitle='Loan' />
                <FieldLoan text="4x 520,00" navigation={navigation} image={imageLoan} textTitle='Loan' />
                <FieldLoan text="5x 420,00" navigation={navigation} image={imageLoan} textTitle='Loan' />
                <FieldLoan text="6x 353,33" navigation={navigation} image={imageLoan} textTitle='Loan' />
            </View>
        </View>
    )
}

export default Loan
