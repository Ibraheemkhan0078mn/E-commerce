import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ContextProvider from './contextApi/ContextProvider.jsx'

import LandingPage from './LandingRoutes/LandingPage.jsx'

import ProductCreate from './SellerRoutes/ProductCreate.jsx'
import ProductUpdate from './SellerRoutes/ProductUpdate.jsx'
import SellerLogin from './SellerRoutes/SellerLogin.jsx'
import SellerProfile from './SellerRoutes/SellerProfile.jsx'
import SellerUpdate from './SellerRoutes/SellerUpdate.jsx'
import SellerRegistration from './SellerRoutes/SellerRegistration.jsx'


import OwnerRegister from './OwnerRoutes/OwnerRegister.jsx'
import OwnerProfile from './OwnerRoutes/OwnerProfile.jsx'
import OwnerLogin from './OwnerRoutes/OwnerLogin.jsx'
import ProductDisplayOnOwnerDisplay from './OwnerRoutes/ProductDisplay.jsx'


import UserRegistration from './userRoutes/UserRegistration.jsx'
import UserLogin from './userRoutes/UserLogin.jsx'
import UserProfile from './userRoutes/UserProfile.jsx'
import Cart from './userRoutes/Cart.jsx'
import ProductDisplay from './userRoutes/ProductDisplay.jsx'
import UserDetails from './userRoutes/UserDetails.jsx'
import SingleProduct from './userRoutes/SingleProduct.jsx'
import EditUserForm from './userRoutes/EditUserForm.jsx'
import SellerDetails from './SellerRoutes/SellerDetail.jsx'
import OwnerDetails from './OwnerRoutes/OwnerDetails.jsx'
import OwnerUpdate from './OwnerRoutes/OwnerUpdate.jsx'










const App = () => {
  return (
    <div>
      {/* context provider banaker wrap kia take context api ko her component me use ker sake */}
      <ContextProvider>

        {/* All Route means pages present here */}
        <Routes>




          <Route path='/' element={<LandingPage />} />



          <Route path='/sellerRegister' element={<SellerRegistration />} />
          <Route path='/sellerLogin' element={<SellerLogin />} />
          <Route path='/sellerProfilePage' element={<SellerProfile />} />
          <Route path='/ProductCreateForm' element={<ProductCreate />} />
          <Route path='/SellerDataUpdateForm' element={<SellerUpdate />} />
          <Route path='/ProductUpdateForm' element={<ProductUpdate />} />
          <Route path='/sellerDetails' element={<SellerDetails/>}  />


          <Route path='/ownerRegister' element={<OwnerRegister />} />
          <Route path='/ownerLogin' element={<OwnerLogin />} />
          <Route path='/ownerProfile' element={<OwnerProfile />} />
          <Route path='/ownerSideProductDisplay' element={<ProductDisplayOnOwnerDisplay />} />
          <Route path='/ownerDetails' element={<OwnerDetails/>}   />
          <Route path='/ownerUpdate' element={<OwnerUpdate/>}    />


          <Route path='/userRegistration' element={<UserRegistration />} />
          <Route path='/userLogin' element={<UserLogin />} />
          <Route path='/userProfile' element={<UserProfile />} />
          <Route path='/userCart' element={<Cart />} />
          <Route path='/ProductDisplay' element={<ProductDisplay/>}  />
          <Route path='/userDetails' element={<UserDetails/>}    />
          <Route path='/singleProduct' element={<SingleProduct/>}     />
          <Route path="/editUserForm" element={<EditUserForm/>}    />




        </Routes>



      </ContextProvider>


    </div>
  )
}

export default App