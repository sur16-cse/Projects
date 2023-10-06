import React from 'react'
import { createContext,useEffect,useReducer } from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

//as the actual value ypu want to access
export const UserContext=createContext({
    currentUser:null,
    setCurrentUser:()=>null
})

export const USER_ACTION_TYPES={
    SET_CURRENT_USER:'SET_CURRENT_USER'
}

//useReducer use inplace of useState
const userReducer=(state,action)=>{
    const {type,payload}=action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser:payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

const INITIAL_STATE={
    currentUser:null
}

//context is same no need to change because it gives what value we are exposing
export const UserProvider=({children})=>{
    //takes two argument ie some reducer and initial state
    //state - current value , dispatch = takes action and update reducer accordingly
    const [{currentUser},dispatch]=useReducer(userReducer,INITIAL_STATE)
    //state is whole object to get currentUser need to destructure
    
    const setCurrentUser=(user)=>{
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user))
    }

    const value={currentUser,setCurrentUser}
    
    useEffect(()=>{
        const unsubscribe=onAuthStateChangedListener((user)=>{
            if(user)
                createUserDocumentFromAuth(user);
            console.log(user)
            setCurrentUser(user)
        })
        return unsubscribe
    },[])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}