import { StyleSheet } from "react-native"
import { ErrorToast, SuccessToast } from 'react-native-toast-message'
export const globalColors = {
    'gray': '#1f1f1f',
    'pink': '#f75483',
    'lightgray': '#8395a7',
    'blue': '#324b6a',
    'turquoise': '#3dc3cc',
    'hotpink': '#FE105E',
    'lightgreen': '#48BB78',
    'darkgreen': '#38A169',
    'red': '#C53030'
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '8%',
        height: '100%'
    },
    title: {
        color: globalColors.gray,
        fontSize: 30,
        fontWeight: '200',
        // marginBottom: 20,
    },
    center: {
        alignSelf: 'center'
    }
})

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
        <SuccessToast
            {...props}
            // style={{ height: 75, borderLeftColor: globalColors.lightgreen }}
            text1Style={{
                fontSize: 18,
            }}
            text2Style={{
                fontSize: 12
            }}
        />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
        <ErrorToast
            {...props}
            // style={{ height: 75, borderLeftColor: 'red' }}
            text1Style={{
                fontSize: 18,
            }}
            text2Style={{
                fontSize: 12
            }}
        />
    )
};