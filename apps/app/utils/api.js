import axios from "axios"
import useSWR, { useSWRInfinite } from "swr"
import { baseURL, fetcher, getValue } from "./globalVar"

export const useUser = params => {
    const { data, error } = useSWR(baseURL + `/user`, fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useVoteSessions = params => {
    const { data, error } = useSWR(baseURL + `/vote/all-voting-sessions`, fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useActiveGroups = params => {
    const { data, error } = useSWR(baseURL + `/group/active-groups`, fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useVoteSession = params => {
    const { data, error } = useSWR(baseURL + `/vote/session/${params.id}`, fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useGroup = params => {
    const { data, error } = useSWR(baseURL + `/group?id=${params.id}`, fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

// export const useTrending = params => {
//     let error = null

//     const fetch = async () => {
//         try {
//             await axios.post(`${baseURL}/restaraunt/search/trending/${params.categorySet}`, params, { 'Authorization': `token ${await getValue('token')}` }).then(res => {
//                 if (res.data.message) {
//                     error = res.data.message
//                     return []
//                 } else if (res.data.success) {
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
    //     return `/restaraunt/search/trending?cursor=${previousPageData.nextCursor}`
    //   }
    const { data, error } = useSWR(baseURL + `/restaraunt/search/trending/${params.categorySet}`, fetcher(params))
    // const { data, size, setSize, error } = useSWRInfinite(getKey, fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useSearch = params => {
    if (params.query.length > 0) {
        const { data, error } = useSWR(baseURL + `/restaraunt/search/${params.query}`, fetcher(params))
        return {
            data,
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
    const { data, error } = useSWR(baseURL + `/group/saved-restaraunts?id=${params.groupId}`, fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}