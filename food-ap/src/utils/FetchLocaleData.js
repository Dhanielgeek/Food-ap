export const fetchUser = () =>{
    const userInfo = localStorage.getItem('user') === "underfined" ? JSON.parse(localStorage.getitem('user')) : localStorage.clear()

    return userInfo
}

export const fetchCart = () =>{
    const CartInfo = localStorage.getItem('CartItems') === "underfined" ? JSON.parse(localStorage.getitem('CartItems')) : localStorage.clear()

    return CartInfo ? CartInfo : []
    
}
