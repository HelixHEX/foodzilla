import axios from 'axios';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    Switch
} from 'react-native'
import { useUser, useVoteSession } from '../utils/api';
import { baseURL, getValue } from '../utils/globalVar';
import { globalColors, styles, toastConfig } from '../utils/styles';
import { Feather, FontAwesome5, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import AddNewOption from '../components/AddNewOption';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const VoteSession = ({ route, navigation }) => {
    const { params } = route;
    const { data: voteSession, isError: voteError, isLoading: voteLoading, mutate } = useVoteSession({ id: params.id })
    const { data: user, isError: userError, isLoading: userLoading } = useUser()

    if (voteError) return <Text>{voteError.info}</Text>
    if (voteLoading) return <Text>loading...</Text>
    if (!voteSession.session) return <Text>error session</Text>


    if (userError) return <Text>{userError.info}</Text>
    if (userLoading) return <Text>loading...</Text>
    if (!user.user) return <Text>error</Text>

    const session = voteSession.session
    const creator = voteSession.session.createdBy === user.user.id

    const placeVote = async vote => {
        if (session.votes.find(oldVote => oldVote.user.id === user.user.id && oldVote.restaraunt_name !== vote)) {
            await axios.post(baseURL + '/vote/place-vote', { sessionId: session.id, vote }, { headers: { 'Authorization': `token ${await getValue('token')}` } }).then(res => {
                if (res.data.success) {
                    mutate(`${baseURL}/vote/session/${session.id}`)
                }
                if (res.data.message) {
                    console.log(res.data.message)
                }
            })
        }
    }

    const Menu = () => {
        const [modalVisible, setModalVisible] = useState(false)

        return (
            <>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginTop: 15 }}>
                    <Ionicons name="ellipsis-horizontal-sharp" size={30} color="black" />
                </TouchableOpacity>
                <MenuModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </>
        )
    }

    const MenuModal = ({ modalVisible, setModalVisible }) => {
        const [isEnable, setIsEnable] = useState(session.add_options)
        const [modalHeight, setModalHeight] = useState(creator ? 200 : 150)
        return (
            <>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={customStyle.modalCenteredView}>
                        <View style={[customStyle.modalView, { height: modalHeight }]}>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text numberOfLines={1} style={customStyle.modalTitle}>Options</Text>
                                </View>
                                <TouchableOpacity
                                    style={[customStyle.modalBtn, customStyle.modalBtnClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Feather name="x" size={35} color="black" />
                                </TouchableOpacity>

                            </View>
                            {creator
                                ? <View>
                                    <TouchableOpacity style={[customStyle.modalOption, { justifyContent: 'space-between' }]}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <FontAwesome5 name={isEnable ? 'unlock' : 'lock'} size={35} color={isEnable ? globalColors.lightgreen : globalColors.red} />
                                            <Text style={customStyle.modalOptionText}>Allow new options</Text>
                                        </View>
                                        <Switch
                                            trackColor={{ false: "#767577", true: globalColors.lightgreen }}
                                            thumbColor={"white"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => setIsEnable(!isEnable)}
                                            value={isEnable}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={customStyle.modalOption}>
                                        <Feather name="trash-2" size={35} color={globalColors.red} />
                                        <Text style={customStyle.modalOptionText}>Delete session</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View>
                                    <TouchableOpacity style={customStyle.modalOption}>
                                        <SimpleLineIcons name="logout" size={35} color="black" />
                                        <Text style={customStyle.modalOptionText}>Leave session</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                </Modal>
            </>
        )
    }

    return (
        <>
            <View style={{ zIndex: 1 }}>
                <Toast position='top' config={toastConfig} />
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 5 }}>
                        <Ionicons name="chevron-back" size={45} color="black" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={[styles.title]}>{session.name}</Text>
                    <Menu />
                </View>
                <Text style={customStyle.title}>Current Results</Text>
                <Text style={[customStyle.status, { color: session.ended ? globalColors.red : globalColors.darkgreen }]}>{session.ended ? 'Closed' : 'Open'}</Text>
                <AddNewOption mutate={mutate} session={session} />
                <ScrollView style={{ marginTop: 50 }}>
                    {session.restaurants.map((restaurant, index) => {
                        let count = 0
                        session.votes.length > 0 ? session.votes.forEach(vote => vote.restaraunt_name === restaurant ? count += 1 : null) : 0
                        const percent = session.votes.length > 0 ? (count / session.votes.length) * 100 : 0
                        const voted = session.votes.find(vote => vote.user.id === user.user.id)
                        return (
                            <View key={index}>
                                {session.ended
                                    ? <View style={customStyle.option}>
                                        <Text numberOfLines={2} style={customStyle.name}>{restaurant}</Text>
                                        <View style={customStyle.progressWrapper}>
                                            <View style={[customStyle.progressInner, { backgroundColor: session.votes.find(vote => vote.user.id === user.user.id && restaurant === vote.restaraunt_name) ? '#48BB78' : globalColors.pink, width: percent <= 10 ? 30 : (percent * 250) / 100 }]} >
                                                <View style={[customStyle.selected, { display: session.winner === restaurant ? 'flex' : 'none' }]}>
                                                    <Feather name="check" size={20} color={voted ? globalColors.turquoise : globalColors.pink} />
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={customStyle.percent}>{percent}%</Text>
                                    </View>
                                    : <TouchableOpacity onPress={() => placeVote(restaurant)} style={customStyle.option}>
                                        <Text numberOfLines={2} style={customStyle.name}>{restaurant}</Text>
                                        <View style={customStyle.progressWrapper}>
                                            <View style={[customStyle.progressInner, { backgroundColor: session.votes.find(vote => vote.user.id === user.user.id && restaurant === vote.restaraunt_name) ? '#48BB78' : globalColors.pink, width: percent <= 10 ? 30 : (percent * 250) / 100 }]} >
                                                <View style={[customStyle.selected, { display: session.winner === restaurant ? 'flex' : 'none' }]}>
                                                    <Feather name="check" size={20} color={voted ? globalColors.turquoise : globalColors.pink} />
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={customStyle.percent}>{percent}%</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        )
                    })}

                </ScrollView>

            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: 'center',
    },
    status: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 50,
        // width: 100,
    },
    name: {
        width: 80,
        alignSelf: 'center'
    },
    progressWrapper: {
        width: 250,
        height: 30,
        borderWidth: 1,
        borderColor: globalColors.lightgray,
        borderRadius: 30
    },
    progressInner: {
        // width: Math.floor(Math.random() * 280) + 1,
        height: 30,
        justifyContent: 'center',
        backgroundColor: globalColors.pink,
        borderRadius: 30,
        position: 'absolute',
        marginTop: -1,
    },
    percent: {
        alignSelf: 'center',
        width: 40,
    },
    btn: {
        alignSelf: 'flex-end',
        backgroundColor: globalColors.hotpink,
        width: 150,
        height: 50,
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center'
    },
    selected: {
        backgroundColor: 'white',
        width: 20,
        height: 20,
        borderRadius: 50,
        marginLeft: 5
    },
    modalCenteredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        // marginTop: 22,

    },
    modalView: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        paddingLeft: 20,
        paddingRight: 20
    },
    modalTitle: {
        fontSize: 25,
        alignSelf: 'center'
    },
    modalBtnClose: {
        alignSelf: 'flex-end',
    },
    modalOption: {
        flexDirection: 'row',
        marginTop: 30
    },
    modalOptionText: {
        alignSelf: 'center',
        color: 'black',
        marginLeft: 10,
        fontSize: 20
    },
})

export default VoteSession