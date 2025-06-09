import { useState } from 'react'
import './App.css'
import { loadAll } from './types/util';
import { RandomVerbSound } from './RandomVerbSound';

function App() {
  const [dataFetched, setDataFetched] = useState(false);

  if (!dataFetched){
    loadAll();
    setDataFetched(true);
  }
  return (
    <>
      <div className='container'>
        <h1>Japanese App</h1>
        <p>
          This app does not teach you english to Japanese. It will only give you the opportunity to listen to speech.
        </p>
      </div>


      <div className='container'>
        <RandomVerbSound
        loaded={dataFetched}
        />
      </div>

    </>
  )
}

export default App
