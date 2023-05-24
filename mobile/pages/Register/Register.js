import { View } from "react-native"
import estilos from './RegisterStyle.js'
import CampoInput from "../../components/campoInput/campoInput.js"
import TopoInicio from "../../components/topoInicio/topoInicio.js"
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
    const [isEditableDay, setIsEditableDay] = useState(true)
    const [isEditableMonth, setIsEditableMonth] = useState(true)
    const [isEditableYear, setIsEditableYear] = useState(true)
    const [isEditableSSN, setIsEditableSSN] = useState(true)

    useEffect(() => {
        setBirth(`${year}-${month}-${day}`)
    }, [year, month, day])

    return (
        <View style={estilos.screen}>
            <TopoInicio >Register</TopoInicio>
            <View style={estilos.space} />
            <CampoInput onChange={(e) => setName(e.target.value)}>Name</CampoInput>
            <CampoInput onChange={(e) => setNickname(e.target.value)}>Nickname</CampoInput>
            <View style={estilos.date}>
                <TextInput
                    placeholder='Day'
                    style={estilos.inputDay}
                    editable={isEditableDay}
                    onChange={(e) => {
                        if (day.length === 1) {
                            setDay(e.target.value)
                            setIsEditableDay(false)

                        } else {
                            setDay(e.target.value)
                        }
                    }
                    }
                />
                <TextInput
                    placeholder='Month'
                    style={estilos.inputMonth}
                    editable={isEditableMonth}
                    onChange={(e) => {
                        if (month.length === 1) {
                            setMonth(e.target.value)
                            setIsEditableMonth(false)

                        } else {
                            setMonth(e.target.value)
                        }
                    }
                    }
                />
                <TextInput
                    placeholder='Year'
                    style={estilos.inputYear}
                    editable={isEditableYear}
                    onChange={(e) => {
                        if (year.length === 3) {
                            setYear(e.target.value)
                            setIsEditableYear(false)

                        } else {
                            setYear(e.target.value)
                        }
                    }
                    }
                />
            </View>
            <TextInput
                placeholder='SSN'
                style={estilos.inputSSN}
                editable={isEditableSSN}
                onChange={(e) => {
                    if (ssn.length === 10) {
                        setSSN(e.target.value)
                        setIsEditableSSN(false)

                    } else {
                        setSSN(e.target.value)
                    }
                }
                }
            />
            <Button onPress={() => navigation.navigate('Register2', { name: name, nickname: nickname, birth: birth, ssn: ssn })}>Next</Button>
        </View>
    )
}

export default Register
