import React, { useState } from 'react';
import { CustomArticle, CreateArticle } from './CustomArticle'; 
import './Blog.css';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import Skeleton from './Skeleton';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../../redux/slices/article';

function ComponentBlog() {
    const [numOfRow, setNumOfRow] = useState(1);
    const [numOfElement, setNumOfElement] = useState(2);
    const [activeRow, setActiveRow] = useState(-1);
    const [activeElement, setActiveElement] = useState(-1);

    const loadMore = () => {
        const remainingArticles = articles.items.length - (2 + (numOfRow - 1) * 4);
        if (remainingArticles > 0) {
            setNumOfRow(prevRows => prevRows + 1);
            setNumOfElement(prevElements => prevElements + 4);
        }
    };

    const resetToInitialState = () => {
        setNumOfRow(1);
        setNumOfElement(2);
        setActiveRow(-1);
        setActiveElement(-1);
    };

    const dispatch = useDispatch();
    const { articles } = useSelector(state => state.articles);
    const userData = useSelector((state) => state.auth.data)
    
    const isArticlesLoading = articles.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    return (
        <section className='section-blog' id="blog">
            <div className='section-content-blog'>
                <header className='section-blog-header'>
                    <div className='section-blog-headername'>
                        <h2>Блог<br /> Екологічний спосіб життя</h2>
                    </div>
                </header>
                <section className='section-blog-articles'>
                    <section className='section-blog-articles-content'>
                        {Array.from({ length: numOfRow }).map((_, index) => (
                            <div className={`row${index} ${(index === activeRow) ? "active-row" : ""}`} key={index}>
                                {(!isArticlesLoading) ? (
                                    (index === 0) ? (
                                        <>
                                            <CustomArticle key={0} data={articles.items.slice(0, 2)} row={index}
                                            actRow={activeRow} actElem={activeElement} setRow={setActiveRow} setCol={setActiveElement} isEditable={userData}/> 
                                            <div className="create-article" key={2} row={index} 
                                            actRow={activeRow} actElem={activeElement} setRow={setActiveRow} setCol={setActiveElement}>
                                                <CreateArticle />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <CustomArticle key={index} data={articles.items.slice((index * 4) - 2, (index * 4) + 2)} row={index}
                                            actRow={activeRow} actElem={activeElement} setRow={setActiveRow} setCol={setActiveElement} isEditable={userData}/>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <Skeleton />
                                        <Skeleton />
                                        <div className="create-article" key={2} row={index} 
                                            actRow={activeRow} actElem={activeElement} setRow={setActiveRow} setCol={setActiveElement}>
                                                <CreateArticle />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </section>
                    <section className='section-blog-articles-button'>
                        <div></div>
                        <div className='section-blog-articles-button-add'>
                            <button type='submit' className='downloadMore' onClick={loadMore}>Завантажити ще</button>
                        </div>
                        <div className='section-blog-articles-button-back'>
                            <a href="/#blog">
                                <button 
                                    type='submit'  
                                    className='returnButton'
                                    onClick={resetToInitialState} 
                                    style={{ visibility: numOfRow > 1 ? 'visible' : 'hidden' }}>
                                        <Icon icon="ri:arrow-go-back-fill"/>
                                </button>
                            </a>
                        </div>
                    </section>
                </section>
            </div>
        </section>
    );
}

export default ComponentBlog;

