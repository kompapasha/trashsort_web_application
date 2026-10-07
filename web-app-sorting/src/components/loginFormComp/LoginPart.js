import './Form.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, selectIsAuth } from '../../redux/slices/auth';
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

function LoginFormPart( { setCurrentWindow } ) {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: {errors, isValid}, } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const classes = useStyles();
  
  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if(!data.payload) {
      return alert('Не вдалося авторизуватися');
    }
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } 
  }

  return (
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
          <a href="#" onClick={() => setCurrentWindow('register')}>Реєстрація</a>
          <a href="#" onClick={() => setCurrentWindow('rememberPasswordFirst')}>Забув пароль</a>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPart;

/*
      fullName: 'Hello Porche',
      email: 'gsdgdfs@gmail.com',
      password: '1435665',
*/