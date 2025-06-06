import { useState } from "react";
import { textToSpeech } from "./TextToSpeech";

export function TextToSpeechComponent()
{

    const [result, setResult] = useState("");
    return <div className="card">
        <input value={result} onChange={e => setResult(e.target.value)}/>
        <button onClick={() => textToSpeech(result)}>TEXT TO SPEECH</button>
    </div>
}