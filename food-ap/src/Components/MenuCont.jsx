import React, {useEffect, useState} from 'react'
import {IoFastFood} from 'react-icons/io5'
import {Categories} from '../utils/data'
import { motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { UseStatevalue } from '../Context/StateProvider'

const MenuCont = () => {

  const [filter, setfilter] = useState("Chicken")
  useEffect(()=>{}, [filter])

  const [{foodItems}, dispatch] = UseStatevalue()



  return (
    <section className='w-full my-6' id='menu'>
        <div className='w-full flex flex-col items-center justify-center'>
        <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto '>
        Our Hot Dishes
        </p>
        <div className='w-full flex items-center justify-start lg:justify-center  gap-8 py-6 overflow-x-scroll scrollbar-none '>
        {
          Categories && Categories.map(Category => (
            <motion.div  whileTap={{scale: 0.6}} key={Category.id} className={`group ${filter === Category.urlParaname ? 'bg-cartNumBg' : 'bg-slate-200'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-red-600 duration-50 transition-all ease-in-out `}onClick={()=> setfilter(Category.urlParaname)}>
            <div className={`w-10 h-10 rounded-full ${filter === Category.urlParaname ? 'bg-slate-200' : 'bg-cartNumBg'} flex items-center justify-center shadow-lg`}
            >
          <IoFastFood className={`${filter=== Category.urlParaname ? "text-textColor" : "text-white"} group-hover:text-textColor text-lg`}/>
            </div>
            <p className={`text-sm ${filter === Category.urlParaname ? "text-white" : "text-textColor"} group-hover:text-slate-100 font-semibold `}>{Category.name}</p>
          </motion.div>
          ))}
        </div>

        <div className='w-full'>
          <RowContainer flag={false} data={foodItems?.filter(n => n.Categories === filter)}/>
        </div>
        </div>
      </section>
  )
}

export default MenuCont