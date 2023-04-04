import React from 'react'
import SmashLogo from '../assets/logo.png'

const Logo = () => {
    return (
        <div>
          <img src={SmashLogo} alt="super smash bros logo" style={{ width: '200px', height: 'auto' }}/> 
        </div>
    );
}

export default Logo;