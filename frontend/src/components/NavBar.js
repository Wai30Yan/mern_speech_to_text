import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signout } from '../actions/auth';
// import { authTest } from '../api';
import decode from 'jwt-decode'

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const logout = (e) => {
    e.preventDefault()
    dispatch(signout(navigate))
  }


  // const auth = () => {
  //   authTest(profile)
  // }

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(signout(navigate))
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  

  return (
    <>
      <div className='navbar' >
        <h1 style={{ margin: '10px', padding: '5px' }}>Voice Memo</h1>
        {
          user ?
          <>
            <Link to='/'>
              <button className='btn' onClick={logout} >
                LOGOUT
              </button>
            </Link>
          </> : 
          <>
            <Link to='/auth'>
              <button className='btn' >
                LOGIN
              </button>
            </Link>
          </>
        }
      </div>
    </>
  )
};

export default NavBar;
