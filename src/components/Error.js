import { Link, useRouteError } from 'react-router-dom';
import ErrorImage from '../assests/img/ErrorImage.png';

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return (
        <div className='error-page'>
            <img src={ErrorImage} alt='Error image was there' className='error-img'/>
            <h1>Oops!! The page your'e looking for can't be found</h1>
            <h3 className='error-data'>{err.data}</h3>
            <h3 className='error-back-home'>
                <Link to='/'>Go To Home</Link>
            </h3>
        </div>
    )
}

export default Error;