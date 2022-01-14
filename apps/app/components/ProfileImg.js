import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import { globalColors } from "../utils/styles";

const ProfileImg = ({ marginLeft, width, height, style, user, userStyle }) => {
    return (
        <>
            <View style={[customStyle.circle, style]}>
                <Text style={[customStyle.text, userStyle]}>{user.name.substring(0, 1)}</Text>
            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    circle: {
        justifyContent: 'center',
        backgroundColor: globalColors.turquoise,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.20,
        shadowRadius: 7.49,
        elevation: 12,
    },
    text: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center'
    }
})
export default ProfileImg