import './Footer.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth, toggleAuthMenu } from '../../redux/slices/auth';
import { Link, useNavigate } from 'react-router-dom';

function FooterComponent() {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const handleAuthButtonClick = () => {
        dispatch(toggleAuthMenu());
    }
    
    const navigateToHeader = () => {
        navigate('/#header');
    }
    const navigateToProcess = () => {
        navigate('/#process');
    }
    const navigateToBenefits = () => {
        navigate('/#benefits');
    }
    const navigateToBlog = () => {
        navigate('/#blog');
    }
    const navigateToMaps = () => {
        navigate('/#maps');
    }

    return (
        <footer className='footer'>
            <div className='footer-content'>
                <div className='univ-logo'>
                    <a href='#header' onClick={navigateToHeader}><h4>КНУ</h4></a>
                </div>
                <div className='footer-nav'>
                    <nav>
                        <ul>
                        <li><a href="#process" onClick={navigateToProcess}>Процес</a></li>
                        <li><a href="#benefits" onClick={navigateToBenefits}>Вигоди</a></li>
                        <li><a href="#blog" onClick={navigateToBlog}>Блог</a></li>
                        <li><a href="#maps" onClick={navigateToMaps}>Карта</a></li>
                        </ul>
                    </nav>
                </div> 
                <div className='login-button'>
                    <button type="submit" onClick={handleAuthButtonClick}>{(isAuth) ? "Вийти з акаунту" : "Увійти в акаунт"}</button>
                </div>
            </div>
        </footer>
    )
}

export default FooterComponent;