import './assets/stylesheets/copied.css'
import './assets/stylesheets/normalizer.css'
import Header from './components/Header.js'
import Introduction from './components/Introduction'

function App() {
  return (
   <div id='wrapper'>
    <div id='main'>
      <div className='inner'>
        <Header/>
        <Introduction/>
      </div>
    </div>
   </div>
  );
}

export default App;
