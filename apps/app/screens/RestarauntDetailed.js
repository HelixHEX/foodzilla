import { Ionicons } from "@expo/vector-icons"
import React from "react"
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { styles } from "../utils/styles"

const RestarauntDetailed = ({navigation}) => {
    return (
        <>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Ionicons name="chevron-back" size={45} color="black" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.title}>Restaraunt Detailed</Text>
                </View>
            </View>
        </>
    )
}

export default RestarauntDetailed