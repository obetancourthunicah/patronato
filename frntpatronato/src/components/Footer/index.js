import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css';

export default ()=>{
  return (
    <footer>
      <nav>
        <ul>
          <li><NavLink to="/" >Home</NavLink></li>
          <li><NavLink to="/signin">SignIn</NavLink></li>
          <li><NavLink to="/votes">Votes</NavLink></li>
        </ul>
      </nav>
    </footer>
  );
}
