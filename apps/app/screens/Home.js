import React, { useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import Restaraunts from '../components/Restaraunts'
import Search from '../components/Search'
import { useUser } from '../utils/api'
import { logout } from '../utils/globalVar'
import { styles } from '../utils/styles'

const Home = ({ navigation }) => {
    const { data: user, error, isLoading } = useUser()

    if (error) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!user.user) return <Text>error</Text>

    const handleLogout = () => {
        logout()
        navigation.navigate('Login')
    }
    return (
        <>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>
                        Discover
                    </Text>
                    <TouchableOpacity style={styles.center} onPress={handleLogout}>
                        <Text>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                <Search />
                <Restaraunts />
            </View>
        </>
    )
}

export default Home