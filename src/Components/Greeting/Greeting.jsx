import './Greeting.css';
import '../Time/Time.css';

import React, { useEffect, useState } from 'react';

function Greeting() {
  const [greetingMessage, setGreetingMessage] = useState('Hi');
  const [username, setUsername] = useState('');
  const [show, setShow] = useState(true);

  useEffect(() => {
    const item = localStorage.getItem('userName');
    const loadedItem = JSON.parse(item);
    if (loadedItem) {
      setUsername(loadedItem);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(username);
    localStorage.setItem('userName', json);
  }, [username]);

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    if (hours > 4 && hours < 12) {
      setGreetingMessage('Good Morning');
    } else if (hours > 11 && hours < 17) {
      setGreetingMessage('Good Afternoon');
    } else {
      setGreetingMessage('Good Evening');
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setShow(true);
  };

  const handleClick = () => {
    setShow(false);
  };

  return (
    <div className='time-card greeting'>
      <span>{greetingMessage}</span>
      <br />
      {show ? (
        <span className='user-name' onClick={handleClick}>
          {username}
          {username && '!'}
        </span>
      ) : (
        <form className='greeting-form' onSubmit={handleSubmit}>
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </form>
      )}
    </div>
  );
}

export default Greeting;
