import { useParams } from "react-router-dom"; 
import { IMG_CDN_URL, ITEM_IMG_CDN_URL } from "../config";
import { MenuShimmer }  from './Shimmer';
import useResMenu from "../Hooks/useResMenu";
import { addItem } from "../utils/cartSlice"
import { useDispatch } from "react-redux";

const RestaurantMenu = () => {
    //to read a dynamic URL params
    const { resId } = useParams();

    const [restaurant,restaurantMenu] = useResMenu(resId);

    const dispatch = useDispatch();

    const addFoodItem = (item) => {
        dispatch(addItem(item));
    }

    console.log(restaurant);
    console.log(restaurantMenu);
    
    return !restaurant ? <MenuShimmer/> : (
        <div className="restaurant-menu">
            <div className="restaurant-summary">
            <img src={IMG_CDN_URL + restaurant.cloudinaryImageId} alt={restaurant?.name} className="restaurant-img"/>
                <div className="restaurant-summary-details">
                    <h2 className="restaurant-title">{restaurant?.name}</h2>
                    <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>
                    <div className="restaurant-details">
                        <div className="restaurant-rating" style={
                            (restaurant?.avgRating) < 4 
                            ? {backgroundColor: "var(--light-red"}
                            : (restaurant?.avgRating) === '--'
                            ? {backgroundColor: 'white', color: 'black'}
                            : {color : 'white'}
                        }>
                            <i className="fa-solid fa-star"></i>
                            <span>{restaurant.avgRating}</span>
                        </div>
                        <div>{restaurant?.costForTwoMessage}</div>
                    </div>
                </div>
            </div>
                
            <div className="restaurant-menu-content">
                <div className="menu-items-container">
                    <div className="menu-title-wrop">
                        <h3 className="menu-title">Recommended</h3>
                        <p className="menu-count">
                            {restaurantMenu.length} ITEMS
                        </p>
                    </div>
                    <div className="menu-items-list">
                        {Object.values(restaurantMenu).map((item) => (
                            <div className="menu-item" key={item?.id}>
                                <div className="menu-item-details">
                                    <h3 className="item-title">{item?.name}</h3>
                                    <p className="item-cost">
                                        {item?.price >0 
                                        ? new Intl.NumberFormat('en-IN',{
                                            style: 'currency',
                                            currency: 'INR',
                                        }).format(item?.price / 100)
                                        : " "}
                                    </p>
                                    <p className="item-desc">{item?.description}</p>
                                </div>
                                <div className="menu-img-wrapper">
                                    {console.log(ITEM_IMG_CDN_URL + item?.imageId)}
                                    {item?.imageId && (
                                        <img 
                                            className="menu-item-img"
                                            src={ITEM_IMG_CDN_URL + item?.imageId}
                                            alt={item?.name}
                                        />
                                    )}
                                    <button className="add-btn" onClick={()=>addFoodItem(item)}>ADD +</button>
                                </div>
                            </div> 
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantMenu;