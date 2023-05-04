import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import {RiRefreshFill} from 'react-icons/ri'
import {motion} from 'framer-motion'
import { UseStatevalue } from '../Context/StateProvider'
import { actionType } from '../Context/reduser'
import EmptyCart from '../img/emptyCart.svg'
import Cartitem from './Cartitem'

const CartContainer = () => {


  const [{ CartShow, CartItems, user}, dispatch] = UseStatevalue()

  const [tot, setTot] = useState()
  const [flag, setflag] = useState(0)

  const ShowCart = ()=>{
    dispatch({
      type: actionType.SET_CART_SHOW,
      CartShow : !CartShow
  
    })
  }
  useEffect(()=>{
    let totalPrice = CartItems.reduce(function(accumulator, item){
      return accumulator + item.qty * item.price 
    },0)
    setTot(totalPrice)
    console.log(tot)
  }, [tot, flag,CartItems])
  
  
  const clearCart = ()=>{
    dispatch({
      type : actionType.SET_CARTITEMS,
      CartItems : []
    })

    localStorage.getItem('CartItems', JSON.stringify([]))
  }



  return (
    <motion.div
    initial={{opacity: 0, x : 200}} 
    animate={{opacity :1 , x : 0}}
    exist = {{opacity : 0 , x : 200}}
     className=' fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]'>
        <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
            <motion.div whileTap={{scale: 0.75}} onClick={ShowCart}>
                <MdOutlineKeyboardBackspace className='text-textColor text-3xl '/>
              
            </motion.div>
            <p className='text-textColor text-lg font-semibold'>Cart</p>

           < motion.p whileTap={{scale: 0.75}} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base' onClick={clearCart}>Clear <RiRefreshFill/>  </motion.p>
        </div>
        {/* bottom section */}

{CartItems && CartItems.length > 0 ? (<div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
<div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
  {/* Cart item */}
  {
  CartItems && CartItems.map(item => (
    <Cartitem key={item.id} item={item} setFlag={setflag} flag={flag}/>
  ))
  }
</div>
{/* cart total section */}

<div className='w-full flex-1 bg-CartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
  <div className='w-full items-center justify-between'>
    <p className='text-gray-400 text-lg'>Sub Total</p>
    <p className='text-gray-400 text-lg'>₦{tot}</p>
  </div>
  <div className='w-full items-center justify-between'>
    <p className='text-gray-400 text-lg'>Delivery</p>
    <p className='text-gray-400 text-lg'>₦ 300</p>
  </div>
  <div className='w-full border-b border-gray-600 my-2'></div>

  <div className='w-full items-center justify-between'>
    <p className='text-gray-200 text-xl font-semibold'>Total</p>
    <p className='text-gray-200 text-xl font-semibold'>₦{tot + 300 }</p>
  </div>

{user ?  (
  <motion.button whileTap={{scale: 0.75}} type='button' className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out'>
  Check Out
</motion.button>
) : (
  <motion.button whileTap={{scale: 0.75}} type='button' className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out'>
  Login to Check
</motion.button>
)}

</div>
</div>) : (<div className='w-full h-full flex flex-col items-center justify-center gap-6'>
  <img src={EmptyCart} className='w-300' alt=''/>
  <p className='text-xl text-textColor font-bold '>
    Add Items Padi Mi
  </p>
</div>)}
        

</motion.div>
  )
}

export default CartContainer