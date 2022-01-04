import React, { useEffect, useState } from "react"
import {
    View,
    FlatList
} from 'react-native'
import Header from "./Header"
import { restaraunts as data } from "../constants/restaraunts"
import RestarauntCard from "./RestarauntCard"

const Restaraunts = () => {
    const [filter, setFilter] = useState('American')
    const [restaraunts, setRestaraunts] = useState(data)
    const renderItem = ({ item }) => (
        <RestarauntCard data={item} />
    );
    useEffect(() => {
        let copy = data 
        copy = copy.filter(restaraunt => restaraunt.type === filter)
        setRestaraunts(copy)
    }, [filter])
    return (
        <>
            <FlatList
                ListHeaderComponent={<Header selected={filter} setSelected={setFilter} />}
                data={restaraunts}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => 'key' + index}
            />
        </>
    )
}


export default Restaraunts