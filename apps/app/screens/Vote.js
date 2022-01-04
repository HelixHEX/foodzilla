import React from 'react'

import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native'
import VoteSession from '../components/VoteSession'
import { useVoteSessions } from '../utils/api'
import { globalColors, styles } from '../utils/styles'

const Vote = () => {
    const { data: voteSessions, error, isLoading } = useVoteSessions({ groupId: 'ckxe7vzev0051m20gxivtbvhy' })

    if (error) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!voteSessions.sessions) return <Text>error</Text>


    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Voting Sessions</Text>
                <ScrollView style={{ marginTop: 50, marginBottom: 50 }}>
                    <Text style={customStyle.label}>Active Voting Sessions</Text>
                    {voteSessions.sessions.filter(session => session.ended === false).map((session, index) => (
                        <>
                            <View key={index}>
                                <VoteSession data={session} />
                            </View>
                            <View style={customStyle.line} />
                        </>

                    ))}
                    <Text style={customStyle.label}>Past Voting Sessions</Text>
                    {voteSessions.sessions.filter(session => session.ended === true).map((session, index) => (
                        <>
                            <View key={index}>
                                <VoteSession data={session} />
                            </View>
                            <View style={customStyle.line} />
                        </>
                    ))}
                </ScrollView>
            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    label: {
        color: globalColors.lightgray,
        fontSize: 25,
        marginTop: 20
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: globalColors.lightgray
    }
})

export default Vote