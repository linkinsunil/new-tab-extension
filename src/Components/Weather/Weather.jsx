import { useState } from 'react';
import './Weather.css';

function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [message, setMessage] = useState('');
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [showbar, setShowbar] = useState(false);

  const apiURL = 'https://api.openweathermap.org/data/2.5/';
  const apiKey = 'd5c84df1a22993f9aabf79751f8f105f';

  const handleSearch = async e => {
    e.preventDefault();
    if (query) {
      try {
        setLoadingWeather(true);
        const response = await fetch(
          `${apiURL}weather?q=${query}&units=metric&APPID=${apiKey}`
        );
        console.log(response);
        if (response.status !== 200) {
          console.log('Something went wrong', response.status);
          setWeather('');
          setLoadingWeather('');
          setQuery('');
          return false;
        }
        const data = await response.json();
        setLoadingWeather(false);
        setWeather(data);
        setQuery('');
        setShowbar(false);

        console.log(data);
      } catch (err) {
        console.log('⛔', err);
        setMessage('⛔', err.message);
      }
    } else {
      setMessage('Enter a valid city name');
    }
  };

  const setInputRefFocus = input => {
    if (input != null) {
      input.focus();
    }
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const openSearchBox = () => {
    setShowbar(true);
  };

  const closeSearchBox = () => {
    setShowbar(false);
  };

  return (
    <div
      className={`weather ${
        weather && weather.main.temp > 30 && 'weather-warm'
      }`}
    >
      <div className={`search-box ${showbar ? 'bar-shown' : 'bar-hide'}`}>
        <form onSubmit={handleSearch}>
          <input
            type='text'
            className='search-bar'
            placeholder='Search for a city'
            onChange={handleChange}
            value={query}
            ref={setInputRefFocus}
          />
        </form>
        <button className='btn-close' onClick={closeSearchBox}>
          X
        </button>
      </div>
      <button
        className='btn-search'
        style={{ opacity: showbar ? '0' : '1' }}
        onClick={openSearchBox}
      >
        Search
      </button>
      {/* .weather-widget>(.weather-box>(.temp>.celsius+.main)+.weather-icon)+.location */}
      {weather ? (
        <div className='weather-widget'>
          <div className='weather-box'>
            <div className='temp'>
              <div className='celsius'>{Math.round(weather.main.temp)} °C</div>
              <div className='main'>{weather.weather[0].main}</div>
            </div>
            <div className='weather-icon'>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt='weather icon'
              />
            </div>
          </div>
          <div className='location'>{`${weather.name}, ${weather.sys.country}`}</div>
        </div>
      ) : (
        <div className='weather-widget'>
          {loadingWeather ? (
            <h3 className='clean-search'>Loading data ... </h3>
          ) : (
            <h3 className='clean-search'>Enter city name</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default Weather;
