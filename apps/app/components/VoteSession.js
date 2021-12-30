import React from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'

const VoteSession = ({ data }) => {
    return (
        <>
            <View style={styles.container}>
                {/* <Text>{data.}</Text> */}
                <View>
                    <Text style={styles.title}>Group: {data.group.name}</Text>
                    <Text>Users: {data.users.length}</Text>
                </View>
                <Text style={styles.date}>{FormatDate(data.createdAt)}</Text>
            </View>
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
        backgroundColor: 'white',
        width: '90%',
        height: 70,
        padding: 10,
        marginTop: 20,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    title: {
        fontSize: 15
    },
    date: {
        alignSelf: 'center',
    }
})

export default VoteSession