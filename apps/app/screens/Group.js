import React from "react";
import {
    Text,
    View
} from 'react-native'
import { useGroup } from "../utils/api";
import { styles } from "../utils/styles";

const Group = ({route}) => {
    const { params } = route;

    const { data, error, isLoading } = useGroup({ id: params.id })

    if (error) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!data.group) return <Text>error</Text>

    const group = data.group
    return (
        <>
        <View style={styles.container}>
            <Text style={styles.title}>{group.name}</Text>
        </View>
        </>
    )
}

export default Group