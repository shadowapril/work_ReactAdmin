import {DEMO1,DEMO2} from "../action_types";

let initState = 'Hello...'

export default function test(preState=initState,action) {
    const {type,data} = action
    let newState
    switch (type) {
        case DEMO1:
            newState = preState + data
            return newState
        case DEMO2:
            newState = preState + data + '!'
            return newState
        default:
            return preState
    }
}