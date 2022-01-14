import React, { useState } from "react"
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { styles } from "../utils/styles"
import { Ionicons } from "@expo/vector-icons"
import ModalCard from "../components/RestarauntModal"
import { useActiveGroups } from "../utils/api"

const RestarauntDetailed = ({ navigation }) => {
    const { data: groupsData, isError: groupsError, isLoading: groupsLoading, mutate } = useActiveGroups()
   
    if (groupsError) return <Text>{error.info}</Text>
    if (groupsLoading) return <Text>loading...</Text>
    if (!groupsData.groups) return <Text>error</Text>

    const Menu = () => {
        const [modalVisible, setModalVisible] = useState(false)

        return (
            <>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ alignSelf: 'center' }}>
                    <Ionicons name="ellipsis-horizontal-sharp" size={25} color="black" />
                </TouchableOpacity>
                <ModalCard groupsData={groupsData} navigation={navigation} screen={'Detailed'} data={data} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </>
        )
    }
    return (
        <>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.goBack()} >
                        <Ionicons name="chevron-back" size={25} color="black" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.title}>Restaraunt Detailed</Text>
                    <Menu />
                </View>
            </View>
        </>
    )
}

export default RestarauntDetailed