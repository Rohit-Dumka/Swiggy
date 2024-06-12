import { Link, useNavigate } from 'react-router-dom';
import {useOnline} from '../Hooks/useOnline';
import { useEffect } from "react";
import useLocalStorage from '../Hooks/useLocalStorage';
import useAuth from '../Hooks/useAuth';
import {useSelector} from 'react-redux';
import logo from '../assests/img/logo.png'

const Title = () => (
    <Link to="/">
        <img 
            data-testid="logo"
            className="logo h-20 w-auto mx-auto"
            src={logo}
            // src="https://tse4.mm.bing.net/th?id=OIP.3U0azej8Iu1A-846zebpmgHaES&pid=Api&P=0&h=220" 
            alt="logo"
            title = "Food Village"
        />
    </Link>
)

const Header = () =>{
    const navigate = useNavigate();
    // call custom hook for getting localstorage of user
    const [getLocalStorage, clearLocalStorage] = useLocalStorage("user");
    //call custom hook to check user is logged in or not
    const [isLoggedin, setIsLoggedin] = useAuth();

    const cartItems = useSelector(store => store.cart.items);
    console.log(cartItems);

    useEffect(()=>{
        if(getLocalStorage === null)
            setIsLoggedin(false);
    },[getLocalStorage])

    const isOnline = useOnline();    
    return (
        <div className="header">
            <Title/>
            {/* {if user is logged in then display the userName} */}
            {isLoggedin && <div className="user-name">Hi {getLocalStorage?.userName}!</div>}
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="instamart">Instamart</Link>
                    </li>
                    <li>
                        <Link to="/cart" data-testid='cart'>Cart- {cartItems.length} items</Link>
                    </li>
                    <li>
                    <i className="fa-solid fa-cart-shopping"></i>
                    </li>
                    <li className='flex flex-wrap'>
                        {/*additional rendering for login and logout*/}
                        <h3 data-testid="online-status" className=''>{isOnline?"🟢":"🔴"}</h3>
                        {isLoggedin ? (
                            <button className="logout-btn"
                                onClick={() =>{
                                    clearLocalStorage()
                                    setIsLoggedin(false);
                                }}
                            >
                                Logout<span className={isOnline?"login-btn-green": "login-btn-red"}>●</span>
                            </button>
                        ):(
                            <button
                                className="login-btn"
                                onClick={()=>navigate('/login')}
                            >
                                Login <span className={isOnline? "login-btn-green":"login-btn-red"}>●</span>
                            </button>
                        )}
                    </li>
                </ul>
            </div> 
        </div>
    );
}

export default Header;