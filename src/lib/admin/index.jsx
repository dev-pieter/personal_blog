import React from 'react'
import Login from './admin_login'
import AddPost from './add_post'
import { useState } from 'react'

export default function Admin() {
    const [token, setToken] = useState(sessionStorage.getItem('token'))

    if(!token){
        return <Login setToken={setToken}></Login>
    }

    return (
        <AddPost></AddPost>
    )
}
