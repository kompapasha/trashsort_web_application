/*
import './LoginForm.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, logout, selectIsAuth, toggleAuthMenu } from '../../../redux/slices/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  input: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white !important', // зміна кольору рамки
      },
      '&:hover fieldset': {
        borderColor: 'white !important', // зміна кольору рамки при наведенні
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white !important', // зміна кольору рамки при фокусі
      },
      '& input': {
        color: 'white', // зміна кольору тексту
      },
      '& input::placeholder': {
        color: 'white', // зміна кольору placeholder
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white', // зміна кольору мітки
    },
  },
});

function ComponentLoginForm() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: {errors, isValid}, } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
 
  const onClickLogout = () => {
    if(window.confirm("Ви дійсно бажаєте вийти")) {
      dispatch(logout());
      window.localStorage.setItem('token', '');
      setCurrentWindow("login");
      //ДОРОБИТИ ТУТ
    }
  }

  const classes = useStyles();
  const [currentWindow, setCurrentWindow] = useState('login');
  const isAuthMenuOpen = useSelector(state => state.auth.isAuthMenuOpen);

  const handleAuthButtonClick = () => {
    dispatch(toggleAuthMenu());
  }

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if(!data.payload) {
      return alert('Не вдалося авторизуватися');
    }
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } 
  }

  const togglePasswordVisibility = (inputId) => {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(toggleAuthMenu());
      setCurrentWindow("isAuthLogin")
    }
  }, [isAuth, dispatch]);


  const renderLoginWindow = () => (
    <div>
      <h2>Вхід в кабінет</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          variant="outlined" 
          label="Електронна пошта" 
          type="email" 
          className={`${classes.input} input-form`} 
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required: 'Вкажіть електронну пошту'})}
          fullWidth
        />
        <TextField 
          variant="outlined" 
          label="Пароль" 
          type="password" 
          className={`${classes.input} input-form`} 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {required: 'Вкажіть пароль'})}
          fullWidth
        />
        <button>Увійти</button>
        <div className='change-process-form'> 
          <p><a href="#" onClick={() => setCurrentWindow('forgotPasswordOne')}>Відновити пароль</a></p>
          <p><a href="#" onClick={() => setCurrentWindow('register')}>Реєстрація</a></p>
        </div>
      </form>
    </div>
  );

  const renderRegisterWindow = () => (
    <div>
      <form action='' method='post'>
        <h2>Реєстрація</h2>
        <TextField variant="outlined" label="Електронна пошта" type="email" className={`${classes.input} input-form`} fullWidth/>
        <TextField variant="outlined" label="Пароль" type="password" className={`${classes.input} input-form`} fullWidth/>
        <button>Зареєструватись</button>
        <div className='change-process-form'>
          <p><a href="#" onClick={() => setCurrentWindow('login')}>Вже є аккаунт</a></p>
        </div>
      </form>
    </div>
  );

  const renderForgotPasswordWindowOne = () => (
    <div>
      <form action='' method='post'>
        <h2>Відновити пароль</h2>
        <TextField variant="outlined" label="Електронна пошта" type="email" className={`${classes.input} input-form`} fullWidth/>
        <button onClick={() => setCurrentWindow('forgotPasswordTwo')}>Відновити пароль</button>
        <div className='change-process-form'>
          <p><a href="#" onClick={() => setCurrentWindow('register')}>Зареєструватись</a></p>
        </div>
      </form>
    </div>
  );

  const renderForgotPasswordWindowTwo = () => (
    <div className='second-forgot-password'>
      <form action='' method='post'>
        <h2>Відновити пароль</h2>
        
        <TextField variant="outlined" label="Пароль" type="password" className={`${classes.input} input-form`} fullWidth/>
        <button type="button" onClick={() => togglePasswordVisibility('passwordInput1')}>Показати пароль</button>
        
        <TextField variant="outlined" label="Пароль" type="password" className={`${classes.input} input-form`} fullWidth/>
        <button type="button" onClick={() => togglePasswordVisibility('passwordInput2')}>Показати пароль</button>
        
        <button>Відновити пароль</button>
      </form>
    </div>
  );

  const loginLeave = () => (
    <div>
      <button onClick={onClickLogout}>Вийти з аккаунта</button>
    </div>
  )


  return (
    <div className={(isAuthMenuOpen) ? "login-popup" : "opened-pop-up"}>
      <div className="login-popup-content">
          {currentWindow === 'login' && renderLoginWindow()}
          {currentWindow === 'register' && renderRegisterWindow()}
          {currentWindow === 'forgotPasswordOne' && renderForgotPasswordWindowOne()}
          {currentWindow === 'forgotPasswordTwo' && renderForgotPasswordWindowTwo()}
          {currentWindow === 'isAuthLogin' && loginLeave()}
        <button onClick={handleAuthButtonClick} className='login-popup-content-button'><span>fsd</span></button>
      </div>
    </div>
  );
}

export default ComponentLoginForm;
*/



