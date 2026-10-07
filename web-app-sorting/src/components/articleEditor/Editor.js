import './Editor.css';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { TextField } from '@mui/material';
import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';

const EditorComponent = () => {
    const isAuth = useSelector(selectIsAuth);
    const { id } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputFileRef = useRef(null);
    const titleRef = useRef(null);
    const forEditing = Boolean(id);

    const handleFile = useCallback(async (event) => {
        try {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (err) {
            console.log(err);
            alert("Помилка завантаження файлу");
        }
    }, []);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            const fields = {
                title,
                text,
                imageUrl
            };
            const { data } = forEditing 
                ? await axios.patch(`/articles/${id}`, fields) 
                : await axios.post('/articles', fields);
            const _id = forEditing ? id : data._id;
            navigate(`/posts/${_id}`);
        } catch (err) {
            console.log(err);
            alert("Помилка створення статті");
        } finally {
            setIsLoading(false);
        }
    }, [title, text, imageUrl, forEditing, id, navigate]);

    const onClickRemoveImage = useCallback(() => {
        setImageUrl('');
    }, []);

    const handleTitleChange = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const handleTextChange = useCallback((value) => {
        setText(value);
    }, []);

    const options = useMemo(() => ({
        spellChecker: false,
        maxHeight: "400px",
        placeholder: "",
        autofocus: true,
        status: false,
        autosave: {
            enabled: true,
            delay: 1000,
        },
    }), [])

    useEffect(() => {
        if (id) {
            axios.get(`/articles/${id}`).then(({ data }) => {
                setTitle(data.title);
                setText(data.text);
                setImageUrl(data.imageUrl);
                if (titleRef.current) {
                    titleRef.current.focus();
                }
            });
        }
    }, [id]);

    // Зберегти фокус після рендерингу
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus();
        }
    }, [title]);

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className="full-article">
            <div className='full-article-content'>
                <div className='article-add-preview'>
                    <button onClick={() => inputFileRef.current.click()}><span>Завантажити прев'ю</span></button>
                    {imageUrl && (<button onClick={onClickRemoveImage}>Видалити</button>)}
                </div>
                <input type='file' hidden ref={inputFileRef} onChange={handleFile} />
                {imageUrl && (
                    <div className='article-edit-picture'>
                        <img className='images-of-inputed-article' src={`http://localhost:4444${imageUrl}`} alt="Article Picture" />
                    </div>
                )}
                <div className='article-add-article-header'>
                    <TextField 
                        variant="outlined" 
                        label="Введіть назву статті" 
                        type="text"
                        value={title}
                        onChange={handleTitleChange} 
                        fullWidth
                        inputRef={titleRef}
                    />
                </div>
                <div className='article-add-article-text'>
                    <SimpleMdeReact 
                        className='mde-style'
                        options={options}
                        value={text}
                        onChange={handleTextChange}
                    />
                </div>
                <div className='article-submit-preview'>
                    <a href='/'><button>Відмінити</button></a>
                    <button onClick={onSubmit} disabled={isLoading}>{forEditing ? "Змінити" : "Опублікувати"}</button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(EditorComponent);





/*
import './Editor.css'
import React from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios'; 


function EditorComponent() {
    const isAuth = useSelector(selectIsAuth);
    const { id } = useParams();
    const navigate = useNavigate();
    const [text, setText] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const inputFileRef = React.useRef(null);
    const forEditing = Boolean(id);

    const handleFile = async (event) => {
        try {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (err) {
            console.log(err);
            alert("Помилка завантаження файлу");
        }
    }

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const fields = {
                title,
                text,
                imageUrl
            };
            const { data } = forEditing 
                ? await axios.patch(`/articles/${id}`, fields) 
                : await axios.post('/articles', fields);
            const _id = forEditing ? id : data._id;
            navigate(`/posts/${_id}`);
        } catch (err) {
            console.log(err);
            alert("Помилка створення статті");
        } finally {
            setIsLoading(false);
        }
    }

    const onClickRemoveImage = () => {
        setImageUrl('');
    }

    React.useEffect(() => {
        if (id) {
            axios.get(`/articles/${id}`).then(({ data }) => {
                setTitle(data.title);
                setText(data.text);
                setImageUrl(data.imageUrl);
            });
        }
    }, [id]);

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className="full-article">
            <div className='full-article-content'>
                <div className='article-add-preview'>
                    <button onClick={() => inputFileRef.current.click()}><span>Завантажити прев'ю</span></button>
                    {imageUrl && (<button onClick={onClickRemoveImage}>Видалити</button>)}
                </div>
                <input type='file' hidden ref={inputFileRef} onChange={handleFile} />
                {imageUrl && (
                    <div className='article-edit-picture'>
                        <img className='images-of-inputed-article' src={`http://localhost:4444${imageUrl}`} alt="Article Picture" />
                    </div>
                )}
                <div className='article-add-article-header'>
                    <TextField 
                        variant="outlined" 
                        label="Введіть назву статті" 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                </div>
                <div className='article-add-article-text'>
                    <SimpleMdeReact 
                        className='mde-style'
                        options={{
                            spellChecker: false,
                            maxHeight: "400px",
                            placeholder: "",
                            autofocus: true,
                            status: false,
                            autosave: {
                                enabled: true,
                                delay: 1000,
                            },
                        }}
                        value={text}
                        onChange={(value) => setText(value)}
                    />
                </div>
                <div className='article-submit-preview'>
                    <a href='/'><button>Відмінити</button></a>
                    <button onClick={onSubmit} disabled={isLoading}>{forEditing ? "Змінити" : "Опублікувати"}</button>
                </div>
            </div>
        </div>
    );
}

export default EditorComponent;
*/