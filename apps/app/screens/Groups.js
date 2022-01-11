import { Feather } from '@expo/vector-icons'
import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import GroupsList from '../components/GroupsList'
import { styles } from '../utils/styles'

const Groups = ({ navigation }) => {
    // const handleNewGroup = async () => {
        
    // }
    return (
        <>
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.title}>Groups</Text>
                    <TouchableOpacity style={{marginTop: 13, marginLeft: 10}}>
                        <Feather size={35} name='plus' />
                    </TouchableOpacity>
                </View>
                <GroupsList nav={navigation} />
            </View>
        </>
    )
}

export default Groups