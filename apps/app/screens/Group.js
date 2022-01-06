import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import ProfileImg from "../components/ProfileImg";
import { useGroup } from "../utils/api";
import { globalColors, styles } from "../utils/styles";

const Group = ({ route }) => {
    const [filter, setFilter] = useState('saved')
    const { params } = route;

    const { data, error, isLoading } = useGroup({ id: params.id })

    if (error) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!data.group) return <Text>error</Text>

    const group = data.group

    const renderItem = ({ item }) => (
        <ProfileImg style={{ marginRight: 30, width: 100, height: 100 }} />
    );
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{group.name}</Text>
                <Text style={customStyle.subtitle}>Members</Text>
                <View style={{marginTop: 30, height: 150}}>
                    <FlatList
                        horizontal
                        data={[...Array(25)]}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => 'key' + index}
                    />
                </View>
                <View style={customStyle.filters}>
                <TouchableOpacity onPress={() => setFilter('saved')} style={customStyle.option}>
                <Text style={[customStyle.optionText, {color: filter === 'saved' ? globalColors.hotpink : globalColors.lightgray}]}>Saved Restaraunts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilter('sessions')} style={customStyle.option}>
                        <Text style={[customStyle.optionText, {color: filter === 'sessions' ? globalColors.hotpink : globalColors.lightgray}]}>Voting Sessions</Text>
                    </TouchableOpacity>
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
    }
})

export default Group