import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signout } from '../actions/auth';
import { authTest } from '../api';

const NavBar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const profile  = JSON.parse(localStorage.getItem('profile')) 

  const logout = (e) => {
    e.preventDefault()
    dispatch(signout(navigate))
  }

  const auth = () => {
    authTest(profile)
  }

  return (
      <>
        <div className='navbar' >
          <h1 style={{ margin: '10px', padding: '5px' }}>Voice Memo</h1>
            <button className='btn' style={{ width: 'auto' }} onClick={auth} >
              Auth Test
            </button>
          <Link to={profile === null ? '/auth' : '/'}>
            <button className='btn' onClick={logout} >
              {profile === null ? "LOGIN" : "LOGOUT"}
            </button>
          </Link>
        </div>
      </>
  )
};

export default NavBar;
