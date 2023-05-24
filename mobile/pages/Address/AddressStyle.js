import { StyleSheet } from 'react-native'

const stylesAddress = StyleSheet.create({
    screen: {
        flex: 1,
        display: 'flex',
        paddingTop: 50,
        padding: 20,
        alignItems: "center",
    },
    input: {
        marginTop: 50,
        width: '100%',
        height: 75,
        shadowColor: "#000",
        outlineWidth: 0,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 10,
        color: 'rgba(0, 0, 0, 0.25)',
        marginBottom: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: 600,
    },
    image: {
        width: 330,
        height: 180
    },
    cardView:{
        width: '100%',
        height: 230,
        backgroundColor: '#d3d3d3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: "#000",
        outlineWidth: 0,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 10,
        color: 'rgba(0, 0, 0, 0.25)',
    },
})

export default stylesAddress