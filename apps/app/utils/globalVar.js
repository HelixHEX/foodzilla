import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform, Linking } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.1.39:5001/api/v1' : 'http://192.168.1.39:5001/api/v1'

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

export const fetcher = async (url, params) => {
    const res = await axios.post(url, params, { headers: { 'Authorization': `token ${await getValue('token')}` } })
    if (res.status !== 200) {
        const error = new Error('An error occurred while fetching the data.')
        error.info = await res.data
        error.status = res.status
        throw error
    } else {
        return res.data
    }
}

export const logout = async () => {
    await deleteValue('token')
    return true
}

export const displayToast = ({ toast }) => {
    Toast.show({
        type: toast.type,
        text1: toast.title,
        text2: toast.message
    });
}

export const openMap = async (address, city, zipCode,) => {
        const destination = encodeURIComponent(`${address}, ${city}, ${zipCode}`);
        const provider = Platform.OS === 'ios' ? 'apple' : 'google'
        const link = `http://maps.${provider}.com/?daddr=${destination}`;

        try {
            const supported = await Linking.canOpenURL(link);

            if (supported) Linking.openURL(link);
        } catch (error) {
            console.log(error);
        }
    }