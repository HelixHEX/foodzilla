import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Button,
    Keyboard
} from 'react-native'
import { useUser } from '../utils/api'
import { baseURL, displayToast, fetcher } from '../utils/globalVar'
import { globalColors } from '../utils/styles'

const AddNewOption = ({ session, mutate }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [optionText, setOptionText] = useState('')

    const { data: userData, isError, isLoading } = useUser()

    if (isError) return <Text>{isError.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!userData) return <Text>error</Text>

    const user = userData.user

    const addOption = async () => {
        if (optionText.length > 0) {
            let toast = {
                title: '',
                type: '',
                message: ''
            }
            try {
                let res = await fetcher(`${baseURL}/vote/add-option`, { sessionId: session.id, vote: optionText })
                console.log(res)
                if (res.success) {
                    toast = {
                        title: 'Success',
                        type: 'success',
                        message: 'You have added an option'
                    }
                } else if (res.message) {
                    toast = {
                        title: 'Error',
                        type: 'error',
                        message: res.message
                    }
                } else {
                    toast = {
                        title: 'Error',
                        type: 'error',
                        message: 'An error has occurred'
                    }
                }
            } catch (e) {
                toast = {
                    title: 'Error',
                    type: 'error',
                    message: 'An error has occurred'
                }
            }
            displayToast({ toast })
            if (toast.type === 'success') {
                mutate()
            }
            setOptionText('')
            Keyboard.dismiss()
        }
    }

    return (
        <>
            {(session.add_options || session.createdBy === user.id) && !session.ended
                ? <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput value={optionText} onChangeText={text => setOptionText(text)} style={customStyle.input} placeholder='option' />
                    <TouchableOpacity onPress={() => addOption()} style={customStyle.btn} >
                        <Text style={customStyle.btnText}>Add Option</Text>
                    </TouchableOpacity>
                </View>
                : null
            }

        </>
    )
}

const customStyle = StyleSheet.create({
    btn: {
        alignSelf: 'flex-end',
        backgroundColor: globalColors.hotpink,
        width: 100,
        height: 40,
        marginTop: 30,
        marginLeft: 20,
        borderRadius: 5,
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'center'
    },
    input: {
        alignSelf: 'flex-end',
        height: 50,
        fontSize: 18,
        width: '60%',
        borderBottomWidth: StyleSheet.hairlineWidth
    }
})

export default AddNewOption