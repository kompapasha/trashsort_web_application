import React from 'react'
import './FullBlog.css'
import pic1 from './picture/pic2.jpg'
import ReactMarkdown from 'react-markdown'


function FullArticleComponent( {data} ) {
    return (
        <div className="full-article">
            {(data.imageUrl) && <img src={`http://localhost:4444${data.imageUrl}`} alt="Article" className="article-image" />}
            <div className="article-details">
                <div className="author-info">
                    <img src={pic1} alt="Author" className="author-avatar" />
                    <span className="author-name">{data.user.fullName}</span>
                </div>
                <div className="article-meta">
                    <span className="article-date">{data.createdAt}</span>
                </div>
                <h1 className="article-title">{data.title}</h1>
                <p className="article-content">{<ReactMarkdown children={data.text} />}</p>
            </div>
        </div>
    )
}

export default FullArticleComponent;
