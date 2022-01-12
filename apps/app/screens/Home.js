import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native'
import RestarauntCard from '../components/RestarauntCard'
import Restaraunts from '../components/Restaraunts'
import Search from '../components/Search'
import { useSearch, useUser } from '../utils/api'
import { baseURL, getValue, logout } from '../utils/globalVar'
import { globalColors, styles } from '../utils/styles'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
const Home = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    //trending
    const [results, setResults] = useState([])
    const [offset, setOffset] = useState(1)
    const [shouldFetch, setShouldFetch] = useState(true)
    const fetchMore = useCallback(() => setShouldFetch(true), [])

    const { data: user, error, isLoading } = useUser()

    if (error) return <Text>{error.info}</Text>
    if (isLoading) return <Text>loading...</Text>
    if (!user) return <Text>error</Text>


    const handleSearch = async () => {
        if (search.length > 0) {
            setIsSearching(true)
            await axios.post(baseURL + `/restaraunt/search/${search}`, { query: search, categorySet: 7315, lat: 40.486165191337804, lon: -74.47346067573329, radius: 16093.4, limit: 10, offset: 0 }, { headers: { 'Authorization': `token ${await getValue('token')}` } }).then(res => {
                if (res.data.success) {
                    setResults(res.data.results)
                    // console.log(res.data.results)
                }
                if (res.data.message) {
                    console.log(res.data.message)
                }
            })
        }
    }

    // if (searchError) return <Text>{searchError.info}</Text>
    // if (searchIsLoading) return <Text>loading...</Text>
    // if (!searchData) return <Text>search error</Text>

    const handleLogout = () => {
        logout()
        navigation.navigate('Login')
    }
    const displayToast = ({ toast }) => {
        Toast.show({
            type: toast.type,
            text1: toast.title,
            text2: toast.message
        });
    }

    const renderItem = ({ item }) => (
        <RestarauntCard displayToast={displayToast} type={'Restaraunt'} data={item} />
    );
    return (
        <>
            <View style={{ zIndex: 1 }}>
                <Toast />
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>
                        Discover
                    </Text>
                    {/* <TouchableOpacity style={styles.center} onPress={handleLogout}>
                        <Text>
                            Logout
                        </Text>
                    </TouchableOpacity> */}
                </View>
                <Search handleSearch={handleSearch} search={search} setSearch={setSearch} />
                {isSearching ? <TouchableOpacity onPress={() => { setIsSearching(false); setSearch('') }}>
                    <Text style={customStyle.viewMoreText}>Clear</Text>
                </TouchableOpacity>
                    : null}
                {!isSearching ? <Restaraunts displayToast={displayToast} /> : null}
                {isSearching ? <FlatList
                    style={{ marginTop: 20 }}
                    data={results}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => 'key' + index}
                /> : null}
            </View>
        </>
    )
}

const customStyle = StyleSheet.create({
    viewMoreText: {
        fontSize: 15,
        textDecorationLine: 'underline',
        color: globalColors.pink
    },
})

export default Home