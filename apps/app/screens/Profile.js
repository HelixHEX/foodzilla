import React, { Profiler } from 'react'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { useUser } from '../utils/api'
import { logout } from '../utils/globalVar'
import { globalColors, styles } from '../utils/styles'

const Profile = ({navigation}) => {
    const { data: userData, isError, isLoading } = useUser()

    if (isError) return <Text>{isError.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!userData) return <Text>error</Text>
    const user = userData.user

    const handleLogout = () => {
        logout()
        navigation.navigate('Login')
    }
    return (
        <>
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.title}>Profile</Text>
                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 10 }} onPress={handleLogout}>
                        <Text>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={customStyle.info}>
                    <Text style={customStyle.name}>{user.name}</Text>
                    <Text style={customStyle.email}>{user.email}</Text>
                </View>
            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    info: {
        marginTop: 20
    },
    name: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'black'
    },
    email: {
        alignSelf: 'center',
        fontSize: 20,
        color: globalColors.lightgray
    }
})

export default Profile