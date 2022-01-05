import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { globalColors } from '../utils/styles'

const VoteSession = ({ data, nav }) => {
    return (
        <>
            <TouchableOpacity onPress={() => nav.navigate('VoteSession', {id: data.id})} style={styles.container}>
                {/* <Text>{data.}</Text> */}
                <View>
                    <Text style={styles.title}>{data.name}</Text>
                    <Text style={styles.subtitle}>Group: {data.group.name}</Text>
                    <Text style={styles.subtitle}>Users: {data.users.length}</Text>
                </View>
                <Text style={[styles.date, {color: data.ended ? globalColors.red : globalColors.darkgreen}]}>{data.ends ? FormatDate(data.endsAt) : data.ended ? "Closed" : "Open"}</Text>
            </TouchableOpacity>
        </>
    )
}

const FormatDate = string => {
    let firstSplit = string.split("T")
    firstSplit = firstSplit[0]
    return `${firstSplit.split("-")[1]}/${firstSplit.split("-")[2]}/${firstSplit.split("-")[0]}`
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        marginTop: 20,
        // backgroundColor: 'red',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignSelf: 'center',
       
    },
    title: {
        fontSize: 20
    },
    subtitle: {
        fontSize: 15
    },
    date: {
        alignSelf: 'center',
        color: globalColors.hotpink
    }
})

export default VoteSession