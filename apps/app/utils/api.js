import useSWR from "swr"
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
    const { data, error } = useSWR(baseURL + `/group/${params.id}`, fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useTrending = params => {
    const { data, error } = useSWR(baseURL + `/restaraunt/search/trending/${params.categorySet}`, fetcher(params))
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