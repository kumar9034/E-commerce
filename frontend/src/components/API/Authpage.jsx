import React from 'react'
import Signup from '../Signup'
import Login from '../Login'

const Authpage = () => {
  
  return (
    <div className='h-screen w-full bg-black-900 flex justify-between '>
      <Signup />
      <Login />
    </div>
  )
}

export default Authpage
