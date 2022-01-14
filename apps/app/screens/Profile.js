import React, { Profiler } from 'react'

import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { useUser } from '../utils/api'
import { styles } from '../utils/styles'

const Profile = () => {
    const { data: userData, isError, isLoading } = useUser()

    if (isError) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!userData) return <Text>error</Text>
    const user = userData.user
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>

                <View style={customStyle.info}>
                    <Text style={customStyle.name}>{user.name}</Text>
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
        fontSize: 20
    }
})

export default Profile