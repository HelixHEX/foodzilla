import React from 'react'
import {
    Text,
    StyleSheet,
} from 'react-native'
import Filter from './Filter'

const Header = ({selected, setSelected}) => {
    return (
        <>
            <Filter selected={selected} setSelected={setSelected} />
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