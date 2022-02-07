import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => {
  return (
      <>
        <div id='link-div' style={{ marginTop: '25px' }} >
          <Link to="/">
            <button className='links' >Recording Page</button>
          </Link>
          <Link to="/savednotes">
            <button className='links' >Saved Notes</button>
          </Link>
        </div>
      </>
  )
};

export default Links;
