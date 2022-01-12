import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native'
import { globalColors, styles } from "../utils/styles"
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useActiveGroups } from "../utils/api";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
import { baseURL, getValue } from "../utils/globalVar";

const RestarauntCard = ({ navigation, groupId, displayToast, screen, data, type, savedRestaraunt }) => {
    const [modalVisible, setModalVisible] = useState(false)

    // useEffect(() =>{
    //     console.log('ih')
    //     displayToast({toast: {type: 'success', title: 'Sample Title', message: 'Sample message'}})
    // }, [])
    return (
        <>
            <ModalCard navigation={navigation} groupId={groupId} displayToast={displayToast} screen={screen} data={data} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <View style={customStyle.container}>
                <View style={[styles.center, { width: '65%' }]}>
                    <Text numberOfLines={2} style={customStyle.footerName}>{savedRestaraunt ? data.name : data.poi.name}</Text>
                    {savedRestaraunt ? null : <Text style={customStyle.footerType}>{type} ({(data.dist / 1609.32).toFixed(2)}mi)</Text>}
                </View>
                <View style={customStyle.rightFooter}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={[customStyle.footerMenu, styles.center]}>
                        <View style={customStyle.footerMenuDot}></View>
                        <View style={customStyle.footerMenuDot}></View>
                        <View style={customStyle.footerMenuDot}></View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const ModalCard = ({ navigation, groupId, displayToast, screen, modalVisible, setModalVisible, data }) => {
    const [modalHeight, setModalHeight] = useState(screen === 'home' ? 260 : 200)
    const [displayGroups, setDisplayGroups] = useState(false)
    const { data: groupsData, error, isLoading } = useActiveGroups()

    if (error) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!groupsData.groups) return <Text>error</Text>

    const addToGroup = async ({ groupId: groupid }) => {
        let toast = {
            title: '',
            type: '',
            message: ''
        }
        const restarauntInfo = {
            "name": data.poi.name,
            "id": data.id.toString(),
            "lon": data.position.lon,
            "lat": data.position.lat,
            "address": data.address.freeformAddress,
            "categorySet": data.poi.categorySet[0].id,
            "url": data.poi.url,
            "phone": data.poi.phone
        }
        await axios.post(`${baseURL}/restaurant/save-to-group`, { groupId: groupid, restarauntInfo }, { headers: { 'Authorization': `token ${await getValue('token')}` } }).then(res => {
            if (res.data.success) {
                toast = {
                    title: 'Success',
                    type: 'success',
                    message: 'Restaraunt added to group!'
                }
            } else if (res.data.message) {
                toast = {
                    title: 'Error',
                    type: 'error',
                    message: res.data.message
                }
            } else {
                toast = {
                    title: 'Error',
                    type: 'error',
                    message: 'An error has occurred'
                }
            }
        })
        setModalHeight(260)
        setDisplayGroups(false)
        setModalVisible(false)
        displayToast({ toast })
    }

    const addToAccount = async () => {
        let toast = {
            title: '',
            type: '',
            message: ''
        }
        const restarauntInfo = {
            "name": data.poi.name,
            "id": data.id.toString(),
            "lon": data.position.lon,
            "lat": data.position.lat,
            "address": data.address.freeformAddress,
            "categorySet": data.poi.categorySet[0].id,
            "url": data.poi.url,
            "phone": data.poi.phone
        }
        await axios.post(`${baseURL}/restaurant/save-to-account`, { restarauntInfo }, { headers: { 'Authorization': `token ${await getValue('token')}` } }).then(res => {
            if (res.data.success) {
                toast = {
                    title: 'Success',
                    type: 'success',
                    message: 'Restaraunt added to account!'
                }
            } else if (res.data.message) {
                toast = {
                    title: 'Error',
                    type: 'error',
                    message: res.data.message
                }
            } else {
                toast = {
                    title: 'Error',
                    type: 'error',
                    message: 'An error has occurred'
                }
            }
        })
        setModalHeight(260)
        setDisplayGroups(false)
        setModalVisible(false)
        displayToast({ toast })
    }
    const removeFromGroup = async () => {
        let toast = {
            title: '',
            type: '',
            message: ''
        }
        await axios.post(`${baseURL}/restaurant/unsave-from-group`, { groupId, restarauntId: data.id.toString() }, { headers: { 'Authorization': `token ${await getValue('token')}` } }).then(res => {
            if (res.data.success) {
                toast = {
                    title: 'Success',
                    type: 'success',
                    message: 'Restaraunt added to account!'
                }
            } else if (res.data.message) {
                toast = {
                    title: 'Error',
                    type: 'error',
                    message: res.data.message
                }
            } else {
                toast = {
                    title: 'Error',
                    type: 'error',
                    message: 'An error has occurred'
                }
            }
        })
        setModalHeight(260)
        setDisplayGroups(false)
        setModalVisible(false)
        displayToast({ toast })
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => addToGroup({ groupId: item.id, restaurant: data })} style={customStyle.group}>
            <Text numberOfLines={1} style={customStyle.groupText}>{item.name}</Text>
        </TouchableOpacity>
    )
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
                                {displayGroups ? <TouchableOpacity onPress={() => { setModalHeight(260); setDisplayGroups(false) }}><Ionicons name="chevron-back" size={35} color="black" /></TouchableOpacity> : null}
                                <Text numberOfLines={1} style={customStyle.modalTitle}>{screen === "home" ? displayGroups ? "Select group" : data.poi.name : data.name}</Text>
                            </View>
                            <Pressable
                                style={[customStyle.modalBtn, customStyle.modalBtnClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Feather name="x" size={35} color="black" />
                            </Pressable>
                        </View>
                        {screen === 'home' && !displayGroups ?
                            <View>
                                <TouchableOpacity onPress={() => { setDisplayGroups(true); setModalHeight('70%') }} style={customStyle.option}>
                                    <Feather name="users" size={35} color={globalColors.hotpink} />
                                    <Text style={customStyle.optionText}>Add to group</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => addToAccount()} style={customStyle.option}>
                                    <Feather name="bookmark" size={35} color={globalColors.turquoise} />
                                    <Text style={customStyle.optionText}>Save to account</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {navigation.navigate('RestarauntDetailed'); setModalVisible(false)}} style={customStyle.option}>
                                    <Feather name="list" size={35} color={globalColors.lightgreen} />
                                    <Text style={customStyle.optionText}>View more details</Text>
                                </TouchableOpacity>
                            </View>
                            : null}
                        {screen === 'group' && !displayGroups ?
                            <View>
                                <TouchableOpacity onPress={() => removeFromGroup()} style={customStyle.option}>
                                    <Feather name="x" size={35} color={globalColors.red} />
                                    <Text style={customStyle.optionText}>Remove from group</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {navigation.navigate('RestarauntDetailed'); setModalVisible(false)}} style={customStyle.option}>
                                    <Feather name="list" size={35} color={globalColors.lightgreen} />
                                    <Text style={customStyle.optionText}>View more details</Text>
                                </TouchableOpacity>
                            </View>
                            : null
                        }
                        {screen === 'home' && displayGroups ?
                            <View style={{ marginTop: 10 }}>
                                <FlatList
                                    data={groupsData.groups}
                                    // data={[...Array(200)]}
                                    renderItem={renderItem}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => 'key' + index}
                                />
                            </View>
                            : null}
                    </View>
                </View>
            </Modal>
        </>
    )
}

const customStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 30,
        flex: 1,
        backgroundColor: globalColors.pink,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: globalColors.pink,
        paddingLeft: 20,
        paddingRight: 20,
    },
    rightFooter: {
        flexDirection: 'row'
    },
    footerName: {
        color: 'white',
        fontSize: 23,
        width: '100%'
    },
    footerType: {
        color: 'white',
        fontSize: 18
    },
    footerMenu: {
        width: 50,
        height: 50,
        backgroundColor: globalColors.pink,
        borderColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    footerMenuDot: {
        backgroundColor: 'white',
        width: 5,
        height: 5,
        borderRadius: 50,
        alignSelf: 'center'
    },
    likedWrapper: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: 10
    },
    likedHeart: {
        color: globalColors.hotpink,
        alignSelf: 'center'
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

    modalBtn: {

    },
    modalBtnClose: {
        alignSelf: 'flex-end',
    },
    option: {
        flexDirection: 'row',
        marginTop: 30
    },
    optionText: {
        alignSelf: 'center',
        color: 'black',
        marginLeft: 10,
        fontSize: 20
    },
    group: {
        height: 50,
        marginTop: 20
    },
    groupText: {
        fontSize: 20,
        color: 'black'
    }
})

export default RestarauntCard