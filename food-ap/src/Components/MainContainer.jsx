import React, { useEffect, useState } from 'react'
import HomeContainer from './HomeContainer'
import { motion } from 'framer-motion'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import RowContainer from './RowContainer'
import {UseStatevalue} from '../Context/StateProvider'
import MenuCont from './MenuCont'
import CartContainer from './CartContainer'

const MainContainer = () => {

const [{foodItems, CartShow}, dispatch ] = UseStatevalue()
 const [scrollValue, setscrollValue] = useState(0)
 useEffect(()=>{}, [scrollValue])




  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
    <HomeContainer/>
    <section className='w-full my-6 '>
      <div className='w-full flex justify-between items-center'>
        <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100  '>
          Our Fresh & Healthy Fruits
        </p>
        <div className=' hidden md:flex gap-3  items-center'>
          <motion.div whileTap={{scale: 0.75}} className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center hover:bg-orange-500 cursor-pointer  hover:shadow-lg'>
            <MdChevronLeft 
            onClick={()=> setscrollValue(-200)}
            className='text-2xl text-white'/>
          </motion.div>
          <motion.div whileTap={{scale: 0.75}} className='w-8 h-8 rounded-lg bg-orange-300 flex transition-all duration-100 ease-in-out
           items-center justify-center hover:bg-orange-500 cursor-pointer hover:shadow-lg '>
            <MdChevronRight
            onClick={()=> setscrollValue(200)}
            className='text-2xl text-white'/>
           </motion.div>
        </div>
      </div>
      <RowContainer
      scrollValue= {scrollValue}
       flag={true} data= {foodItems?.filter(n => n.Categories === "Fruits")}/>
    </section>

<MenuCont/>
{CartShow && (<CartContainer/>) }

    </div>
  )
}

export default MainContainer