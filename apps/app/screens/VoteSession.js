import axios from 'axios';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { useUser, useVoteSession } from '../utils/api';
import { baseURL, getValue } from '../utils/globalVar';
import { globalColors, styles, toastConfig } from '../utils/styles';
import { Feather, Ionicons } from '@expo/vector-icons';
import AddNewOption from '../components/AddNewOption';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const VoteSession = ({ route, navigation }) => {
    const { params } = route;
    const { data: voteSession, isError: voteError, isLoading: voteLoading, mutate } = useVoteSession({ id: params.id })
    const { data: user, isError: userError, isLoading: userLoading } = useUser()

    if (voteError) return <Text>{voteError.info}</Text>
    if (voteLoading) return <Text>loading...</Text>
    if (!voteSession.session) return <Text>error session</Text>


    if (userError) return <Text>{userError.info}</Text>
    if (userLoading) return <Text>loading...</Text>
    if (!user.user) return <Text>error</Text>

    const session = voteSession.session

    const placeVote = async vote => {
        if (session.votes.find(oldVote => oldVote.user.id === user.user.id && oldVote.restaraunt_name !== vote)) {
            await axios.post(baseURL + '/vote/place-vote', { sessionId: session.id, vote }, { headers: { 'Authorization': `token ${await getValue('token')}` } }).then(res => {
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
            <View style={{ zIndex: 1 }}>
                <Toast position='top' config={toastConfig} />
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 5 }}>
                        <Ionicons name="chevron-back" size={45} color="black" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.title}>{session.name}</Text>
                </View>
                <Text style={customStyle.title}>Current Results</Text>
                <Text style={[customStyle.status, { color: session.ended ? globalColors.red : globalColors.darkgreen }]}>{session.ended ? 'Closed' : 'Open'}</Text>
                <AddNewOption mutate={mutate} session={session} />
                <ScrollView style={{marginTop: 50}}>
                    {session.restaurants.map((restaurant, index) => {
                        let count = 0
                        session.votes.length > 0 ? session.votes.forEach(vote => vote.restaraunt_name === restaurant ? count += 1 : null) : 0
                        const percent = session.votes.length > 0 ? (count / session.votes.length) * 100 : 0
                        const voted = session.votes.find(vote => vote.user.id === user.user.id)
                        return (
                            <View key={index}>
                                {session.ended
                                    ? <View style={customStyle.option}>
                                        <Text numberOfLines={2} style={customStyle.name}>{restaurant}</Text>
                                        <View style={customStyle.progressWrapper}>
                                            <View style={[customStyle.progressInner, { backgroundColor: session.votes.find(vote => vote.user.id === user.user.id && restaurant === vote.restaraunt_name) ? '#48BB78' : globalColors.pink, width: percent <= 10 ? 30 : (percent * 250) / 100 }]} >
                                                <View style={[customStyle.selected, { display: session.winner === restaurant ? 'flex' : 'none' }]}>
                                                    <Feather name="check" size={20} color={voted ? globalColors.turquoise : globalColors.pink} />
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={customStyle.percent}>{percent}%</Text>
                                    </View>
                                    : <TouchableOpacity onPress={() => placeVote(restaurant)} style={customStyle.option}>
                                        <Text numberOfLines={2} style={customStyle.name}>{restaurant}</Text>
                                        <View style={customStyle.progressWrapper}>
                                            <View style={[customStyle.progressInner, { backgroundColor: session.votes.find(vote => vote.user.id === user.user.id && restaurant === vote.restaraunt_name) ? '#48BB78' : globalColors.pink, width: percent <= 10 ? 30 : (percent * 250) / 100 }]} >
                                                <View style={[customStyle.selected, { display: session.winner === restaurant ? 'flex' : 'none' }]}>
                                                    <Feather name="check" size={20} color={voted ? globalColors.turquoise : globalColors.pink} />
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={customStyle.percent}>{percent}%</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        )
                    })}

                </ScrollView>

            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: 'center',
    },
    status: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 50,
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
        backgroundColor: globalColors.hotpink,
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