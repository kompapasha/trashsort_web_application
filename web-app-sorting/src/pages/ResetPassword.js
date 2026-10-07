import React, { useState } from 'react';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';
import './FullArticle.css'
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { fetchResetPassword } from '../redux/slices/auth';

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

function ResetArticlePage() {
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { register, handleSubmit, setError, formState: { errors, isValid }, } = useForm({
      defaultValues: {
        newPassword1: '',
        newPassword2: '',
      },
      mode: 'onChange',
  });
  axios.defaults.withCredentials = true;

  const onSubmit = async (values) => {
      if (values.newPassword1 !== values.newPassword2) {
          alert("Паролі не співпадають");
          return;
      }
      try {
          const response = await dispatch(fetchResetPassword({ id, token, password: values.newPassword1 }));
          console.log('Response payload:', response.payload); // Додано логування
          if (response.payload.success) {
              alert("Пароль успішно змінено");
              navigate('/');
          } else {
              alert("Сталася помилка при зміні пароля");
          }
      } catch (err) {
          console.log('Error:', err); // Додано логування
          alert("Сталася помилка при зміні пароля");
      }
  }

    return (
        <div className="remember-password-form">
            <div className='login-popup-content'>
                <div>
                    <h2>Новий пароль</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField 
                        variant="outlined" 
                        label="Новий пароль" 
                        type="password" 
                        className={`${classes.input} input-form`}
                        error={Boolean(errors.newPassword1?.message)}
                        helperText={errors.newPassword1?.message}
                        {...register('newPassword1', {required: "Вкажіть пароль"})}
                        fullWidth
                    />
                    <TextField 
                        variant="outlined" 
                        label="Підтвердіть новий пароль" 
                        type="password" 
                        className={`${classes.input} input-form`}
                        error={Boolean(errors.newPassword2?.message)}
                        helperText={errors.newPassword2?.message}
                        {...register('newPassword2', {required: "Вкажіть пароль"})}
                        fullWidth
                    />
                    <button disabled={!isValid}>Оновити</button>
                    <div className='change-process-form'> 
                        <a href="#" onClick={() => navigate('/')}>Назад</a>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetArticlePage;