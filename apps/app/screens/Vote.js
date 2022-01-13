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

const Vote = ({ navigation }) => {
    const { data: voteSessions, isError, isLoading } = useVoteSessions({ groupId: 'ckxe7vzev0051m20gxivtbvhy' })

    if (isError) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!voteSessions.sessions) return <Text>error</Text>

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Voting Sessions</Text>
                <ScrollView style={{ marginBottom: 50 }}>
                    <Text style={customStyle.label}>Active Voting Sessions</Text>
                    {voteSessions.sessions.filter(session => session.ended === false).map((session, index) => (
                        <View key={index}>
                            <VoteSession nav={navigation} data={session} />
                            <View style={customStyle.line} />
                        </View>
                    ))}
                    <Text style={[customStyle.label, {marginTop: 50}]}>Past Voting Sessions</Text>
                    {voteSessions.sessions.filter(session => session.ended === true).map((session, index) => (
                        <View key={index}>
                            <VoteSession nav={navigation} data={session} />
                            <View style={customStyle.line} />
                        </View>
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
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: globalColors.lightgray
    }
})

export default Vote