import React from 'react'

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import VoteSession from '../components/VoteSession'
import { useUser, useVoteSessions } from '../utils/api'
import { globalColors, styles, toastConfig } from '../utils/styles'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Feather } from '@expo/vector-icons'

const Vote = ({ navigation }) => {
    const { data: voteSessions, isError, isLoading, mutate } = useVoteSessions({ groupId: 'ckxe7vzev0051m20gxivtbvhy' })
    const { data: userData, isError: userError, isLoading: userLoading } = useUser()

    if (isError) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!voteSessions.sessions) return <Text>error</Text>


    if (userError) return <Text>{error.info}</Text>
    if (userLoading) return <Text>loading...</Text>
    if (!userData.user) return <Text>error</Text>

    const active = voteSessions.sessions.filter(session => session.ended === false)
    const past = voteSessions.sessions.filter(session => session.ended === true && session.users.find(user => user.id === user.id))
    const user = userData.user
    return (
        <>
            <View style={{ zIndex: 1 }}>
                <Toast position='top' config={toastConfig} />
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Voting Sessions</Text>
                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 10 }}>
                        <Feather size={35} name='plus' />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ marginTop: 20 }}>
                    {active.length > 0
                        ? <>
                            <Text style={customStyle.label}>Active Voting Sessions</Text>
                            {active.map((session, index) => (
                                <View key={index}>
                                    <VoteSession mutate={mutate} user={user} nav={navigation} data={session} />
                                    <View style={customStyle.line} />
                                </View>
                            ))}
                        </>
                        : null
                    }
                    {past.length > 0
                        ? <>
                            <Text style={[customStyle.label, { marginTop: active.length > 0 ? 50 : 0 }]}>Past Voting Sessions</Text>
                            {past.map((session, index) => (
                                <View key={index}>
                                    <VoteSession mutate={mutate} user={user} nav={navigation} data={session} />
                                    <View style={customStyle.line} />
                                </View>
                            ))}
                        </>
                        : null
                    }
                </ScrollView>
            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    label: {
        color: globalColors.lightgray,
        fontSize: 20,
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: globalColors.lightgray
    }
})

export default Vote