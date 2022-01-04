import { StyleSheet } from "react-native"

export const globalColors = {
    'gray': '#1f1f1f',
    'pink': '#f75483',
    'lightgray': '#8395a7',
    'blue': '#324b6a',
    'turquoise': '#3dc3cc',
    'hotpink': '#FE105E',
}

export const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
        height: '100%'
    },
    title: {
        color: globalColors.gray,
        fontSize: 50,
        fontWeight: '200',
    },
    center: {
        alignSelf: 'center'
    }
})

