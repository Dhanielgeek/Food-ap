import React, { useRef, useEffect, useState } from 'react'
import {MdShoppingBasket} from 'react-icons/md'
import { motion } from 'framer-motion'
import { UseStatevalue } from '../Context/StateProvider'
import { actionType } from '../Context/reduser'
// import { Storage } from '../Firebase.configure'
// import  NotFound  from '../img/NotFound.svg'
const RowContainer = ({flag, data, scrollValue}) => {
    // console.log(data);
    const rowContainer = useRef()
    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue
    }, [scrollValue])

 const [items, setitems] = useState([])


     
    const [{CartItems}, dispatch] = UseStatevalue()


    const AddtoCart = ()=>{
        
 dispatch({
    type : actionType.SET_CARTITEMS,
    CartItems: items
 })
 localStorage.getItem('CartItems', JSON.stringify(items))
    }

    useEffect(()=>{
        AddtoCart()
    }, [items])

  return (
    <div
    ref={rowContainer}
     className= {`w-full flex items-center gap-3  my-12  scroll-smooth ${flag ? 'overflow-x-scroll scrollbar-none ' : 'overflow-x-hidden flex-wrap justify-center'}`}>
    {data &&  data.map((item) => (
            <div key={item?.id} className='w-275 h-[175px] min-w-[275px]  md:w-300px md:min-w-[300px]  my-12 bg-cardColor rounded-lg  backdrop-blur-lg p-2 px-4 hover:drop-shadow-lg flex flex-col items-center justify-evenly relative'>
            <div className='w-full flex items-center justify-between '>

                <motion.div whileHover={{scale: 1.1}} className='w-40 h-36 -mt-3 drop-shadow-2xl'>


            <img  src= {item?.ImageUrl} alt='' className='w-full h-full object-contain'/>

                
                </motion.div>
                {/* < motion.img whileHover={{scale: 1.1}} src= {item?.ImageUrl} alt='' className='w-40 -mt-8 drop-shadow-2xl'/> */}
                <motion.div whileTap={{scale: 0.75}} className='w-8 h-8 rounded-full bg-red-500 flex justify-center items-center cursor-pointer hover:shadow-sm ' onClick={()=> setitems([...CartItems, item])}>
                   <MdShoppingBasket className='text-white '/>
                </motion.div>
            </div>
            <div className='w-full  flex flex-col gap-4 items-end justify-end'>
                <p className='font-semibold text-textColor text-base md:text-lg'>{item?.title}</p>
                <p className='mt-1 text-sm text-gray-500'>{item.Calories}</p>
                <div className='flex items-center gap-8'>
                    <p className='text-lg text-textColor font-semibold'>
                        <span className='text-sm text-red-500'>₦</span> {item.price}
                    </p>
                </div>
            </div>
        </div>
    ))}
    </div>
  )
}

export default RowContainer