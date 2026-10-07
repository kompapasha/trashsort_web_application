import './Form.css';
import { useDispatch } from 'react-redux';
import { deleteUserAccount, logout } from '../../redux/slices/auth';
import axios from '../../axios';

function LeaveLoginFormPart( {setCurrentWindow} ) {
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if(window.confirm("Ви дійсно бажаєте вийти")) {
      dispatch(logout());
      window.localStorage.setItem('token', '');
      setCurrentWindow("login");
    }
  }

  const onClickDelete = async() => {
    if (window.confirm("Ви дійсно бажаєте видалити свій акаунт? Цю дію не можна буде скасувати.")) {
      try {
        await dispatch(deleteUserAccount()).unwrap();
        window.localStorage.setItem('token', '');
        setCurrentWindow("login");
      } catch (error) {
        console.error('Не вдалося видалити акаунт', error);
        alert('Помилка при видаленні акаунта');
      }
    }
  }

  return (
    <div className='login-leave-form'>
        <button onClick={onClickLogout}>Вийти з аккаунта</button>
        <button onClick={onClickDelete}>Видалити аккаунт</button>
    </div>
  );
}

export default LeaveLoginFormPart;


/*
    
*/
