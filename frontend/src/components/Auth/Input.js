import React from "react";
import { MdOutlineVisibility, MdOutlineMail, MdPassword } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

const Input = (props) => {
  return (
    <>
      <div className="input-icons" style={{ width: '100%'}}>
        <input
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.handleChange}
            placeholder={props.placeholder}
            className="inputs"
        />
        {props.name === 'password' ? <i onClick={props.handleVisibility} className="icon password-icon">{<MdOutlineVisibility/>}</i> : null}
        {props.name === 'email' ? <i className="icon">{<MdOutlineMail/>}</i> : null}
        {props.name === 'firstName' ? <i className="icon">{<FaUserCircle/>}</i> : null}
        {props.name === 'lastName' ? <i className="icon">{<FaUserCircle/>}</i> : null}
        {props.name === 'confirmPassword' ? <i className="icon">{<MdPassword/>}</i> : null}

      </div>
        
    </>
  );
};

export default Input;
