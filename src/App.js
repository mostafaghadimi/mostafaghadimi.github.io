import { useState, useEffect } from "react";

import './assets/stylesheets/style.css'
import './assets/stylesheets/normalizer.css'
import Header from './components/Header'
import Introduction from './components/Introduction'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [activeClass, setActiveClass] = useState({ value: 'home' });
  const setActiveClassValue = (newValue) => {
    setTimeout(() => {
      setActiveClass(newValue);
    }, 100);
  }

  useEffect(() => {
    setActiveClass({ value: 'home' });
  }, []);
  return (
   <div id='wrapper'>
    <div id='main'>
      <div className='inner'>
        <Header activeClass={activeClass} setActiveClassValue={setActiveClassValue}/>
        <Introduction activeClass={activeClass} setActiveClassValue={setActiveClassValue} key='home'/>
        <About activeClass={activeClass} setActiveClassValue={setActiveClassValue} key='about'/>
        <Contact activeClass={activeClass} setActiveClassValue={setActiveClassValue} key='contact'/>
        <Footer/>
      </div>
    </div>
   </div>
  );
}

export default App;