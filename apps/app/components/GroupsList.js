import React from "react";
import {
    View,
    Text,
    FlatList
} from 'react-native'
import { useActiveGroups } from "../utils/api";
import GroupCard from "./GroupCard";

const GroupsList = ({nav}) => {
    const { data: groups, error, isLoading } = useActiveGroups()

    if (error) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!groups.groups) return <Text>error</Text>

    const renderItem = ({ item }) => (
        <GroupCard data={item} nav={nav} />
    );
    return (
        <>
            <View>
                <FlatList
                    data={groups.groups}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => 'key' + index}
                />
            </View>
        </>
    )
}

export default GroupsList