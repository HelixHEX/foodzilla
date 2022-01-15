import React, { useEffect } from 'react'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { baseURL, displayToast, fetcher } from '../utils/globalVar'
import { globalColors } from '../utils/styles'

const VoteSession = ({ user, data, nav, mutate }) => {
    const joinSession = async () => {
        let toast = {
            title: '',
            type: '',
            message: ''
        }
        try {
            let res = await fetcher(`${baseURL}/vote/join-voting-session`, { sessionId: data.id })
            if (res.success) {
                toast = {
                    title: 'Success',
                    type: 'success',
                    message: 'You have joined the session'
                }
            } else if (res.message) {
                toast = {
                    title: 'Error',
                    type: 'error',
                    message: res.message
                }
            } else {
                toast = {
                    title: 'Error',
                    type: 'error',
                    message: 'An error has occurred'
                }
            }
        } catch (e) {
            toast = {
                title: 'Error',
                type: 'error',
                message: 'An error has occurred'
            }
        }
        displayToast({ toast })
        if (toast.type === 'success') {
            mutate()
        }
    }

    const creator = data.createdBy === user.id
    
    return (
        <>
            {data.users.find(sessionUser => sessionUser.id === user.id)
                ? <>
                    <TouchableOpacity onPress={() => nav.navigate('VoteSession', { id: data.id })} style={styles.container}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.title}>{data.name}</Text>
                            <Text style={styles.subtitle}>Group: {data.group.name}</Text>
                            <Text style={styles.subtitle}>Users: {data.users.length}</Text>
                        </View>
                        <Text style={[styles.date, { color: data.ended ? globalColors.red : globalColors.darkgreen }]}>{data.ends ? FormatDate(data.endsAt) : data.ended ? "Closed" : creator ? 'Creator' : 'Joined'}</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                </>
                : <>
                    <View style={styles.container}>
                        {/* <Text>{data.}</Text> */}
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.title}>{data.name}</Text>
                            <Text style={styles.subtitle}>Group: {data.group.name}</Text>
                            <Text style={styles.subtitle}>Users: {data.users.length}</Text>
                        
                        </View>
                        {!data.ended
                            ? <TouchableOpacity onPress={() => joinSession()} style={styles.btn}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 20 }}>Join</Text>
                            </TouchableOpacity>
                            : <Text style={[styles.date, { color: data.ended ? globalColors.red : globalColors.darkgreen }]}>{data.ends ? FormatDate(data.endsAt) : "Closed"}</Text>
                        }
                    </View>
                    <View style={styles.line} />
                </>
            }
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
        height: 100,
        // marginTop: 20,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        // alignSelf: 'center',
        // backgroundColor: 'red'

    },
    title: {
        fontSize: 18,
    },
    subtitle: {
        fontSize: 12,
    },
    date: {
        alignSelf: 'center',
        color: globalColors.hotpink,
        fontSize: 12
    },
    btn: {
        alignSelf: 'center',
        backgroundColor: globalColors.hotpink,
        width: 70,
        height: 35,
        borderRadius: 5,
        justifyContent: 'center'
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: globalColors.lightgray
    },
})

export default VoteSession