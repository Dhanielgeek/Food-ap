import React from 'react'
import deli from '../img/delivery.png'
import Hero8 from '../img/heroBg.png'
import { herodata } from '../utils/data'

const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
          <div className='py-8 flex-1 flex flex-col items-start  justify-start gap-4'>
        <div className='flex item-center gap-2 justify-center bg-orange-200 px-4  py-1 rounded-full'>
        <p className='text-base text-orange-600 font-semibold'>Bike Delivery</p>
        <div className='w-8 h-8 rounded-full overflow-hidden drop-shadow-xl'>
        <img src= {deli} alt='delivery man on bike' className='w-full h-full object-contain bg-white'/>
        </div>
        </div>
      <p className='text-[4.5rem] font-extrabold tracking-tighter font-sans text-headingColor lg:text-[4.5rem]'>The Fast Delivery in <span className='text-orange-500 text-[4.5rem] lg:text-[5rem]'>Your City</span></p>
      <p className='text-base text-textColor text-start md:text-left md:w-[80%] '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere placeat consequatur optio sequi, exercitationem odit non quia? Excepturi officiis cum natus odit odio perspiciatis rem reprehenderit voluptatum quia minus</p>
      <button type='button' className='w-full bg-gradient-to-br from-orange-400 to-orange-600 px-4 py-2 text-white  rounded-lg cursor-pointer hover:shadow-lg transition-all ease-in-out duration-75 bg-orange-400 md:w-auto'>Order Now</button>
      </div>
      <div className='py-2  flex-1 flex items-center  relative'>
          <img src= {Hero8} alt ='background' className='h-[420px] w-full lg:h-[650px] ml-auto lg:w-auto'/>
          <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 gap-4 flex-wrap '>
            {herodata && herodata.map(n => (
              <div key={n.id} className=' lg:w-[190px]  p-4 flex items-center justify-center flex-col bg-cardColor backdrop-blur-md rounded-3xl drop-shadow-2xl'>
<img src={n.image} alt='ice-cream' className=' lg:w-40 lg:-mt-20 w-20 -mt-10'/>
<p className='lg:text-xl font-semibold text-textColor font-serif mt-2 lg:mt-4 text-base'>{n.name}</p>
<p className='lg:text-md text-[14px] text-gray-500 font-semibold my-1 lg:my-3'>{n.decp}</p>
<p className='text-sm font-semibold text-headingColor'><span className='text-xs text-red-400'>₦</span> {n.price}</p>
</div>
            ))}
            </div>
          </div>
    </section>
  )
}

export default HomeContainer
