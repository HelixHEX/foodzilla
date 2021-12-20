import React, { Profiler } from 'react'

import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native'
import { globalColors, styles } from '../utils/styles'

const Orders = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <TextInput keyboardType='default' returnKeyType='search' placeholderTextColor={globalColors.lightgray} placeholder='Search' style={customStyles.searchInput} />
                </View>
            </View>
        </>
    )
}

const customStyles = StyleSheet.create({
    searchInput: {
        backgroundColor: globalColors.gray,
        width: '100%',
        height: 50,
        borderRadius: 10,
        color: 'white',
        paddingLeft: 20
    }
})

export default Orders