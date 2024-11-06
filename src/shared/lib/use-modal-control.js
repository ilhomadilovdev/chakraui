import {useState} from "react";

export const useModalControl = (initialState = {}) => {
    const [state, setState] = useState({
        visible: false,
        ...initialState
    })

    const open = (params = {}) => {
        setState(prev => ({
            ...prev,
            ...params,
            visible: true
        }))
    }

    const close = () => {
        setState(()=> ({
            ...initialState,
            visible: false
        }))
    }

    return {
        state,
        open,
        close
    }
}
