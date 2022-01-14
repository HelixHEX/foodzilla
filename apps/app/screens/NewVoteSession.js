import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    TextInput
} from "react-native"
import { styles } from '../utils/styles'

const NewVoteSession = ({ navigation }) => {
    const [name, setName] = useState('')
    const [add_options, setAddOptions] = useState(true)
    const [groupId, setGroupId] = useState('')
    return (
        <>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity style={styles.center} onPress={() => navigation.goBack()} >
                        <Ionicons name="chevron-back" size={25} color="black" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={[styles.title]}>New Session</Text>

                </View>
                <View style={customStyle.form}>
                    <View>
                        <Text style={customStyle.label}>Name:</Text>
                        <TextInput style={customStyle.input} placeholder='Enter name' value={name} onChangText={text => setName(text)} />
                    </View>
                </View>
            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    form: {
        marginTop: 20
    },
    label: {
        fontSize: 18
    },
    input: {
        marginTop: 10,
        height: 50,
        borderBottomWidth: StyleSheet.hairlineWidth
    }
})

export default NewVoteSession