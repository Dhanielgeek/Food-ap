import { fetchCart, fetchUser } from "../utils/FetchLocaleData"

const userInfo = fetchUser()
const CartInfo = fetchCart()
export const initialState = {
    user : userInfo,
    foodItems : null,
    CartShow: false,
    CartItems : CartInfo
}