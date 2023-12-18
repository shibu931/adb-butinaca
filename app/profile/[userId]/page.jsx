import React from 'react'

const UserProfile = ({params}) => {
  return (
    <div className='text-white my-20 flex flex-col justify-center '>
        <h2 className='text-2xl text-center'>UserProfile</h2>
        <br />
        <p className="text-2xl text-center">User Id 
            <span className='p-1 px-2 text-md rounded-lg bg-purple-800 mx-2'>{params.userId}</span>
        </p>
    </div>
  )
}

export default UserProfile