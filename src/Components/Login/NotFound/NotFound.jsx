import Lottie from 'lottie-react'
import React from 'react'
import notfound from "../../../../public/animation/notfound.json"

const NotFound = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <Lottie animationData={notfound}/>
    </div>
  )
}

export default NotFound