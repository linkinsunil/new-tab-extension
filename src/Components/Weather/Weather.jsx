import './Weather.css';

function Weather() {
  const handleSearch = () => {};
  return (
    <div className='weather'>
      <div className='search-box'>
        <form action=''>
          <input
            type='text'
            className='search-bar'
            placeholder='Search for a city'
          />
        </form>
        <button className='btn-search' onClick={handleSearch}>
          Search
        </button>
      </div>
      {/* .weather-widget>(.weather-box>(.temp>.celsius+.main)+.weather-icon)+.location */}
      <div className='weather-widget'>
        <div className='weather-box'>
          <div className='temp'>
            <div className='celsius'></div>
            <div className='main'></div>
          </div>
          <div className='weather-icon'></div>
        </div>
        <div className='location'></div>
      </div>
    </div>
  );
}

export default Weather;
