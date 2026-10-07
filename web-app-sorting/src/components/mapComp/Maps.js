import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import 'leaflet/dist/leaflet.css'; 
import './Maps.css'
import axios from '../../axios';
import { Icon, divIcon, point } from 'leaflet';
import Control from 'react-leaflet-custom-control'
import myIcon from './pictures/maps-and-flags.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces, setFilteredPlaces } from '../../redux/slices/markers';
//import { Icon } from '@mui/material';

function ComponentMaps() {
    const dispatch = useDispatch();
    const { sortPlaces } = useSelector((state) => state.sortPlaces);
    const isMarkersLoading = sortPlaces.status === 'loading';
    const [filterMenuIsOpen, setFilterMenuIsOpen] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState('');

    const customIcon = new Icon({
        iconUrl: myIcon,
        iconSize: [38, 38]
    })

    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
            className: `custom-marker-cluster`,
            iconSize: point(33, 33, true)
        })
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(fetchPlaces());
                const response = await axios.get('https://overpass-api.de/api/interpreter?data=[out:json];area[name="Київ"];node(area)[amenity=recycling];out;');
                const places = response.data.elements.filter(center => {
                    return Object.keys(center.tags).some(key => key.startsWith('recycling:'));
                })
                await axios.post('/sort-places', places);
            } catch (error) {
                console.error('Error fetching and posting data:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleFilterSubmit = async () => {
        if (selectedCategory === '') {
            // Якщо категорія не обрана, отримати всі місця
            dispatch(fetchPlaces());
        } else {
            try {
                dispatch(setFilteredPlaces(selectedCategory)); 
            } catch (error) {
                console.error('Error fetching category places:', error);
            }
        }
    };

    return (
        <section className='section-maps' id="maps">
            <div className='section-content-maps'>
                <header className='section-content-maps-header'>
                    <h2>Пункти переробки сміття у місті <span>Києві</span></h2>
                </header>
                
                <div className='mymaps-container'>
                    <MapContainer center={[50.4503489, 30.5216889]} zoom={13} className='mymaps-map'>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Control prepend position='topright'>
                            {(filterMenuIsOpen) 
                            ? 
                            <div className='filter-menu'>
                                <button type='button' className='filter-button' onClick={() => setFilterMenuIsOpen(false)}>Вийти</button>
                                <form className='filter-list' onSubmit={(e) => { e.preventDefault(); handleFilterSubmit(); }}>
                                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className='filter-options'>
                                        <option value="">Всі</option>
                                        <option value="glass_bottles">Скляні бутлі</option>
                                        <option value="paper">Папір</option>
                                        <option value="plastic">Пластик</option>
                                        <option value="PET">Поліетилен</option>
                                        <option value="plastic_bottles">Пластикові бутлі</option>
                                        <option value="plastic_packaging">Пластикова упаковка</option>
                                        <option value="glass">Скло</option>
                                        <option value="light_bulbs">Лампочки</option>
                                        <option value="thermometers">Термомерти</option>
                                        <option value="batteries">Батарейки</option>
                                        <option value="fluorescent_tubes">Люмінесцентні трубки</option>
                                        <option value="hydrargyrum">Гідраргірум</option>
                                        <option value="beverage_cartons">Упаковки для напоїв</option>
                                        <option value="shoes">Взуття</option>
                                        <option value="cans">Банки</option>
                                        <option value="low_energy_bulbs">Лампи низької енергії</option>
                                        <option value="clothes">Одяг</option>
                                        <option value="cardboard">Картон</option>
                                        <option value="lamps">Лампи</option>
                                        <option value="small_electrical_appliances">Малі електроприлади</option>
                                        <option value="tetrapak">Спеціальні упаковки</option>
                                        <option value="scrap_metal">Металобрухт</option>
                                        <option value="aluminium_cans">Алюмінієві банки</option>
                                    </select>
                                    <button type="submit" className='filter-search'>Пошук</button>
                                </form>
                            </div>
                            : 
                            <button 
                                type='submit' 
                                onClick={() => setFilterMenuIsOpen(true)}
                                className='filter-button'
                            >Фільтр   
                            </button>}
                        </Control>
                        <MarkerClusterGroup
                            chunkedLoading
                            iconCreateFunction={createCustomClusterIcon}
                        >
                            {!isMarkersLoading && sortPlaces.items.map(place => {
                                const { cordinates, tags } = place;
                                return (
                                    <Marker key={place.id} position={cordinates} icon={customIcon}>
                                        <Popup className='mymaps-map-popup'>
                                            <h4>{place?.name}</h4>
                                            <p>Адреса: {place?.address || 'не вказано'}. </p>
                                            <p>Додаткова інформація: {place?.description || 'не вказано'}. </p>
                                            <ul>
                                                <p>Сировина для переробки:</p>
                                                {(place?.sortCategories.join(", ").includes("glass_bottles")) && <li>"Скляні бутлі; "</li>}
                                                {(place?.sortCategories.join(", ").includes("paper")) && <li>"Папір; "</li>}
                                                {(place?.sortCategories.join(", ").includes("plastic")) && <li>"Пластик; "</li>}
                                                {(place?.sortCategories.join(", ").includes("PET")) && <li>"Поліетилен; "</li>}
                                                {(place?.sortCategories.join(", ").includes("plastic_bottles")) && <li>"Пластикові бутлі; "</li>}
                                                {(place?.sortCategories.join(", ").includes("plastic_packaging")) && <li>"Пластикова упаковка; "</li>}
                                                {(place?.sortCategories.join(", ").includes("glass")) && <li>"Скло; "</li>}
                                                {(place?.sortCategories.join(", ").includes("light_bulbs")) && <li>"Лампочки; "</li>}
                                                {(place?.sortCategories.join(", ").includes("thermometers")) && <li>"Термомерти; "</li>}
                                                {(place?.sortCategories.join(", ").includes("batteries")) && <li>"Батарейки; "</li>}
                                                {(place?.sortCategories.join(", ").includes("fluorescent_tubes")) && <li>"Люмінесцентні трубки; "</li>}
                                                {(place?.sortCategories.join(", ").includes("hydrargyrum")) && <li>"Гідраргірум; "</li>}
                                                {(place?.sortCategories.join(", ").includes("beverage_cartons")) && <li>"Упаковки для напоїв; "</li>}
                                                {(place?.sortCategories.join(", ").includes("shoes")) && <li>"Взуття; "</li>}
                                                {(place?.sortCategories.join(", ").includes("cans")) && <li>"Банки; "</li>}
                                                {(place?.sortCategories.join(", ").includes("low_energy_bulbs")) && <li>"Лампи низької енергії; "</li>}
                                                {(place?.sortCategories.join(", ").includes("clothes")) && <li>"Одяг; "</li>}
                                                {(place?.sortCategories.join(", ").includes("cardboard")) && <li>"Картон; "</li>}
                                                {(place?.sortCategories.join(", ").includes("lamps")) && <li>"Лампи; "</li>}
                                                {(place?.sortCategories.join(", ").includes("small_electrical_appliances")) && <li>"Малі електроприлади; "</li>}
                                                {(place?.sortCategories.join(", ").includes("tetrapak")) && <li>"Спеціальні упаковки; "</li>}
                                                {(place?.sortCategories.join(", ").includes("scrap_metal")) && <li>"Металобрухт; "</li>}
                                                {(place?.sortCategories.join(", ").includes("aluminium_cans")) && <li>"Алюмінієві банки; "</li>}
                                            </ul>
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </MarkerClusterGroup>
                    </MapContainer>
                </div>
            </div>
        </section>
    );
}
export default ComponentMaps;

/*
                <MapContainer center={[50.4503489, 30.5216889]} zoom={13} className='mymaps-map'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[50.4503489, 30.5216889]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                </MapContainer>
*/

/*
                <section className='section-content-maps-districts'>
                    <section className='section-content-maps-districts-buttons'>
                        <button className='active' href='#'>Солом'янський</button>
                        <button href='#'>Голосіївський</button>
                        <button href='#'>Шевченківський</button>
                        <button href='#'>Подільський</button>
                        <button href='#'>Оболонський</button>
                        <button href='#'>Деснянський</button>
                        <button href='#'>Печерський</button>
                        <button href='#'>Дарницький</button>
                        <button href='#'>Дніпровський</button>
                        <button href='#'>Святошинський</button>
                        <button href='#'>Осокорки</button>
                    </section>
                </section>
*/