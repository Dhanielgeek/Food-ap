import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Header , MainContainer, CreateContainer } from './Components'
import { Route, Routes } from 'react-router-dom'
import { UseStatevalue } from './Context/StateProvider'
import { getAllItem } from './utils/fireBaseFunctions'
import { useEffect } from 'react'
import { actionType } from './Context/reduser'


const App = () => {

  const [{foodItems}, dispatch] = UseStatevalue()

  const FetchData = async()=>{
    await getAllItem().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems : data
      })
    })
  }
  useEffect(()=> { FetchData();
  }, [])

  return (
    <AnimatePresence > 
    <div className='w-screen h-auto flex flex-col bg-primary'>
        <Header/>
        <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
          <Routes>
            <Route path= '/' element={<MainContainer/>} />
            <Route path= '/createitem' element={<CreateContainer/>}  />
          </Routes>
        </main>
    </div>
    </AnimatePresence>
  )
}

export default App