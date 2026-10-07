import './Header.css'
import {useState} from 'react';
import headerPicture from './picture/43a6f8f570c4d515facaac208a3a24d3.jpg'
import MyNavigator from './NavHeader'
import { Icon, InlineIcon } from '@iconify/react';

function HeaderComponent() {

    return (
        <section className='header' id='header'>
            <div className='header-content'>
                <div className='header-content-main'>
                    <img src={headerPicture} alt="MainPicture" width={900} height={600}/>
                    <MyNavigator />
                    <header className='header-maintext'>
                        <h1><span>Важливість</span> <button className='more-to-know'>Дізнатися більше <Icon icon="mdi:arrow-up" /></button><br/><span className='last-span'>переробки сміття</span></h1>    
                    </header>
                    <div className='header-interesting-fact'>
                        <h2 className='fact-header'>Цікавий факт</h2>
                        <div className='fact-text'>
                            <p>Українське підприємство вперше в світі використовує переробку пластику для виробництва дорожніх знаків</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeaderComponent