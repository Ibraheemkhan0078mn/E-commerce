import React, { useEffect, useState } from 'react'


import slideImg1 from '../../assets/images/slideImg1.jpg'
import slideImg2 from '../../assets/images/slideImg2.jpg'
import slideImg3 from '../../assets/images/slideImg3.jpg'
import slideImg4 from '../../assets/images/slideImg4.jpg'
import slideImg5 from '../../assets/images/slideImg5.jpg'
import slideImg6 from '../../assets/images/slideImg6.jpg'
import slideImg7 from '../../assets/images/slideImg7.jpg'
import slideImg8 from '../../assets/images/slideImg8.jpg'























const SlidingImages = () => {


    const [translateX, setTranslateX] = useState(100)

    let imagesArray = [slideImg1, slideImg2, slideImg3, slideImg4, slideImg5, slideImg6, slideImg7, slideImg8]















    useEffect(() => {
        const interval = setInterval(() => {
            handleRightArrowClick();
        }, 6000);

        // this return only give the code to clear the first intervel . 
        // and when this useeffect is again run on the second time then this ready to execute cleapup function remove the effect of first intervel to prevent it from disturbance
        // and also the second intervel executed means time is setted and also the second code to clean it is also placed which run on third execution of useeffect to remove the second intervel to prevent it from disturbance
        // that's why our previous intervel eleminated either if arrow is clicked or when translateX value is changed by function.
        return () => clearInterval(interval);


    }, [translateX]);





















    function handleRightArrowClick(e) {
        // console.log("left arrow click", translateX)

        if (translateX == (imagesArray.length * 100) - 100) {
            setTranslateX(100)
        } else {
            setTranslateX(translateX + 100)
        }
    }


















    function handleLeftArrowClick(e) {
        // console.log("right arrow click", translateX)
        if (translateX == 100) {
            setTranslateX(100)
        } else {
            setTranslateX(translateX - 100)
        }
    }






















    return (
        // main div of slidingImage.jsx of landing page
        <div className='min-h-[10vh] min-w-full  flex items-center relative   '>



            {/* left and right arrow heads */}
            <i className="ri-arrow-left-wide-line        text-[50px] text-zinc-900 font-bold  absolute left-[3%] top-[50%] z-[599] " onClick={handleLeftArrowClick}></i>
            <i className="ri-arrow-right-wide-line        text-[50px] text-zinc-900 font-bold  absolute right-[3%] top-[50%] z-[599] " onClick={handleRightArrowClick}></i>




            {/* The container div which contain all the images */}
            <div className="custom_glassy_effect mt-24  min-h-[30vh] w-max flex items-center text-3xl font-semibold overflow-x-hidden scroll-smooth space-x-0 ">
                {imagesArray.map((eachImg, index) => {
                    return (<img src={eachImg} key={index}
                        className='h-full w-screen object-contain flex-shrink-0 '
                        style={{ transform: `translateX(-${translateX}%)`, transition: "0.4s" }} />)
                })}
            </div>



        </div>
    )
}








export default SlidingImages