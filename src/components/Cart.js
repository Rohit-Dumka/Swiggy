import { useDispatch, useSelector } from "react-redux";
import FoodItem from "./FoodItem";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector(store => store.cart.items);

    const dispatch = useDispatch();

    const handleClearCart = () =>{
        dispatch(clearCart());
    }
    return (
        <div className="font-bold text-xl mt-20">
            <button className="bg-red-100 p-2 m-5" onClick={()=>handleClearCart()}>Clear Cart</button>
            <div className="flex">
                {cartItems.map(item => <FoodItem key={item.id} {...item}/>)}
            </div>

        </div>
    )
}

export default Cart;