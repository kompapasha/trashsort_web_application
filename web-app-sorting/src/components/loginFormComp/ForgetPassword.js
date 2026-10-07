import { useSelector, useDispatch } from 'react-redux';
import { fetchForgotPassword, fetchUserData, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

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

function RememberLoginFormPartFirst({ setCurrentWindow }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, setError, formState: {errors, isValid}, } = useForm({
        defaultValues: {
          email: '',
        },
        mode: 'onChange',
      });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit = async (values) => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await dispatch(fetchForgotPassword(values.email)).unwrap();
            setSuccessMessage('Лист для відновлення паролю було надіслано на вашу електронну пошту.');
            alert("Лист був відправленний на вказану вами електронну пошту!");
        } catch (error) {
            setErrorMessage('Помилка відправки повідомлення!');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h2>Забув пароль</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField 
                variant="outlined" 
                label="Електронна пошта" 
                type="email" 
                className={`${classes.input} input-form`}
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', {required: "Вкажіть електронну пошту"})}
                fullWidth
            />
            <button disabled={!isValid}>Увійти</button>
            <div className='change-process-form'> 
                <a href="#" onClick={() => setCurrentWindow('register')}>Реєстрація</a>
                <a href="#" onClick={() => setCurrentWindow('login')}>Логін</a>
            </div>
            </form>
        </div>
    )
}

export { RememberLoginFormPartFirst }