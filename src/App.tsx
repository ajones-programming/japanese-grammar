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
      <RandomVerbSound
      loaded={dataFetched}
      />
    </>
  )
}

export default App
