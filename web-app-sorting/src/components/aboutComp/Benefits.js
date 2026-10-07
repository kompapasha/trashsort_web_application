import './Benefits.css'
import { useState } from 'react';
import firstPic from './pictures/picture1.jpg';
import secondPic from './pictures/picture2.jpg';
import thirdPic from './pictures/picture3.jpg';
import forthPic from './pictures/picture4.jpg';

function ComponentBenefits() {
    return(
        <section className='section-benefits' id="benefits">
            <div className='section-content-benefits'>
                <section className='section-element-first'>
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
            </div>
        </section>
    )
}

export default ComponentBenefits;