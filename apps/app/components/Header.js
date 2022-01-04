import React from 'react'
import {
    Text,
    StyleSheet,
} from 'react-native'
import Filter from './Filter'

const Header = () => {
    return (
        <>
            <Filter />
            <Text style={customStyle.subtitle}>Trending</Text>
        </>
    )
}

const customStyle = StyleSheet.create({

    subtitle: {
        fontSize: 30,
        marginTop: 50,
        marginBottom: 30
    }
})
export default Header