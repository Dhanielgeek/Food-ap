import React, { useState } from 'react'
import Logo from '../img/chiyrt.png'
import Avatar from '../img/avatar.png'
import { motion } from 'framer-motion'
import {MdShoppingBasket,MdAdd,MdLogout} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../Firebase.configure'
import { UseStatevalue } from '../Context/StateProvider'
import { actionType } from '../Context/reduser'

const Header = () => {

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

const [{user, CartShow , CartItems}, dispatch] = UseStatevalue()
 const [Ismenu , setIsmenu] = useState(false)


const login = async ()=>{
if(!user){
  const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth,provider)


dispatch({
  type : actionType.SET_USER,
  user : providerData[0],

})
localStorage.setItem( 'user' , JSON.stringify(providerData[0]))
}else{
  setIsmenu(!Ismenu)
}
}
const Logout = ()=>{
  setIsmenu(false)
  localStorage.clear()

  dispatch({
    type: actionType.SET_USER,
    user : null
  })
}

const ShowCart = ()=>{
  dispatch({
    type: actionType.SET_CART_SHOW,
    CartShow : !CartShow

  })
}


  return (
    <header  className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>
        {/* desktop & tablets */}
        <div className='hidden md:flex w-full h-full  items-center justify-between'>
            <Link to={"/"} className='flex items-center gap-2'>
                <img src={Logo} className='w-[50px] object-contain' alt='Logo'/>
                <p className='text-2xl text-headingColor font-bold'>Destiny</p>
            </Link>
          <div className='flex items-center gap-8'>
          <motion.ul 
          initial={{opacity: 0 , x : 200}}
          animate= {{opacity : 1 , x : 5}}
          exist = {{opacity : 1 , x: 0}}
           className='flex items-center gap-16'>
              <li className='text-base text-textColor hover:text-headingColor duration-100 transistion-all ease-in-out cursor-pointer' onClick={()=> setIsmenu(false)}>Home</li>  
              <li className='text-base text-textColor hover:text-headingColor duration-100 transistion-all ease-in-out cursor-pointer'onClick={()=> setIsmenu(false)}>Menu</li>  
              <li className='text-base text-textColor hover:text-headingColor duration-100 transistion-all ease-in-out cursor-pointer'onClick={()=> setIsmenu(false)}>About Us</li>  
              <li className='text-base text-textColor hover:text-headingColor duration-100 transistion-all ease-in-out cursor-pointer'onClick={()=> setIsmenu(false)}>Service</li>  
            </motion.ul>
            <div className='relative flex items-center  ' onClick={ShowCart}>
            <MdShoppingBasket  className='text-textColor text-2xl  cursor-pointer'/>
          {
            CartItems && CartItems.length > 0 && (  <div className='absolute -top-3 -right-2 w-5 h-5 bg-green-600 rounded-full'>
            <p className='text-sm text-white font-semibold text-center'>{CartItems.length}</p>
            </div>
          )}
           
            </div>


          <div className='relative '>
          <motion.img whileTap={{scale: 0.8}} src= {user ? user.photoURL : Avatar}  className='w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full' alt='Userprofile' onClick={login}/>
         {
          Ismenu && (
            <motion.div 
            initial={{opacity : 0, scale : 0.6}}
            animate={{opacity : 1, scale : 1}}
            exit={{opacity : 0, scale : 0.6}}
            
            className='w-[150px] bg-gray-50  shadow-xl rounded-lg flex flex-col absolute top-12  right-0'>
            {
              user && user.email &&   ( <Link to={'/createitem'}>  <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-50 ease-in-out text-textColor text-base'>New Item <MdAdd/></p> </Link>)
            }
            <p className='px-4 py-2 flex items-center gap-8 cursor-pointer hover:bg-slate-200 transition-all duration-50 ease-in-out text-textColor text-base'onClick={Logout}>LogOut <MdLogout/></p>
          </motion.div>
          )
         }
         </div>

          </div>
         
        </div>
        {/* mobile */}
        
        <div className='flex  items-center justify-between  md:hidden w-full h-full'>
        <div className='relative flex items-center ' onClick={ShowCart}>
            <MdShoppingBasket  className='text-textColor text-2xl  cursor-pointer'/>
            {
            CartItems && CartItems.length > 0 && (  <div className='absolute -top-3 -right-2 w-5 h-5 bg-green-600 rounded-full'>
            <p className='text-sm text-white font-semibold text-center'>{CartItems.length}</p>
            </div>
          )}
            </div>

{/*  <div className='absolute -top-3 -right-2 w-5 h-5 bg-green-600 rounded-full'>
              <p className='text-sm text-white font-semibold text-center'>2</p>
            </div> */}
              {/* logo  */}
            
        <Link to={"/"} className='flex items-center gap-2'>
                <img src={Logo} className='w-10 object-cover' alt='Logo'/>
                <p className='text-2xl text-headingColor font-bold'>Destiny</p>
            </Link>

            {/* user & dropdown */}
            <div className='relative '>
          <motion.img whileTap={{scale: 0.8}} src= {user ? user.photoURL : Avatar}  className='w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full' alt='Userprofile' onClick={login}/>
         {
          Ismenu && (
            <motion.div 
            initial={{opacity : 0, scale : 0.6}}
            animate={{opacity : 1, scale : 1}}
            exit={{opacity : 0, scale : 0.6}}
            
            className='w-[150px] bg-gray-50  shadow-xl rounded-lg flex flex-col absolute top-12  right-0'>
            {
              user && user.email === "dhanielknightz46@gmail.com" &&   ( <Link to={'/createitem'}>  <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-50 ease-in-out text-textColor text-base'>New Item <MdAdd/></p> </Link>)
            }
             <motion.ul 
          initial={{opacity: 0 , x : 200}}
          animate= {{opacity : 1 , x : 0}}
          exist = {{opacity : 1 , x: 0}}
           className='flex  flex-col'>
              <li className='text-base text-textColor hover:text-headingColor duration-100 transistion-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2'>Home</li>  
              <li className='text-base text-textColor hover:text-headingColor duration-100 transistion-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2'>Menu</li>  
              <li className='text-base text-textColor hover:text-headingColor duration-100 transistion-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2'>About Us</li>  
              <li className='text-base text-textColor hover:text-headingColor duration-100 transistion-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2'>Service</li>  
            </motion.ul>
            <p className='m-2 p-2 rounded-md showdow-md px-4 py-2 flex justify-center bg-gray-300 items-center gap-8 cursor-pointer hover:bg-slate-300 transition-all duration-50 ease-in-out text-textColor text-base' onClick={Logout}>LogOut <MdLogout/></p>
          </motion.div>
          )
         }
         </div>
        </div>
    </header>
  )
}

export default Header