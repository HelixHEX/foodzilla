import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    TextInput,
    Switch,
} from "react-native"
import { createSession, useActiveGroups } from '../utils/api'
import { globalColors, styles, toastConfig } from '../utils/styles'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import {Picker} from '@react-native-picker/picker';

const NewVoteSession = ({ navigation }) => {
    const [name, setName] = useState('')
    const [add_options, setAddOptions] = useState(true)
    const [groupId, setGroupId] = useState('')

    const { data: groupsData, isError, isLoading } = useActiveGroups()

    if (isError) return <Text>{isError.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!groupsData.groups) return <Text>An error has occurred</Text>
    const groups = groupsData.groups

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
                    <Text numberOfLines={1} style={[styles.title]}>New Session</Text>

                </View>
                <View style={customStyle.form}>
                    <View>
                        <Text style={customStyle.label}>Name:</Text>
                        <TextInput style={customStyle.input} placeholder='Enter name' value={name} onChangeText={text => setName(text)} />
                    </View>
                    <View style={{ marginTop: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[customStyle.label, styles.center]}>Allow users to add their own options</Text>
                        <Switch
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                            // style={{siz}}
                            trackColor={{ false: "#767577", true: globalColors.lightgreen }}
                            thumbColor={"white"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => { setAddOptions(!add_options) }}
                            value={add_options}
                        />
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <Text style={customStyle.label}>Group:</Text>
                        <Picker
                            selectedValue={groupId}
                            style={{ marginTop: -50, height: 100, width: '100%' }}
                            onValueChange={(itemValue, _) => setGroupId(itemValue)}
                        >
                            {groups.map((group, index) => (
                                <Picker.Item key={index} label={group.name} value={group.id} />
                            ))}
                        </Picker>
                        {/* <TextInput style={customStyle.input} placeholder='Enter name' value={name} onChangeText={text => setName(text)} /> */}
                    </View>
                    <TouchableOpacity onPress={() => createSession({ groupId: groups.length == 1 ? groups[0].id : groupId, name, add_options, navigation, setName })} style={customStyle.btn} >
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
        marginTop: 80,
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

export default NewVoteSession