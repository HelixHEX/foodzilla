import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { globalColors } from "../utils/styles";
import ProfileImg from "./ProfileImg";

const GroupCard = ({ data, nav }) => {
    return (
        <>
            <TouchableOpacity onPress={() => nav.navigate('Group', {id: data.id})} style={customStyle.container}>
                <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                    {data.users.map((user, index) => (
                        <ProfileImg user={user} key={index} style={{marginLeft: -15, width: 50, height: 50}} />
                    ))}
                </View>
                <View>
                    <Text style={customStyle.name}>{data.name}</Text>
                    <Text style={customStyle.subtitle}>Members: {data.users.length}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const customStyle = StyleSheet.create({
    container: {
        backgroundColor: globalColors.blue,
        width: '100%',
        height: 180,
        borderRadius: 10,
        paddingTop: 20,
        paddingLeft: 15,
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    
    name: {
        color: 'white',
        fontSize: 30
    },
    subtitle: {
        color: 'white',
        fontSize: 20
    }
})

export default GroupCard