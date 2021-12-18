import { StyleSheet } from "react-native"

export const globalColors = {
    'gray': '#1f1f1f',
    'pink': '#f75483',
    'lightgray': '#8395a7'
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '8%'
    },
    title: {
        color: globalColors.gray,
        fontSize: 25,
        fontWeight: '200',
        marginTop: '5%',
        marginLeft: '5%'
    }
})

