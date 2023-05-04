//saving new items
import { collection, doc,  getDocs, orderBy, query, setDoc} from 'firebase/firestore'
import { Firestore } from '../Firebase.configure'

export const saveItem = async(data)=>{
    await setDoc
    (
        doc(Firestore, 'fooditems', `${Date.now()}`),  data, {merge: true}
    
    )
}

//get detail food item 

export const getAllItem = async()=>{
    const items = await getDocs(
        query(collection(Firestore, "fooditems"), orderBy("id", "desc"))
    )
    return items.docs.map((doc)=> doc.data())
}