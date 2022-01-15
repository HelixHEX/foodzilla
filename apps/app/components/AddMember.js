import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native'
import { addMember } from '../utils/api'
import { globalColors } from '../utils/styles'

const AddMember = ({ groupId, creator, mutate }) => {
    const [email, setEmail] = useState('')
    return (
        <>
            {creator
                ? <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput value={email} onChangeText={text => setEmail(text)} style={customStyle.input} placeholder='Add member (example@mail.com)' />
                    <TouchableOpacity onPress={() => addMember({ setEmail, groupId, email, mutate })} style={customStyle.btn} >
                        <Text style={customStyle.btnText}>Add Option</Text>
                    </TouchableOpacity>
                </View>
                : null
            }
        </>
    )
}

const customStyle = StyleSheet.create({
    input: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '70%',
        height: 40,
    },
    btn: {
        alignSelf: 'flex-end',
        backgroundColor: globalColors.hotpink,
        width: 100,
        height: 40,
        marginLeft: 20,
        borderRadius: 5,
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'center',
    },
})

export default AddMember