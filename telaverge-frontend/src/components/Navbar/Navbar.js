import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppContext} from '../../context/AppContext';
// import {urlConfig} from '../../config';

export default function Navbar() {
  const {isLoggedIn, setIsLoggedIn, userName, setUserName} = useAppContext();

  const navigate = useNavigate();
  useEffect(() => {
    const nameFromSession = sessionStorage.getItem('name');
    if (nameFromSession) {
      if (isLoggedIn && nameFromSession) {
        setUserName(nameFromSession);
      } else {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        setIsLoggedIn(false);
      }
    }
  }, [isLoggedIn, setIsLoggedIn, setUserName]);
  const handleLogout = () => {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    setIsLoggedIn(false);
    navigate(`/app`);
  };

  return (
    <>
      <div className='w-full bg-white p-3 font-semibold flex '>
        <div className='flex w-full items-center justify-between text-blue-800'>
          <div>
            <Link to='/' className='text-3xl'>
              Kaushal-Ecommerce
            </Link>
          </div>
        </div>

        <ul className={`mx-2 flex flex-row items-center text-xl gap-2`}>
          <li>
            <Link
              to='/app/search'
              className='hover:text-blue-800 hover:underline hover:shadow-2xl'>
              Search
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <span className='cursor-pointer whitespace-nowrap bg-blue-500 text-white rounded-lg p-4'>
                  Welcome, {userName}
                </span>
              </li>
              <li>
                <button
                  className='bg-red-600 text-white p-2 px-3 rounded-lg hover:bg-red-800'
                  onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className='bg-green-600 text-white p-2 px-3 rounded-lg hover:bg-green-800'
                  to='/app/login'>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className='hover:text-blue-800 hover:underline hover:shadow-2xl'
                  to='/app/register'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className='w-full border border-blue-700'></div>
    </>
  );
}
