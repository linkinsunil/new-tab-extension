import { useState } from 'react';
import './Time.css';

function Time() {
  const [currTime, setCurrTime] = useState('');

  const getTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    const now = `${hours}:${minutes}:${seconds}`;
    return now;
  };

  const getDate = showYear => {
    if (showYear) {
      return `${new Date().toUTCString().slice(0, 16)}`;
    }
    return `${new Date().toUTCString().slice(0, 11)}`;
  };

  const getDateTime = (getTime, getDate, showYear) => {
    if (!getDate) {
      setCurrTime(`${getTime()}`);
    } else if (!getTime) {
      setCurrTime(`${getDate(showYear)}`);
    } else {
      setCurrTime(`${getTime()}, ${getDate(showYear)}`);
    }
  };

  setInterval(() => getDateTime(getTime, getDate, true), 1000);

  return (
    <div className='time-card'>
      <span className='time-span'>{currTime && getTime()}</span>
      <span className='date-span'>{currTime && getDate(true)}</span>
    </div>
  );
}

export default Time;
