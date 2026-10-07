import './Form.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth, toggleAuthMenu } from '../../redux/slices/auth';
import LoginFormPart from './LoginPart';
import RegisterFormPart from './RegisterPart';
import LeaveLoginFormPart from './LoginLeave';
import { Icon } from '@iconify/react';
import { RememberLoginFormPartFirst, RememberLoginFormPartLast } from './ForgetPassword';
import { useLocation } from 'react-router-dom';

function ComponentLoginForm() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const [currentWindow, setCurrentWindow] = useState('login');
  const isAuthMenuOpen = useSelector(state => state.auth.isAuthMenuOpen);

  const handleAuthButtonClick = () => {
    dispatch(toggleAuthMenu());
  }

  useEffect(() => {
    if (isAuth) {
      setCurrentWindow("isAuthLogin")
    }
  }, [isAuth, dispatch]);

  return (
    <div className={(isAuthMenuOpen) ? "login-popup" : "opened-pop-up"}>
      <div className="login-popup-content">
          {currentWindow === 'login' && <LoginFormPart setCurrentWindow={setCurrentWindow}/>}
          {currentWindow === 'register' && <RegisterFormPart setCurrentWindow={setCurrentWindow}/>}
          {currentWindow === 'isAuthLogin' && <LeaveLoginFormPart setCurrentWindow={setCurrentWindow}/>}
          {currentWindow === 'rememberPasswordFirst' && <RememberLoginFormPartFirst setCurrentWindow={setCurrentWindow}/>}
        <button onClick={handleAuthButtonClick} className='login-popup-content-button'><Icon icon="mdi:close" /></button>
      </div>
    </div>
  );
}

export default ComponentLoginForm;

