import axios from "axios";
import React, { useEffect, useState } from "react";

import { AppState } from "react-native";
import { SWRConfig } from "swr";
import { getValue } from "./utils/globalVar";

const Swr = (props) => {
    const [token, setToken] = useState('')
   

    return (
        <>
            <SWRConfig
                value={{
                    provider: () => new Map(),
                    isVisible: () => { return true },
                    initFocus(callback) {
                        let appState = AppState.currentState

                        const onAppStateChange = (nextAppState) => {
                            /* If it's resuming from background or inactive mode to active one */
                            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                                callback()
                            }
                            appState = nextAppState
                        }

                        // Subscribe to the app state change events
                        const subscription = AppState.addEventListener('change', onAppStateChange)

                        return () => {
                            subscription.remove()
                        }
                    }
                }}
            >
                {props.children}
            </SWRConfig>
        </>
    )
}

export default Swr