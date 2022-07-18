import { useState } from 'react';
import './Crypto.css';
// import bitcoin from '../assets/bitcoin.svg';
// import ethereum from '../assets/ethereum.svg';
// import litecoin from '../assets/litecoin.svg';
// import cryptocurrency from '../assets/cryptocurrency.svg';
import crypto from '../assets/crypto.png';

const baseURL = 'https://api.coinstats.app/public/v1/coins/';

const currencies = [
  { currency: 'INR', sign: '₹' },
  { currency: 'EUR', sign: '£' },
  { currency: 'USD', sign: '$' },
];
const coins = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'litecoin', symbol: 'LTC' },
];

function Crypto() {
  const [choosedCoin, setChoosedCoin] = useState('');
  const [currency, setCurrency] = useState('');
  const [coinValue, setCoinValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const showCoinValue = () => {
    console.log(choosedCoin);
    console.log(currency);
    setLoading(true);
    fetch(`${baseURL}${choosedCoin}?currency=${currency}`)
      .then(res => {
        console.log(res);
        if (res.status !== 200) {
          console.log('Error while fetching data', res.status);
          setLoading(false);
          setCoinValue('');
          setError(true);
          return;
        }
        setError(false);
        res.json().then(data => {
          console.log(data);
          setLoading(false);
          setCoinValue(Math.round(data.coin.price));
        });
      })
      .catch(err => {
        console.log(err.message);
        setCoinValue('');
        setError(true);
      });
  };
  console.log(choosedCoin);
  console.log(currency);

  return (
    <div className='crypto-card'>
      <h3 className='crypto-heading'>Crypto Rate Finder</h3>
      <div className='selection'>
        {coins.map(({ id, symbol }) => {
          return (
            <input
              type='button'
              value={symbol}
              className='btn-input btn-coin'
              onClick={() => {
                setCoinValue('');
                setChoosedCoin(id);
              }}
              key={id}
            />
          );
        })}
        <br />
        {currencies.map(({ currency }) => {
          return (
            <input
              type='button'
              value={currency}
              className='btn-input btn-currency'
              onClick={() => {
                setCoinValue('');
                setCurrency(currency);
              }}
              key={currency}
            />
          );
        })}
      </div>
      <button className='btn-fetch' onClick={showCoinValue}>
        Fetch
      </button>
      {error && <p>Oops! We couldn't find data. Please try again!</p>}
      <div className='coin-rate'>
        <img src={crypto} alt='coin' className='coin-logo' />
        <span>
          &nbsp;
          {choosedCoin}{' '}
          {currency &&
            `= ${
              currencies.filter(item => item.currency === currency)[0].sign
            }`}
        </span>
        {loading && <span>...</span>}
        <span>&nbsp;{coinValue}</span>
      </div>
    </div>
  );
}

export default Crypto;
