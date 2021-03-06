import React, { useEffect, useState } from "react"
import {
    View,
    FlatList,
    Text
} from 'react-native'
import Header from "./Header"
import { restaurants as data } from "../constants/restaurants"
import RestarauntCard from "./RestarauntCard"
import { useActiveGroups, useTrending } from "../utils/api"
import { categories } from "../constants/categories"
import { baseURL } from "../utils/globalVar"



const Restaraunts = ({ displayToast, navigation }) => {
    const [filter, setFilter] = useState('American')
    // const [restaurants, setRestaraunts] = useState([])
    // const [resultsError, setResultsError] = useState(null)
    // const [offset, setOffset] = useState(0)

    // const getKey = (pageIndex, previousPageData) => {
    //     if (previousPageData && !previousPageData.length) return null
    //     return `${baseURL}/restaurant/search/trending/${categories.find(category => category.name === filter).categorySet}  /users?page=${pageIndex}&limit=10`                    // SWR key
    // }
    const { data: data2, isError, isLoading, fetchMore } = useTrending({ categorySet: categories.find(category => category.name === filter).categorySet, lat: 40.486165191337804, lon: -74.47346067573329, radius: 16093.4, limit: 100, offset: 0 })
    const { data: groupsData, isError: groupsError, isLoading: groupsLoading } = useActiveGroups()

    if (isError) return <Text>{error.message}</Text>
    if (isLoading) return <Header selected={filter} setSelected={setFilter} />
    if (!data2) return <Text>error</Text>


    if (groupsError) return <Text>{error.info}</Text>
    if (groupsLoading) return <Text>loading...</Text>
    if (!groupsData.groups) return <Text>error</Text>

    // useEffect(() => {
    //     if (!shouldFetch) {
    //         return;
    //     }

    //     const fetch = async () => {
    //         const newResults = await fetchResults({});

    //         setShouldFetch(false)
    //         setRestaraunts(oldResults => [...oldResults, ...newResults])

    //         setOffset(offset + 20)
    //     }

    //     fetch()
    // }, [page, shouldFetch])

    // const fetchResults = async (params) => {
    //     const results = await axios.post(`${baseURL}/restaurant/search/trending/${params.categorySet}`, params, { 'Authorization': `token ${await getValue('token')}` }).then(res => {
    //         if (res.data.message) {
    //             error = res.data.message
    //             return null
    //         } else if (res.data.success) {
    //             return res.data.results
    //         }
    //     }).catch(e) 

    //     if (!Array.isArray(results)) {
    //         return []
    //     }

    //     return results
    // }

    const renderItem = ({ item }) => (
        <RestarauntCard groupsData={groupsData} navigation={navigation} displayToast={displayToast} screen="home" type={filter} data={item} />
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