import { useState } from 'react'
import './App.css'
import { loadAll } from './types/util';
import { RandomSentence } from './RandomSentence';
import { TextToSpeechComponent } from './TextToSpeechComponent';

function App() {
  const [dataFetched, setDataFetched] = useState(false);

  if (!dataFetched){
    loadAll();
    setDataFetched(true);
  }
  return (
    <div className="justify-center">
      <div className='container relative'>
        <img src="https://em-content.zobj.net/source/twitter/408/flag-japan_1f1ef-1f1f5.png" className='icon'/>
        <h1>Japanese App</h1>
        <p>
          This app does not teach you english to Japanese. It will only give you the opportunity to listen to speech.
        </p>
      </div>

      <div className='container'>
        <TextToSpeechComponent/>
      </div>

      <div className='container'>
        <RandomSentence
        loaded={dataFetched}
        />
      </div>
    </div>
  )
}

export default App
