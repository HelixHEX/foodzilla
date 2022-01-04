import React from "react"
import {
    View,
    FlatList
} from 'react-native'
import Header from "./Header"
import { restaraunts } from "../constants/restaraunts"
import RestarauntCard from "./RestarauntCard"

const Restaraunts = () => {
    const renderItem = ({ item }) => (
        <RestarauntCard data={item} />
    );
    return (
        <>
            <FlatList
                ListHeaderComponent={<Header />}
                data={restaraunts}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => 'key' + index}
            />
        </>
    )
}


export default Restaraunts