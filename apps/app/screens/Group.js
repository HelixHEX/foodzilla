import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SectionList
} from 'react-native'
import ProfileImg from "../components/ProfileImg";
import VoteSession from "../components/VoteSession";
import { useGroup } from "../utils/api";
import { globalColors, styles } from "../utils/styles";

const Group = ({ route, navigation }) => {
    const [filter, setFilter] = useState('sessions')
    const { params } = route;

    const { data, error, isLoading } = useGroup({ id: params.id })

    if (error) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!data.group) return <Text>error</Text>

    const group = data.group
    const sections = [
        {
            title: 'Active Voting Sessions',
            data: group.voteSessions.filter(session => session.ended === false)
        },
        {
            title: 'Past Voting Sessions',
            data: group.voteSessions.filter(session => session.ended === true)
        }
    ]
    const renderMemberItem = ({ item }) => (
        <ProfileImg style={{ marginRight: 30, width: 100, height: 100 }} />
    );

    const renderSessionItem = ({ item }) => (
        <>
            <VoteSession group={group} nav={navigation} data={item} />
            <View style={customStyle.line} />
        </>
    )

    return (
        <>
            <View style={styles.container}>
                {/* <Text style={styles.title}>{group.name}</Text>
                <Text style={customStyle.subtitle}>Members</Text>
                <View style={{ marginTop: 30, height: 150 }}>
                    <FlatList
                        horizontal
                        data={[...Array(25)]}
                        renderItem={renderMemberItem}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => 'key' + index}
                    />
                </View>
                <View style={customStyle.filters}>
                    <TouchableOpacity onPress={() => setFilter('saved')} style={customStyle.option}>
                        <Text style={[customStyle.optionText, { color: filter === 'saved' ? globalColors.hotpink : globalColors.lightgray }]}>Saved Restaraunts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilter('sessions')} style={customStyle.option}>
                        <Text style={[customStyle.optionText, { color: filter === 'sessions' ? globalColors.hotpink : globalColors.lightgray }]}>Voting Sessions</Text>
                    </TouchableOpacity>
                </View> */}
                <View>

                </View>
                <View style={{ display: filter === 'saved' ? 'flex' : 'none' }}>
                    <SectionList
                        ListHeaderComponent={<Header filter={filter} renderMemberItem={renderMemberItem} group={group} setFilter={setFilter} />}
                        sections={sections}
                        keyExtractor={(item, index) => 'key' + index}
                        renderItem={renderSessionItem}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={customStyle.label}>{title}</Text>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                    {/* <ScrollView style={{ marginBottom: 50 }}>
                        <Text style={customStyle.label}>Active Voting Sessions</Text>
                        {group.voteSessions.filter(session => session.ended === false).map((session, index) => (
                            <View key={index}>
                                <VoteSession group={group} nav={navigation} data={session} />
                                <View style={customStyle.line} />
                            </View>
                        ))}
                        <Text style={[customStyle.label, { marginTop: 50 }]}>Past Voting Sessions</Text>
                        {group.voteSessions.filter(session => session.ended === true).map((session, index) => (
                            <View key={index}>
                                <VoteSession group={group} nav={navigation} data={session} />
                                <View style={customStyle.line} />
                            </View>
                        ))}
                    </ScrollView> */}
                </View>
                <View style={{ display: filter === 'sessions' ? 'flex' : 'none' }}>
                    <SectionList
                        ListHeaderComponent={<Header filter={filter} renderMemberItem={renderMemberItem} group={group} setFilter={setFilter} />}
                        sections={sections}
                        keyExtractor={(item, index) => 'key' + index}
                        renderItem={renderSessionItem}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={customStyle.label}>{title}</Text>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                    {/* <ScrollView style={{ marginBottom: 50 }}>
                        <Text style={customStyle.label}>Active Voting Sessions</Text>
                        {group.voteSessions.filter(session => session.ended === false).map((session, index) => (
                            <View key={index}>
                                <VoteSession group={group} nav={navigation} data={session} />
                                <View style={customStyle.line} />
                            </View>
                        ))}
                        <Text style={[customStyle.label, { marginTop: 50 }]}>Past Voting Sessions</Text>
                        {group.voteSessions.filter(session => session.ended === true).map((session, index) => (
                            <View key={index}>
                                <VoteSession group={group} nav={navigation} data={session} />
                                <View style={customStyle.line} />
                            </View>
                        ))}
                    </ScrollView> */}
                </View>
            </View>
        </>
    )
}

const Header = ({ setFilter, group, renderMemberItem, filter }) => {
    return (
        <>
            <Text style={styles.title}>{group.name}</Text>
            <Text style={customStyle.subtitle}>Members</Text>
            <View style={{ marginTop: 30, height: 150 }}>
                <FlatList
                    horizontal
                    data={[...Array(25)]}
                    renderItem={renderMemberItem}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => 'key' + index}
                />
            </View>
            <View style={customStyle.filters}>
                <TouchableOpacity onPress={() => setFilter('saved')} style={customStyle.option}>
                    <Text style={[customStyle.optionText, { color: filter === 'saved' ? globalColors.hotpink : globalColors.lightgray }]}>Saved Restaraunts</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('sessions')} style={customStyle.option}>
                    <Text style={[customStyle.optionText, { color: filter === 'sessions' ? globalColors.hotpink : globalColors.lightgray }]}>Voting Sessions</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    subtitle: {
        fontSize: 20
    },
    filters: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 50,
        alignSelf: 'center'
    },

    optionText: {
        fontSize: 20
    },
    label: {
        color: globalColors.lightgray,
        fontSize: 25,
        marginTop: 50,
    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: globalColors.lightgray
    }
})

export default Group