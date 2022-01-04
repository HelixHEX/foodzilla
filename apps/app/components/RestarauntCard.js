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

const RestarauntCard = ({ data }) => {
    return (
        <>
            <View style={customStyle.container}>
                <Image source={{ uri: data.image }} style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: 20 }} />
                <TouchableOpacity style={customStyle.likedWrapper}>
                    <AntDesign style={customStyle.likedHeart} name={data.liked ? "heart" : "hearto"} size={24} color="black" />
                </TouchableOpacity>
                <View style={customStyle.footer}>
                    <View style={styles.center}>
                        <Text style={customStyle.footerName}>{data.name}</Text>
                        <Text style={customStyle.footerType}>{data.type}</Text>
                    </View>
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
        height: 250,
        borderRadius: 20,
        marginBottom: 30,
        flex: 1,
        backgroundColor: globalColors.turquoise,
        justifyContent: 'flex-end'
    },
    footer: {
        width: '100%',
        height: 100,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: globalColors.pink,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    footerName: {
        color: 'white',
        fontSize: 25
    },
    footerType: {
        color: 'white',
        fontSize: 20
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
        position: 'absolute',
        top: 10,
        left: 10,
        borderRadius: 10,
        justifyContent: 'center'
    },
    likedHeart: {
        color: globalColors.hotpink,
        alignSelf: 'center'
    }
})

export default RestarauntCard