import { useState } from "react";
import MyContext from "./MyContext";

const ContextProvider=  ({children})=>{

    let catagoryArray = ["Cosmetics", "Medicines", "Sports", "Food", "Electronics"]

// contain the profile information of seller
    let [sellerInfo, setSellerInfo]= useState('')

    // contain the profile info of owner
    let [ownerInfo, setOwnerInfo]= useState('')

    // contain the profile info of user
    let [userInfo, setUserInfo]= useState('')

// when product is clicked then its data is saved in this usestae
    let [productData, setProductData]= useState('')

    // when owner click on some sellercard then the all products data of this seller will stored in it (on basis of seller id)
    let [ownerSideProductArray, setOwnerSideProductArray]= useState([])

    // stored the product data to rendered in user side (we can stored produch data on the basis of catagory, cart and others)
    let [userSideProductArray, setUserSideProductArray] = useState([])

    // This contain the array of product on seller side. The array stored in it is dynamic and according to condition to make it reusable for many of components
    const [sellerSideProductArray, setSellerSideProductArray] = useState([])

    // on userside, the user is on which route means home, cart, product, userdetails etc. The current open route name is stored in it and due to which we make underline under corresponding icon and others
    // we dont place it in the same component because when clicked then it navigate to another component and reload the only component. To make it to not changed with reload , we place it in context api
    let [screenMode, setScreenMode]=useState("home")

    // it contain the best product of landing page
    const [landingPageBestProducts, setLandingPageBestProducts] = useState([])

    // current clicked product data is stored in it
    const [currentClickedProductData, setCurrentClickedProductData] = useState(null)

    // it store the name of previos oepned route on the basis of which we condition rendeered the things
    const [previousRoute, setPreviousRoute] = useState('')





    

    return (
        <MyContext.Provider value={{
                                    sellerInfo, setSellerInfo,
                                     productData, setProductData,
                                     ownerSideProductArray, setOwnerSideProductArray,
                                     ownerInfo, setOwnerInfo,
                                     userInfo, setUserInfo,
                                     userSideProductArray, setUserSideProductArray,
                                     sellerSideProductArray, setSellerSideProductArray,
                                     screenMode, setScreenMode,
                                     catagoryArray,
                                     landingPageBestProducts, setLandingPageBestProducts,
                                     currentClickedProductData, setCurrentClickedProductData,
                                     previousRoute,setPreviousRoute
                                     
                                     }}>


                                        
            {children}
        </MyContext.Provider>
    )
}


// ceating provider function of context api

// const ContextProvider=  ({children})=>{
//     return (
//         <MyContext.Provider>
//             {children}
//         </MyContext.Provider>
//     )
// }



// is ke baad ham useState hook bana dete hai 
// is ki value aur setValue function hum MyContext.Provider ke value attribute me {} ke ander le lete hai
// ab jaha se bhi value set karani ho to is MyCotext ke name se useContext us component me lete hai aur us se is setvalue ko destructure ker lete hai
// aur is kor waha per jese hi normal useState ke setValue function ki tarah use kerte hai to value direct is context me save ho jaye gi


// ab jaha bhi is value ko use kerna ho to isi tarah isi context ko useContext me le ge aur value destructure kare ge
// aur is ko use kare ga normal useState ke value ki tarah



export default ContextProvider