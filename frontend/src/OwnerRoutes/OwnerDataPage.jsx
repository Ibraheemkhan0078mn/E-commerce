import React, { useContext, useState } from 'react'
import MyContext from '../contextApi/MyContext'




























const ownerInfoPage = ({ visibility, setVisibility }) => {



  let { ownerInfo } = useContext(MyContext)















  return (
    // main contain and div of this component
    <div className='custom_glassy_effect      h-[80%]  w-[50%] p-10 fixed m-auto inset-0 z-[1000] rounded-2xl '>


      {/* red color cross btn */}
      <div className="h-10 w-10 flex items-center justify-center rounded-full text-xl font-bold text-zinc-200 absolute cursor-pointer select-none bg-red-400" onClick={() => { setVisibility("hide") }}>  X   </div>

      {/* image of owner on owner data page */}
      <img className='h-1/2 min-w-1/2 mt-16 rounded-lg mb-5' src={ownerInfo.imageUrl} alt="" />


      {/* other detail owner on owner data page */}
      <h3 className='font-semibold  '> <span className='text-green-900 text-xl'>Name:</span> {ownerInfo.name}</h3>
      <h3 className='font-semibold  '> <span className='text-green-900 text-xl'>Email:</span> {ownerInfo.email}</h3>
      <h3 className='font-semibold  '> <span className='text-green-900 text-xl'>Gst No :</span> {ownerInfo.gstNo}</h3>
      <h3 className='font-semibold  '> <span className='text-green-900 text-xl'>Secret Key:</span> {ownerInfo.secretKey}</h3>

    </div>
  )
}

export default ownerInfoPage