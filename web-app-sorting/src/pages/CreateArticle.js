import React from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import MyNavigator from '../components/headerComp/NavHeader'
import FullArticleComponent from '../components/blogComp/FullBlog'
import EditorComponent from '../components/articleEditor/Editor'
import './FullArticle.css'

function CreateArticle() {
    return (
        <>
            <div className='small-header-window'>
                <MyNavigator/>
            </div>
            <EditorComponent />
        </>
    )
}

export default CreateArticle;