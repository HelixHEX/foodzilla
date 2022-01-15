import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { createGroup } from '../utils/api'
import { globalColors, styles, toastConfig } from '../utils/styles'

const NewGroup = ({ navigation }) => {
    const [name, setName] = useState('')
    return (
        <>
            <View style={{ zIndex: 1 }}>
                <Toast position='top' config={toastConfig} />
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity style={styles.center} onPress={() => navigation.goBack()} >
                        <Ionicons name="chevron-back" size={25} color="black" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={[styles.title]}>New Group</Text>
                </View>
                <View style={customStyle.form}>
                    <View>
                        <Text style={customStyle.label}>Name:</Text>
                        <TextInput style={customStyle.input} placeholder='Enter name' value={name} onChangeText={text => setName(text)} />
                    </View>
                    <TouchableOpacity onPress={() => createGroup({ name, setName, navigation })} style={customStyle.btn} >
                        <Text style={customStyle.btnText}>Create</Text>
                    </TouchableOpacity>
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
        height: 30,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    btn: {
        alignSelf: 'flex-end',
        backgroundColor: globalColors.hotpink,
        width: 100,
        height: 40,
        marginTop: 20,
        marginLeft: 20,
        borderRadius: 5,
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center'
    },
})

export default NewGroup