import React, { Profiler } from 'react'

import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native'
import { globalColors, styles } from '../utils/styles'

const Search = () => {

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Search
                </Text>
            </View>
        </>
    )
}

const customStyles = StyleSheet.create({

})

export default Search