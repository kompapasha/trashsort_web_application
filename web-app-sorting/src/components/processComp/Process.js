import './Process.css';
import myPicture from './picture/8d0c057425df79b58a9742ed12aab66d.jpg';

function ComponentProcess() {
    return(
        <section className='section-process' id="process">
            <div className='section-content-process'>
                <section className='section-process-first'>
                    <section className='section-process-content'>
                        <header className='section-process-header'>
                            <h2>Процес переробки</h2>
                        </header>
                        <section className='section-process-header-text'>
                            <p>Процес переробки сміття — це складний процес, який включає в себе кілька етапів, спрямованих на зменшення обсягів відходів та їх перетворення в корисні ресурси. Ось декілька ключових етапів у цьому процесі</p>
                        </section>
                    </section>
                </section>
                <section className='section-process-second'>
                    <section className='section-process-content'>
                        <section className='section-process-text'>
                            <p><span>Сортування сміття</span> на різні категорії, такі як пластик, скло, метал, папір, органічні відходи тощо</p>
                        </section>   
                    </section>   
                </section>                       
                <section className='section-process-third'>
                    <section className='section-process-content'>
                        <section className='section-process-text'>
                            <p>Після сортування сміття йде на <span>переробку</span>. Різні матеріали переробляються за різними технологіями</p>
                        </section>   
                    </section>       
                </section>   
                <section className='section-process-forth'>
                    <section className='section-process-content'>
                        <section className='section-process-text'>
                            <p>Деякі відходи, які неможливо або нецільно переробити, піддаються <span>утилізації</span></p>
                        </section>   
                    </section>     
                </section>
                <section className='section-process-fifth'>
                    <section className='invis-container'></section>
                    <section className='section-process-content'>
                        <section className='section-process-text'>
                            <p>Після переробки деякі матеріали можуть бути <span>вторинно перероблені</span>. Наприклад, папір може бути перероблений у картон або папір для друку</p>
                        </section>   
                    </section>   
                </section>      
                <section className='section-process-sixth'>
                    <section className='section-process-content'>
                        <section className='section-process-text'>
                            <p>Органічні відходи, такі як їжа або рослинні залишки, можуть бути <span>компостовані</span>, тобто розкладені під впливом мікроорганізмів у високоякісний органічний компост</p>
                        </section>   
                    </section>     
                </section>   
                <section className='section-process-seventh'>
                    <section className='section-process-picture'>
                        <img src={myPicture} alt="picture1" width={600} height={400}/>
                    </section>       
                </section>   
            </div>
        </section>
    )
}

export default ComponentProcess;

/**
 * 
 * <section className='section-element-first'>
                    <figure className='section-element'>
                        <img src={firstPic} alt='picture1' width={900} height={400}/>
                        <figcaption>
                            <h3>Екогологічна чистота</h3>
                            <div className='hiddensection'>
                                <p>Переробка сміття зменшує відходи, що потрапляють в природу, зменшуючи забруднення повітря, води та ґрунту</p>
                            </div>
                        </figcaption>
                    </figure>
                </section>
                <section className='section-element-second'>
                    <figure className='section-element'>
                        <img src={secondPic} alt='picture2' width={900} height={400}/>
                        <figcaption>
                            <h3>Створення робочих місць</h3>
                            <div className='hiddensection'>
                                <p>Промислові підприємства, що займаються переробкою, створюють нові робочі місця та сприяють економічному зростанню у регіоні</p>
                            </div>
                        </figcaption>
                    </figure>
                </section>
                <section className='section-element-third'>
                    <header className="section-element-header">
                        <h2>Вигоди для суспільства від переробки сміття</h2>
                    </header>
                    <section>
                        <p>Переробка сміття є символом змін у менталітеті суспільства щодо ставлення до відходів та довкілля загалом. Вона підтримує ідею відповідального споживання та відновлювального розвитку, що сприяє побудові більш стійкого майбутнього для нас та майбутніх поколінь</p>
                    </section>
                </section>
                <section className='section-element-forth'>
                    <figure className='section-element'>
                        <img src={thirdPic} alt='picture3' width={900} height={400}/>
                        <figcaption>
                            <h3>Зниження викидів</h3>
                            <div className='hiddensection'>
                                <p>За допомогою переробки можна зменшити кількість викидів та відходів, які потрапляють у природне середовище, тим самим зберігаючи його біорізноманіття</p>
                            </div>
                        </figcaption>
                    </figure>
                </section>
                <section className='section-element-fifth'>
                    <figure className='section-element'>
                        <img src={forthPic} alt='picture4' width={900} height={400}/>
                        <figcaption>
                            <h3>Енергозбереження</h3>
                            <div className='hiddensection'>
                                <p>Виробництво з вторинної сировини вимагає менше енергії, зберігаючи енергетичні ресурси</p>
                            </div>
                        </figcaption>
                    </figure>
                </section>
 * 
 * 
 */