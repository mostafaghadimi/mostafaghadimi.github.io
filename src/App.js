import './assets/stylesheets/copied.css'
import './assets/stylesheets/normalizer.css'
import Header from './components/Header'
import Introduction from './components/Introduction'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
   <div id='wrapper'>
    <div id='main'>
      <div className='inner'>
        <Header/>
        <Introduction/>
        <About/>
        <Contact/>
        <Footer/>
      </div>
    </div>
   </div>
  );
}

export default App;
