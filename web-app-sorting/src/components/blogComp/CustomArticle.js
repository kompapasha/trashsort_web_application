import React from 'react';
import './CustomArticle.css';
import pic2 from './picture/pic2.jpg';
import { Icon } from '@iconify/react';
import { Link, Navigate } from 'react-router-dom';
import Skeleton from './Skeleton'
import { useDispatch } from 'react-redux';
import { fetchRemoveArticle } from '../../redux/slices/article';

function CustomArticle({ 
    data, 
    row, 
    actRow, 
    actElem, 
    setRow, 
    setCol,
    isEditable}) {
    const dispatch = useDispatch();

    const handleChanges = (index) => {
        if(actRow === row && actElem === index) {
            setRow(-1);
            setCol(-1);
        } else {
            setRow(row);
            setCol(index);
        }
    };

    const onClickRemove = (index) => {
        if (window.confirm("Ви дійсно бажаєте видалити цей пост?")) {
            dispatch(fetchRemoveArticle(data[index]._id));
        }
    }

    return (
        <>
            {data.map((dataElement, index) => (
                <article key={dataElement._id} className="blog-article">
                    <div className='blog-article-content'>
                        <div className='blog-article-info'>
                            <div className='blog-article-info-author'>
                                <p>Автор: {dataElement.user.fullName}</p>
                            </div>
                            <div className='blog-article-info-date'>
                                <p>{dataElement.createdAt.split("T")[0]}</p>
                            </div>
                        </div>
                        <div className='blog-article-header'>
                            <h3>{dataElement.title}</h3>
                        </div>
                        <div className='blog-article-more-button'>
                            <Link to={`/posts/${dataElement._id}`}>{(actRow === row && actElem === index) ? "Закрити" : "Читати повністю"} <Icon icon="mdi:arrow-up"/></Link>
                        </div>
                        <div className='person-icon'>
                            <div className='person-icon-content'>
                                <img src={pic2} alt='UserProfilePicture' width={100} height={100}/>
                            </div>
                        </div>
                        {(isEditable?._id === dataElement.user._id) && 
                            <div className='myblog-settings'>
                                <Link to={`/posts/${dataElement._id}/edit`}><button className='button-for-edit'><Icon icon="mdi:edit" /></button></Link>
                                <button onClick={() => onClickRemove(index)} className='button-for-delete'><Icon icon="mdi:delete" /></button>
                            </div>
                        }
                    </div>
                </article>
            ))}
        </>
    );
}

function CreateArticle({ row, actRow, actElem, setRow, setCol }) {
    return (
        <div>
            <header className='create-article-header'>
                <h3>Тут може бути ваша стаття</h3>
            </header>
            <div className='create-article-button'>
                <Link to='/add-post'>Створити <Icon icon="mdi:arrow-up" /></Link>
            </div>
        </div>
    );
}

export { CustomArticle, CreateArticle };



