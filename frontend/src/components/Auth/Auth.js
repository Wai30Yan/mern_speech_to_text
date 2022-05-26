import React, { useState } from "react";
import Input from "./Input";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signup, signin } from "../../actions/auth";

const Auth = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [register, setRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (register) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }
  
  const toggleRegister = (e) => {
    e.preventDefault()
    setRegister(prev => !prev)

  }

  const handleChange = (e) => {
    // setFormData(prevValues => {
    //     return {...prevValues, [e.target.name]: e.target.value}
    // })
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  const [visibility, setVisibility] = useState(false)

  const handleVisibility = () => {
    return setVisibility(prev => !prev)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form" style={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center', margin: '15px auto', marginTop: '10%' }} >
          <h1 style={{ margin: '10px', padding: '5px' }} >{register ? 'Register' : 'Login'}</h1>
          {register ? <Input type="text" name='firstName' value={formData.firstName} handleChange={handleChange} placeholder='First Name' /> : null}
          {register ? <Input type="text" name='lastName' value={formData.lastName} handleChange={handleChange} placeholder='Last Name' /> : null}
          <Input type="text" name='email' value={formData.email} handleChange={handleChange} placeholder='Email' />
          <Input type={visibility ? 'text' : 'password'} name='password' value={formData.password} handleChange={handleChange} handleVisibility={handleVisibility} placeholder='Password' />
          {register ? <Input type="text" name='confirmPassword' value={formData.confirmPassword} handleChange={handleChange} placeholder='Confirm Password' /> : null}
          <button type="submit" className="btn" style={{ width: '90px' }} onClick={handleSubmit} >{register ? 'Sign Up' : 'Sign In'}</button>
          <span className="toggleRegister"  onClick={toggleRegister} >{register ? 'Already have an accout?' : "Don't have an account?"}</span>
        </div>
      </form>
    </>
  ) 
};

export default Auth;

/* <div className="form-container" style={{ margin: '20px', padding: '15px' }} > */
/* </div> */