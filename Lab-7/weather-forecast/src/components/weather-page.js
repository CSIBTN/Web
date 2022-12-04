import { React, useEffect } from 'react'
import './weather.css'
import axios from 'axios'
import api_key from './api_key'
import { useCookies } from 'react-cookie';
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

let weather
let current = 0
let WeatherBlock = ({ weatherData }) => {
    console.log("Data passed" + weatherData)
    if (weatherData == undefined) {
        return (
            <section className='weatherBlock'>
                <span className='weatherSpan'>Weather Description: waiting for you coordinates</span>
                <span className='weatherSpan'>Temperature: </span>
                <div className='temperatureBlock'>
                    <span className='weatherSpan'>Max temperature: 0.0</span>
                    <span className='weatherSpan'>Min temperature:  0.0</span>
                    <span className='weatherSpan'>Avg temperature:  0.0</span>
                </div>
                <span className='weatherSpan'>Wind speed: 0.0</span>
                <span className='weatherSpan'>Humidity:  0.0</span>
                <span className='weatherSpan'>Rain chance: 0.0% </span>
                <span className='weatherSpan'>Snow chance: 0.0% </span>
            </section >
        )
    } else {
        return (
            <section className='weatherBlock'>
                <span className='weatherSpan'>Weather Description: {weatherData.description} {<img src={weatherData.weatherIcon} className="weatherIcon"></img>}</span>
                <span className='weatherSpan'>Temperature:  </span>
                <div className='temperatureBlock'>
                    <span className='weatherSpan'>Max temperature: {weatherData.temperatureMax} </span>
                    <span className='weatherSpan'>Min temperature: {weatherData.temperatureMin} </span>
                    <span className='weatherSpan'>Avg temperature: {weatherData.temperatureAvg} </span>
                </div>
                <span className='weatherSpan'>Wind speed: {weatherData.windSpeedMax} </span>
                <span className='weatherSpan'>Humidity: {weatherData.humidity} </span>
                <span className='weatherSpan'>Rain chance: {weatherData.rainChance}% </span>
                <span className='weatherSpan'>Snow chance: {weatherData.snowChance}% </span>
            </section >
        )
    }
}

const Weather = () => {
    const [cookies] = useCookies(['user'])
    const navigate = useNavigate()

    useEffect(() => {
        if (!cookies.isLoggedIn) {
            navigate("/")
        }
    }, [cookies])


    const [weatherBlock, setStateWeather] = useState(() => {
        return <WeatherBlock weatherData={undefined} />
    })
    let latitude = useRef(null)
    let longitude = useRef(null)


    async function getWeather(latitude, longitude) {
        weather = []
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${latitude},${longitude}&days=5`)
            .then(res => {

                let weatherForecastRef = res.data.forecast.forecastday

                for (let i = 0; i < 5; i++) {
                    let weekDayWeather = weatherForecastRef[i].day
                    console.log(weatherForecastRef[i].day)

                    let weatherObject =
                    {
                        description: weekDayWeather.condition.text,
                        weatherIcon: weekDayWeather.condition.icon,
                        temperatureMax: weekDayWeather.maxtemp_c,
                        temperatureMin: weekDayWeather.mintemp_c,
                        temperatureAvg: weekDayWeather.avgtemp_c,
                        humidity: weekDayWeather.avghumidity,
                        windSpeedMax: weekDayWeather.maxwind_kph,
                        rainChance: weekDayWeather.daily_chance_of_rain,
                        snowChance: weekDayWeather.daily_chance_of_snow
                    }
                    console.log(weatherObject)
                    weather.push(weatherObject)
                }
            })
            .catch(error => {
                alert(error)
            })
    }



    let onSubmitButton = async (e) => {
        e.preventDefault()
        console.log("WORKS")
        await getWeather(latitude.current.value, longitude.current.value)
        setStateWeather(() => {
            return <WeatherBlock weatherData={weather[current]} />
        })
    }

    let leftArrowOnClick = () => {
        if (current > 0) {
            current--
            setStateWeather(() => {
                return <WeatherBlock weatherData={weather[current]} />
            })
        }
    }
    let rightArrowOnClick = () => {
        if (current < 4) {
            current++
            setStateWeather(() => {
                return <WeatherBlock weatherData={weather[current]} />
            })
        }
    }

    return (
        <section >
            <header>
                <div className='logoBlock'>
                    <h1 className='logoText'>WeatherIo</h1>
                    <img className="logo" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Circle-icons-weather.svg/512px-Circle-icons-weather.svg.png'
                        alt='weatherLogo'></img>
                </div>
            </header>
            <main>
                <div className='coordinatesBlock'>
                    <section>
                        <section className='coordinatesField' >
                            <span></span>
                            <label htmlFor="latitude">Latidute</label>
                            <input ref={latitude} className="coordinatesInput" id="latitude" type="text" placeholder='xxx.xxx' required></input>
                            <label htmlFor="longitude">Longitude</label>
                            <input ref={longitude} className="coordinatesInput" id="longitude" type="text" placeholder='xxx.xxx' required></input>
                            <button type='sumbit' className='searchButton' onClick={onSubmitButton}> Search for weather</button>
                        </section>
                    </section>
                </div >
                <section className='weatherList'>
                    <img onClick={leftArrowOnClick} className="arrow arrowLeft" src='https://cdn2.iconfinder.com/data/icons/simple-circular-icons-filled/78/Left_Carrot_Filled-512.png' alt='left arrow'></img>
                    {weatherBlock}
                    <img onClick={rightArrowOnClick} className="arrow arrowRight" src="https://cdn-icons-png.flaticon.com/512/17/17437.png" alt='right arrow'></img>
                </section>
            </main>
        </section>
    )
}

export default Weather
