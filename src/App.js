import React from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Navbar from './components/common/Navbar';
import { Route,Routes } from 'react-router-dom'
import Footer from './components/common/Footer';
import Favourites from './components/Favourites';


function App() {
  return (
    <>
    <Navbar />
    <Routes>
    <Route exact path='/' element={<Homepage />} />
    <Route exact path='/Favourites' element={<Favourites />} />
    </Routes>
      <Footer />
      </>
  );
}

export default App;
