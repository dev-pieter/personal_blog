import React from 'react'
import Login from './admin_login'
import { useState } from 'react'
import Dashboard from './admin_dash'

export default function Admin() {
    const [token, setToken] = useState(sessionStorage.getItem('token'))

    if(!token){
        return <Login setToken={setToken}></Login>
    }

    return (
        <Dashboard/>
    )
}
