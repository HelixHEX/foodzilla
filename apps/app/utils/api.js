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
    console.log(params)
    const { data, error } = useSWR(baseURL + `/vote/all-voting-sessions`, fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useActiveGroups = params => {
    console.log(params)
    const { data, error } = useSWR(baseURL + `/group/active-groups`, fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}