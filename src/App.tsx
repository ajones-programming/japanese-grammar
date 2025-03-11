import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { textToSpeech } from './TextToSpeech'
//import { quickStart } from './TextToSpeech'

function App() {
  const [result, setResult] = useState("");

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1> */}
      <div className="card">
        TEST
        <input value={result} onChange={e => setResult(e.target.value)}/>
        <button onClick={() => textToSpeech(result)}>TEXT TO SPEECH</button>
      </div>
    </>
  )
}

export default App
