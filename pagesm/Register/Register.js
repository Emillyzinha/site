import { View } from "react-native"
import estilos from './RegisterStyle.js'
import InputField from "../../components/InputField/InputField.js"
import TopStart from "../../components/TopStart/TopStart.js"
import Button from "../../components/Button/Button.js"
import { useEffect, useState } from "react"
import moment from "moment/moment.js"
import { TextInput } from "react-native"

function Register({ navigation }) {
    const [name, setName] = useState('Emilly Santos')
    const [nickname, setNickname] = useState('Emy')
    const [day, setDay] = useState('08')
    const [month, setMonth] = useState('01')
    const [year, setYear] = useState('2005')
    const [ssn, setSSN] = useState('12345678910')
    const [birth, setBirth] = useState('')

    useEffect(() => {
        setBirth(`${year}-${month}-${day}`)
    }, [year, month, day])

    return (
        <View style={estilos.screen}>
            <TopStart >Register</TopStart>
            <View style={estilos.space} />
            <InputField onChange={(e) => setName(e.target.value)}>Name</InputField>
            <InputField onChange={(e) => setNickname(e.target.value)}>Nickname</InputField>
            <View style={estilos.date}>
                <TextInput
                    placeholder='Day'
                    style={estilos.inputDay}
                    maxLength={2}
                    onChange={(e) => setDay(e.target.value)}
                // editable={isEditableDay}
                // onChange={(e) => {
                //     if (day.length === 1) {
                //         setDay(e.target.value)
                //         setIsEditableDay(false)

                //     } else {
                //         setDay(e.target.value)
                //     }
                // }
                // }
                />
                <TextInput
                    placeholder='Month'
                    style={estilos.inputMonth}
                    maxLength={2}
                    onChange={(e) => setMonth(e.target.value)}
                />
                <TextInput
                    placeholder='Year'
                    style={estilos.inputYear}
                    maxLength={4}
                    onChange={(e) => setYear(e.target.value)}
                />
            </View>
            <TextInput
                placeholder='SSN'
                style={estilos.inputSSN}
                maxLength={11}
                onChange={(e) => setSSN(e.target.value)}
            />
            <Button onPress={() => navigation.navigate('Register2', { name: name, nickname: nickname, birth: birth, ssn: ssn })}>Next</Button>
        </View>
    )
}

export default Register
