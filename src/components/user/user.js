import React from 'react'
import './user.css'

const User = (props) => {
    return (
    // return the username and location
    <div className='userinfo'>
        <div className='namediv'>
              {props.user.real_name}
            </div>
            <div>
              {props.user.tz}
        </div> 
    </div>
    )
}

export default User