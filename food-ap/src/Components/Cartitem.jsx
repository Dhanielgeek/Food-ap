import React,{useEffect, useState} from 'react'
import {BiMinus, BiPlus} from 'react-icons/bi'
import {motion} from 'framer-motion'
import { UseStatevalue } from '../Context/StateProvider'
import { actionType } from '../Context/reduser'



let items = [] 

const Cartitem = ({item, setFlag, flag}) => {




const [qty, setqty] = useState(item.qty)
const [{CartItems}, dispatch] = UseStatevalue()
// const [items, setitems] = useState([])



const cartDispatch = ()=>{
    localStorage.getItem("CartItems", JSON.stringify(items))
    dispatch({
        type: actionType.SET_CARTITEMS,
        CartItems : items
    })
}



const updateQty = (action, id)=>{
    if(action === "add"){
        setqty(qty + 1)
        CartItems.map((item) => { if(item.id === id) {
            item.qty += 1
            setFlag(flag + 1 )
        }})
           
        
        cartDispatch()
    }else{
      if(qty === 1 ){
        items = CartItems.filter((item)=> item.id !== id)
        setFlag(flag + 1)
        cartDispatch()
      }else{
        setqty(qty -1)
        CartItems.map((item)=>{
          if(item.id === id){
            item.qty -= 1
            setFlag(flag + 1)
          }
        })
        cartDispatch()
      }
    }
}

useEffect(()=>{
    items= CartItems
},[qty, items])



  return (
    <div>
        <div key={item.id} className='w-full p-1 px-2 rounded-lg bg-CartItem flex items-center gap-2'>
  <img src={item?.ImageUrl} className='w-20 h-20 max-w-[60px] rounded-full object-contain' alt=''/>

  {/* name section */}
  <div className='flex flex-col gap-2'>
    <p className='text-base text-gray-50'>
      {item?.title}
    </p>
    <p className='text-sm block text-gray-300 font-semibold'>₦{parseFloat(item?.price) * qty}</p>
  </div>
  {/* button section */}

<div className='group flex items-center gap-2 ml-auto cursor-pointer'>
<motion.div whileTap={{scale: 0.75}} onClick={()=> updateQty ("remove", item?.id)}>
  <BiMinus className= "text-gray-50"/>
</motion.div>
<p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>{qty}</p>
<motion.div whileTap={{scale: 0.75}}onClick={()=> updateQty ("add", item?.id)}>
<BiPlus className= "text-gray-50"/>
</motion.div>
</div>

</div>
    </div>
  )
}

export default Cartitem