import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import { globalColors } from "../utils/styles";

const ProfileImg = ({marginLeft, width, height, style}) => {
    return (
        <>
            <TouchableOpacity style={[customStyle.circle, style]} />
        </>
    )
}

const customStyle = StyleSheet.create({
    circle: {
        backgroundColor: globalColors.turquoise,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
})
export default ProfileImg