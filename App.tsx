
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RamadanCounter from './components/RamadanCounter';
import Reflections from './components/Reflections';
import About from './components/About';
import Sectors from './components/Sectors';
import Gallery from './components/Gallery';
import GetInvolved from './components/GetInvolved';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { DataProvider } from './context/DataContext';
import ScrollToTop from './components/ScrollToTop';

const LandingPage: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <RamadanCounter />
      <Reflections />
      <About />
      <Sectors />
      <Gallery limit={6} />
      <GetInvolved />
      <Contact />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route path="/gallery" element={
              <>
                <Navbar />
                <main className="pt-20">
                  <Gallery />
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
