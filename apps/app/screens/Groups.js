import React from 'react'
import {
    View,
    Text
} from 'react-native'
import GroupsList from '../components/GroupsList'
import { styles } from '../utils/styles'

const Groups = ({navigation}) => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Groups</Text>
                <GroupsList nav={navigation} />
            </View>
        </>
    )
}

export default Groups