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
import ModalCard from "./RestarauntModal";

const RestarauntCard = ({ groupsData, mutate, navigation, groupId, displayToast, screen, data, type, savedRestaraunt }) => {
    const [modalVisible, setModalVisible] = useState(false)

    // useEffect(() =>{
    //     console.log('ih')
    //     displayToast({toast: {type: 'success', title: 'Sample Title', message: 'Sample message'}})
    // }, [])
    return (
        <>
            <ModalCard groupsData={groupsData} mutate={mutate} navigation={navigation} groupId={groupId} displayToast={displayToast} screen={screen} data={data} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <View style={customStyle.container}>
                <View style={[styles.center, { width: '80%' }]}>
                    <Text numberOfLines={1} style={customStyle.footerName}>{savedRestaraunt ? data.name : data.poi.name}</Text>
                    {savedRestaraunt ? null : <Text style={customStyle.footerType}>{type} ({(data.dist / 1609.32).toFixed(2)}mi)</Text>}
                </View>
                <View style={customStyle.rightFooter}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={[customStyle.footerMenu, styles.center]}>
                        {/* <View style={customStyle.footerMenuDot}></View>
                        <View style={customStyle.footerMenuDot}></View>
                        <View style={customStyle.footerMenuDot}></View> */}
                        <Ionicons style={{alignSelf: 'center'}} name="ellipsis-horizontal-sharp" size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
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
        fontSize: 20,
        width: '100%',
        // backgroundColor: 'red'
    },
    footerType: {
        color: 'white',
        fontSize: 13
    },
    footerMenu: {
        // width: 50,
        // height: 40,
        // backgroundColor: globalColors.pink,
        // borderColor: 'white',
        // borderRadius: 5,
        // borderWidth: 2,
        // justifyContent: 'space-evenly',
        // flexDirection: 'row',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 6,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 7.49,
        // elevation: 12,
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