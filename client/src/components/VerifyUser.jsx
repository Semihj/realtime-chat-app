import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navigate, Outlet} from "react-router-dom"
import {useCookies} from "react-cookie"
import { signOutSuccess } from '../redux/user/user'
export default function VerifyUser() {
    const [isUser,setIsUser] = useState(false)
    const {currentUser} = useSelector((state) => state.user )
    const dispatch = useDispatch()
    const [cookie] = useCookies(["user"])

    useEffect(() => {
        const handleSignOut = () => {
            if(!cookie.user) {
                dispatch(signOutSuccess())
            }
        }
        handleSignOut()
    }, [])
    

    return currentUser ? <Outlet/>:<Navigate to={"/login"} />
}
