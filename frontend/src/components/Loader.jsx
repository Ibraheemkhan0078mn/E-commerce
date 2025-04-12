import React from 'react'
import './Loader.css'





const Loader = ({ hw }) => {
    return (
        <div
            className=' relative '
            style={{ height: `${hw}px`, width: `${hw}px` }}>


            <div
                className=" spin_anim      h-full w-full rounded-full border-4 border-t-zinc-700 border-blue-500 absolute top-0 right-0">
            </div>

            


        </div>
    )
}

export default Loader