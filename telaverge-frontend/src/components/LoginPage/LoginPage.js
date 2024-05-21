import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {urlConfig} from '../../config';
import {useAppContext} from '../../context/AppContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incorrect, setIncorrect] = useState('');
  const navigate = useNavigate();
  const {setIsLoggedIn} = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await res.json();
    console.log('Details', json);
    if (json.userName) {
      sessionStorage.setItem('name', json.userName);
      sessionStorage.setItem('email', json.userEmail);
      navigate('/app/search');
      setIsLoggedIn(true);
    } else {
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      setIncorrect('Wrong password. Try again.');
      setTimeout(() => {
        setIncorrect('');
      }, 2000);
    }
  };

  return (
    <div className='flex justify-center items-center h-[60vh]'>
      <div className='w-1/2 border-2 rounded-lg bg-white'>
        <h2 className='text-center font-bold text-4xl my-4'>Login</h2>
        <div className='m-4'>
          <label htmlFor='email' className='my-5'>
            Email
          </label>
          <input
            id='email'
            type='text'
            className='block border w-full rounded-lg p-1 px-2'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIncorrect('');
            }}
          />
        </div>
        <div className='m-4'>
          <label htmlFor='password' className='my-5'>
            Password
          </label>
          <input
            id='password'
            type='password'
            className='block border w-full rounded-lg p-1 px-2'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIncorrect('');
            }}
          />
          <span className='text-red-500 h-1 block text-xs italic'>
            {incorrect}
          </span>
        </div>
        <button
          className='bg-blue-500 text-white w-full my-3 p-2 rounded hover:bg-blue-600'
          onClick={handleLogin}>
          Login
        </button>
        <p className='m-4 text-center'>
          New here?{' '}
          <a
            href='/app/register'
            className='text-blue-500 hover:text-blue-600 hover:underline'>
            Register Here
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
