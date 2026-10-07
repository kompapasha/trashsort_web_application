import './NavHeader.css';
import { useState, memo } from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectIsAuth, toggleAuthMenu } from '../../redux/slices/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import pic1 from '../blogComp/picture/pic2.jpg'

function MyNavigation() {
    const isAuth = useSelector(selectIsAuth);
    const [ menuIsOpened, affectMenu ] = useState(false);
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const changeMenuState = () => {
        affectMenu((menu) => !menu);
    }

    const handleAuthButtonClick = () => {
        dispatch(toggleAuthMenu());
    }

    const navigateToHeader = () => {
        navigate('/#header');
        changeMenuState();
    }
    const navigateToProcess = () => {
        navigate('/#process');
        changeMenuState();
    }
    const navigateToBenefits = () => {
        navigate('/#benefits');
        changeMenuState();
    }
    const navigateToBlog = () => {
        navigate('/#blog');
        changeMenuState();
    }
    const navigateToMaps = () => {
        navigate('/#maps');
        changeMenuState();
    }


    return (
        <div className='header-navigation'>
            <div className='univ-logo'>
                <Link to='/' onClick={navigateToHeader}><h4>КНУ</h4></Link>
            </div>
            <nav className='header-navigation-content'>
                <label className="menu-button" for="check" onClick={changeMenuState} >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </label>
                <ul className={(menuIsOpened) ? "opened" : ""}>
                    <div className='univ-logo'>
                        <a href='#header'><h4>КНУ</h4></a>
                    </div>
                    <label className="menu-button" for="check" onClick={changeMenuState}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </label>
                        <li><a href="#process" onClick={navigateToProcess}>Процес</a></li>
                        <li><a href="#benefits" onClick={navigateToBenefits}>Вигоди</a></li>
                        <li><a href="#blog" onClick={navigateToBlog}>Блог</a></li>
                        <li><a href="#maps" onClick={navigateToMaps}>Карта</a></li>
                    <li className='login-button-header' onClick={changeMenuState}>
                        {(isAuth) ? (
                            <button onClick={handleAuthButtonClick}>Вийти з акаунту</button>
                        ) : (
                            <button onClick={handleAuthButtonClick}>Зайти в акаунт</button>
                        )}
                    </li>
                </ul>
            </nav>
            <div className='login-button' onClick={handleAuthButtonClick}>
                {(isAuth) ? (
                    <img src={pic1} alt="fdsf" className='login-button-authorized'/>
                ) : (
                    <Icon icon="mingcute:user-4-line" className='login-button-logo'/>
                )}
            </div>
        </div>
    ); 
}

export default memo(MyNavigation); 

