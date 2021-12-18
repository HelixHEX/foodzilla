import React, { useEffect, useState } from 'react'

import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    KeyboardAvoidingView, TouchableWithoutFeedback, Button, Keyboard
} from 'react-native'

import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import KeyboardAvoidingComponent from '../components/KeyboardAvoidingComponent';
import { baseURL, getValue, save } from '../utils/globalVar';
import axios from 'axios'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const getToken = async () => {
            if (await getValue('token')) 
            navigation.navigate(('HomeScreen'))
        }

        getToken()
    })
    const handeLogin = async () => {
        setErrorMessage('')
        if (email.length > 0 && password.length > 0) {
            await axios.post(baseURL + '/auth/login', {
                email,
                password
            }).then(async res => {
                if (res.data.success) {
                    navigation.navigate(('HomeScreen'))
                    await save('token', res.data.token)
                    setErrorMessage('')
                    setEmail('')
                    setPassword('')
                } else if (res.data.message) {
                    setErrorMessage(res.data.message)
                } else {
                    setErrorMessage('An error has occurred')
                }
            })
        }
    }
    return (
        <>
            {Platform.OS === 'ios' ? <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
                : <StatusBar barStyle="light-content" backgroundColor="#000"></StatusBar>}
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingComponent>
                        {/* <Image style={styles.img} source={require('../assets/images/loginbg.jpg')} /> */}
                        <Text style={styles.mainTitle}>Hello Again!</Text>
                        <View style={styles.wrapper}>
                            <View style={styles.mainContent}>
                                <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.input} placeholder='Email' fontSize={20} />
                                <TextInput value={password} onChangeText={text => setPassword(text)} style={styles.input} placeholder='Password' fontSize={20} />
                            </View>
                            <Text style={styles.error}>{errorMessage}</Text>
                            <TouchableOpacity onPress={handeLogin} style={styles.login}>
                                <Text style={styles.title}>Login</Text>
                                <View style={styles.loginCircle} />
                            </TouchableOpacity>
                            <View style={styles.footer}>
                                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.link}>
                                    <Text style={styles.linkText}>Register</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.link}>
                                    <Text style={styles.linkText}>Forgot Password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingComponent>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainTitle: {
        color: 'white',
        position: 'absolute',
        top: '25 %',
        fontWeight: '700',
        fontSize: 50,
        width: 200,
        left: '8%'
    },
    wrapper: {
        marginLeft: '8%',
        marginRight: '8%',
        height: '100%',
        justifyContent: 'center'
    },
    mainContent: {
        flexDirection: 'column'
    },
    input: {
        borderBottomColor: "#f2f2f2",
        borderBottomWidth: 2,
        // marginTop: '4%',
        marginBottom: '4%',
        color: 'black',
        height: 40,
    },
    img: {
        height: '60%',
        width: '100%'
    },
    link: {
    },
    linkText: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: 'black'
    },
    login: {
        alignSelf: 'flex-end',
        flexDirection: 'row'
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        color: 'black',
        zIndex: 1,
        alignSelf: 'center'
    },
    loginCircle: {
        backgroundColor: '#fae38d',
        width: 90,
        height: 90,
        borderRadius: 100,
        marginLeft: -60,
        zIndex: 0
    },
    footer: {
        marginTop: '10%',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    // inner: {
    //     // padding: 24,
    //     // flex: 1,
    //     justifyContent: "space-around"
    // },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    error: {
        color: 'red',
        textAlign: 'center'
    }
})

export default Login
