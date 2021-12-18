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