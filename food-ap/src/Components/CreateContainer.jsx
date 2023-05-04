import React from 'react'
import {motion} from 'framer-motion'
import { useState } from 'react'
import { MdFastfood , MdCloudUpload,MdDelete, MdFoodBank, } from 'react-icons/md'
import {TbCurrencyNaira} from 'react-icons/tb'
import { Categories } from '../utils/data'
import Loader from './Loader'
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { saveItem, getAllItem } from '../utils/fireBaseFunctions'
import { Storage } from '../Firebase.configure'
import { UseStatevalue } from '../Context/StateProvider'
import { actionType } from '../Context/reduser'

const CreateContainer = () => {

const [Titles, setTitles] = useState('')
const [Calories, setCalories] = useState('')
const [Price , setPrice] = useState('')
const [Category, setCategory] = useState(null)
const [Fields , setFields] = useState(false)
const[alertStatus, setAlertstatus] = useState("danger")
const[msg , setmsg] = useState(null)
const[isLoading , setIsloding] = useState(false)
const [imageAssert, setImageAssert] = useState(null)
const [{foodItems}, dispatch] = UseStatevalue()


const CatchValue = (e)=>{
setTitles(e.target.value)
}

const Cathygory = (e)=>{
  setCategory(e.target.value)
}

const uploadImage = (e)=> {
  setIsloding(true)
 const imageFile = e.target.files[0]
 console.log(imageFile)
 const storageRef = ref(Storage,`/Images/${Date.UTC}-${imageFile.name}` )

 const uploadTask = uploadBytesResumable(storageRef, imageFile)



 uploadTask.on("state_changed", (snapshot)=> {
  const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
 },
  (error)=>{
  console.log(error);
  setFields(true);
  setmsg('Error while Uploading : Try Again💀 ');
  setAlertstatus("danger")
  setTimeout(()=>{
setFields(false)
setIsloding(false)
  }, 4000)
 }, 
 ()=>{
  getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>{
    setImageAssert(downloadURL)
    setIsloding(false)
    setFields(true)
    setmsg('Image downloaded successfully')
    setAlertstatus('success')
 
    setTimeout(()=>{

      setFields(false)

    },4000)
  })
 })
};

const deleteImage  = ()=>{
  setIsloding(true)
  const deleteRef = ref(Storage,imageAssert)
  deleteObject(deleteRef).then(()=>{
    setImageAssert(null)
    setIsloding(false)
    setFields(true)
    setmsg('Image deleted successfully👌')
    setAlertstatus('success')
    setTimeout(()=>{
      setFields(false)
    },4000)

  })
};

const SaveDetails = ()=>{
  setIsloding(true)
  try{

    if((!Titles || !Calories || !imageAssert || !Price || !Categories)){
      // console.log(error);
      setFields(true);
      setmsg('Required Fields are missing ');
      setAlertstatus("danger")
      setTimeout(()=>{
    setFields(false)
    setIsloding(false)
      }, 4000)
    }else{
      const data = {
        id: `${Date.now()}`,
        title : Titles,
        ImageUrl : imageAssert,
        Categories : Category,
        Calories : Calories,
        qty : 1,
        price : Price
      }
      saveItem(data)
      setIsloding(false)
    setFields(true)
    setmsg('Data Uploaded successfully👌')
    setAlertstatus('success')
    clearData()
    setTimeout(()=>{
      setFields(false)
      
    },4000)
    }
  }catch (error){
    console.log(error);
    setFields(true);
    setmsg('Error while Uploading : Try Again💀 ');
    setAlertstatus("danger")
    setTimeout(()=>{
  setFields(false)
  setIsloding(false)
    }, 4000)
   }
   FetchData()
};
const clearData = ()=>{
  setTitles("")
  setImageAssert(null)
  setCalories("")
  setPrice("")
  setCategory("Select Category")
}



const FetchData = async()=>{
  await getAllItem().then(data => {
    dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItems : data
    })
  })
}

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 '>
        {
          Fields && (
            <motion.p 
            initial={{opacity : 0}}
            animate= {{opacity : 2}}
            exist = {{opacity : 0}}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger" ? "bg-red-600 text-red-800" : "bg-emerald-400 text-emerald-700"}`}>{msg}</motion.p>
         )}

         <div className='w-full py-2 border-b border-gray-300 flex items center gap-2'>
          <MdFastfood className='text-xl text-gray-700'/>
          <input 
          type='text' 
          required 
          value={Titles} 
          onChange={CatchValue}
          placeholder='Give me Your Title'
          className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor'/>
         </div>
         <div className='w-full'>
          <select onChange={Cathygory} className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
            <option value='other' className='bg-white' >Select Category</option>
            {Categories &&   Categories.map((item)=>(
              <option key={item.id} className='text-base border-0 outline-none capitalize bg-white text-headingColor ' value={item.urlParaname}>
                {item.name}
              </option>
            ))}
          </select>
         </div>

<div className='group flex justify-center items-center flex-col border-2  border-dotted border-gray-400 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
  {isLoading ? <Loader/> : <>
  {!imageAssert ? <>
  <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
    <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
      <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700'/>
      <p className='text-gray-500  hover:text-gray-700'>Click Here to Upload</p>
    </div>
    <input type='file' name='uploadImage' accept='image/' onChange={uploadImage} className='w-0 h-0'/>
  </label>
  </> 
  : 
 (<>
 <div className='relative h-full '>
<img src={imageAssert} alt='uploadImg' className='w-full h-full object-cover'/>
<button className=' absolute bottom-3 right-2 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out' onClick={deleteImage}>
  <MdDelete className='text-white'/>
</button>
  </div>
  </>)}
  </>}
</div>

<div className='w-full flex flex-col md:flex-row  items-center gap-3'>
  <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
    <MdFoodBank className='text-gray-700 text-2xl'/>
    <input 
    type='text' 
    required 
    value={Calories}
    onChange={(e)=> setCalories(e.target.value)}
    placeholder='Calories' 
    className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500 font-semibold text-textColor'/>
  </div>
  <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
    <TbCurrencyNaira className='text-gray-700 text-2xl'/>
    <input 
    type='number' 
    min='0.1'
    max='0.1'
    required 
    value={Price}
    onChange={(e)=> setPrice(e.target.value)}
    placeholder='Price' 
    className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500 font-semibold text-textColor'/>
  </div>
</div>

<div className='flex items-center w-full '>
<button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-white font-semibold ' onClick={SaveDetails}>
  Save
</button>
</div>

       </div>
    </div>
  )
}

export default CreateContainer