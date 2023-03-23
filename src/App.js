import { useState } from "react";

import './assets/stylesheets/copied.css'
import './assets/stylesheets/normalizer.css'
import Header from './components/Header'
import Introduction from './components/Introduction'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [activeClass, setActiveClass] = useState({ value: 'home' });
  console.log('Initial activeClass state:', activeClass);
  const setActiveClassValue = (newValue) => {
    setActiveClass(newValue);
    console.log('new value:', newValue)
  }
  return (
   <div id='wrapper'>
    <div id='main'>
      <div className='inner'>
        <Header activeClass={activeClass} setActiveClassValue={setActiveClassValue}/>
        <Introduction activeClass={activeClass} setActiveClassValue={setActiveClassValue}/>
        <About activeClass={activeClass} setActiveClassValue={setActiveClassValue}/>
        <Contact activeClass={activeClass} setActiveClassValue={setActiveClassValue}/>
        <Footer/>
      </div>
    </div>
   </div>
  );
}

export default App;