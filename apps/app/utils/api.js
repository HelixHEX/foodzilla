import axios from "axios"
import useSWR, { useSWRInfinite } from "swr"
import { baseURL, fetcher, getValue } from "./globalVar"
import useSWRNative, { useSWRNativeRevalidate } from '@nandorojo/swr-react-native'
import { displayToast } from "./globalVar"
export const useUser = params => {
    const { data, error, mutate } = useSWRNative([baseURL + `/user`, params], fetcher)

    return {
        data,
        mutate,
        isLoading: !error && !data,
        isError: error
    }
}

export const useVoteSessions = params => {
    const { data, error, mutate } = useSWRNative([baseURL + `/vote/all-voting-sessions`, params], fetcher)

    return {
        data,
        mutate,
        isLoading: !error && !data,
        isError: error
    }
}

export const useActiveGroups = params => {
    const { data, error, mutate } = useSWRNative([baseURL + `/group/active-groups`, params], fetcher, { focusThrottleInterval: 1000 })

    return {
        data,
        mutate,
        isLoading: !error && !data,
        isError: error
    }
}

export const useVoteSession = params => {
    const { data, error, mutate } = useSWRNative([baseURL + `/vote/session/${params.id}`, params], fetcher)
    console.log(`hi: ${data}`)
    return {
        data,
        mutate,
        isLoading: !error && !data,
        isError: error
    }
}

export const useGroup = params => {
    const { data, error, mutate } = useSWRNative([baseURL + `/group?id=${params.id}`, params], fetcher)
    return {
        data,
        mutate,
        isLoading: !error && !data,
        isError: error
    }
}

// export const useTrending = params => {
//     let error = null

//     const fetch = async () => {
//         try {
//             await axios.post(`${baseURL}/restaurant/search/trending/${params.categorySet}`, params, { 'Authorization': `token ${await getValue('token')}` }).then(res => {
//                 if (res.data.message) {
//                     error = res.data.message
//                     return []
//                 } else if (res.data) {
//                     return res.data.results
//                 }
//             })
//         } catch (e) {
//             console.log(e) 
//             error = 'An error has occurred'
//             return []
//         }
//     }
//     return {
//         error,
//         fetch
//     }
// }

export const useTrending = params => {
    // const getKey = (pageIndex, previousPageData) => {
    //     // reached the end
    //     if (previousPageData && !previousPageData.data) return null

    //     // first page, we don't have `previousPageData`
    //     if (pageIndex === 0) return `/users?limit=10`

    //     // add the cursor to the API endpoint
    //     return `/restaurant/search/trending?cursor=${previousPageData.nextCursor}`
    //   }
    const { data, error, mutate } = useSWRNative([baseURL + `/restaurant/search/trending/${params.categorySet}`, params], fetcher)
    // const { data, size, setSize, error } = useSWRInfinite(getKey, fetcher(params))

    return {
        data,
        mutate,
        isLoading: !error && !data,
        isError: error
    }
}

export const useSearch = params => {
    if (params.query.length > 0) {
        const { data, error, mutate } = useSWRNative([baseURL + `/restaurant/search/${params.query}`, params], fetcher)

        return {
            data,
            mutate,
            isLoading: !error && !data,
            isError: error
        }
    } else {
        return {
            data: true,
            error: false,
            isLoading: false
        }
    }
}

export const useSavedRestaraunts = params => {
    const { data, error, mutate } = useSWRNative([baseURL + `/group/saved-restaurants?id=${params.groupId}`, params], fetcher)

    return {
        data,
        mutate,
        isLoading: !error && !data,
        isError: error
    }
}

