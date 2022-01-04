import axios from 'axios';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { mutate } from 'swr';
import { restaraunts } from '../constants/restaraunts';
import { useUser, useVoteSession } from '../utils/api';
import { baseURL, getValue } from '../utils/globalVar';
import { globalColors, styles } from '../utils/styles';
import { Feather } from '@expo/vector-icons';

const VoteSession = ({ route }) => {
    const { params } = route;
    const { data: voteSession, error: voteError, isLoading: voteLoading } = useVoteSession({ id: params.id })
    const { data: user, error: userError, isLoading: userLoading } = useUser()

    if (voteError) return <Text>{voteError.info}</Text>
    if (voteLoading) return <Text>loading...</Text>
    if (!voteSession.session) return <Text>error</Text>


    if (userError) return <Text>{userError.info}</Text>
    if (userLoading) return <Text>loading...</Text>
    if (!user.user) return <Text>error</Text>

    const session = voteSession.session

    const placeVote = async vote => {
        if (session.votes.findIndex(vote => vote.user.id === user.user.id) < 0) {
            await axios.post(baseURL + '/vote/new-vote', { sessionId: session.id, vote }, { headers: { 'Authorization': `token ${await getValue('token')}` } }).then(res => {
                if (res.data.success) {
                    mutate(`${baseURL}/vote/session/${session.id}`)
                }
                if (res.data.message) {
                    console.log(res.data.message)
                }
            })
        }
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{session.name}</Text>
                <Text style={customStyle.title}>Current Results</Text>
                <ScrollView>
                    {session.restaurants.map((restaraunt, index) => {
                        let count = 0
                        session.votes.length > 0 ? session.votes.forEach(vote => vote.restaraunt_name === restaraunt ? count += 1 : null) : 0
                        const percent = session.votes.length > 0 ? (count / session.votes.length) * 100 : 0
                        const voted = session.votes.find(vote => vote.user.id === user.user.id)
                        return (
                            <TouchableOpacity onPress={() => placeVote(restaraunt)} key={index} style={customStyle.option}>
                                <Text numberOfLines={1} style={customStyle.name}>{restaraunt}</Text>
                                <View style={customStyle.progressWrapper}>
                                    <View style={[customStyle.progressInner, { backgroundColor: session.votes.find(vote => vote.user.id === user.user.id && restaraunt === vote.restaraunt_name) ? globalColors.turquoise : globalColors.pink, width: percent <= 10 ? 30 : (percent * 250) / 100 }]} >
                                        <View style={[customStyle.selected, { display: session.votes.find(vote => vote.user.id === user.user.id && restaraunt === vote.restaraunt_name) ? 'flex' : 'none' }]}>
                                            <Feather name="check" size={20} color={voted ? globalColors.turquoise : globalColors.pink} />
                                        </View>
                                    </View>
                                </View>
                                <Text style={customStyle.percent}>{percent}%</Text>
                            </TouchableOpacity>
                        )
                    })}
                    <TouchableOpacity style={[customStyle.btn, { display: session.add_options && !session.ended ? 'flex' : 'none' }]} >
                        <Text style={customStyle.btnText}>Add New Option</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 20
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 50,
        // width: 100,
    },
    name: {
        width: 80,
        alignSelf: 'center'
    },
    progressWrapper: {
        width: 250,
        height: 30,
        borderWidth: 1,
        borderColor: globalColors.lightgray,
        borderRadius: 30
    },
    progressInner: {
        // width: Math.floor(Math.random() * 280) + 1,
        height: 30,
        justifyContent: 'center',
        backgroundColor: globalColors.pink,
        borderRadius: 30,
        position: 'absolute',
        marginTop: -1,
    },
    percent: {
        alignSelf: 'center',
        width: 40,
    },
    btn: {
        alignSelf: 'flex-end',
        backgroundColor: globalColors.blue,
        width: 150,
        height: 50,
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center'
    },
    selected: {
        backgroundColor: 'white',
        width: 20,
        height: 20,
        borderRadius: 50,
        marginLeft: 5
    }
})

export default VoteSession