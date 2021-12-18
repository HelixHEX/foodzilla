import React from 'react'

import {
    Text,
    View,
    StyleSheet,
    StatusBar
} from 'react-native'

import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Signup = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Text>Signup page</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
})

export default Signup
