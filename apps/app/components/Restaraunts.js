import React, { useEffect, useState } from "react"
import {
    View,
    FlatList,
    Text
} from 'react-native'
import Header from "./Header"
import { restaraunts as data } from "../constants/restaraunts"
import RestarauntCard from "./RestarauntCard"
import { useTrending } from "../utils/api"
import { categories } from "../constants/categories"

const Restaraunts = () => {
    const [filter, setFilter] = useState('American')
    const [restaraunts, setRestaraunts] = useState(data)
    const { data: data2, error, isLoading } = useTrending({ categorySet: categories.find(category => category.name === filter).categorySet, lat: 40.486165191337804, lon: -74.47346067573329, radius: 16093.4 })

    if (error) return <Text>{error.message}</Text>
    if (isLoading) return <Header selected={filter} setSelected={setFilter} />
    if (!data2) return <Text>error</Text>

    const renderItem = ({ item }) => (
        <RestarauntCard type={filter} data={item} />
    );
    
    return (
        <>
            <FlatList
                ListHeaderComponent={<Header selected={filter} setSelected={setFilter} />}
                data={data2.results}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => 'key' + index}
            />
        </>
    )
}


export default Restaraunts