import { ITEM_IMG_CDN_URL } from "../config"

const FoodItem = ({ imageId, name, description, price}) => {
    return (
        <div className="w-50 h-50 p-2 m-2 shadow-lg bg-pink-50 ">
            <img src={ITEM_IMG_CDN_URL + imageId}/>
            <h2 className="font-bold text-xl">{name}</h2>
            <h3>{description}</h3>
            <h4>Rupees: {price/100}</h4>
        </div>
    );
}

export default FoodItem