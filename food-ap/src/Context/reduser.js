export const actionType = {
    SET_USER : 'SET_USER',
    SET_FOOD_ITEMS : 'SET_FOOD_ITEMS',
    SET_CART_SHOW : 'SET_CART_SHOW',
    SET_CARTITEMS : 'SET_CARTITEMS'
}

const reduser = (state, action)=>{

    console.log(action)

    switch(action.type){
        case actionType.SET_USER:
            return{
                ...state,
                user : action.user
            };
            case actionType.SET_FOOD_ITEMS:
                return{
                    ...state,
                    foodItems : action.foodItems
                };
                case actionType.SET_CART_SHOW:
                    return{
                        ...state,
                        CartShow : action.CartShow
                    };
                    case actionType.SET_CARTITEMS:
                        return{
                            ...state,
                            CartItems : action.CartItems
                        };

            default : 
            return state
    }
  
}

export default reduser