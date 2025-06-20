import { useState } from "react";
import { textToSpeech } from "./TextToSpeech";

export function TextToSpeechComponent()
{

    const [result, setResult] = useState("");
    return <div>
        <h2>Text to Speech - Japanese</h2>
        <p>Input any text for realistic text to speech.</p>
        <input value={result} onChange={e => setResult(e.target.value)}/>
        <button onClick={() => textToSpeech(result, 1.5)}>TEXT TO SPEECH</button>
    </div>
}