import React from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity
} from "react-native"
import { globalColors, styles } from '../utils/styles'
import { Feather } from '@expo/vector-icons';

const Search = () => {
    return (
        <>
            <View style={customStyle.bar}>
                <TextInput style={[styles.center, {width: '90%'}]} placeholder='What are you looking?'/>
                <TouchableOpacity style={styles.center}>
                    <Feather name="search" size={24} color={globalColors.lightgray} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    bar: {
        marginBottom: 10,
        borderRadius: 30,
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: globalColors.lightgray,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
    }
})

export default Search