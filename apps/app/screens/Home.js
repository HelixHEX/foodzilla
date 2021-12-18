import React, { useEffect } from 'react'

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { useUser } from '../utils/api'
import { logout } from '../utils/globalVar'
import { styles } from '../utils/styles'
const Home = ({navigation}) => {
    const { data:user, error, isLoading } = useUser()
   
    if (error) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!user.user) return <Text>error</Text>

    const handleLogout = () => {
        logout()
        navigation.navigate('Login')
    }
    return (
        <>
            <View>
                <Text style={styles.title}>
                    Welcome, {user.user.name.split(' ')[0]}
                </Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Home