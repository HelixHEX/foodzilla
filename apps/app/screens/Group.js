import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SectionList,
    Modal,
    Platform
} from 'react-native'
import ProfileImg from "../components/ProfileImg";
import RestarauntCard from "../components/RestarauntCard";
import VoteSession from "../components/VoteSession";
import { leaveGroup, useGroup, useUser } from "../utils/api";
import { globalColors, styles, toastConfig } from "../utils/styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { baseURL, displayToast, fetcher } from "../utils/globalVar";
import axios from "axios";
import { mutate } from "swr";
import AddMember from "../components/AddMember";

const Group = ({ route, navigation }) => {
    const [filter, setFilter] = useState('saved')
    const { params } = route;

    const { data: groupData, isError: groupError, isLoading: groupLoading, mutate } = useGroup({ id: params.id })
    const { data: userData, isError: userError, isLoading: userLoading } = useUser()

    if (groupError) return <Text>{error.info}</Text>
    if (groupLoading) return <Text>loading...</Text>
    if (!groupData.group) return <Text>error</Text>

    if (userError) return <Text>{error.info}</Text>
    if (userLoading) return <Text>loading...</Text>
    if (!userData.user) return <Text>error</Text>

    const group = groupData.group
    const user = userData.user

    const creator = group.creatorId === user.id

    const sections = [
        {
            title: 'Active Voting Sessions',
            data: group.voteSessions.filter(session => session.ended === false)
        },
        {
            title: 'Past Voting Sessions',
            data: group.voteSessions.filter(session => session.ended === true)
        }
    ]
    const renderMemberItem = ({ item }) => (
        <ProfileImg userStyle={{ fontSize: 20, fontWeight: '200' }} user={item} style={{ marginRight: 30, width: 60, height: 60 }} />
    );

    const renderSessionItem = ({ item }) => (
        <>
            <VoteSession mutate={mutate} user={user} group={group} nav={navigation} data={item} />
        </>
    )

    const renderRestarauntItem = ({ item }) => (
        <RestarauntCard mutate={mutate} navigation={navigation} groupId={group.id} displayToast={displayToast} screen="group" savedRestaraunt={true} type={item.type} data={item} />
    )

    const Menu = () => {
        const [modalVisible, setModalVisible] = useState(false)

        return (
            <>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ alignSelf: 'center' }}>
                    <Ionicons name="ellipsis-horizontal-sharp" size={25} color="black" />
                </TouchableOpacity>
                <MenuModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </>
        )
    }



    const MenuModal = ({ modalVisible, setModalVisible }) => {
        let creator = group.creatorId === user.id;
        const [modalHeight, setModalHeight] = useState(200)

        // const leaveGroup = async () => {
        //     let toast = {
        //         title: '',
        //         type: '',
        //         message: ''
        //     }
        //     try {
        //         let res = await fetcher(`${baseURL}/group/leave-group`, { groupId: group.id })
        //         console.log(res)
        //         if (res.success) {
        //             toast = {
        //                 title: 'Success',
        //                 type: 'success',
        //                 message: 'You have left the group'
        //             }
        //         } else if (res.message) {
        //             toast = {
        //                 title: 'Error',
        //                 type: 'error',
        //                 message: res.message
        //             }
        //         } else {
        //             toast = {
        //                 title: 'Error',
        //                 type: 'error',
        //                 message: 'An error has occurred'
        //             }
        //         }
        //     } catch (e) {
        //         toast = {
        //             title: 'Error',
        //             type: 'error',
        //             message: 'An error has occurred'
        //         }
        //     }
        //     setModalHeight(creator ? 200 : 150)
        //     setModalVisible(false)
        //     displayToast({ toast })
        //     if (toast.type === 'success') {
        //         mutate()
        //         navigation.goBack('Groups')
        //     }
        // }


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
                                    <Feather name="x" size={25} color="black" />
                                </TouchableOpacity>

                            </View>
                            {creator
                                ? <View>
                                    <TouchableOpacity onPress={() => removeFromGroup()} style={customStyle.modalOption}>
                                        <Feather style={{ alignSelf: 'center' }} name="plus" size={20} color={globalColors.lightgreen} />
                                        <Text style={customStyle.modalOptionText}>Add members</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => removeFromGroup()} style={customStyle.modalOption}>
                                        <Feather style={{ alignSelf: 'center' }} name="trash-2" size={20} color={globalColors.red} />
                                        <Text style={customStyle.modalOptionText}>Delete group</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View>
                                    <TouchableOpacity onPress={() => leaveGroup({ group, mutate, setModalHeight, setModalVisible, navigation, creator })} style={customStyle.modalOption}>
                                        <Feather style={{ alignSelf: 'center' }} name="x" size={20} color={globalColors.red} />
                                        <Text style={customStyle.modalOptionText}>Leave group</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                </Modal>
            </>
        )
    }

    const Header = () => {
        return (
            <>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.goBack()} >
                        <Ionicons name="chevron-back" size={25} color="black" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={[styles.title, styles.center]}>{group.name}</Text>
                    <Menu />
                </View>
                <Text style={customStyle.subtitle}>Members</Text>
                <View style={{ width: '100%' }}>
                    <AddMember mutate={mutate} creator={creator} groupId={group.id} />
                </View>
                <View style={{ marginTop: 30, height: 80 }}>
                    <FlatList
                        horizontal
                        data={group.users}
                        renderItem={renderMemberItem}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => 'key' + index}
                    />
                </View>
                <View style={customStyle.filters}>
                    <TouchableOpacity onPress={() => setFilter('saved')} style={customStyle.option}>
                        <Text style={[customStyle.optionText, { color: filter === 'saved' ? globalColors.hotpink : globalColors.lightgray }]}>Saved Restaraunts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilter('sessions')} style={customStyle.option}>
                        <Text style={[customStyle.optionText, { color: filter === 'sessions' ? globalColors.hotpink : globalColors.lightgray }]}>Voting Sessions</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    return (
        <>
            <View style={{ zIndex: 1 }}>
                <Toast position='top' config={toastConfig} />
            </View>
            <View style={styles.container}>
                <View style={{ display: filter === 'saved' ? 'flex' : 'none' }}>
                    <FlatList
                        data={group.restaurants.reverse()}
                        ListHeaderComponent={<Header />}
                        ListHeaderComponentStyle={{ marginBottom: 50 }}
                        keyExtractor={(_, index) => 'key' + index}
                        renderItem={renderRestarauntItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={{ display: filter === 'sessions' ? 'flex' : 'none' }}>
                    <SectionList
                        ListHeaderComponent={<Header />}
                        sections={sections}
                        keyExtractor={(_, index) => 'key' + index}
                        renderItem={renderSessionItem}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={customStyle.label}>{title}</Text>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </>
    )
}


const customStyle = StyleSheet.create({
    subtitle: {
        fontSize: 20,
        marginTop: 20,
    },
    filters: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 10,
        alignSelf: 'center'
    },

    optionText: {
        fontSize: Platform.OS === 'android' ? 20 : 15
    },
    label: {
        color: globalColors.lightgray,
        fontSize: 20,
        marginTop: 50,
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: globalColors.lightgray
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

export default Group