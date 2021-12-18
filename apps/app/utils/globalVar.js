import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.1.39:5000/api/v1' : 'http://192.168.1.39:5000/api/v1'

export const save = async (key, value) => {
    Platform.OS !== 'web' ? await SecureStore.setItemAsync(key, value) : localStorage.setItem(key, value);
}

export const getValue = async (key) => {
    let result = Platform.OS !== 'web' ? await SecureStore.getItemAsync(key) : await localStorage.getItem(key);
    if (result) {
        return result
    } else {
        return false
    }
}

export const deleteValue = async (key) => {
    Platform.OS !== 'web' ? await SecureStore.deleteItemAsync(key) : localStorage.removeItem
}

export const fetcher = params => async url => {
    const res = await axios.post(url, {params}, {headers: {'Authorization': `token ${await getValue('token')}`}})
    if(res.status !== 200) {
        const error = new Error('An error occurred while fetching the data.')
        error.info = await res.data
        error.status = res.status
        throw error
    } else {
        console.log(res.data)
        return res.data
    }
}

export const logout = async () => {
    await deleteValue('token')
    return true
}
