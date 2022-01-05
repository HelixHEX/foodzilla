import React, { Profiler } from 'react'

import {
    View,
    Text
} from 'react-native'
import { styles } from '../utils/styles'

const Profile = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>
            </View>
        </>
    )
}

export default Profile