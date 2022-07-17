import './Greeting.css';
import '../Time/Time.css';

import React, { useEffect, useState } from 'react';

function Greeting() {
  const [greetingMessage, setGreetingMessage] = useState('Hi');
  const [username, setUsername] = useState('');
  const [show, setShow] = useState(false);

  const date = new Date();
  const hours = date.getHours();

  useEffect(() => {
    if (hours > 4 && hours < 12) {
      setGreetingMessage('Good Morning');
    } else if (hours > 11 && hours < 17) {
      setGreetingMessage('Good Afternoon');
    } else {
      setGreetingMessage('Good Evening');
    }
  }, [hours]);

  const handleSubmit = e => {
    e.preventDefault();
    setShow(true);
    console.log(username);
  };

  const handleClick = () => {
    setShow(false);
  };

  return (
    <div className='time-card greeting'>
      <span>{greetingMessage}</span>
      <br />
      <form className='greeting-form' onSubmit={handleSubmit}>
        {show ? (
          <span className='user-name' onClick={handleClick}>
            {username}!
          </span>
        ) : (
          <input type='text' onChange={e => setUsername(e.target.value)} />
        )}
      </form>
    </div>
  );
}

export default Greeting;