/*

function ComponentLoginForm() {
  const [currentWindow, setCurrentWindow] = useState('login');
  const isOpenedPop = useSelector(state => state.isOpenedPopUp)
  const dispatch = useDispatch();

  const togglePasswordVisibility = (inputId) => {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  const renderLoginWindow = () => (
    <div>
      <form action='' method='get'>
        <h2>Вхід в кабінет</h2>
        <input type="email" placeholder="Електронна пошта" />
        <input type="password" placeholder="Пароль" />
        <button>Увійти</button>
        <div className='change-process-form'> 
          <p><a href="#" onClick={() => setCurrentWindow('forgotPasswordOne')}>Відновити пароль</a></p>
          <p><a href="#" onClick={() => setCurrentWindow('register')}>Реєстрація</a></p>
        </div>
      </form>
    </div>
  );

  const renderRegisterWindow = () => (
    <div>
      <form action='' method='post'>
        <h2>Реєстрація</h2>
        <input type="email" placeholder="Електронна пошта" />
        <input type="password" placeholder="Пароль" />
        <button>Зареєструватись</button>
        <div className='change-process-form'>
          <p><a href="#" onClick={() => setCurrentWindow('login')}>Вже є аккаунт</a></p>
        </div>
      </form>
    </div>
  );

  const renderForgotPasswordWindowOne = () => (
    <div>
      <form action='' method='post'>
        <h2>Відновити пароль</h2>
        <input type="email" placeholder="Електронна пошта" />
        <button onClick={() => setCurrentWindow('forgotPasswordTwo')}>Відновити пароль</button>
        <div className='change-process-form'>
          <p><a href="#" onClick={() => setCurrentWindow('register')}>Зареєструватись</a></p>
        </div>
      </form>
    </div>
  );

  const renderForgotPasswordWindowTwo = () => (
    <div className='second-forgot-password'>
      <form action='' method='post'>
        <h2>Відновити пароль</h2>
        
        <input type="password" placeholder="Пароль" id="passwordInput1" />
        <button type="button" onClick={() => togglePasswordVisibility('passwordInput1')}>Показати пароль</button>
        
        <input type="password" placeholder="Повторіть пароль" id="passwordInput2" />
        <button type="button" onClick={() => togglePasswordVisibility('passwordInput2')}>Показати пароль</button>
        
        <button>Відновити пароль</button>
      </form>
    </div>
  );

  return (
    <div className={(isOpenedPop) ? "login-popup" : "opened-pop-up"}>
      <div className="login-popup-content">
        {currentWindow === 'login' && renderLoginWindow()}
        {currentWindow === 'register' && renderRegisterWindow()}
        {currentWindow === 'forgotPasswordOne' && renderForgotPasswordWindowOne()}
        {currentWindow === 'forgotPasswordTwo' && renderForgotPasswordWindowTwo()}
        <button onClick={() => dispatch(isOpenedPopUp())} className='login-popup-content-button'><span>fsd</span></button>
      </div>
    </div>
  );
}

export default ComponentLoginForm;

*/





