import { useState, useEffect } from "react";
import { swiggy_menu_api_URL } from "../config";

const useResMenu = (resId) => {
    const [restaurant, setRestaurant] = useState(null);
    const [restaurantMenu, setRestaurantMenu] = useState({});

    useEffect(() => {
        getRestaurantInfo();
    },[]);

    async function getRestaurantInfo(){
        const data = await fetch(swiggy_menu_api_URL+resId);
        const json = await data.json(); 
        setRestaurant(json.data?.cards[2]?.card?.card?.info);

        const itemCards = json.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards;

        const mappedData = itemCards
            .filter(e => e && e.card && e.card.info) // Filter out undefined elements
            .map(e => e.card.info);

        setRestaurantMenu(mappedData);
    }

    return [restaurant, restaurantMenu];
}

export default useResMenu;