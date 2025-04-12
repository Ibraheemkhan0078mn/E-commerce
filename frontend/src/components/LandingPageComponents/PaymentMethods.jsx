import React from 'react'

const PaymentMethods = () => {


  let paymentMethodArray = [
    {
      logo: "https://th.bing.com/th/id/OIP.Rzw6nHBTa-La9khfD67e6QHaEK?rs=1&pid=ImgDetMain",
      name: "Easypaisa"
    },
    {
      logo: "https://th.bing.com/th/id/OIP.aFD8xqAs4Q9jaJQJ3JAVagHaEK?rs=1&pid=ImgDetMain",
      name: "Google pay"
    },
    {
      logo: "https://th.bing.com/th/id/R.d969ff4301a6f3e3f0d3db5e037b60f6?rik=LpoWeK4jYtEkyA&pid=ImgRaw&r=0",
      name: "Stripe"
    }

  ]













  return (
    <div className=' custom_glassy_effect      min-h-[10vh] min-w-full mt-5 pt-24  flex gap-x-5 sm:gap-x-10 items-center flex-shrink-0 relative   '>


      {/* Heading of payment methods */}
      <h1 className='text-2xl font-bold absolute top-5 pl-10'>Payment Method...</h1>





      <div className="h-max w-max overflow-x-auto flex flex-nowrap sm:flex-wrap"></div>

      {paymentMethodArray.map((eachGateway, index) => {
        {/* This div contain the each plateform image, logo and name */ }
        return (
          <div className="flex flex-col items-center" key={index}>
            <img src={eachGateway.logo} className='min-h-[10vh] w-24  flex justify-center flex-wrap gap-4 mb-5 rounded-lg' alt="" />
            {/* <h1 className='text-xl font-semibold'>{eachGateway.name}</h1> */}
          </div>
        )



      })}



    </div>
  )
}

export default PaymentMethods