import './assets/stylesheets/copied.css'
import './assets/stylesheets/normalizer.css'
import Header from './components/Header.js'
import Introduction from './components/Introduction'
import Footer from './components/Footer.js'

function App() {
  return (
   <div id='wrapper'>
    <div id='main'>
      <div className='inner'>
        <Header/>
        <Introduction/>
        <Footer/>
      </div>
    </div>
   </div>
  );
}

export default App;
