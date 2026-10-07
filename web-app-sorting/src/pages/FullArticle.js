import React from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import MyNavigator from '../components/headerComp/NavHeader'
import FullArticleComponent from '../components/blogComp/FullBlog'
import './FullArticle.css'
import FooterComponent from '../components/footerComp/Footer';
import ComponentLoginForm from '../components/loginFormComp/Form';

function FullArticle() {
    const [data, setData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const { id } = useParams();

    console.log(id);

    React.useEffect(() => {
        axios.get(`/articles/${id}`).then(res => {
            setData(res.data);
            setIsLoading(false);
        }).catch(err => {
            console.warn(err);
            alert("Помилка")
        })
    }, [])

    console.log(data);

    return (
        <div className='fullpost-page'>
            <div className='small-header-window'>
                <MyNavigator />
            </div>
            <ComponentLoginForm />
            {(isLoading) ? (
                <></>
            ) : (
                <FullArticleComponent data={data} />
            )}
            <div className='footer-window'>
                <FooterComponent/>
            </div>
        </div>
    )
}

export default FullArticle;


/*

    const [data, setData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const { id }= useParams();

    React.useEffect(() => {
        axios.get(`/articles/${id}`).then(res => {
            setData(res.data);
        }).catch(err => {
            console.warn(err);
            alert("Помилка")
        })
    }, [])

*/