/*

import './LoginForm.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, logout, selectIsAuth, toggleAuthMenu } from '../../redux/slices/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  input: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white !important', // зміна кольору рамки
      },
      '&:hover fieldset': {
        borderColor: 'white !important', // зміна кольору рамки при наведенні
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white !important', // зміна кольору рамки при фокусі
      },
      '& input': {
        color: 'white', // зміна кольору тексту
      },
      '& input::placeholder': {
        color: 'white', // зміна кольору placeholder
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white', // зміна кольору мітки
    },
  },
});

function ComponentLoginForm() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: {errors, isValid}, } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onClickLogout = () => {
    if(window.confirm("Ви дійсно бажаєте вийти")) {
      dispatch(logout());
      window.localStorage.setItem('token', '');
      setCurrentWindow("login");
      //ДОРОБИТИ ТУТ
    }
  }

  const classes = useStyles();
  const [currentWindow, setCurrentWindow] = useState('login');
  const isAuthMenuOpen = useSelector(state => state.auth.isAuthMenuOpen);

  const handleAuthButtonClick = () => {
    dispatch(toggleAuthMenu());
  }

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if(!data.payload) {
      return alert('Не вдалося авторизуватися');
    }
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } 
  }

  const togglePasswordVisibility = (inputId) => {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(toggleAuthMenu());
      setCurrentWindow("isAuthLogin")
    }
  }, [isAuth, dispatch]);


  const renderLoginWindow = () => (
    <div>
      <h2>Вхід в кабінет</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          variant="outlined" 
          label="Електронна пошта" 
          type="email" 
          className={`${classes.input} input-form`} 
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required: 'Вкажіть електронну пошту'})}
          fullWidth
        />
        <TextField 
          variant="outlined" 
          label="Пароль" 
          type="password" 
          className={`${classes.input} input-form`} 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {required: 'Вкажіть пароль'})}
          fullWidth
        />
        <button>Увійти</button>
        <div className='change-process-form'> 
          <p><a href="#" onClick={() => setCurrentWindow('forgotPasswordOne')}>Відновити пароль</a></p>
          <p><a href="#" onClick={() => setCurrentWindow('register')}>Реєстрація</a></p>
        </div>
      </form>
    </div>
  );

  const renderRegisterWindow = () => (
    <div>
      <form action='' method='post'>
        <h2>Реєстрація</h2>
        <TextField variant="outlined" label="Електронна пошта" type="email" className={`${classes.input} input-form`} fullWidth/>
        <TextField variant="outlined" label="Пароль" type="password" className={`${classes.input} input-form`} fullWidth/>
        <button>Зареєструватись</button>
        <div className='change-process-form'>
          <p><a href="#" onClick={() => setCurrentWindow('login')}>Вже є аккаунт</a></p>
        </div>
      </form>
    </div>
  );

  const renderForgotPasswordWindowOne = () => (
    <div>
      <form action='' method='post'>
        <h2>Відновити пароль</h2>
        <TextField variant="outlined" label="Електронна пошта" type="email" className={`${classes.input} input-form`} fullWidth/>
        <button onClick={() => setCurrentWindow('forgotPasswordTwo')}>Відновити пароль</button>
        <div className='change-process-form'>
          <p><a href="#" onClick={() => setCurrentWindow('register')}>Зареєструватись</a></p>
        </div>
      </form>
    </div>
  );

  const renderForgotPasswordWindowTwo = () => (
    <div className='second-forgot-password'>
      <form action='' method='post'>
        <h2>Відновити пароль</h2>
        
        <TextField variant="outlined" label="Пароль" type="password" className={`${classes.input} input-form`} fullWidth/>
        <button type="button" onClick={() => togglePasswordVisibility('passwordInput1')}>Показати пароль</button>
        
        <TextField variant="outlined" label="Пароль" type="password" className={`${classes.input} input-form`} fullWidth/>
        <button type="button" onClick={() => togglePasswordVisibility('passwordInput2')}>Показати пароль</button>
        
        <button>Відновити пароль</button>
      </form>
    </div>
  );

  const loginLeave = () => (
    <div>
      <button onClick={onClickLogout}>Вийти з аккаунта</button>
    </div>
  )


  return (
    <div className={(isAuthMenuOpen) ? "login-popup" : "opened-pop-up"}>
      <div className="login-popup-content">
          {currentWindow === 'login' && renderLoginWindow()}
          {currentWindow === 'register' && renderRegisterWindow()}
          {currentWindow === 'forgotPasswordOne' && renderForgotPasswordWindowOne()}
          {currentWindow === 'forgotPasswordTwo' && renderForgotPasswordWindowTwo()}
          {currentWindow === 'isAuthLogin' && loginLeave()}
        <button onClick={handleAuthButtonClick} className='login-popup-content-button'><span>fsd</span></button>
      </div>
    </div>
  );
}

export default ComponentLoginForm;

*/