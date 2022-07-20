import './Greeting.css';
import '../Time/Time.css';

import { useEffect, useState } from 'react';

function Greeting() {
  const [greetingMessage, setGreetingMessage] = useState('');
  const [username, setUsername] = useState('');
  const [showUsername, setShowUsername] = useState(true);

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

  const submitUserName = e => {
    e.preventDefault();
    setShowUsername(true);
  };

  const openNameInput = () => {
    console.log('openNameInput');
    setShowUsername(false);
  };

  return (
    <div className='time-card greeting'>
      <span>{greetingMessage}</span>
      <br />
      {showUsername ? (
        <span className='user-name' onClick={openNameInput}>
          {username}
          {username && '!'}
        </span>
      ) : (
        <form className='greeting-form' onSubmit={submitUserName}>
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
