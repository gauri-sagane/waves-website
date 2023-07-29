import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './hoc/mainLayout';

import Header from './components/navigation/header';
import Footer from './components/navigation/footer';
import Home from './components/home';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <MainLayout>
        <Routes>
          <Route path="/" element = {<Home />} />
        </Routes>
      </MainLayout>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
