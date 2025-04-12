import { createContext } from "react";

const MyContext= createContext()



export default MyContext;




// is file me hum ne sirf react se createContext ko import kara ke run ker ke export kia hai
// ContextProvider file me hum ne is MyContext ko use ker ke context api banaya hai
// is ke bagher nahi ban sakta tha wo provider






// is MyContext se banaye gate context api ke provider me mojood value ko access kerna ho to hame is MyContext ka name use kerna hoga use Context me
// e.g: let { value, setValue }= useContext(MyContext)




// ager koi dosra prider banana hoga hame to us ke liye hum alag context create kare ge isi tarah
// aur dosre file me provider banaye ge









// ik bar me ne dono means createContext aur is ka provider is sath bana diya tha wo exporting me thora problem de raha tha
// bar bar error de raha tha ke ik file se do chize means context aur us ka provider don export ho raha hai. (patha nahi ke kio de raha tha)

