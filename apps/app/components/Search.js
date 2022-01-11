import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity
} from "react-native"
import { globalColors, styles } from '../utils/styles'
import { Feather } from '@expo/vector-icons';

const Search = ({ handleSearch, setSearch, search }) => {
    return (
        <>
            <View style={customStyle.bar}>
                <TextInput value={search} onChangeText={e => setSearch(e)} style={[styles.center, { width: '90%' }]} placeholder='What are you looking?' />
                <TouchableOpacity onPress={() => handleSearch()} style={styles.center}>
                    <Feather name="search" size={24} color={search.length > 0 ? globalColors.pink : globalColors.lightgray} />
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