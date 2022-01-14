import { Feather } from '@expo/vector-icons'
import React from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import GroupsList from '../components/GroupsList'
import { styles, toastConfig } from '../utils/styles'
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Groups = ({ navigation }) => {
    // const handleNewGroup = async () => {

    // }
    return (
        <>
            <View style={{ zIndex: 1 }}>
                <Toast position='top' config={toastConfig} />
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Groups</Text>
                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 10 }}>
                        <Feather size={35} name='plus' />
                    </TouchableOpacity>
                </View>
                <GroupsList nav={navigation} />
            </View>
        </>
    )
}

export default Groups