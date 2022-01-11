import React, { useEffect } from "react"
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { globalColors, styles } from "../utils/styles"
import { AntDesign } from '@expo/vector-icons';

const RestarauntCard = ({ data, type }) => {
    return (
        <>
            <View style={customStyle.container}>
                {/* <Image source={{ uri: data.image }} style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: 20 }} /> */}
                <View style={[styles.center, { width: '65%' }]}>
                    <Text numberOfLines={2} style={customStyle.footerName}>{data.poi.name}</Text>
                    <Text style={customStyle.footerType}>{type} ({(data.dist / 1609.32).toFixed(2)}mi)</Text>
                </View>
                <View style={customStyle.rightFooter}>
                    {/* <TouchableOpacity style={customStyle.likedWrapper}>
                        <AntDesign style={customStyle.likedHeart} name={data.liked ? "heart" : "hearto"} size={24} color="black" />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={[customStyle.footerMenu, styles.center]}>
                        <View style={customStyle.footerMenuDot}></View>
                        <View style={customStyle.footerMenuDot}></View>
                        <View style={customStyle.footerMenuDot}></View>
                    </TouchableOpacity>
                </View>
            </View>
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
    
})

export default RestarauntCard