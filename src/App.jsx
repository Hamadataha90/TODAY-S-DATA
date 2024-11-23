import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Weather from './components/Weather';
import Currency from './components/Currency';
import News from './components/News';
import Error from './components/Error';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <NavBar />

      <Container className="main-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/weather' element={<Weather />} />
          <Route path='/currency' element={<Currency />} />
          <Route path='/news' element={<News />} />
          <Route path='/*' element={<Error />} />
        </Routes>
      </Container>

      <Footer />
    </div>
  );
}

export default App;
