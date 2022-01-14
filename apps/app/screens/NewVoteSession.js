import React from 'react'
import {
    View
} from "react-native"
import { styles } from '../utils/styles'

const NewVoteSession = ({ navigation }) => {
    return (
        <>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: !session.ended ? 'space-between' : null, width: '100%' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Ionicons name="chevron-back" size={25} color="black" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={[styles.title]}>New Session</Text>
                    {!session.ended ? <Menu /> : null}
                </View>
            </View>
        </>
    )
}

export default NewVoteSession