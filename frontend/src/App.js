import './App.css';
import React from 'react';

import Home from './pages/Home'
import Logo from './pages/LogoDisplay'
import SmashCharacters from './pages/SmashCharacters';
import Tournaments from './pages/Tournament';

function App() {

  return (
    <>
      <Logo />
      <Home />
      <SmashCharacters />
      <Tournaments />

    </>
  );

}

export default App;