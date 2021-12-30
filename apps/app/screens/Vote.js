import React from 'react'

import {
    View,
    Text
} from 'react-native'
import VoteSession from '../components/VoteSession'
import { useVoteSessions } from '../utils/api'
import { styles } from '../utils/styles'

const Vote = () => {
    const { data: voteSessions, error, isLoading } = useVoteSessions({ groupId: 'ckxe7vzev0051m20gxivtbvhy' })

    if (error) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!voteSessions.sessions) return <Text>error</Text>
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Voting Sessions</Text>
                <View style={{ marginTop: 50 }}>
                    {voteSessions.sessions.map((session, index) => (
                        <View key={index}>
                            <VoteSession data={session} />
                        </View>
                    ))}
                </View>
            </View>
        </>
    )
}

export default Vote