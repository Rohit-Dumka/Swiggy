import { useEffect, useState } from "react";
import { restaurantList } from "../config";
import { filterData } from "../utils/helper";

const useResData = (swiggy_api_URL)=>{
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredrestaurants, setFilteredRestaurants] = useState(restaurantList);
    const [errorMessage, setErrorMessage] = useState("");

    //using useEffect for one time call getRestaurants using empty dependency array
    useEffect(()=>{
        getRestaurants();
    },[])

        //using searchData() and set condition if data is empty show error message
    const searchData = (searchText,restaurants) => {
        if(searchText !== ""){
            const filteredData = filterData(searchText,restaurants);
            setFilteredRestaurants(filteredData);
            setErrorMessage("");
            if(filteredData?.length === 0){
                setErrorMessage("No matched restaurant found");
            }
        }else{
            setErrorMessage("");
            setFilteredRestaurants(restaurants);
        }
    };

    async function getRestaurants(){
        try {
            const response = await fetch(swiggy_api_URL);
            const json = await response.json();
            async function checkJsonData(jsonData){
                for(let i=0;i<jsonData?.data?.cards.length;i++)
                {
                    //initiate checkData for Swiggy Restaurant data
                    let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                    if(checkData !== undefined){
                        return checkData;
                    } 
                }
            }
            //calling the checkJsonData() function which returns Swiggy Restaurant data
            const resData = await checkJsonData(json);
            setAllRestaurants(resData);
            setFilteredRestaurants(resData);
        } catch (error) {
            console.error(error);
        }
    }
    return(
        [errorMessage,searchData, allRestaurants, filteredrestaurants]
    )
}

export default useResData;