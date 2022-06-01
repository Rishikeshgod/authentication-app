import './App.css';
import Header from './components/header';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from './components/welcome';
import Login from './components/login';
import Signup from './components/signup';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <React.Fragment>
      <header>
             <Header/>
      </header>
      <main>
        <Routes>
          <Route path ="/login" element = {<Login/>}/>
          <Route path = "/signup" element = {<Signup/>}/>
          <Route path = "/user" element = {<Welcome/>}/>
        </Routes>
      </main>
    </React.Fragment>

 
  );
}

export default App;
