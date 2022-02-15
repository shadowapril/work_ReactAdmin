import {DEMO1,DEMO2} from "../action_types";

export const createDemo1Action = (value)=>({type:DEMO1, data:value})
export const createDemo2Action = (value)=>({type:DEMO2, data:value})