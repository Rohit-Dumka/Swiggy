import RestaurantCard from "./RestaurantCard";
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import { useOnline } from '../Hooks/useOnline';
import UserOffline from "./userOffline";
import { swiggy_api_URL } from "../config";
import useResData from "../Hooks/useResData";
import { useState } from "react";

const Body = () => {
    const [searchText, setSearchText] = useState("");
    const [errorMessage,searchData,allRestaurants,filteredrestaurants] = useResData(swiggy_api_URL);
    const isOnline = useOnline();

    if(!isOnline){
       return <UserOffline/>
    }

    // if allRestaurants is empty then don't render restaurant cards
    if(!allRestaurants) return null;
    return(
        <>
            <div className="search-container">
                <input 
                    type="text" 
                    className="search-inpuut" 
                    placeholder="Search a restaurant " 
                    value={searchText} 
                    onChange={(e)=>{
                        setSearchText(e.target.value);
                    }}
                />
                <button 
                    className="search-btn"
                    data-testid= "search-btn"
                    onClick={()=>{
                        searchData(searchText,allRestaurants);
                    }}
                >
                    Search
                </button>
            </div>
            {errorMessage && <div className="error-container">{errorMessage}</div>}
            {
                allRestaurants?.length === 0 ? (<Shimmer/>) : (
                    <div className="restaurant-list">
                    {
                        filteredrestaurants.map((restaurant) => {
                            return (
                                <Link 
                                    to={"/restaurant/" + restaurant?.info?.id}
                                    key={restaurant?.info?.id}
                                >  
                                    <
                                        RestaurantCard 
                                        {...restaurant?.info}
                                    />  
                                </Link>
                            );
                        })
                    }
                    </div>
                )
            }
        </>
        
    );
}

export default Body;