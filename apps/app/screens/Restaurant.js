import React, { useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform,
} from 'react-native'
import { globalColors, styles, toastConfig } from "../utils/styles"
import { Ionicons } from "@expo/vector-icons"
import ModalCard from "../components/RestarauntModal"
import { useActiveGroups, useRestaurant } from "../utils/api"
import { Toast } from "react-native-toast-message/lib/src/Toast"
import { openMap } from "../utils/globalVar"

const Restaurant = ({ route, navigation }) => {
    const { params } = route;

    const { data: groupsData, isError: groupsError, isLoading: groupsLoading } = useActiveGroups()
    const { data: restaurantData, isError: restaurantError, isLoading: restaurantLoading } = useRestaurant({ restaurantId: params.id })

    if (groupsError) return <Text>{restaurantError.info}</Text>
    if (groupsLoading) return <Text>loading...</Text>
    if (!groupsData.groups) return <Text>error</Text>


    if (restaurantError) return <Text>{restaurantError.info}</Text>
    if (restaurantLoading) return <Text>loading...</Text>
    if (!restaurantData) return <Text>error</Text>

    const restaurant = restaurantData.restaurant
    const Menu = () => {
        const [modalVisible, setModalVisible] = useState(false)

        return (
            <>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ alignSelf: 'center' }}>
                    <Ionicons name="ellipsis-horizontal-sharp" size={25} color="white" />
                </TouchableOpacity>
                <ModalCard groupsData={groupsData} navigation={navigation} screen={'restaurant'} data={restaurant} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </>
        )
    }
    return (
        <>
            <View style={{ zIndex: 1 }}>
                <Toast position='top' config={toastConfig} />
            </View>
            <View style={customStyle.imgOverlay}>
                <Image style={customStyle.imgBanner} source={require('../assets/images/restaurant-default.jpg')} />
            </View>
            <View style={{ paddingBottom: '5%', paddingTop: '8%', paddingLeft: '5%', paddingRight: '5%', height: 200, justifyContent: 'space-between' }}>
                <View style={{ zIndex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.goBack()} >
                        <Ionicons name="chevron-back" size={25} color="white" />
                    </TouchableOpacity>
                    <Menu />
                </View>
                <Text numberOfLines={1} style={[styles.title, { marginTop: 20, color: 'white', }]}>{restaurant.poi.name}</Text>
            </View>
            <View style={styles.container}>
                {restaurant.poi.phone
                    ? <View style={customStyle.detail}>
                        <Text style={customStyle.label}>Phone: </Text>
                        <Text style={customStyle.data}>{restaurant.poi.phone}</Text>
                    </View>
                    : null
                }
                {restaurant.poi.website
                    ? <View style={customStyle.detail}>
                        <Text style={customStyle.label}>Website: </Text>
                        <Text style={customStyle.data}>{restaurant.poi.url}</Text>
                    </View>
                    : null
                }
                {restaurant.address.freeformAddress
                    ? <View style={customStyle.detail}>
                        <Text style={customStyle.label}>Address: </Text>
                        <TouchableOpacity onPress={() => openMap(restaurant.address.streetNumber + restaurant.address.streetName, restaurant.address.municipality, restaurant.address.postalCode)} style={{alignSelf: 'center'}}>
                            <Text numberOfLines={2} style={[customStyle.data, {alignSelf: 'flex-start', textDecorationLine: 'underline'}]}>{restaurant.address.freeformAddress}</Text>
                        </TouchableOpacity>
                    </View>
                    : null
                }
            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    imgBanner: {
        opacity: 0.5,
        width: '100%',
        height: 200
    },
    imgOverlay: {
        position: 'absolute',
        width: '100%',
        height: 200,
        top: 0,
        left: 0,
        backgroundColor: 'black',
    },
    detail: {
        flexDirection: 'row',
        marginTop: 20,
        width: '90%'
    },
    label: {
        fontSize: Platform.OS === 'ios' ? 20 : 23,
    },
    data: {
        color: globalColors.pink,
        alignSelf: 'center',
        fontSize: Platform.OS === 'ios' ? 15 : 18,
        width: '80%'
    }
})

export default Restaurant