import { Ionicons } from "@expo/vector-icons";
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
import RestarauntCard from "../components/RestarauntCard";
import VoteSession from "../components/VoteSession";
import { useGroup } from "../utils/api";
import { globalColors, styles, toastConfig } from "../utils/styles";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { displayToast } from "../utils/globalVar";

const Group = ({ route, navigation }) => {
    const [filter, setFilter] = useState('saved')
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

    const renderRestarauntItem = ({ item }) => (
        <RestarauntCard navigation={navigation} groupId={group.id} displayToast={displayToast} screen="group" savedRestaraunt={true} type={item.type} data={item} />
    )


    const Header = () => {
        return (
            <>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 5 }}>
                        <Ionicons name="chevron-back" size={45} color="black" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={[styles.title, styles.center]}>{group.name}</Text>
                </View>
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

    return (
        <>
            <View style={{ zIndex: 1 }}>
                <Toast position='top' config={toastConfig} />
            </View>
            <View style={styles.container}>
                <View style={{ display: filter === 'saved' ? 'flex' : 'none' }}>
                    <FlatList
                        data={group.restaraunts}
                        ListHeaderComponent={<Header />}
                        ListHeaderComponentStyle={{ marginBottom: 50 }}
                        keyExtractor={(_, index) => 'key' + index}
                        renderItem={renderRestarauntItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={{ display: filter === 'sessions' ? 'flex' : 'none' }}>
                    <SectionList
                        ListHeaderComponent={<Header />}
                        sections={sections}
                        keyExtractor={(_, index) => 'key' + index}
                        renderItem={renderSessionItem}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={customStyle.label}>{title}</Text>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
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