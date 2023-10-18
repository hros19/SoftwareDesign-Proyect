import React from 'react';
import ReactDOM from 'react-dom/client'; 
import Gallery from './Gallery';
import Categories from './Categories';
import AddPicture from './AddPicture';
import App from './App';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Index() {

    return(
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Gallery />}></Route>
          <Route path="/AddPicture" element={<AddPicture />}></Route>
          <Route path="/Categories" element={<Categories />}></Route>
		  <Route path="/App" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Index />);