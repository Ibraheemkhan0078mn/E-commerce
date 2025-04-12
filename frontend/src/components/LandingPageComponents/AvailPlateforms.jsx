import React from 'react'

const AvailPlateforms = () => {


  let plateformArray = [
    {
      logo: "https://th.bing.com/th/id/R.61d9101a6841f5cd92afce057830fd7a?rik=3ymuV1eRqA8jHA&pid=ImgRaw&r=0",
      name: "Amazon"
    },
    {
      logo: "https://th.bing.com/th/id/OIP._4_yJnoltRXogH01iFkILQHaD4?rs=1&pid=ImgDetMain",
      name: "Daraz"
    },
    {
      logo: "https://pngimg.com/uploads/ebay/ebay_PNG9.png",
      name: "ebay"
    }

  ]











  return (
    // main div of AvailPlatefrom component
    <div className='custom_glassy_effect                min-h-[10vh] min-w-full sm:p-10 pt-24 mt-5  flex gap-x-0 sm:gap-x-10 items-center overflow-x-auto flex-shrink-0 relative  '>



      <h1 className='text-2xl font-bold absolute top-5 pl-5'>Partnership with...</h1>


      <div className="h-max w-max overflow-x-auto flex flex-row flex-nowrap sm:flex-wrap sm:pt-10">

        {plateformArray.map((eachProduct, index) => {
          {/* This div contain the each plateform image, logo and name */ }
          return (<div key={index} className="   min-h-[10px] w-44 sm:w-48   p-5 rounded-lg flex flex-col items-center text-xl font-semibold flex-shrink-0  ">
            {/* <img src="" className='min-h-[30vh] w-full bg-zinc-800 flex justify-center flex-wrap gap-4 mb-10' alt="" /> */}
            <img src={eachProduct.logo} className='min-h-[10vh] w-full rounded-lg  flex justify-center flex-wrap gap-4 mb-10' alt="" />
            {/* <h1>{eachProduct.name}</h1> */}
          </div>)


        })}

      </div>














    </div>
  )
}

export default AvailPlateforms