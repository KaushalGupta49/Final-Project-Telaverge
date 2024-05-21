import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {urlConfig} from '../../config';
import {useAppContext} from '../../context/AppContext';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState('');
  const navigate = useNavigate();
  const {setIsLoggedIn} = useAppContext();

  const handleRegister = async () => {
    const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });

    const json = await response.json();
    console.log('json data', json);
    console.log('er', json.error);

    if (json.email) {
      sessionStorage.setItem('name', firstName);
      sessionStorage.setItem('email', json.email);
      navigate('/app/login');
      setIsLoggedIn(true);
    }
    if (json.error) {
      setShowerr(json.error);
    }
  };

  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <div className='w-1/2 border-2 rounded-lg bg-white'>
        <h2 className='text-center font-bold text-4xl my-4'>Register</h2>
        <div className='m-4'>
          <label htmlFor='firstName' className='my-5'>
            FirstName
          </label>
          <input
            id='firstName'
            type='text'
            className='block border w-full rounded-lg p-1 px-2'
            placeholder='Enter your firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='m-4'>
          <label htmlFor='lastName' className='my-5'>
            LastName
          </label>
          <input
            id='lastName'
            type='text'
            className='block border w-full rounded-lg p-1 px-2'
            placeholder='Enter your lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
            onChange={(e) => setEmail(e.target.value)}
          />
          {showerr && <div className='text-red-500'>{showerr}</div>}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className='bg-blue-500 text-white w-full my-3 p-2 rounded hover:bg-blue-600'
          onClick={handleRegister}>
          Register
        </button>
        <p className='m-4 text-center'>
          Already a member?{' '}
          <a
            href='/app/login'
            className='text-blue-500 hover:text-blue-600 hover:underline'>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
