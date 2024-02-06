import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reroute from "./components/Reroute";
import Stats from "./components/Stats";
import StatsCode from "./components/Stats";
import RedirectComponent from "./components/Stats"
import KnowledgeBase from "./pages/KnowledgeBase";


export default function App(){
  return (<BrowserRouter>
   {/* <Header />  */}
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path="/about/:id" element={<About />} />
    <Route path="/:shortCode" element={<Reroute />}/>
    <Route path="stats/:shortCode" element={<Stats />} />
    <Route path="/:shortCode" element={<StatsCode />} />
    <Route path="/:shortCode" element={<RedirectComponent />} />
    <Route path='/knowledgebase' element={<KnowledgeBase />} />
   
  </Routes>
  {/* <Footer /> */}
  </BrowserRouter> )
}