export const leaveGroup = async ({ group, mutate, setModalHeight, setModalVisible, navigation, creator }) => {
    let toast = {
        title: '',
        type: '',
        message: ''
    }
    try {
        let res = await fetcher(`${baseURL}/group/leave-group`, { groupId: group.id })
        console.log(res)
        if (res.success) {
            toast = {
                title: 'Success',
                type: 'success',
                message: 'You have left the group'
            }
        } else if (res.message) {
            toast = {
                title: 'Error',
                type: 'error',
                message: res.message
            }
        } else {
            toast = {
                title: 'Error',
                type: 'error',
                message: 'An error has occurred'
            }
        }
    } catch (e) {
        toast = {
            title: 'Error',
            type: 'error',
            message: 'An error has occurred'
        }
    }
    setModalHeight(creator ? 200 : 150)
    setModalVisible(false)
    displayToast({ toast })
    if (toast.type === 'success') {
        mutate(`${baseURL}/group/active-groups`)
        navigation.goBack()
    }
    // let toast = {
    //     title: '',
    //     type: '',
    //     message: ''
    // }
    // try {
    //     let res = await fetcher(`${baseURL}/vote/leave-group`, { group: group.id })
    //     if (res.success) {
    //         toast = {
    //             title: 'Success',
    //             type: 'success',
    //             message: 'You have left the group'
    //         }
    //     } else if (res.message) {
    //         toast = {
    //             title: 'Error',
    //             type: 'error',
    //             message: res.message
    //         }
    //     } else {
    //         toast = {
    //             title: 'Error',
    //             type: 'error',
    //             message: 'An error has occurred'
    //         }
    //     }
    // } catch (e) {
    //     toast = {
    //         title: 'Error',
    //         type: 'error',
    //         message: 'An error has occurred'
    //     }
    // }
    // setModalHeight(creator ? 200 : 150)
    // setModalVisible(false)
    // displayToast({ toast })
    // if (toast.type === 'success') {
    //     mutate(`${baseURL}/group/active-groups`)
    //     navigation.goBack('Groups')
    // }
}

export const leaveSession = async ({ session, mutate, setModalHeight, setModalVisible, navigation, creator }) => {
    let toast = {
        title: '',
        type: '',
        message: ''
    }
    try {
        let res = await fetcher(`${baseURL}/vote/leave-session`, { sessionId: session.id })
        console.log(res)
        if (res.success) {
            toast = {
                title: 'Success',
                type: 'success',
                message: 'You have left the session'
            }
        } else if (res.message) {
            toast = {
                title: 'Error',
                type: 'error',
                message: res.message
            }
        } else {
            toast = {
                title: 'Error',
                type: 'error',
                message: 'An error has occurred'
            }
        }
    } catch (e) {
        toast = {
            title: 'Error',
            type: 'error',
            message: 'An error has occurred'
        }
    }
    setModalHeight(creator ? 200 : 150)
    setModalVisible(false)
    displayToast({ toast })
    if (toast.type === 'success') {
        mutate()
        navigation.goBack()
    }
}

export const placeVote = async ({ session, vote, mutate }) => {
    let toast = {
        title: '',
        type: '',
        message: ''
    }
    try {
        let res = await fetcher(`${baseURL}/vote/place-vote`, { sessionId: session.id })
        if (res.success) {
            mutate(`${baseURL}/vote/session/${session.id}`)
        } else if (res.message) {
            toast = {
                title: 'Error',
                type: 'error',
                message: res.message
            }
        } else {
            toast = {
                title: 'Error',
                type: 'error',
                message: 'An error has occurred'
            }
        }
    } catch (e) {
        toast = {
            title: 'Error',
            type: 'error',
            message: 'An error has occurred'
        }
    }
    displayToast({ toast })
}


export const closeSession = async ({ session, mutate, setModalHeight, setModalVisible, creator }) => {
    let toast = {
        title: '',
        type: '',
        message: ''
    }
    try {
        let res = await fetcher(`${baseURL}/vote/end-voting-session`, { sessionId: session.id })
        if (res.success) {
            toast = {
                title: 'Success',
                type: 'success',
                message: 'Session closed!'
            }
            mutate()
        } else if (res.message) {
            toast = {
                title: 'Error',
                type: 'error',
                message: res.message
            }
        } else {
            toast = {
                title: 'Error',
                type: 'error',
                message: 'An error has occurred'
            }
        }
    } catch (e) {
        toast = {
            title: 'Error',
            type: 'error',
            message: 'An error has occurred'
        }
    }
    setModalHeight(creator ? 280 : 150)
    setModalVisible(false)
    displayToast({ toast })
}

